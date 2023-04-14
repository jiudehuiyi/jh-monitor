import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import jhMonitor from "jh-monitor";
jhMonitor.init({apiKey: "1234566", silentRecordScreen: true, silentPerformance: true, dsn: "http://127.0.0.1:4000/public/report", isReportData: true, enableTraceId: true,})

const root = ReactDOM.createRoot(
  document.getElementById('root')
);
root.render(
  // <React.StrictMode>
    <App />
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
