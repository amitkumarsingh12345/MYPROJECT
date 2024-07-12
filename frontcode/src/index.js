import React from "react";
import ReactDom from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.js'
import '../node_modules/bootstrap/dist/js/bootstrap.min.js'


import App from "./App";

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
  <App/>
)
