import api from '../utils/api';

export const REGISTERATION_REQUESTED = 'session/REGISTERATION_REQUESTED';
export const REGISTERATION_SUCCESS = 'session/REGISTERATION_SUCCESS';
export const REGISTERATION_FAILURE = 'session/REGISTERATION_FAILURE';

const initialState = {
  loading: false,
  created: null,
  error: null
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTERATION_REQUESTED:
      return {
        ...state,
        loading: payload.loading,
        error: payload.error
      };

    case REGISTERATION_SUCCESS:
      return {
        ...state,
        loading: payload.loading,
        created: payload.created
      };

    case REGISTERATION_FAILURE:
      return {
        ...state,
        loading: payload.loading,
        created: payload.created,
        error: payload.error
      };

    default:
      return state;
  }
};

export const requestRegisteration = () => ({
  type: REGISTERATION_REQUESTED,
  payload: {
    loading: true,
    error: null
  }
});

export const registerationSuccess = () => ({
  type: REGISTERATION_SUCCESS,
  payload: {
    created: true,
    loading: false
  }
});

export const registerationFailed = (error = null) => ({
  type: REGISTERATION_FAILURE,
  payload: {
    created: false,
    loading: false,
    error: error
  }
});

export const register = user => dispatch => {
  dispatch(requestRegisteration());
  api
    .createUser(user)
    .then(response => dispatch(registerationSuccess()))
    .catch(res => {
      const { response: { data = {}}} = res
      const { errors = [] } = data
      dispatch(registerationFailed(errors[0]))
    })
};
