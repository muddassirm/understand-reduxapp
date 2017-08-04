import { createStore } from 'redux'
import reducer from './AppReducer';
const AppReduxStore = createStore(reducer);
export default AppReduxStore;