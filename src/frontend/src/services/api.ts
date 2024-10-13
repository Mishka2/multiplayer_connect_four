import axios from 'axios';

const API_BASE_URL = 'http://127.0.0.1:8000';

export const getData = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};

export const postData = async (endpoint: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
