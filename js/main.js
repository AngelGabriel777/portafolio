// Datos de la aplicación
const APP_DATA = {
    skills: [
        { name: "Análisis de Vulnerabilidades", level: 85, color: "from-cyan-500 to-blue-500" },
        { name: "Redes TCP/IP & Control Acceso", level: 90, color: "from-blue-500 to-indigo-600" },
        { name: "Hardening de Sistemas (Linux)", level: 88, color: "from-purple-500 to-rose-500" },
        { name: "Respuesta a Incidentes", level: 80, color: "from-emerald-500 to-teal-500" },
    ],
    
    projects: [
        {
            title: "Laboratorio Servidores Seguros",
            subtitle: "UBUNTU SERVER OPS",
            desc: "Configuración integral de servidores DNS, DHCP, FTP, SFTP y SSH con políticas de seguridad, hardening y gestión de claves SSH vía PuTTY.",
            tech: ["Linux", "SSH", "Hardening", "PuTTY"],
            icon: "terminal"
        },
        {
            title: "Automatización con IA & n8n",
            subtitle: "WHATSAPP CLOUD API",
            desc: "Flujo automatizado para gestión de pedidos. Integración con Supabase para órdenes en tiempo real. Reducción del 30% en tiempos de atención.",
            tech: ["n8n", "Supabase", "JS", "Cloud API"],
            icon: "message-square"
        },
        {
            title: "Plataforma Restpuntos",
            subtitle: "GEOLOCALIZACIÓN & SQL",
            desc: "Sistema de fidelización para restaurantes con gestión de transacciones en tiempo real y buscador mediante geoposicionamiento.",
            tech: ["React", "PostgreSQL", "Supabase"],
            icon: "map-pin"
        }
    ],
    
    certifications: [
        { title: "Certified in Cybersecurity (CC)", org: "(ISC)²", year: "2025", icon: "shield" },
        { title: "Technical Intro to Cybersecurity 1.0", org: "Fortinet", year: "2025", icon: "network" },
        { title: "Introduction to the Threat Landscape 2.0", org: "Fortinet", year: "2025", icon: "lock" },
        { title: "Bootcamp en Programación", org: "MinTIC & ANDES", year: "2025", icon: "terminal" },
        { title: "Crea Agentes de IA Sin Programar", org: "Udemy n8n", year: "2024", icon: "cpu" },
        { title: "Fundamentos de Python", org: "Platzi", year: "2023", icon: "code" }
    ]
};

// TU CONFIGURACIÓN PERSONAL - ¡ACTUALIZA ESTOS DATOS!
const APP_CONFIG = {
    // TU INFORMACIÓN PERSONAL
    personalInfo: {
        name: "Gabriel Ibarra",
        email: "ibarragomezangelgabriel@gmail.com", // Tu email real
        phone: "+57 3108886235", // Tu número con código de país
        location: "Cúcuta, Colombia",
        title: "Security Analyst"
    },
    
    // TUS REDES SOCIALES - ¡ACTUALIZA CON TUS ENLACES REALES!
    socialLinks: {
        linkedin: "https://www.linkedin.com/in/angel-gabriel-ibarra-gomez-82694526b/",
        github: "https://github.com/AngelGabriel777",
        whatsapp: "https://wa.me/573108886235", // Reemplaza con tu número
        telegram: "https://t.me/tu-usuario-telegram", // Opcional
        portfolio: "https://tu-portafolio.com" // Si tienes
    },
    
    // TU CV
    cv: {
        // OPCIÓN 1: Enlace directo a tu CV en Google Drive (RECOMENDADO)
        googleDrive: "https://drive.google.com/file/d/TU_ID_DE_DRIVE/view",
        
        // OPCIÓN 2: Archivo local (si lo subes a tu sitio web)
        localFile: "assets/cv/Angel_ibarra_CV_Ciberr.pdf" // Si tienes el archivo
    }
};

// Estado de la aplicación
const state = {
    mousePos: { x: 0, y: 0 },
    activeSection: 'inicio',
    isLoaded: false,
    isMenuOpen: false,
    rafId: null
};

// Elementos del DOM
const DOM = {
    cyberGrid: document.querySelector('.cyber-grid'),
    cyberGlow: document.querySelector('.cyber-glow'),
    navLinks: document.querySelectorAll('.nav-link'),
    mobileMenu: document.getElementById('mobile-menu'),
    mobileMenuBtn: document.getElementById('mobile-menu-btn'),
    closeMenuBtn: document.getElementById('close-menu-btn'),
    mobileLinks: document.querySelectorAll('.mobile-link'),
    skillsContainer: document.getElementById('skills-container'),
    projectsGrid: document.getElementById('projects-grid'),
    certificationsGrid: document.getElementById('certifications-grid'),
    body: document.body,
    mainNav: document.getElementById('main-nav')
};

/***************************************************************
 * FUNCIONALIDADES DE CONTACTO SIMPLIFICADAS
 * Todo funciona con un solo clic
 ***************************************************************/

function setupContactFunctionality() {
    console.log('Configurando funcionalidades de contacto simplificadas...');
    
    // 1. BOTÓN DE DESCARGAR CV - SIMPLE Y DIRECTO
    const downloadCvBtn = document.getElementById('download-cv-btn');
    if (downloadCvBtn) {
        downloadCvBtn.onclick = function(e) {
            e.preventDefault();
            downloadCV();
        };
    }
    
    // 2. BOTÓN "CONTÁCTAME AHORA" - ABRE EMAIL DIRECTO
    const contactBtn = document.getElementById('contact-btn');
    if (contactBtn) {
        contactBtn.onclick = function(e) {
            e.preventDefault();
            sendEmail();
        };
    }
    
    // 3. BOTÓN LINKEDIN - ABRE TU PERFIL
    const linkedinBtn = document.getElementById('linkedin-btn');
    if (linkedinBtn) {
        linkedinBtn.onclick = function(e) {
            e.preventDefault();
            openLinkedIn();
        };
    }
    
    // 4. BOTONES SOCIALES DEL FOOTER
    setupSocialButtons();
    
    // 5. ACTUALIZAR TODOS LOS ENLACES DE LA PÁGINA CON TU INFO REAL
    updateAllLinks();
}

// FUNCIÓN 1: DESCARGAR CV - Muy simple
function downloadCV() {
    console.log('Descargando CV...');
    
    // Opción 1: Si tienes Google Drive (RECOMENDADO)
    if (APP_CONFIG.cv.googleDrive) {
        window.open(APP_CONFIG.cv.googleDrive, '_blank');
        showMessage('✅ Abriendo CV en Google Drive...');
        return;
    }
    
    // Opción 2: Si tienes archivo local
    if (APP_CONFIG.cv.localFile) {
        const link = document.createElement('a');
        link.href = APP_CONFIG.cv.localFile;
        link.download = 'CV_Gabriel_Ibarra.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showMessage('✅ CV descargándose...');
        return;
    }
    
    // Si no hay CV configurado
    showMessage('⚠️ CV no disponible temporalmente');
}

// FUNCIÓN 2: ENVIAR EMAIL - Abre Gmail/Outlook directamente
function sendEmail() {
    const subject = encodeURIComponent('Contacto desde tu portafolio web');
    const body = encodeURIComponent(`Hola Gabriel,\n\nVi tu portafolio y me gustaría contactarte.\n\nSaludos,`);
    
    // Abre el cliente de email predeterminado
    window.location.href = `mailto:${APP_CONFIG.personalInfo.email}?subject=${subject}&body=${body}`;
    
    showMessage('📧 Abriendo tu cliente de email...');
}

// FUNCIÓN 3: ABRIR LINKEDIN
function openLinkedIn() {
    if (APP_CONFIG.socialLinks.linkedin) {
        window.open(APP_CONFIG.socialLinks.linkedin, '_blank');
        showMessage('🔗 Abriendo LinkedIn...');
    } else {
        showMessage('⚠️ Enlace de LinkedIn no configurado');
    }
}

// FUNCIÓN 4: CONFIGURAR TODOS LOS BOTONES SOCIALES
function setupSocialButtons() {
    // Email
    const emailBtn = document.getElementById('email-btn');
    if (emailBtn) {
        emailBtn.onclick = function(e) {
            e.preventDefault();
            window.location.href = `mailto:${APP_CONFIG.personalInfo.email}`;
            showMessage('📧 Abriendo email...');
        };
    }
    
    // LinkedIn Footer
    const linkedinFooterBtn = document.getElementById('linkedin-footer-btn');
    if (linkedinFooterBtn) {
        linkedinFooterBtn.onclick = function(e) {
            e.preventDefault();
            openLinkedIn();
        };
    }
    
    // GitHub
    const githubBtn = document.getElementById('github-btn');
    if (githubBtn) {
        githubBtn.onclick = function(e) {
            e.preventDefault();
            if (APP_CONFIG.socialLinks.github) {
                window.open(APP_CONFIG.socialLinks.github, '_blank');
                showMessage('💻 Abriendo GitHub...');
            } else {
                showMessage('⚠️ Enlace de GitHub no configurado');
            }
        };
    }
    
    // AGREGAR BOTÓN DE WHATSAPP (si no existe, lo creamos)
    addWhatsAppButton();
}

// FUNCIÓN 5: AGREGAR BOTÓN DE WHATSAPP FLOTANTE
function addWhatsAppButton() {
    // Crear botón flotante de WhatsApp
    const whatsappBtn = document.createElement('a');
    whatsappBtn.href = APP_CONFIG.socialLinks.whatsapp || '#';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.target = '_blank';
    whatsappBtn.title = 'Chat en WhatsApp';
    whatsappBtn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2a10 10 0 0 1 8.36 15.44l1.64 1.64a1 1 0 0 1-.22 1.54 1 1 0 0 1-1.54-.22l-1.64-1.64A10 10 0 1 1 12 2zm0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16zm3.41 4.59a1 1 0 0 1 1.41 0 5.9 5.9 0 0 1 0 8.36 1 1 0 0 1-1.41-1.41 3.9 3.9 0 0 0 0-5.54 1 1 0 0 1 0-1.41zM8.59 8.59a1 1 0 0 1 0 1.41 3.9 3.9 0 0 0 0 5.54 1 1 0 0 1-1.41 1.41 5.9 5.9 0 0 1 0-8.36 1 1 0 0 1 1.41 0z"/>
        </svg>
    `;
    
    document.body.appendChild(whatsappBtn);
    
    // Agregar estilos para el botón flotante
    const styles = document.createElement('style');
    styles.textContent = `
        .whatsapp-float {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            background-color: #25D366;
            color: white;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            text-decoration: none;
            box-shadow: 0 4px 12px rgba(37, 211, 102, 0.4);
            z-index: 1000;
            transition: all 0.3s;
        }
        
        .whatsapp-float:hover {
            transform: scale(1.1);
            box-shadow: 0 6px 16px rgba(37, 211, 102, 0.6);
        }
        
        .whatsapp-float svg {
            width: 30px;
            height: 30px;
        }
    `;
    document.head.appendChild(styles);
    
    // Agregar evento
    whatsappBtn.onclick = function(e) {
        if (!APP_CONFIG.socialLinks.whatsapp || APP_CONFIG.socialLinks.whatsapp === '#') {
            e.preventDefault();
            showMessage('⚠️ Enlace de WhatsApp no configurado');
        }
    };
}

// FUNCIÓN 6: ACTUALIZAR TODOS LOS ENLACES DE LA PÁGINA
function updateAllLinks() {
    // Actualizar emails
    document.querySelectorAll('a[href*="mailto:"]').forEach(link => {
        if (link.href.includes('email@domain.com')) {
            link.href = `mailto:${APP_CONFIG.personalInfo.email}`;
        }
    });
    
    // Actualizar LinkedIn
    document.querySelectorAll('a[href*="linkedin.com"]').forEach(link => {
        if (!link.href.includes('/in/')) {
            link.href = APP_CONFIG.socialLinks.linkedin;
        }
    });
    
    // Actualizar GitHub
    document.querySelectorAll('a[href*="github.com"]').forEach(link => {
        link.href = APP_CONFIG.socialLinks.github;
    });
    
    // Actualizar textos con tu nombre y título
    document.querySelectorAll('.logo-name').forEach(el => {
        if (el.textContent.includes('GABRIEL IBARRA')) {
            el.textContent = APP_CONFIG.personalInfo.name.toUpperCase();
        }
    });
    
    document.querySelectorAll('.logo-title').forEach(el => {
        if (el.textContent.includes('Security Analyst')) {
            el.textContent = APP_CONFIG.personalInfo.title;
        }
    });
}

// FUNCIÓN 7: MOSTRAR MENSAJES SIMPLES (sin modales complicados)
function showMessage(text) {
    // Crear mensaje temporal
    const message = document.createElement('div');
    message.className = 'simple-message';
    message.textContent = text;
    message.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: rgba(6, 182, 212, 0.9);
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        font-family: 'Courier New', monospace;
        font-size: 14px;
        z-index: 10000;
        animation: slideIn 0.3s ease-out;
    `;
    
    // Agregar animación CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(message);
    
    // Eliminar después de 3 segundos
    setTimeout(() => {
        message.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => {
            if (message.parentNode) {
                message.parentNode.removeChild(message);
            }
        }, 300);
    }, 3000);
}

// FUNCIÓN 8: AGREGAR BOTONES DE CONTACTO RÁPIDO EN EL HERO
function addQuickContactButtons() {
    // Buscar la sección hero-actions
    const heroActions = document.querySelector('.hero-actions');
    if (!heroActions) return;
    
    // Crear contenedor para botones rápidos
    const quickContact = document.createElement('div');
    quickContact.className = 'quick-contact';
    quickContact.style.cssText = `
        display: flex;
        gap: 10px;
        margin-top: 20px;
        flex-wrap: wrap;
    `;
    
    // Botón de WhatsApp
    if (APP_CONFIG.socialLinks.whatsapp) {
        const whatsappBtn = document.createElement('button');
        whatsappBtn.className = 'quick-btn whatsapp';
        whatsappBtn.innerHTML = '<i data-lucide="message-circle"></i> WhatsApp';
        whatsappBtn.onclick = () => {
            window.open(APP_CONFIG.socialLinks.whatsapp, '_blank');
            showMessage('💬 Abriendo WhatsApp...');
        };
        quickContact.appendChild(whatsappBtn);
    }
    
    // Botón de Llamar (solo en móviles)
    if (APP_CONFIG.personalInfo.phone) {
        const callBtn = document.createElement('button');
        callBtn.className = 'quick-btn phone';
        callBtn.innerHTML = '<i data-lucide="phone"></i> Llamar';
        callBtn.onclick = () => {
            window.location.href = `tel:${APP_CONFIG.personalInfo.phone}`;
            showMessage('📞 Marcando...');
        };
        quickContact.appendChild(callBtn);
    }
    
    // Botón de Telegram (si tienes)
    if (APP_CONFIG.socialLinks.telegram) {
        const telegramBtn = document.createElement('button');
        telegramBtn.className = 'quick-btn telegram';
        telegramBtn.innerHTML = '<i data-lucide="send"></i> Telegram';
        telegramBtn.onclick = () => {
            window.open(APP_CONFIG.socialLinks.telegram, '_blank');
            showMessage('✈️ Abriendo Telegram...');
        };
        quickContact.appendChild(telegramBtn);
    }
    
    heroActions.appendChild(quickContact);
    
    // Agregar estilos CSS
    const quickStyles = document.createElement('style');
    quickStyles.textContent = `
        .quick-btn {
            padding: 10px 15px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            background: rgba(255, 255, 255, 0.05);
            color: white;
            border-radius: 8px;
            font-size: 12px;
            font-family: 'Courier New', monospace;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 8px;
            transition: all 0.3s;
        }
        
        .quick-btn:hover {
            transform: translateY(-2px);
            background: rgba(255, 255, 255, 0.1);
        }
        
        .quick-btn.whatsapp:hover {
            background: rgba(37, 211, 102, 0.2);
            border-color: #25D366;
        }
        
        .quick-btn.phone:hover {
            background: rgba(6, 182, 212, 0.2);
            border-color: #06b6d4;
        }
        
        .quick-btn.telegram:hover {
            background: rgba(0, 136, 204, 0.2);
            border-color: #0088cc;
        }
        
        .quick-btn i {
            width: 16px;
            height: 16px;
        }
    `;
    document.head.appendChild(quickStyles);
    
    // Actualizar iconos
    setTimeout(() => lucide.createIcons(), 100);
}

/***************************************************************
 * FUNCIONES ORIGINALES DE LA APLICACIÓN
 ***************************************************************/

// Inicializar la aplicación
// Agrega estas funciones al archivo main.js:

// FUNCIÓN PARA MANEJAR EL FORMULARIO DE CONTACTO
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    const directEmailBtn = document.getElementById('direct-email-btn');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            sendContactForm();
        });
    }
    
    if (directEmailBtn) {
        directEmailBtn.addEventListener('click', function() {
            openDirectEmail();
        });
    }
}

// ENVIAR FORMULARIO DE CONTACTO
function sendContactForm() {
    const name = document.getElementById('contact-name').value;
    const email = document.getElementById('contact-email').value;
    const message = document.getElementById('contact-message').value;
    
    if (!name || !email || !message) {
        showMessage('⚠️ Por favor, completa todos los campos', 'error');
        return;
    }
    
    const subject = encodeURIComponent(`Contacto de ${name} desde tu portafolio`);
    const body = encodeURIComponent(`Hola Gabriel,\n\nSoy ${name} (${email}).\n\n${message}\n\nSaludos.`);
    
    window.location.href = `mailto:${APP_CONFIG.personalInfo.email}?subject=${subject}&body=${body}`;
    
    showMessage('📧 Abriendo email...');
    
    // Limpiar formulario
    setTimeout(() => {
        document.getElementById('contact-form').reset();
    }, 1000);
}

// EMAIL DIRECTO
function openDirectEmail() {
    window.location.href = `mailto:${APP_CONFIG.personalInfo.email}`;
    showMessage('📧 Abriendo cliente de email...');
}

// DESCARGAR CV - VERSIÓN MEJORADA
function downloadCV() {
    console.log('Descargando CV...');
    
    // Si tenemos archivo local
    if (APP_CONFIG.cv.localFile) {
        // Verificar si el archivo existe
        checkFileExists(APP_CONFIG.cv.localFile, function(exists) {
            if (exists) {
                // Descargar archivo
                const link = document.createElement('a');
                link.href = APP_CONFIG.cv.localFile;
                link.download = 'Angel_Ibarra_CV_Ciberseguridad.pdf';
                
                // Método para forzar descarga
                link.target = '_blank';
                document.body.appendChild(link);
                
                // Intentar descarga directa
                if (link.download !== undefined) {
                    // Navegadores modernos
                    link.click();
                } else {
                    // Navegadores antiguos
                    window.open(APP_CONFIG.cv.localFile, '_blank');
                }
                
                document.body.removeChild(link);
                showMessage('✅ Descargando CV...');
            } else {
                // Si no existe el archivo, mostrar opciones
                showCVOptions();
            }
        });
        return;
    }
    
    // Si tenemos Google Drive
    if (APP_CONFIG.cv.googleDrive) {
        window.open(APP_CONFIG.cv.googleDrive, '_blank');
        showMessage('✅ Abriendo CV en Google Drive...');
        return;
    }
    
    // Si no hay opciones
    showCVOptions();
}

// VERIFICAR SI EXISTE EL ARCHIVO
function checkFileExists(url, callback) {
    fetch(url, { method: 'HEAD' })
        .then(response => {
            callback(response.ok);
        })
        .catch(() => {
            callback(false);
        });
}

// MOSTRAR OPCIONES DE CV
function showCVOptions() {
    showMessage(`
        ⚠️ CV no disponible para descarga directa.
        📧 Envíame un email para solicitarlo:
        ${APP_CONFIG.personalInfo.email}
    `);
}

// ACTUALIZAR LA FUNCIÓN init() PARA INCLUIR EL FORMULARIO
function init() {
    console.log('Inicializando aplicación web estática...');
    
    // 1. Cargar iconos
    lucide.createIcons();
    
    // 2. Cargar contenido
    loadSkills();
    loadProjects();
    loadCertifications();
    
    // 3. Configurar contacto SIMPLE
    setupContactFunctionality();
    
    // 4. Configurar formulario de contacto
    setupContactForm();
    
    // 5. Agregar botones de contacto rápido
    addQuickContactButtons();
    
    // 6. Configurar eventos
    setupEventListeners();
    
    // 7. Configurar Intersection Observer para las secciones
    setupIntersectionObserver();
    
    // 8. Animar barras de skills
    setTimeout(() => {
        animateSkillBars();
        state.isLoaded = true;
        document.body.classList.add('loaded');
    }, 100);
    
    // 9. Iniciar animación del fondo
    animateBackground();
}

// Cargar y renderizar skills
function loadSkills() {
    if (!DOM.skillsContainer) return;
    
    const skillsHTML = APP_DATA.skills.map((skill, index) => `
        <div class="skill-item">
            <div class="skill-header">
                <span class="skill-name">${skill.name}</span>
                <span class="skill-percent">${skill.level}%</span>
            </div>
            <div class="skill-bar">
                <div class="skill-progress" 
                     data-level="${skill.level}"
                     data-color="${skill.color}"
                     style="width: 0%">
                </div>
            </div>
        </div>
    `).join('');
    
    DOM.skillsContainer.innerHTML = skillsHTML;
}

// Animar barras de skills
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    skillBars.forEach((bar, index) => {
        const level = bar.getAttribute('data-level');
        const color = bar.getAttribute('data-color');
        
        // Mapear clases de color a gradientes CSS
        const gradientMap = {
            'from-cyan-500 to-blue-500': 'linear-gradient(to right, #06b6d4, #3b82f6)',
            'from-blue-500 to-indigo-600': 'linear-gradient(to right, #3b82f6, #4f46e5)',
            'from-purple-500 to-rose-500': 'linear-gradient(to right, #8b5cf6, #f43f5e)',
            'from-emerald-500 to-teal-500': 'linear-gradient(to right, #10b981, #0d9488)'
        };
        
        bar.style.background = gradientMap[color] || gradientMap['from-cyan-500 to-blue-500'];
        
        setTimeout(() => {
            bar.style.width = `${level}%`;
        }, index * 100);
    });
}

// Cargar y renderizar proyectos
function loadProjects() {
    if (!DOM.projectsGrid) return;
    
    const projectsHTML = APP_DATA.projects.map((project, index) => `
        <div class="project-card">
            <div class="project-content">
                <div class="project-header">
                    <div class="project-icon">
                        <i data-lucide="${project.icon}"></i>
                    </div>
                    <div class="project-dots">
                        <span class="project-dot"></span>
                        <span class="project-dot"></span>
                    </div>
                </div>
                <div class="project-info">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-subtitle">${project.subtitle}</p>
                </div>
                <p class="project-desc">${project.desc}</p>
                <div class="project-tech">
                    ${project.tech.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
    
    DOM.projectsGrid.innerHTML = projectsHTML;
    
    // Actualizar iconos después de renderizar
    setTimeout(() => lucide.createIcons(), 0);
}

// Cargar y renderizar certificaciones
function loadCertifications() {
    if (!DOM.certificationsGrid) return;
    
    // Mostrar solo las primeras 4 certificaciones
    const certs = APP_DATA.certifications.slice(0, 4);
    
    const certificationsHTML = certs.map(cert => `
        <div class="certification-card">
            <div class="certification-icon">
                <i data-lucide="${cert.icon}"></i>
            </div>
            <div class="certification-content">
                <h4 class="certification-title">${cert.title}</h4>
                <div class="certification-meta">
                    <span class="certification-org">${cert.org}</span>
                    <span class="certification-dot"></span>
                    <span class="certification-year">${cert.year}</span>
                </div>
            </div>
            <div class="certification-arrow">
                <i data-lucide="chevron-right"></i>
            </div>
        </div>
    `).join('');
    
    DOM.certificationsGrid.innerHTML = certificationsHTML;
    
    // Actualizar iconos después de renderizar
    setTimeout(() => lucide.createIcons(), 0);
}

// Configurar event listeners
function setupEventListeners() {
    // Movimiento del mouse para el efecto de fondo
    document.addEventListener('mousemove', handleMouseMove);
    
    // Navegación suave para enlaces internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Cerrar menú móvil si está abierto
                if (state.isMenuOpen) {
                    toggleMobileMenu();
                }
                
                // Scroll suave
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Botón de menú móvil
    if (DOM.mobileMenuBtn) {
        DOM.mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Botón de cerrar menú móvil
    if (DOM.closeMenuBtn) {
        DOM.closeMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // Enlaces del menú móvil
    DOM.mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (state.isMenuOpen) {
                toggleMobileMenu();
            }
        });
    });
    
    // Cambiar estilo del navbar al hacer scroll
    window.addEventListener('scroll', handleScroll);
}

// Manejar movimiento del mouse para efectos de fondo
function handleMouseMove(e) {
    if (state.rafId) {
        cancelAnimationFrame(state.rafId);
    }
    
    state.rafId = requestAnimationFrame(() => {
        state.mousePos = { x: e.clientX, y: e.clientY };
        updateBackground();
    });
}

// Actualizar efectos de fondo basados en la posición del mouse
function updateBackground() {
    if (DOM.cyberGrid && DOM.cyberGlow) {
        // Actualizar máscara del grid
        DOM.cyberGrid.style.maskImage = 
            `radial-gradient(circle 500px at ${state.mousePos.x}px ${state.mousePos.y}px, black, transparent)`;
        
        // Actualizar gradiente de glow
        DOM.cyberGlow.style.background = 
            `radial-gradient(1000px at ${state.mousePos.x}px ${state.mousePos.y}px, rgba(6, 182, 212, 0.15), transparent 80%)`;
    }
}

// Animación continua del fondo
function animateBackground() {
    requestAnimationFrame(() => {
        // Pequeña animación sutil para el grid
        if (DOM.cyberGrid) {
            const time = Date.now() * 0.001;
            const x = Math.sin(time * 0.5) * 50 + 50;
            const y = Math.cos(time * 0.3) * 50 + 50;
            
            DOM.cyberGrid.style.opacity = 0.03 + Math.sin(time * 0.2) * 0.02;
            DOM.cyberGrid.style.transform = `translate(${Math.sin(time * 0.1) * 2}px, ${Math.cos(time * 0.1) * 2}px)`;
        }
        
        animateBackground();
    });
}

// Configurar Intersection Observer para detectar sección activa
function setupIntersectionObserver() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                state.activeSection = entry.target.id;
                updateActiveNav();
            }
        });
    }, { threshold: 0.3 });
    
    sections.forEach(section => observer.observe(section));
    
    // Actualizar enlaces de navegación activos
    function updateActiveNav() {
        // Actualizar enlaces del navbar
        navLinks.forEach(link => {
            const section = link.getAttribute('data-section') || 
                           link.getAttribute('href')?.replace('#', '');
            
            if (section === state.activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
        
        // Actualizar enlaces del menú móvil
        mobileLinks.forEach(link => {
            const section = link.getAttribute('data-section') || 
                           link.getAttribute('href')?.replace('#', '');
            
            if (section === state.activeSection) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }
}

// Alternar menú móvil
function toggleMobileMenu() {
    state.isMenuOpen = !state.isMenuOpen;
    
    if (DOM.mobileMenu) {
        DOM.mobileMenu.classList.toggle('active', state.isMenuOpen);
    }
    
    // Prevenir scroll del body cuando el menú está abierto
    document.body.style.overflow = state.isMenuOpen ? 'hidden' : '';
    
    // Actualizar icono del botón del menú
    if (DOM.mobileMenuBtn) {
        const icon = DOM.mobileMenuBtn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', state.isMenuOpen ? 'x' : 'menu');
            lucide.createIcons();
        }
    }
}

// Manejar scroll para efectos del navbar
function handleScroll() {
    if (DOM.mainNav) {
        if (window.scrollY > 50) {
            DOM.mainNav.style.backgroundColor = 'rgba(2, 6, 23, 0.95)';
            DOM.mainNav.style.backdropFilter = 'blur(20px)';
        } else {
            DOM.mainNav.style.backgroundColor = 'rgba(2, 6, 23, 0.8)';
            DOM.mainNav.style.backdropFilter = 'blur(20px)';
        }
    }
}

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Exportar para uso global (si es necesario)
window.App = {
    init,
    state,
    DOM,
    APP_DATA,
    APP_CONFIG,
    // Funciones de contacto para acceso fácil
    contact: {
        sendEmail: () => {
            window.location.href = `mailto:${APP_CONFIG.personalInfo.email}`;
        },
        openWhatsApp: () => {
            if (APP_CONFIG.socialLinks.whatsapp) {
                window.open(APP_CONFIG.socialLinks.whatsapp, '_blank');
            }
        },
        call: () => {
            if (APP_CONFIG.personalInfo.phone) {
                window.location.href = `tel:${APP_CONFIG.personalInfo.phone}`;
            }
        },
        downloadCV: downloadCV
    }
};