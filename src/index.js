import React from 'react';
import ReactDOM from 'react-dom';
import Body from './Containers/Body';
import HeaderPresentation from "./Presentations/HeaderPresentation";
import reportWebVitals from './reportWebVitals';
import './Styles/CSS/index.css';

ReactDOM.render(
  <React.StrictMode>
      <HeaderPresentation />
      <Body />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
