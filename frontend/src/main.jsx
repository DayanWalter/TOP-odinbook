import React from 'react';
import ReactDOM from 'react-dom/client';
// import App from './App.jsx';
import './index.css';
// import CreatePost from './components/post/CreatePost.jsx';
// import CreateUser from './components/user/CreateUser.jsx';
import LoginUser from './components/user/LoginUser.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LoginUser />
  </React.StrictMode>
);
