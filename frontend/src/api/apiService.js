// src/api/apiService.js
import axios from "axios";

export const fetchResponseFromAPI = async (text) => {
    const response = await axios.post("https://tarea-3-zarth912.onrender.com/query", { question: text });
    return response.data;
};