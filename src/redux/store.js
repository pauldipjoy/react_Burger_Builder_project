import { createStore } from 'redux';
import { reducer } from './reducer';


export const mainStore = createStore(reducer);
