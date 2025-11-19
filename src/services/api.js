const API_BASE_URL = 'http://localhost:3333/api';

async function request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    const config = {
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        },
        ...options,
    };

    const token = localStorage.getItem('token');
    if(token){
        config.headers['Authorization'] = `Bearer ${token}`;
    }

    try {
        const response = await fetch(url, config);
        const data =  await response.json();

        if(!response.ok){
            throw new Error(data.error || 'Erro na requisição');
        }

        return data;
    }catch(error){
        throw error;
    } 
}

export const authService = {
    async register(name, email, password){
        return request('/auth/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password}),
        });
    },

    async login(email, password) {
        return request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password}),
        });
    },
};

export default request;