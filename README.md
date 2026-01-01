# 🔐 Portfolio - Angel Gabriel Ibarra | Security Analyst

Portfolio profesional optimizado con HTML, CSS y JavaScript vanilla. Diseñado con enfoque en rendimiento, accesibilidad y SEO.

## 🚀 Características Implementadas

### ✅ **Rendimiento**
- Preload de recursos críticos
- Lazy loading preparado para imágenes
- Throttling y debouncing en eventos
- RequestAnimationFrame para animaciones suaves
- Código optimizado y comentado

### ♿ **Accesibilidad**
- Skip navigation link
- ARIA labels y roles semánticos
- Focus visible mejorado
- Navegación por teclado
- Soporte para lectores de pantalla

### 🎨 **UX/UI Mejorado**
- Loading screen animado
- Scroll progress bar
- Cursor personalizado (desktop)
- Animaciones fade-in al scroll
- Efecto typing en título
- Modo oscuro/claro con persistencia
- Back to top button
- Menú móvil responsive con gestos

### 📊 **SEO & Analytics**
- Meta tags completos (Open Graph, Twitter Cards)
- Structured Data (JSON-LD)
- Sitemap.xml
- Robots.txt
- Google Analytics 4 integrado
- Event tracking implementado

### 🎯 **Funcionalidades**
- Descarga de CV con tracking
- Formulario de contacto (Formspree ready)
- Easter egg (Konami Code + Matrix effect)
- Navegación suave entre secciones
- Detección automática de sección activa
- Theme toggle con LocalStorage

### 🛡️ **Seguridad**
- Content Security Policy headers preparados
- Validación de formularios
- Links externos con `rel="noopener noreferrer"`

## 📁 Estructura de Archivos

```
portfolio/
├── index.html              # Estructura principal
├── css/
│   └── styles.css          # Estilos completos organizados
├── js/
│   └── main.js             # JavaScript con todas las funcionalidades
├── assets/
│   ├── cv/
│   │   └── CV_Angel_Gabriel_Ibarra.pdf
│   ├── images/
│   │   ├── favicon.ico
│   │   ├── og-image.jpg    # 1200x630px para redes sociales
│   │   ├── icon-192x192.png
│   │   └── icon-512x512.png
│   └── fonts/              # (opcional)
├── sitemap.xml
├── robots.txt
├── manifest.json           # PWA manifest
└── README.md
```

## 🔧 Configuración Necesaria

### 1. **Google Analytics**
Reemplaza `G-XXXXXXXXXX` en `index.html` con tu ID real de Google Analytics 4.

```html
<!-- Línea 50 en index.html -->
gtag('config', 'G-TU_ID_REAL');
```

### 2. **Formspree (Formulario de Contacto)**
1. Regístrate en [Formspree.io](https://formspree.io/)
2. Crea un nuevo formulario
3. Reemplaza `YOUR_FORM_ID` en el HTML:

```html
<!-- Línea ~490 en index.html -->
<form action="https://formspree.io/f/TU_FORM_ID" method="POST">
```

### 3. **Imágenes Requeridas**
Crea y agrega estas imágenes en `/assets/images/`:

- `favicon.ico` - 32x32px o 16x16px
- `og-image.jpg` - 1200x630px (para redes sociales)
- `icon-192x192.png` - 192x192px (PWA)
- `icon-512x512.png` - 512x512px (PWA)
- `apple-touch-icon.png` - 180x180px

### 4. **CV en PDF**
Coloca tu CV en `/assets/cv/CV_Angel_Gabriel_Ibarra.pdf`

### 5. **URLs Personales**
Actualiza todos los enlaces con tus redes sociales reales:

- LinkedIn: Busca `https://linkedin.com/in/angelibarra`
- GitHub: Busca `https://github.com/angelibarra`
- Email: Busca `ibarragomezangelgabriel@gmail.com`

## 🌐 Despliegue

### **Opción 1: GitHub Pages**
1. Sube el proyecto a un repositorio de GitHub
2. Ve a Settings > Pages
3. Selecciona la rama `main` y carpeta `/root`
4. Tu sitio estará en `https://tu-usuario.github.io/portfolio`

### **Opción 2: Netlify**
1. Arrastra la carpeta del proyecto a [Netlify Drop](https://app.netlify.com/drop)
2. Automáticamente se desplegará
3. Obtendrás un dominio `.netlify.app` gratuito

### **Opción 3: Vercel**
```bash
npm i -g vercel
vercel
```

### **Opción 4: Hosting tradicional**
Sube todos los archivos por FTP a tu hosting.

## ⚡ Optimización Post-Despliegue

### **Minificar archivos**
```bash
# CSS
npx clean-css-cli -o css/styles.min.css css/styles.css

# JavaScript
npx terser js/main.js -o js/main.min.js -c -m
```

Luego actualiza las referencias en `index.html`:
```html
<link rel="stylesheet" href="css/styles.min.css">
<script src="js/main.min.js"></script>
```

### **Comprimir imágenes**
Usa herramientas como:
- [TinyPNG](https://tinypng.com/)
- [Squoosh](https://squoosh.app/)
- ImageOptim (Mac)

## 🧪 Testing

### **Lighthouse Audit**
1. Abre Chrome DevTools (F12)
2. Ve a la pestaña "Lighthouse"
3. Ejecuta audit para Performance, Accessibility, Best Practices, SEO
4. **Objetivo**: 90+ en todas las categorías

### **Accesibilidad**
- [WAVE Web Accessibility Tool](https://wave.webaim.org/)
- [axe DevTools](https://www.deque.com/axe/devtools/)

### **Responsive Design**
Prueba en diferentes dispositivos:
- Mobile: 375px, 414px
- Tablet: 768px, 1024px
- Desktop: 1280px, 1440px, 1920px

## 📝 Personalización

### **Colores**
Busca y reemplaza en `styles.css`:
- `#06b6d4` - Cyan (color principal)
- `#3b82f6` - Blue
- `#020617` - Dark background

### **Fuentes**
Agrega Google Fonts en el `<head>`:
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;900&display=swap" rel="stylesheet">
```

Actualiza `font-family` en CSS.

### **Contenido**
- Secciones: Edita directamente el HTML
- Datos personales: Busca "GABRIEL IBARRA" y reemplaza
- Proyectos: Agrega/elimina en la sección `#proyectos`

## 🐛 Troubleshooting

**Los iconos no se muestran:**
- Verifica que Feather Icons CDN esté cargando
- Asegúrate de llamar `feather.replace()` después de cambios dinámicos

**El formulario no funciona:**
- Verifica tu Form ID de Formspree
- Revisa la consola del navegador para errores

**Analytics no registra eventos:**
- Confirma que tu Google Analytics ID esté correctamente configurado
- Espera 24-48 horas para ver datos en GA4

## 📞 Contacto

**Angel Gabriel Ibarra Gomez**
- 📧 Email: ibarragomezangelgabriel@gmail.com
- 💼 LinkedIn: [linkedin.com/in/angelibarra](https://linkedin.com/in/angelibarra)
- 🐱 GitHub: [github.com/angelibarra](https://github.com/angelibarra)

---

## 📄 Licencia

Este proyecto es de uso personal. Si deseas usar la estructura, por favor da crédito al autor original.

**© 2025 Angel Gabriel Ibarra Gomez**