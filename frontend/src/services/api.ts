import axios from 'axios';

const api = axios.create({
    baseURL: '/api/',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setupAxiosInterceptors = (getTokens: () => string | null, setTokens: (tokens: any) => void, logout: () => void) => {
    
    const tokenRefresh = async () => {
        try {
            const response = await api.post('/token/refresh/');
            const newAccessToken = response.data.access;
            
            setTokens({ access: newAccessToken });
            
            return newAccessToken;
        } catch (err) {
            logout();
            return Promise.reject(err);
        }
    };

    api.interceptors.request.use(
        (config) => {
            const accessToken = getTokens();
            if (accessToken) {
                config.headers['Authorization'] = `Bearer ${accessToken}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    api.interceptors.response.use(
        (response) => {
            return response;
        },
        async (error) => {
            const originalRequest = error.config;
            const isUnauthorized = error.response && error.response.status === 401;
            const isLoginOrRefresh = originalRequest.url.includes('/token/');
            const isRetry = originalRequest._retry;

            if (isUnauthorized && !isLoginOrRefresh && !isRetry) {
                originalRequest._retry = true;

                try {
                    const newAccessToken = await tokenRefresh();
                    
                    originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    
                    return api(originalRequest);
                } catch (e) {
                    return Promise.reject(error);
                }
            }

            return Promise.reject(error);
        }
    );
};

export default api;