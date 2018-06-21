/*
* Unbox States:
*
* NOT_STARTED: There is no unboxing in process
* OFFER_PENDING: The process started and we are waiting the user to accept the offer
* OFFER_FAILED: The offer failed for some reason (the process cannot continue)
* OPENING_PENDING: The offer was accepted and we are waiting the cases to be opened
* OPENING_FAILED: The opening process failed (the process cannot continue)
* OPENING_COMPLETED: The opening process finished correctly
* OPENING_PARTIAL_FAILURE: Some cases were opened and some failed
*/
const INITIAL_STATE = {
  state: 'NOT_STARTED',
  items: [],
  totalExpectedItems: 0,
};

const unbox = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'UNBOX':
      return { state: 'NOT_STARTED', caseId: action.caseId };
    case 'UNBOX_RECEIVED':
      return Object.assign({}, state, {
        state: 'OFFER_PENDING',
        tradeId: action.tradeId,
        tradeOfferUrl: action.tradeOfferUrl,
      });
    case 'UNBOX_ERROR':
      return Object.assign({}, state, { state: 'OFFER_FAILED' });
    case 'GET_UNBOX_STATUS_RECEIVED':
      return Object.assign({}, state, {
        state: getNewState(action.offerState, action.openingState),
        items: action.items,
        totalExpectedItems: action.totalExpectedItems,
      });
    case 'END_UNBOXING':
    case 'EXIT':
    case 'AUTH_STATUS':
      return INITIAL_STATE;
    default:
      return state;
  }
};

function getNewState(offerState, openingState) {
  if (offerState === 0) {
    return 'OFFER_PENDING';
  } else if (offerState === -1) {
    return 'OFFER_FAILED';
  } else if (openingState === -1) {
    return 'OPENING_FAILED';
  } else if (openingState === 1) {
    return 'OPENING_COMPLETED';
  } else if (openingState === -2) {
    return 'OPENING_PARTIAL_FAILURE';
  } else {
    return 'OPENING_PENDING';
  }
}

export default unbox;
