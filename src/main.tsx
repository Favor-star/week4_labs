import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRouter from "./AppRouter";
import { Provider } from "react-redux";
import store from "./redux/store";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <AppRouter />
    </Provider>
  </StrictMode>
);
