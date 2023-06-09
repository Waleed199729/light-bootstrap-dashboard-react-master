import { configureStore } from "@reduxjs/toolkit";
import userReducer from "redux/userReducer";
const store = configureStore({
  reducer: {
    users: userReducer, // idhar hamra reducer define hoga , matlb yahan reducer rakhein ge ham
  },
});

export default store;

// import { createStore, applyMiddleware, combineReducers } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";

// const reducer = combineReducers({
//   //   users: productReducer,
// });

// const middlware = [thunk];

// const store = createStore(
//   reducer,
//   composeWithDevTools(applyMiddleware(...middlware))
// );

// export default store;
