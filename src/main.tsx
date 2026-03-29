import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App.tsx";
// Нормалізація стилів
import "modern-normalize";
// Глобальні стилі (додатково)

ReactDOM.createRoot(document.getElementById("root")!).render(
   <React.StrictMode>
      <App />
   </React.StrictMode>,
);
