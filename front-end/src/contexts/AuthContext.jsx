import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children}) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect (() => {
        const token = localStorage.getItem('token');
        const userdata = localStorage.getItem('user');

        if(token && userdata){
            try {
                setUser(JSON.parse(userdata));
            }catch(err){
                console.error('Erro ao recuperar dados do usuário:', err);
                localStorage.removeItem('token');
                localStorage.removeItem('user');
            }
        }
        setLoading(false);
    }, []);


    const login = async (email, password) => {
        try {
            setError(null);
            setLoading(true);

            const response = await authService.login(email, password);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            setUser(response.user);
            setLoading(false);

            return { success: true, message: response.message };
        }catch(err){
            const errorMessage = err.message || 'Erro ao fazer login. Tente novamente.';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    const register = async (name, email, password) => {
        try {
            setError(null);
            setLoading(true);

            const response = await authService.register(name, email, password);

            localStorage.setItem('token', response.token);
            localStorage.setItem('user', JSON.stringify(response.user));

            setUser(response.user);
            setLoading(false);

            return { success: true, message: response.message };
        }catch(err){
            const errorMessage = err.message || 'Erro ao criar conta. Tente novamente.';
            setError(errorMessage);
            setLoading(false);
            return { success: false, error: errorMessage };
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user && !!localStorage.getItem('token');
    };

    const value = {
        user, 
        loading,
        error,
        login,
        register,
        logout,
        isAuthenticated,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}

