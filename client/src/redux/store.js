import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';
// import { composeWithDevTools } from "redux-devtools-extension";
import { user, seasons, blogs, misc, players, games, locations, teams } from './reducers';


let reducers = combineReducers({
  user,
  seasons,
  misc,
  blogs,
  players,
  games,
  locations,
  teams,
});

const store = createStore(reducers, {}, applyMiddleware(thunk));
export default store;
