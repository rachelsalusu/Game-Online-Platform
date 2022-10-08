import { FETCH_USER, REFRESH_PAGE, LOGIN } from '../actions/user';

const initialState = {
  isLoggedIn: false,
  loadingUser: false,
  userData: {},
  userProfile: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOGIN: {
      sessionStorage.setItem("userData", JSON.stringify(action.payload))
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload,
      }
    }

    // case REFRESH_PAGE: {
    //   return {
    //     ...state,
    //     userData: JSON.parse(sessionStorage.userData)
    //   };
    // }

    case FETCH_USER: {
      return {
        ...state,
        userProfile: action.payload,
      };
    }

    default: {
      return state;
    }
  }
}
