
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Chat() {
    const [message, setMessage] = useState(''); // Store the message being typed
    const [messages, setMessages] = useState([]); // Store all received messages
    const ws = useRef(null); // WebSocket reference
    const token = sessionStorage.getItem('token')
    const username = sessionStorage.getItem('username')
    const navigate = useNavigate()
    // Initialize WebSocket connection when component mounts
    useEffect(() => {
        console.log(token);

        ws.current = new WebSocket(`wss://${import.meta.env.VITE_API_URL}/chat?token=${token}`);

        ws.current.onopen = (s) => {
            console.log('Connected to WebSocket', s);

        };

        ws.current.onmessage = (event) => {
            const receivedMessage = JSON.parse(event.data);
            console.log(receivedMessage);
            setMessages((prevMessages) => [...prevMessages, { text: receivedMessage, from: 'server' }]);
        };

        ws.current.onerror = (error) => {
            console.error('WebSocket error:', error);
            // navigate('/')
        };

        ws.current.onclose = (event) => {
            console.log('Disconnected from WebSocket', event);
            // navigate('/')
        };

        return () => {
            if (ws.current) {
                ws.current.close();
            }
        };
    }, []);


    const sendMessage = () => {
        if (message.trim() !== '') {
            const messageObject = { username: username, message }; // Adjust username as needed
            ws.current.send(JSON.stringify(messageObject)); // Send the message through WebSocket
            setMessages((prevMessages) => [...prevMessages, { text: messageObject, from: 'user' }]); // Add message to list
            setMessage(''); // Clear the input after sending
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault(); // Prevent newline on Enter
            sendMessage(); // Send message when Enter is pressed
        }
    };

    const handleLogout = () => {
        // Clear the token from sessionStorage
        sessionStorage.clear();

        // Optionally, you can redirect the user to the login page or any other page
        navigate('/')
    };


    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <header className="bg-primary text-white p-4 shadow-lg flex justify-between items-center">
                <h1 className="text-xl font-semibold">ChatWave</h1>

                <button
                    className="btn btn-error"
                    onClick={handleLogout} // Call the logout function
                >
                    <svg fill="#000000"
                            width="24px"
                            height="24px" version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 198.715 198.715" xml:space="preserve">
                        <g>
                            <path d="M161.463,48.763c-2.929-2.929-7.677-2.929-10.607,0c-2.929,2.929-2.929,7.677,0,10.606
		c13.763,13.763,21.342,32.062,21.342,51.526c0,19.463-7.579,37.761-21.342,51.523c-14.203,14.204-32.857,21.305-51.516,21.303
		c-18.659-0.001-37.322-7.104-51.527-21.309c-28.405-28.405-28.402-74.625,0.005-103.032c2.929-2.929,2.929-7.678,0-10.606
		c-2.929-2.929-7.677-2.929-10.607,0C2.956,83.029,2.953,138.766,37.206,173.019c17.132,17.132,39.632,25.697,62.135,25.696
		c22.497-0.001,44.997-8.564,62.123-25.69c16.595-16.594,25.734-38.659,25.734-62.129C187.199,87.425,178.059,65.359,161.463,48.763
		z"/>
                            <path d="M99.332,97.164c4.143,0,7.5-3.358,7.5-7.5V7.5c0-4.142-3.357-7.5-7.5-7.5s-7.5,3.358-7.5,7.5v82.164
		C91.832,93.807,95.189,97.164,99.332,97.164z"/>
                        </g>
                    </svg>
                </button>
            </header>


            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-auto">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`chat ${msg.from === 'user' ? 'chat-end' : 'chat-start'}`}
                    >
                        <div className="chat-header">
                            {msg.text.username}
                            {/* <time className="text-xs opacity-50">2 hours ago</time> */}
                        </div>
                        <div className="chat-bubble">{msg.text.message}</div>
                    </div>
                ))}
            </div>

            {/* Input Area */}
            <div className="fixed left-0 bottom-0 w-full p-2 shadow-md bg-neutral">
                <div className="flex items-center space-x-4">
                    <textarea
                        placeholder="Type your message..."
                        className="w-full p-3 border rounded-lg focus:outline-none focus:border-blue-500 resize-none bg-gray-700 text-white"
                        rows="1"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress} // Handle Enter press
                    ></textarea>
                    <button
                        className="btn p-2 btn-primary text-white rounded-lg"
                        onClick={sendMessage}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="#ffffff"
                            width="24px"
                            height="24px"
                            viewBox="0 0 31.806 31.806"
                        >
                            <g>
                                <g>
                                    <path
                                        d="M1.286,12.465c-0.685,0.263-1.171,0.879-1.268,1.606c-0.096,0.728,0.213,1.449,0.806,1.88l6.492,4.724L30.374,2.534 
                        L9.985,22.621l8.875,6.458c0.564,0.41,1.293,0.533,1.964,0.33c0.67-0.204,1.204-0.713,1.444-1.368l9.494-25.986 
                        c0.096-0.264,0.028-0.559-0.172-0.756c-0.199-0.197-0.494-0.259-0.758-0.158L1.286,12.465z"
                                    />
                                    <path
                                        d="M5.774,22.246l0.055,0.301l1.26,6.889c0.094,0.512,0.436,0.941,0.912,1.148c0.476,0.206,1.025,0.162,1.461-0.119 
                        c1.755-1.132,4.047-2.634,3.985-2.722L5.774,22.246z"
                                    />
                                </g>
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}
