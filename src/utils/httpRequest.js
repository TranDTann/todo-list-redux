import axios from 'axios';

export const httpRequest = axios.create({
    baseURL: 'https://633583808aa85b7c5d1d00ce.mockapi.io/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
