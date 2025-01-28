import React from "react";
import { Provider } from "react-redux"; // Redux Provider
import { PersistGate } from "redux-persist/integration/react"; // Import PersistGate
import AppRouter from "@/lib/routers/index";
import store, { persistor } from "@/lib/store/index"; // Import persistor
import "./index.css";

const App = () => {
  return (
    <Provider store={store}>
      {/* Use PersistGate to ensure the store is rehydrated before rendering */}
      <PersistGate loading={null} persistor={persistor}>
        <AppRouter />
      </PersistGate>
    </Provider>
  );
};

export default App;
