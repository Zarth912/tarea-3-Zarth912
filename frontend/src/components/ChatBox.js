// src/components/ChatBox.js
import React, { useState } from "react";
import Message from "./Message";
import "./ChatBox.css";

function ChatBox({ messages, onSendMessage }) {
    const [inputText, setInputText] = useState("");

    const handleSend = () => {
        if (inputText.trim() !== "") {
            onSendMessage(inputText);
            setInputText("");
        }
    };

    return (
        <div className="chat-box">
            <div className="messages">
                {messages.map((msg, index) => (
                    <Message key={index} text={msg.text} sender={msg.sender} />
                ))}
            </div>
            <div className="input-area">
                <input
                    type="text"
                    placeholder="Escribe tu consulta..."
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                />
                <button onClick={handleSend}>Enviar</button>
            </div>
        </div>
    );
}

export default ChatBox;