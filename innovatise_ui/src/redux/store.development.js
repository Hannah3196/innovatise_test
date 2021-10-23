import { createStore, applyMiddleware, compose } from "redux";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";
import { apiMiddleware } from "redux-api-middleware";
import rootReducer from './rootReducer';
import { authMiddleware, userMiddleware} from './authentication';

export const history = createBrowserHistory();

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;

const middleware = [
    routerMiddleware(history),
    apiMiddleware,
    authMiddleware,
    userMiddleware
];

const store = preloadedState =>
    createStore(
        rootReducer(history),
        preloadedState,
        composeEnhancers(applyMiddleware(...middleware)),
    );

export default store;