import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import { reducer } from './reducer';


export const mainStore = createStore(reducer, applyMiddleware(thunk));
