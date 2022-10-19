import { FETCH_SUCCESS } from '../store/actions/leaderboards';

export function fetchLeaderboards(id) {
  return async function fetchLeaderboardsThunk(dispatch, getState) {
    const response = await fetch("http://localhost:4000/api/v1/games/detail" ,{
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization : JSON.parse(sessionStorage.userData).accessToken
      }
    }
)
    const result = await response.json();

    console.log('data already fetched')

    dispatch({
      type: FETCH_SUCCESS,
      payload: result.data
    });
  };
}