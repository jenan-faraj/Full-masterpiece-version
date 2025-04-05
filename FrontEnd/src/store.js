import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';  // التأكد من الاستيراد الصحيح
import salonReducer from './Redux/reducers/salonReducer';

const store = createStore(
  salonReducer,
  applyMiddleware(thunk)  // تأكد من أن applyMiddleware يعمل هنا
);

export default store;
