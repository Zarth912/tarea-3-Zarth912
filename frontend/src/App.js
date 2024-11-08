// src/App.js
import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import "./App.css";
import { fetchResponseFromAPI } from "./api/apiService";

function App() {
    const [messages, setMessages] = useState([]);

    const sendMessage = async (text) => {
        const newMessage = { text, sender: "user" };
        setMessages([...messages, newMessage, { text: "Cargando respuesta...", sender: "loading" }]);

        try {
            const response = await fetchResponseFromAPI(text);
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1), // Elimina "Cargando respuesta..."
                { text: response.response, sender: "bot" }
            ]);
        } catch (error) {
            setMessages((prevMessages) => [
                ...prevMessages.slice(0, -1),
                { text: "Error al obtener respuesta", sender: "bot" }
            ]);
        }
    };

    return (
        <div className="App">
            <ChatBox messages={messages} onSendMessage={sendMessage} />
        </div>
    );
}

export default App;