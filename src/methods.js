import axios from 'axios';

// Método personalizado para manejar peticiones GET y POST
const axiosRequest = async (method, url, body = null, headers = {}) => {
    try {
        const config = {
            method: method,
            url: url,
            headers: {
                'Content-Type': 'application/json',
                ...headers, // Agregar los headers personalizados si se proporcionan
            },
            data: body, // Agregar el body si se proporciona
        };

        const response = await axios(config);
        console.log(`Response from ${method.toUpperCase()} ${url}:`, response);
        return response.data;
    } catch (error) {
        console.error(`Error during ${method} ${url}:`, error);
        throw error;
    }
};

export default axiosRequest;
