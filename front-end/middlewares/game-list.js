import { FETCH_SUCCESS } from '../store/actions/game-list';

export function fetchGameList(id) {
  return async function fetchGameListThunk(dispatch, getState) {
    const response = await fetch('http://localhost:4000/api/v1/games/');
    const result = await response.json();

    console.log('data already fetched');

    dispatch({
      type: FETCH_SUCCESS,
      payload: result.data,
    });
  };
}
