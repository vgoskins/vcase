const Koa = require('koa');
const router = require('koa-router')();
const _ = require('lodash');
const Promise = require('bluebird');
const log = require('./log');
const koaLogger = require('koa-bunyan');
const serve = require('koa-static');
const rewrite = require('koa-rewrite');
const {
  baseURL,
  port,
  vgoURL,
  vgoAPIKey,
  affiliateAddress,
  sessionKeys,
  steamApiKey,
} = require('./config');
const Axios = require('axios');
const qs = require('qs');
const session = require('koa-session');
const passport = require('koa-passport');
const SteamStrategy = require('passport-steam');

const app = new Koa();

app.use(koaLogger(log, { level: 'info' }));

app.use(rewrite('/login/callback', '/'));
app.use(rewrite('/info', '/'));
app.use(serve('public'));
router.get('/health', healthCheck);
router.get('/cases', getCases);
router.get('/keys', getKeyCount);
router.post('/cases/:id/open', sendCaseOpenOffer);
router.get('/offer/:id', getCaseOpenOfferState);
router.get('/items', getItems);
router.get(
  '/auth',
  passport.authenticate('steam', {
    failureRedirect: '/',
    successRedirect: '/login/callback',
  })
);
router.get(
  '/auth/completed',
  passport.authenticate('steam', {
    failureRedirect: '/',
    successRedirect: '/login/callback',
  })
);
router.get('/auth/status', getAuthStatus);
router.delete('/auth', logout);

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

require('koa-qs')(app);

app.keys = sessionKeys;
app.use(session({}, app));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new SteamStrategy(
    {
      returnURL: `${baseURL}/auth/completed`,
      realm: `${baseURL}/`,
      apiKey: steamApiKey,
    },
    function(identifier, profile, done) {
      let user = {
        steamId: _.last(identifier.split('/')),
        name: profile._json.personaname,
        avatar: profile._json.avatar,
      };
      done(null, user);
    }
  )
);

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 500 handler
    log.error('Error handling request', error);
    ctx.body = {
      error,
    };
    ctx.status = 500;
  }
});

app.use(router.routes());

app.listen(port, () => {
  log.info(`VCase API listening on: ${port}`);
});

const vgoAPI = Axios.create({
  baseURL: vgoURL,
  headers: {
    Authorization: 'Basic ' + Buffer.from(vgoAPIKey + ':').toString('base64'),
  },
});

async function healthCheck(ctx) {
  ctx.body = {
    api: 'up',
  };
  ctx.status = 200;
}

async function getCases(ctx) {
  let response = await vgoAPI.get('/ICase/GetCaseSchema/v1');
  ctx.body = response.data.response.cases;
  ctx.status = 200;
}

async function getKeyCount(ctx) {
  if (ctx.isUnauthenticated()) {
    ctx.status = 401;
    ctx.body = `{"error":"Unauthenticated"}`;
    return;
  }
  let response;
  try {
    response = await vgoAPI.get(
      `/ICaseSite/GetKeyCount/v1?${qs.stringify({
        steam_id: ctx.state.user.steamId,
      })}`
    );
    ctx.body = { keyCount: response.data.response.key_count };
    ctx.status = 200;
  } catch (error) {
    ctx.body = { message: error.response.data.message };
    ctx.status = error.response.status;
  }
}

async function sendCaseOpenOffer(ctx) {
  if (ctx.isUnauthenticated()) {
    ctx.status = 401;
    ctx.body = `{"error":"Unauthenticated"}`;
    return;
  }

  let caseId = ctx.params.id;
  let amount = ctx.request.body.amount;

  let response = await vgoAPI.post('/ICaseSite/SendKeyRequest/v1', {
    steam_id: ctx.state.user.steamId,
    case_id: caseId,
    amount: amount,
    affiliate_eth_address: affiliateAddress,
  });
  ctx.body = {
    tradeId: response.data.response.offer.id,
    tradeOfferUrl: response.data.response.offer_url,
  };
  ctx.status = 200;
}

async function getCaseOpenOfferState(ctx) {
  const OFFER_PENDING = 0;
  const OFFER_ACCEPTED = 1;
  const OFFER_FAILED = -1;
  const OPENING_PENDING = 0;
  const OPENING_COMPLETED = 1;
  const OPENING_FAILED = -1;
  const OPENING_PARTIAL_FAILURE = -2;

  let offerId = ctx.params.id;
  let response = await vgoAPI.get(
    `/ICaseSite/GetTradeStatus/v1?offer_id=${offerId}`
  );
  let items = _.chain(response.data.response.cases)
    .map(function(kase) {
      if (kase.item === null) {
        return null;
      }
      return {
        name: kase.item.name,
        category: kase.item.category,
        wearTier: kase.item.wear_tier,
        image: kase.item.image,
        color: kase.item.color,
      };
    })
    .compact();
  let offerState;
  switch (response.data.response.offer.state) {
    case 2:
      offerState = OFFER_PENDING;
      break;
    case 9:
    case 11:
    case 3:
      offerState = OFFER_ACCEPTED;
      break;
    default:
      offerState = OFFER_FAILED;
  }
  let openingState;
  let cases = response.data.response.cases;
  let itemsCount = response.data.response.offer.recipient.items.length;
  if (cases.length < itemsCount || cases.some(kase => kase.status === 2)) {
    openingState = OPENING_PENDING;
  } else if (cases.every(kase => kase.status === 3)) {
    openingState = OPENING_COMPLETED;
  } else if (cases.every(kase => kase.status === 1)) {
    openingState = OPENING_FAILED;
  } else {
    openingState = OPENING_PARTIAL_FAILURE;
  }
  ctx.body = {
    offerState: offerState,
    openingState: openingState,
    items: items,
    totalExpectedItems: itemsCount,
  };
  ctx.status = 200;
}

async function getItems(ctx) {
  let skus = ctx.query.skus;
  let response = await vgoAPI.get(
    `/IItem/GetItems/v1?sku_filter=${skus}&wear_tier_index=1`
  );
  let items = _.map(response.data.response.items, function(item, sku) {
    let itemInfo = item['1'];
    return {
      name: itemInfo.name,
      category: itemInfo.category,
      wearTier: itemInfo.wear_tier,
      image: itemInfo.image,
      color: itemInfo.color,
      sku: sku,
    };
  });
  ctx.body = {
    items: items,
  };
  ctx.status = 200;
}

async function getAuthStatus(ctx) {
  if (ctx.isAuthenticated()) {
    ctx.body = {
      authenticated: true,
      username: ctx.state.user.name,
      avatar: ctx.state.user.avatar,
    };
  } else {
    ctx.body = {
      authenticated: false,
      username: '',
      avatar: '',
    };
  }

  ctx.status = 200;
}

async function logout(ctx) {
  await ctx.logout();
  ctx.body = {};
  ctx.status = 200;
}
