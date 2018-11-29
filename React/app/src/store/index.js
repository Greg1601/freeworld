/*
 * Npm import
 */
import { applyMiddleware, compose, createStore } from 'redux';


/*
 * Local import
 */
import reducer from './reducer';
import middleware from './middlewares/midOne';


/*
 * Code
 */
// Redux DevTools extension
let devTools = [];
if (window.devToolsExtension) {
  devTools = [window.devToolsExtension()];
}

// Middlewares
const mainMiddleware = applyMiddleware(middleware);
const middlewares = compose(mainMiddleware, ...devTools);

// Store
const store = createStore(reducer, middlewares);


/*
 * Export default
 */
export default store;
