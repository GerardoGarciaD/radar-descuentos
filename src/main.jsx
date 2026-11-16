import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/base.css";
import "./styles/hero.css";
import "./styles/catalogo.css";
import "./styles/comparar.css";
import "./styles/armador.css";
import "./styles/movil.css";

createRoot(document.getElementById("root")).render(<App />);
