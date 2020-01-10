import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  logged: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST':
      case '@auth/SIGN_UP_REQUEST':
        draft.loading = true;
        break;
      case '@auth/SIGN_IN_SUCCESS':
        draft.token = action.payload.token;
        draft.logged = true;
        draft.loading = false;
        break;
      case '@auth/SIGN_FAILURE':
      case '@auth/SIGN_UP_SUCCESS':
        draft.loading = false;
        break;
      case '@auth/SIGN_OUT':
        draft.token = null;
        draft.logged = false;
        break;
      default:
        return state;
    }
  });
}
