import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./Slices/Sidebar.jsx";
import formsStepsReducer from "./Slices/FormsSteps.jsx";
import carDetailsIdReducer from "./Slices/CarDetail_id.jsx";
import authReducer from "./Slices/Auth.jsx";
const store = configureStore(
  {
    reducer: {
      sidebar: sidebarReducer,
      formsSteps: formsStepsReducer,
      carDetailsId: carDetailsIdReducer,
      auth: authReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
