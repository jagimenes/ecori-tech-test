import { BrowserRouter } from "react-router-dom";

import "./global.css";

import { Router } from "./routes";

export function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}
