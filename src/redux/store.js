import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./Slices/Sidebar.jsx";
import formsStepsReducer from "./Slices/FormsSteps.jsx";
import carDetailsIdReducer from "./Slices/CarDetail_id.jsx";
import ownerIdReducer from "./Slices/Owner_id.jsx";
import authReducer from "./Slices/Auth.jsx";
import carsReducer from "./Slices/carsSlice.jsx";
const store = configureStore(
  {
    reducer: {
      sidebar: sidebarReducer,
      formsSteps: formsStepsReducer,
      carDetailsId: carDetailsIdReducer,
      ownerId: ownerIdReducer,
      cars: carsReducer,
      auth: authReducer,
    },
  },
  +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
