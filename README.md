# PornIndex 🔥

**PornIndex** es una aplicación web hecha en React que permite organizar, visualizar y gestionar actrices favoritas del contenido para adultos. Ideal para tener todo centralizado, recordarlas fácilmente y no volver a perder de vista a ninguna joyita.

---

## 🚀 Funcionalidades actuales

- ✅ Actriz destacada (basada en la más visitada).
- ✅ Lista de actrices favoritas con imagen, descripción y link.
- ✅ Registro de cantidad de veces que se visita cada perfil.
- ✅ Almacenamiento persistente en `localStorage`.
- ✅ Interfaz moderna y fácil de usar.

---

## 🧱 Tecnologías usadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/) para entorno rápido de desarrollo
- JavaScript
- CSS

---

## 📁 Estructura del proyecto

```
src/
├── components/
│   ├── ActressCard.jsx         # Tarjeta individual
│   └── FeaturedActress.jsx     # Actriz destacada
├── data/
│   └── initialActresses.js     # Lista inicial de actrices
├── utils/
│   └── localStorage.js         # Funciones para guardar/cargar (próximamente)
├── App.jsx                     # Lógica principal
├── main.jsx                    # Entrada de React
└── index.css                   # Estilos base
```

---

## 💡 Funcionalidades próximas

- [ ] Buscador por nombre o especialidad  
- [ ] Agregar nuevas actrices desde formulario  
- [ ] Sección “sin nombre” para guardar pistas de actrices misteriosas  
- [ ] Ranking histórico mensual (favorita del mes)  
- [ ] Modo oculto (camuflado visual para NSFW)

---

## 🛠️ Cómo correr el proyecto

```bash
npm install
npm run dev
```

Luego abrí el navegador en la URL que te indique la terminal (usualmente `http://localhost:5173`)

---

## 📦 Notas

- Las visitas se guardan automáticamente en el navegador (no requiere backend).
- Las imágenes pueden ser URLs o locales si se descarga el contenido.
- El proyecto puede crecer con nuevas secciones tipo "historial", "colección", o favoritos por época.

---

## 🙌 Autor

Marcelo Yrala
Edición: Junio 2025
