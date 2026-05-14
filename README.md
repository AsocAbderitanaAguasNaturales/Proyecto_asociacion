# Proyecto Asociación - CRUD con Flask y MongoDB

## Descripción del Proyecto
Este proyecto es una plataforma integral para la gestión de una asociación. Permite la publicación de noticias, gestión de una galería fotográfica, interacción de miembros mediante comentarios y un panel administrativo completo para la gestión de usuarios y contenidos. El objetivo es digitalizar la comunicación y administración interna de la entidad.

## Tecnologías Usadas
- [Python](https://www.python.org/)
- [Flask](https://flask.palletsprojects.com/)
- [MongoDB Atlas](https://www.mongodb.com/)
- [React](https://reactjs.org/) (Frontend)
- [Vite](https://vitejs.dev/) (Build tool)
- [Cloudinary](https://cloudinary.com/) (Almacenamiento de imágenes)

## Estructura del Proyecto
```
/Proyecto_asociacion
├─ backend-flask/                # Carpeta del servidor (Python/Flask)
│  ├─ models/                    # Lógica de datos y modelos
│  │  └─ database.py             # Clase BaseDatos (MongoDB)
│  ├─ static/uploads/            # Almacenamiento local temporal
│  ├─ .env                       # Variables de entorno (Configuración)
│  ├─ main.py                    # Servidor Flask (Rutas y Lógica)
│  └─ requirements.txt           # Dependencias de Python
├─ frontend-react/               # Carpeta del cliente (React/Vite)
│  ├─ public/images/             # Imágenes estáticas y logos
│  ├─ src/                       # Código fuente React
│  │  ├─ assets/                 # Recursos (Fuentes, PDFs)
│  │  ├─ components/             # Componentes reutilizables (Nav, Footer, etc.)
│  │  ├─ pages/                  # Vistas principales
│  │  │  └─ panel_control/       # Vistas CRUD de administración
│  │  ├─ styles/                 # Archivos CSS de cada página
│  │  ├─ App.jsx                 # Enrutamiento y componente raíz
│  │  └─ main.jsx                # Punto de entrada de React
│  ├─ index.html                 # Plantilla base HTML
│  ├─ package.json               # Dependencias de Node.js
│  └─ vite.config.js            # Configuración de Vite
├─ documentos/                   # Documentación oficial del proyecto
│  ├─ Casos de Uso/              # Diagramas y Casos de Uso
│  ├─ manual_usuario.md          # Manual para usuarios (Bilingüe)
│  ├─ manual_tecnico.md          # Manual para desarrolladores (Bilingüe)
│  ├─ manual_despliegues.md      # Guía de despliegue (Bilingüe)
│  └─ Diagramas (Clases, ER)     # Diagramas técnicos en PNG
└─ README.md                     # Guía principal del proyecto
```


## Instalación del Entorno de Desarrollo
### Backend
```bash
# Entrar en la carpeta del backend
cd backend-flask
# Crear entorno virtual
python -m venv venv
# Activar entorno virtual
venv\Scripts\activate    # Windows
# Instalar dependencias
pip install -r requirements.txt
```

### Frontend
```bash
# Entrar en la carpeta del frontend
cd frontend-react
# Instalar dependencias
npm install
```

## Ejecución Local de la Aplicación
Para que la aplicación funcione completamente, deben iniciarse ambos servicios:

**1. Arrancar el Backend:**
```bash
# Dentro de backend-flask con el entorno activo
python main.py
```

**2. Arrancar el Frontend:**
```bash
# Dentro de frontend-react
npm run dev
```

## Créditos y Contacto
*   **Autor:** José Ignacio Barranco Ruiz.
*   **Documentación adicional:** Consultar la carpeta `documentos/` para manuales de usuario, técnicos y de despliegue.