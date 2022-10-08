import { FETCH, FETCH_SUCCESS, FETCH_FAIL } from "../actions/game-details";

const initialState = {
  loading: false,
  gameDetails: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH: {
      return {
        ...state,
        loading: true,
      };
    }

    case FETCH_SUCCESS: {
      return {
        ...state,
        loading: false,
        gameDetails: action.payload,
      };
    }

    case FETCH_FAIL: {
        return {
            ...state,
            loading: false,
            error: action.error
        }
      }

    default: {
      return state;
    }
  }
}
