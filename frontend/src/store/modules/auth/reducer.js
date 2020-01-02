import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  logged: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.token = action.payload.token;
        draft.logged = true;
      });
    default:
      return state;
  }
}
