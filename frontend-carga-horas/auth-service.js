
const API_BASE_URL = 'http://localhost:8080';

const AuthService = {

    async login(employeeCode, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    employeeCode,
                    password
                })
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Error en la autenticación');
            }

            const data = await response.json();

            // Guardar sesión
            this.saveSession(data);

            return data;
        } catch (error) {
            console.error('Error en login:', error);
            throw error;
        }
    },

    saveSession(userData) {
        const session = {
            id: userData.userId || userData.id,
            employeeCode: userData.employeeCode,
            name: userData.name,
            role: userData.role,
            token: userData.token,
            loginTime: new Date().toISOString()
        };

        sessionStorage.setItem('user', JSON.stringify(session));
        sessionStorage.setItem('isAuthenticated', 'true');

    },

    getCurrentUser() {
        try {
            const userStr = sessionStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
    },

    isAuthenticated() {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    },

    hasRole(role) {
        const user = this.getCurrentUser();
        return user && user.role === role;
    },

    logout() {
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('isAuthenticated');
        window.location.href = '/login.html';
    },

    getToken() {
        const user = this.getCurrentUser();
        return user ? user.token : null;
    },

    requireAuth(redirectUrl = '/login.html') {
        if (!this.isAuthenticated()) {
            window.location.href = redirectUrl;
            return false;
        }
        return true;
    },

    requireRole(requiredRole, redirectUrl = '/login.html') {
        if (!this.requireAuth(redirectUrl)) {
            return false;
        }

        if (!this.hasRole(requiredRole)) {
            alert('No tienes permisos para acceder a esta página');
            window.location.href = redirectUrl;
            return false;
        }

        return true;
    },

    async authenticatedFetch(url, options = {}) {
        const token = this.getToken();

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (response.status === 401) {
                this.logout();
                throw new Error('Sesión expirada. Por favor inicie sesión nuevamente.');
            }

            return response;
        } catch (error) {
            console.error('Error en request autenticado:', error);
            throw error;
        }
    }
};

if (typeof module !== 'undefined' && module.exports) {
    module.exports = AuthService;
}