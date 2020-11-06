import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  profile: null,
  carwash: null,
  car: null,
  signed: false,
  loading: false
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_UP_SUCCESS': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_SUCCESS': {
        draft.token = action.payload.token;
        draft.profile = action.payload.user;
        draft.carwash = action.payload.carwash;
        draft.car = action.payload.car;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.profile = null;
        draft.signed = false;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/CREATE_CARWASH': {
        draft.loading = true;
        break;
      }
      case '@auth/CREATE_CARWASH_SUCCESS': {
        draft.carwash = action.payload.carwash;
        draft.loading = false;
        break;
      }
      case '@auth/CREATE_CARWASH_FAIL': {
        draft.loading = false;
        break;
      }
      case '@auth/CREATE_CAR': {
        draft.loading = true;
        break;
      }
      case '@auth/CREATE_CAR_SUCCESS': {
        draft.car = action.payload.car;
        draft.loading = false;
        break;
      }
      case '@auth/CREATE_CAR_FAIL': {
        draft.loading = false;
        break;
      }
      case '@auth/UPDATE_CAR': {
        draft.loading = true;
        break;
      }
      case '@auth/UPDATE_CAR_SUCCESS': {
        draft.car = action.payload.car;
        draft.loading = false;
        break;
      }
      case '@auth/UPDATE_CAR_FAIL': {
        draft.loading = false;
        break;
      }
      case '@auth/UPDATE_PROFILE': {
        draft.loading = true;
        break;
      }
      case '@auth/UPDATE_PROFILE_SUCCESS': {
        draft.profile = action.payload.profile;
        draft.loading = false;
        break;
      }
      case '@auth/UPDATE_PROFILE_FAIL': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
