import React from 'react';
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router-dom';
import Login from './pages/login/Login';
import SignUp from './pages/signup/Signup';
import Chat from './pages/chat/Chat';
import { WebSocketProvider } from './context/WebSocketContext';
import { ToastProvider } from './context/ToastProvider';

export default function App() {

  // const router = createBrowserRouter([
  //   <Route path='/' />
  // ])

  return (
    <div>
      <ToastProvider>

      <BrowserRouter  >
        {/* <WebSocketProvider> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/chat" element={<Chat />} />
            {/* You can add more routes here, like SignUp */}
            {/* <Route path="/signup" element={<SignUp />} /> */}
          </Routes>
        {/* </WebSocketProvider> */}
      </BrowserRouter>
      </ToastProvider>
    </div>
  );
}



