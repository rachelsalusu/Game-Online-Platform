import { FETCH, FETCH_SUCCESS, FETCH_FAIL } from "../actions/game-list";

const initialState = {
  loading: false,
  gameList: [],
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
        gameList: action.payload,
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
