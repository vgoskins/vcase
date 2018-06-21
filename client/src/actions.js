import axios from 'axios';
import qs from 'qs';

function storeInStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function getCases() {
  return dispatch => {
    dispatch({ type: 'GET_CASES' });

    return axios
      .get('/cases')
      .then(res => {
        return dispatch({
          type: `GET_CASES_RECEIVED`,
          data: res.data,
        });
      })
      .catch(error => {
        return dispatch({
          type: `GET_CASES_ERROR`,
          error,
        });
      });
  };
}

function unbox(caseId, amount) {
  return dispatch => {
    dispatch({
      type: 'UNBOX',
      caseId: caseId,
      amount,
    });

    return axios
      .post(
        `/cases/${caseId}/open`,
        {
          amount: amount,
        },
        { responseType: 'json' }
      )
      .then(res => {
        return dispatch({
          type: `UNBOX_RECEIVED`,
          tradeId: res.data.tradeId,
          tradeOfferUrl: res.data.tradeOfferUrl,
        });
      })
      .catch(error => {
        return dispatch({
          type: `UNBOX_ERROR`,
          error,
        });
      });
  };
}

function getUnboxStatus(tradeId) {
  return dispatch => {
    dispatch({ type: 'GET_UNBOX_STATUS' });

    return axios
      .get(`/offer/${tradeId}`)
      .then(res => {
        return dispatch({
          type: `GET_UNBOX_STATUS_RECEIVED`,
          items: res.data.items,
          offerState: res.data.offerState,
          openingState: res.data.openingState,
          totalExpectedItems: res.data.totalExpectedItems,
        });
      })
      .catch(error => {
        return dispatch({
          type: `GET_UNBOX_STATUS_ERROR`,
          error,
        });
      });
  };
}

function getAvailableKeys() {
  return dispatch => {
    return axios
      .get(`/keys`)
      .then(res => {
        return dispatch({
          type: `GET_AVAILABLE_KEYS_RECEIVED`,
          keyCount: res.data.keyCount,
        });
      })
      .catch(error => {
        return dispatch({
          type: `GET_AVAILABLE_KEYS_ERROR`,
          error,
        });
      });
  };
}

function exit() {
  return {
    type: `EXIT`,
  };
}

function endUnboxing() {
  return {
    type: `END_UNBOXING`,
  };
}

function getCaseItems(kase) {
  return dispatch => {
    if (kase.items) {
      //Items were already loaded for this case. Nothing to do.
      return Promise.resolve();
    }
    let skuFilter = kase.skus.join(',');
    return axios
      .get(`/items?${qs.stringify({ skus: skuFilter })}`)
      .then(res => {
        return dispatch({
          type: `GET_CASE_ITEMS_RECEIVED`,
          caseId: kase.id,
          items: res.data.items,
        });
      })
      .catch(error => {
        return dispatch({
          type: `GET_CASE_ITEMS_ERROR`,
          error,
        });
      });
  };
}

function shuffleCases() {
  return {
    type: `SHUFFLE_CASES`,
  };
}

function showNavBar(show) {
  return {
    type: `SHOW_NAV_BAR`,
    showNavBar: show,
  };
}

function authStatus(authenticated, username, avatar) {
  return {
    type: 'AUTH_STATUS',
    authenticated: authenticated,
    username: username,
    avatar: avatar,
  };
}

function getAuthStatus() {
  return dispatch => {
    return axios
      .get('/auth/status')
      .then(res => {
        storeInStorage('AUTHENTICATION_STATUS', res.data);
        return dispatch(
          authStatus(res.data.authenticated, res.data.username, res.data.avatar)
        );
      })
      .catch(error => {
        return dispatch(authStatus(false, '', ''));
      });
  };
}

function logout() {
  return dispatch => {
    return axios
      .delete('/auth')
      .then(res => {
        dispatch(exit());
        storeInStorage('AUTHENTICATION_STATUS', { authenticated: false });
        return dispatch({
          type: 'AUTH_STATUS',
          status: false,
        });
      })
      .catch(error => {
        return dispatch({
          type: 'LOGOUT_ERROR',
        });
      });
  };
}

export {
  getCases,
  unbox,
  getUnboxStatus,
  getAvailableKeys,
  exit,
  endUnboxing,
  authStatus,
  getCaseItems,
  shuffleCases,
  logout,
  getAuthStatus,
};
