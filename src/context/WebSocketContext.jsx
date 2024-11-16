import React, { createContext, useContext, useEffect, useState } from 'react';
import { redirect } from 'react-router-dom';

const WebSocketContext = createContext(null);

export const useWebSocket = () => useContext(WebSocketContext);

export const WebSocketProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const [messages, setMessages] = useState([]);
    // const navigate =-  useNavigate()

    useEffect(() => {
        // Initialize the WebSocket connection
        const ws = new WebSocket('ws://192.168.100.70:3000/chat');

        ws.onopen = () => {
            console.log('WebSocket connection established');
        };

        ws.onmessage = (event) => {
            // Handle incoming messages
            const message = JSON.parse(event.data);
            console.log(message)
            if ('username'in message) {
                sessionStorage.setItem('loginData',JSON.stringify(message))
                redirect("/chat");
            } else {
                setMessages((prevMessages) => [...prevMessages, message]);
            }
        };

        ws.onerror = (error) => {
            console.error('WebSocket error:', error);
        };

        ws.onclose = () => {
            console.log('WebSocket connection closed');
        };

        setSocket(ws);

        // Cleanup on component unmount
        return () => {
            ws.close();
        };
    }, []);

    const sendMessage = (message) => {
        if (socket) {
            socket.send(JSON.stringify(message));
        }
    };

    return (
        <WebSocketContext.Provider value={{ socket, messages, sendMessage }}>
            {children}
        </WebSocketContext.Provider>
    );
};
