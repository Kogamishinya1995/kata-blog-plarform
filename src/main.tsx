import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.scss';
import { Provider } from "react-redux";
import store from "./slices/index";
import { StrictMode } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter } from 'react-router-dom'


const root = document.getElementById("root");
if (root) {
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
      </BrowserRouter>
    </StrictMode>
  );
} else {
  throw new Error("Root element not found");
}
