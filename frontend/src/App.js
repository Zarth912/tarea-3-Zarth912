// src/App.js
import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import "./App.css";
import { fetchResponseFromAPI } from "./api/apiService";

function App() {
    const [messages, setMessages] = useState([]);

    // Lista de películas definida directamente en el frontend
    const peliculas = [
        "9",
        "Assassins",
        "Carrie",
        "Dogma",
        "Dune",
        "Election",
        "Hannibal",
        "Juno",
        "Paranorman",
        "Poor Things"
    ];

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
            <h1>Explorador de Guiones de Películas</h1>
            <div className="peliculas-list">
                <h2>Lista de Películas</h2>
                <ul>
                    {peliculas.map((pelicula, index) => (
                        <li key={index}>{pelicula}</li>
                    ))}
                </ul>
            </div>
            <ChatBox messages={messages} onSendMessage={sendMessage} />
        </div>
    );
}

export default App;