import { combineReducers } from "redux"
import users from "./user"
import gameList from "./game-list"
import gameDetails from "./game-details"
import leaderboards from "./leaderboards"

export default combineReducers({
  gameList,
  gameDetails,
  leaderboards,
  users,
});
