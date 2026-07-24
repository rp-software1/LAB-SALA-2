import React from "react";
import ReactDOM from "react-dom/client";
import "./styles/dashboard.css";
import App from "./App.jsx";
import { PedidoProvider } from './context/PedidoContext';


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <PedidoProvider>
      <App />
    </PedidoProvider> 
  </React.StrictMode>
);