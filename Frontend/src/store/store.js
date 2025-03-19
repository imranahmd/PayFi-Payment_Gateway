// import { configureStore } from "@reduxjs/toolkit";
// import dataReducer from "../features/dataReducer";
// import storage from "redux-persist/lib/storage";
// import { persistReducer } from "redux-persist";
// import { combineReducers } from "@reduxjs/toolkit";

// const persistConfig = {
//   key: "root",
//   version: 1,
//   storage,
// };

// const reducer = combineReducers({
//   data: dataReducer,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// const store = configureStore({
//   reducer: persistedReducer,
// });

// export default store;

// store.js
import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import dataReducer from "../features/dataReducer";

// Import the persistReducer from redux-persist

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["data"], // Add "data" to whitelist to persist only this slice of state
};

const reducer = combineReducers({
  data: dataReducer,
});

// Wrap the combined reducer with persistReducer
const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;
