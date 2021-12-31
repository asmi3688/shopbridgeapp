import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Grommet} from 'grommet'
const grommet = {
  global: {
    font: {
      family: 'Roboto',
      size: '18px',
      height: '20px',
    },
  },
};

ReactDOM.render(
  <React.StrictMode>
    <Grommet theme={grommet}>
      <App />
    </Grommet>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
