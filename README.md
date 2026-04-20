# 📰 Blog

Aplicación web tipo blog desarrollada como prueba técnica, que permite gestionar publicaciones (posts) mediante un CRUD completo.

---

## Demo

* 🌐 Frontend: https://TU-APP.vercel.app
* ⚙️ Backend: https://blog-x9jg.onrender.com

---

##  Descripción

Esta aplicación permite a los usuarios:

* Crear publicaciones
* Visualizar listado de posts
* Editar contenido existente
* Eliminar publicaciones
* Ver detalle completo de cada post

Además, incluye soporte de internacionalización (Español / Inglés) y una interfaz moderna enfocada en experiencia de usuario.

---

## 🛠️ Tecnologías utilizadas

### Frontend

* Next.js
* React
* Tailwind CSS

### Backend

* Node.js
* Express

### Otros

* Fetch API
* Git & GitHub
* Vercel (deploy frontend)
* Render (deploy backend)

---

##  Funcionalidades principales

*  CRUD completo de publicaciones
*  API REST estructurada
*  Rutas dinámicas (detalle por ID)
*  Internacionalización (ES / EN)
*  Manejo de estados (loading y errores)
*  Interfaz moderna y responsive

---

##  Arquitectura del proyecto

```
proyecto/
 ├── frontend/   # Aplicación Next.js
 └── backend/    # API REST con Express
```

Se implementó una arquitectura tipo monorepo, separando responsabilidades entre frontend y backend para mejorar la escalabilidad y mantenimiento.

---

##  Instalación y ejecución local

### 🔹 Backend

```bash
cd backend
npm install
npm run dev
```

Servidor en:

```
http://localhost:4000
```

---

### 🔹 Frontend

```bash
cd frontend
npm install
npm run dev
```

Aplicación en:

```
http://localhost:3000
```

---


##  Notas

* El backend está desplegado en un plan gratuito de Render, por lo que puede presentar un pequeño retraso inicial (cold start).
* No se implementó autenticación, ya que no era requerida en la prueba.


## 👨‍💻 Autor

Desarrollado por Andrés Tacuamán como prueba técnica para posición de desarrollador web.

---
