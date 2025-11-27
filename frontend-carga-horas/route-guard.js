
(function() {
    'use strict';

    const ROUTES_CONFIG = {
        '/manager/home.html': 'MANAGER',
        '/manager/aprobar-horas.html': 'MANAGER',
        '/manager/aprobar_horas.html': 'MANAGER',
        '/manager/reportes/generar_reportes.html': 'MANAGER',
        '/manager/reportes/reporte_costos_por_proyecto.html': 'MANAGER',
        '/manager/reportes/reporte_horas_recurso_semanal.html': 'MANAGER',

        '/desarrollador/entrada_codigo.html': 'DEVELOPER',
        '/desarrollador/seleccion_proyectos.html': 'DEVELOPER',
        '/desarrollador/carga_horas.html': 'DEVELOPER',
        '/desarrollador/crear_entrada.html': 'DEVELOPER'
    };

    function isAuthenticated() {
        return sessionStorage.getItem('isAuthenticated') === 'true';
    }

    function getCurrentUser() {
        try {
            const userStr = sessionStorage.getItem('user');
            return userStr ? JSON.parse(userStr) : null;
        } catch (error) {
            console.error('Error al obtener usuario:', error);
            return null;
        }
    }

    function getRequiredRole() {
        const path = window.location.pathname;

        if (ROUTES_CONFIG[path]) {
            return ROUTES_CONFIG[path];
        }

        for (const route in ROUTES_CONFIG) {
            if (path.includes(route)) {
                return ROUTES_CONFIG[route];
            }
        }

        if (path.includes('/manager/')) {
            return 'MANAGER';
        } else if (path.includes('/desarrollador/')) {
            return 'DEVELOPER';
        }

        return null;
    }

    function checkAccess() {
        const requiredRole = getRequiredRole();

        if (!requiredRole) {
            return true;
        }

        if (!isAuthenticated()) {
            console.warn('Usuario no autenticado. Redirigiendo a login...');
            window.location.href = './login.html';
            return false;
        }

        const user = getCurrentUser();
        if (!user) {
            console.warn('No se pudo obtener información del usuario');
            sessionStorage.clear();
            window.location.href = './login.html';
            return false;
        }

        const userRole = user.role.toUpperCase();
        const normalizedRequired = requiredRole.toUpperCase();

        if (normalizedRequired === 'DEVELOPER' &&
            (userRole === 'DEVELOPER' || userRole === 'DESARROLLADOR')) {
            return true;
        }

        if (userRole !== normalizedRequired) {
            console.warn(`Acceso denegado. Se requiere rol: ${requiredRole}, usuario tiene: ${user.role}`);
            alert('No tienes permisos para acceder a esta página');

            // Redirigir a la página correspondiente según su rol
            if (userRole === 'MANAGER') {
                window.location.href = '/manager/home.html';
            } else if (userRole === 'DEVELOPER' || userRole === 'DESARROLLADOR') {
                window.location.href = `/desarrollador/seleccion_proyectos.html?id=${user.id}`;
            } else {
                window.location.href = './login.html';
            }

            return false;
        }

        return true;
    }

    function updateUserInfo() {
        const user = getCurrentUser();
        if (!user) return;

        const userNameElements = document.querySelectorAll('.user-name, .text-wrapper-2, .text-wrapper-5');
        userNameElements.forEach(element => {
            if (element && user.name) {
                element.textContent = user.name;
            }
        });
    }

    function addLogoutButton() {
        const userInfo = document.querySelector('.user-info');
        if (!userInfo) return;

        if (document.getElementById('logoutBtn')) return;

        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logoutBtn';
        logoutBtn.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
        <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"/>
      </svg>
    `;
        logoutBtn.style.cssText = `
      background: none;
      border: none;
      cursor: pointer;
      padding: 4px;
      display: flex;
      align-items: center;
      transition: opacity 0.2s;
    `;
        logoutBtn.title = 'Cerrar sesión';

        logoutBtn.addEventListener('click', () => {
            if (confirm('¿Desea cerrar sesión?')) {
                sessionStorage.clear();
                window.location.href = '../login.html';
            }
        });

        logoutBtn.addEventListener('mouseenter', () => {
            logoutBtn.style.opacity = '0.7';
        });

        logoutBtn.addEventListener('mouseleave', () => {
            logoutBtn.style.opacity = '1';
        });

        userInfo.appendChild(logoutBtn);
    }

    // Ejecutar verificación cuando el DOM esté listo
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            if (checkAccess()) {
                updateUserInfo();
                addLogoutButton();
            }
        });
    } else {
        if (checkAccess()) {
            updateUserInfo();
            addLogoutButton();
        }
    }

})();