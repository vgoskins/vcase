const error = (state = { error: false }, action) => {
  switch (action.type) {
    case 'GET_AVAILABLE_KEYS_ERROR':
      return {
        error: true,
        message:
          'To use vCase.gg, you must first log in to <a href="//trade.opskins.com">trade.opskins.com</a> with your Steam ID. Then log in to vCase.gg with the same Steam ID',
      };
    case 'GET_CASES_ERROR':
      return {
        error: true,
        message:
          'We cannot get the list of cases from the server. Please refresh the page and try again.',
      };
    case 'EXIT':
      return { error: false };
    default:
      return state;
  }
};

export default error;
