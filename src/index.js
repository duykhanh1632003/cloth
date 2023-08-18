import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "bootstrap/dist/css/bootstrap.min.css"; // Hãy đảm bảo đã import CSS của Bootstrap
import { BrowserRouter } from 'react-router-dom';
import { UserProvider } from "./contex/userContext";
import store from './redux/store';
import { Provider } from 'react-redux';
ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </React.StrictMode>
  </Provider>
  ,
  document.getElementById('root')
);

// Nếu bạn muốn đo hiệu suất trong ứng dụng của mình, bạn có thể truyền một hàm
// để ghi lại kết quả (ví dụ: reportWebVitals(console.log))
// hoặc gửi đến một điểm cuối phân tích. Tìm hiểu thêm: https://bit.ly/CRA-vitals
reportWebVitals();
