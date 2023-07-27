import { createStore } from 'redux'
import cafeReducer from './cafes/cafeReducers'

const store = createStore(cafeReducer);

export default store;