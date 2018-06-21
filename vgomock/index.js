const Koa = require('koa');
const router = require('koa-router')();
const serve = require('koa-static');
const koaBunyanLogger = require('koa-bunyan-logger');
const PORT = 3002;

const app = new Koa();
require('koa-qs')(app);
app.use(koaBunyanLogger());
app.use(serve('public'));

router.get('/ICase/GetCaseSchema/v1', function(ctx) {
  ctx.body = {
    status: 1,
    time: 1525284327,
    response: {
      cases: [
        {
          id: 1,
          name: 'VGO Case 1',
          image: { '300px': `http://localhost:${PORT}/img/img-01.png` },
          skus: [1, 2, 3, 4, 5, 6],
        },
        {
          id: 2,
          name: 'VGO Case 2',
          image: { '300px': `http://localhost:${PORT}/img/img-01.png` },
          skus: [7, 8, 9, 10],
        },
        {
          id: 3,
          name: 'VGO Case 3',
          image: { '300px': `http://localhost:${PORT}/img/img-01.png` },
          skus: [7, 8, 9, 10],
        },
        {
          id: 4,
          name: 'VGO Case 4',
          image: { '300px': `http://localhost:${PORT}/img/img-01.png` },
          skus: [7, 8, 9, 10],
        },
        {
          id: 5,
          name: 'VGO Case 5',
          image: { '300px': `http://localhost:${PORT}/img/img-01.png` },
          skus: [7, 8, 9, 10],
        },
      ],
    },
  };
});

router.get('/ICaseSite/GetKeyCount/v1', function(ctx) {
  if (!ctx.query.steam_id) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'steam_id'" };
    return;
  }
  console.log('STEAM ID: ' + ctx.query.steam_id);
  ctx.body = {
    status: 1,
    time: 1525284327,
    response: {
      key_count: 15,
    },
  };
});

router.post('/ICaseSite/SendKeyRequest/v1', function(ctx) {
  if (!ctx.request.body.steam_id) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'steam_id'" };
    return;
  }
  if (!ctx.request.body.case_id) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'case_id'" };
    return;
  }
  if (!ctx.request.body.affiliate_eth_address) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'affiliate_eth_address'" };
    return;
  }

  ctx.body = {
    status: 1,
    time: 1525284327,
    response: {
      offer: {
        id: 1000,
        sender: {
          uid: 1000,
          items: [],
        },
        recipient: {
          uid: 1000,
          items: [
            {
              wear_tier: 'Factory New',
              name: 'Key',
              category: 'Classified SMG',
              color: '#8847ff',
              image: {
                '300px': 'http://localhost:${PORT}/img/img-02.png',
                '600px': 'http://localhost:${PORT}/img/img-03.png',
              },
              suggested_price: 5,
            },
          ],
        },
        state: 2,
        state_name: 'active',
        time_created: 1525879295,
        time_updated: 1525879295,
        time_expires: 1526139117,
        message: '',
        sent_by_you: true,
      },
      offer_url: `http://localhost:${PORT}/trade_offer.html`,
    },
  };
});

var tradeStatusRequestCount = 0;
router.get('/ICaseSite/GetTradeStatus/v1', function(ctx) {
  tradeStatusRequestCount = (tradeStatusRequestCount + 1) % 10;

  if (!ctx.query.offer_id) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'offer_id'" };
    return;
  }
  let offerState = 2;
  if (tradeStatusRequestCount > 1) {
    offerState = 9;
  } else if (tradeStatusRequestCount > 4) {
    offerState = 11;
  } else if (tradeStatusRequestCount > 8) {
    offerState = 3;
  }
  ctx.body = {
    status: 1,
    time: 1525284327,
    response: {
      offer: {
        id: 1000,
        sender: {
          uid: 1000,
          items: [],
        },
        recipient: {
          uid: 1000,
          items: [
            {
              category: 'VGO Key',
              color: '#777777',
              eth_inspect: null,
              id: 25229,
              image: {
                '300px': 'https://img-staging.vgo.gg/item/skeleton-key-300.png',
                '600px': 'https://img-staging.vgo.gg/item/skeleton-key-600.png',
              },
              missing: true,
              name: 'Skeleton Key',
              pattern_index: null,
              preview_urls: null,
              sku: 1,
              suggested_price: 250,
              wear: null,
              wear_tier: '',
            },
            {
              category: 'VGO Key',
              color: '#777777',
              eth_inspect: null,
              id: 25229,
              image: {
                '300px': 'https://img-staging.vgo.gg/item/skeleton-key-300.png',
                '600px': 'https://img-staging.vgo.gg/item/skeleton-key-600.png',
              },
              missing: true,
              name: 'Skeleton Key',
              pattern_index: null,
              preview_urls: null,
              sku: 1,
              suggested_price: 250,
              wear: null,
              wear_tier: '',
            },
          ],
        },
        state: offerState,
        state_name: 'active',
        time_created: 1525879295,
        time_updated: 1525879295,
        time_expires: 1526139117,
        message: '',
      },
      cases: [
        {
          id: 1,
          status: tradeStatusRequestCount > 4 ? 3 : 2,
          status_text: tradeStatusRequestCount < 6 ? 'Pending' : 'Opened',
          case_id: 1,
          case_site_trade_offer_id: null,
          item: {
            wear_tier: 'Factory New',
            name: 'UMP-45 | Primal Saber',
            category: 'Classified SMG',
            color: '#8847ff',
            image: {
              '300px': `http://localhost:${PORT}/img/img-02.png`,
              '600px': `http://localhost:${PORT}/img/img-03.png`,
            },
            suggested_price: 5,
          },
        },
        {
          id: 1,
          status: tradeStatusRequestCount > 8 ? 3 : 2,
          status_text: tradeStatusRequestCount < 9 ? 'Pending' : 'Opened',
          case_id: 1,
          case_site_trade_offer_id: null,
          item: {
            wear_tier: 'Factory New',
            name: 'AK-47 | Case Hardened',
            category: 'Classified Rifle',
            color: '#8847ff',
            image: {
              '300px': `http://localhost:${PORT}/img/img-02.png`,
              '600px': `http://localhost:${PORT}/img/img-03.png`,
            },
            suggested_price: 5,
          },
        },
      ],
    },
  };
});

router.get('/IItem/GetItems/v1', function(ctx) {
  if (!ctx.query.sku_filter) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'sku_filter'" };
    return;
  }
  if (!ctx.query.wear_tier_index) {
    ctx.status = 400;
    ctx.body = { error: "Missing 'wear_tier_index'" };
    return;
  }

  ctx.body = {
    status: 1,
    time: 1524850074,
    response: {
      items: {
        '10': {
          '1': {
            wear_tier: 'Factory New',
            name: 'UMP-45 | Primal Saber',
            category: 'Classified SMG',
            color: '#8847ff',
            image: {
              '300px': `http://localhost:${PORT}/img/img-02.png`,
              '600px': `http://localhost:${PORT}/img/img-03.png`,
            },
            suggested_price: 5,
          },
        },
        '20': {
          '1': {
            wear_tier: 'Factory New',
            name: 'AK-47 | Case Hardened',
            category: 'Classified Rifle',
            color: '#8847ff',
            image: {
              '300px': `http://localhost:${PORT}/img/img-02.png`,
              '600px': `http://localhost:${PORT}/img/img-03.png`,
            },
            suggested_price: 1099,
          },
        },
      },
    },
  };
});

const bodyParser = require('koa-bodyparser');
app.use(bodyParser());

app.use(async (ctx, next) => {
  try {
    await next();
  } catch (error) {
    // 500 handler
    ctx.log.error('Error handling request', error);
    ctx.body = {
      error,
    };
    ctx.status = 500;
  }
});

app.use(router.routes());

app.listen(PORT, () => {
  console.log(`VOG MOCK API listening on: ${PORT}`);
});
