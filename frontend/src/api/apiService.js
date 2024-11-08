// src/api/apiService.js
import axios from "axios";

export const fetchResponseFromAPI = async (text) => {
    const response = await axios.post("/query", { question: text });
    return response.data;
};