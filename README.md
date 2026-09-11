# Portafolio Profesional — Alonso Contreras

Sitio personal de una sola página (single page) que presenta mi perfil como estudiante de
Desarrollo Full-Stack y Cloud Computing en Duoc UC. Desarrollado para la Evaluación Parcial N°1
de DSY1104 (Desarrollo Fullstack II).

## Demo
Enlace al sitio desplegado: *(agregar aquí una vez publicado en GitHub Pages / Netlify / Vercel)*

## Estructura del proyecto
```
portafolio/
├── index.html
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── assets/          (imágenes/recursos, si se agregan)
└── README.md
```

## Secciones
- **Inicio** — presentación y llamada a la acción.
- **Sobre mí** — resumen de mi formación y áreas de interés.
- **Habilidades** — backend/cloud, datos, frontend y herramientas.
- **Proyectos** — EduCore, DOOR'S y el proyecto de diseño de microservicios (JVY0101).
- **Contacto** — formulario con validación en JavaScript.

## Tecnologías
- HTML5 semántico
- CSS3 (Grid y Flexbox, diseño responsive con media queries)
- JavaScript (menú móvil y validación de formulario, sin librerías externas)

## Cómo ejecutarlo localmente
No requiere instalación. Basta con abrir `index.html` en el navegador, o servirlo con
cualquier servidor estático, por ejemplo:
```bash
python3 -m http.server 8000
```
y visitar `http://localhost:8000`.

## Despliegue
Pensado para publicarse en GitHub Pages:
1. Subir el proyecto a un repositorio público de GitHub.
2. En **Settings → Pages**, seleccionar la rama principal como fuente.
3. GitHub entrega una URL pública (`https://<usuario>.github.io/<repo>/`).

## Estado
Versión inicial (Evaluación Parcial N°1). Pendiente: fotografía de perfil real y conexión
del formulario de contacto a un servicio de envío de correo.
