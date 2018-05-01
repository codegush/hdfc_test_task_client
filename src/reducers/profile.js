import api from '../utils/api';

export const FETCH_PROFILE_REQUEST = 'profile/FETCH_REQUESTED';
export const FETCH_PROFILE_SUCCESS = 'profile/FETCH_SUCCESS';
export const FETCH_PROFILE_FAILURE = 'profile/FETCH_FAILURE';

const initialState = {
  first_name: null,
  last_name: null,
  email: null,
  loading: false,
  providers: {
    facebook: {},
    github: {},
    google_oauth2: {},
    instagram: {},
    linkedin: {},
    twitter: {}
  },
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case FETCH_PROFILE_REQUEST:
      return {
        ...state,
        loading: payload.loading
      };

    case FETCH_PROFILE_SUCCESS:
      return {
        ...state,
        ...payload
      };

    case FETCH_PROFILE_FAILURE:
      return {
        ...state,
        ...payload
      };

    default:
      return state;
  }
};

export const requestProfile = () => ({
  type: FETCH_PROFILE_REQUEST,
  payload: {
    loading: true
  }
});

export const fetchProfileSuccess = data => ({
  type: FETCH_PROFILE_SUCCESS,
  payload: data,
});

export const fetchProfileFailure = () => ({
  type: FETCH_PROFILE_FAILURE,
  payload: {},
});
export const fetchProfile = () => {
  return dispatch => {
    dispatch(requestProfile());
    api
      .getProfile()
      .then(response => {
        const { data } = response;
        const { identities, email, first_name, last_name } = data;
        const providers = identities.reduce((acc, p) => {
          acc[p.provider] = { ...p.info, uid: p.uid };
          return acc;
        }, {});
        dispatch(
          fetchProfileSuccess({
            providers: { ...providers },
            first_name,
            last_name,
            email
          })
        );
      })
      .catch(error => {
        dispatch(fetchProfileFailure());
      });
  };
};
