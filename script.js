
// Variables globales
let productos = [];
let habitaciones = [];
let ventasHistorial = [];
let reservasHistorial = [];
let movimientos = [];

console.log('=== INICIO DEL ARCHIVO SCRIPT.JS ===');

// Inicialización cuando el DOM está listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('=== INICIO DOMContentLoaded ===');
    
    // Cargar tema guardado
    console.log('1. Cargando tema...');
    loadThemePreference();
    
    // Configurar navegación principal
    console.log('2. Configurando navegación...');
    setupNavigation();
    console.log('   Navegación configurada');
    
    // Configurar navegación MVP
    console.log('3. Configurando navegación MVP...');
    setupMVPNavigation();
    
    // Configurar formularios
    console.log('4. Configurando formularios...');
    setupForms();
    
    // Cargar datos iniciales
    console.log('5. Cargando datos iniciales...');
    loadInitialData();
    console.log('   Datos cargados');
    
    // Configurar botones de acción
    console.log('6. Configurando botones de acción...');
    setupActionButtons();
    
    // Establecer fecha actual en campos date
    console.log('7. Estableciendo fecha actual...');
    setCurrentDate();
    
    // Configurar autocompletado para venta (input + datalist)
    console.log('8. Configurando autocompletado...');
    const ventaSearch = document.getElementById('ventaProductoSearch');
    if (ventaSearch) {
        ventaSearch.addEventListener('input', function() {
            const val = this.value.trim().toLowerCase();
            const found = productos.find(p => p.nombre.toLowerCase() === val);
            const hidden = document.getElementById('ventaProductoId');
            if (found) {
                hidden.value = found.id;
            } else {
                hidden.value = '';
            }
        });
    }
    
    // Configurar validación en tiempo real
    console.log('9. Configurando validación en tiempo real...');
    setupRealtimeValidation();
    
    // Sincronizar navegación bottom nav
    console.log('10. Sincronizando navegación...');
    syncNavigation();
    
    // Configurar búsqueda global
    console.log('11. Configurando búsqueda global...');
    setupGlobalSearch();
    
    // Configurar tema oscuro
    console.log('12. Configurando tema oscuro...');
    setupThemeToggle();
    
    // Configurar notificaciones
    console.log('13. Configurando notificaciones...');
    setupNotifications();
    
    // Configurar controles de tabla
    console.log('14. Configurando controles de tabla...');
    setupTableControls();
    
    // Atajos de teclado
    console.log('15. Configurando atajos de teclado...');
    setupKeyboardShortcuts();
    
    console.log('=== FIN DOMContentLoaded ===');
});

// Configurar navegación principal
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const sectionTitle = document.getElementById('section-title');
    const sectionNames = {
        'dashboard': 'Dashboard',
        'mvp': 'Gestión Principal',
        'habitaciones': 'Habitaciones',
        'inventario': 'Inventario',
        'producto-form': 'Editar Producto',
        'venta-form': 'Nueva Venta',
        'reserva-form': 'Nueva Reserva'
    };
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar la sección correspondiente
            const sectionId = this.getAttribute('data-section');
            mostrarSeccion(sectionId);
            
            // Actualizar título
            if (sectionNames[sectionId]) {
                sectionTitle.textContent = sectionNames[sectionId];
            }
        });
    });
}

// Configurar navegación MVP
function setupMVPNavigation() {
    const mvpNavButtons = document.querySelectorAll('.mvp-nav-btn');
    const mvpSections = document.querySelectorAll('.mvp-section');
    
    mvpNavButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover clase active de todos los botones y secciones
            mvpNavButtons.forEach(btn => btn.classList.remove('active'));
            mvpSections.forEach(section => section.classList.remove('active'));
            
            // Añadir clase active al botón clickeado
            this.classList.add('active');
            
            // Mostrar la sección correspondiente
            const sectionId = this.textContent.trim().toLowerCase().includes('habitaciones') ? 'habitaciones-mvp' :
                             this.textContent.trim().toLowerCase().includes('reservas') ? 'reservas-mvp' :
                             this.textContent.trim().toLowerCase().includes('tienda') ? 'tienda-mvp' : 'ventas-mvp';
            
            document.getElementById(sectionId).classList.add('active');
        });
    });
}

// Configurar formularios
function setupForms() {
    // Formulario de habitación (MVP)
    const formHabitacion = document.getElementById('formHabitacion');
    if (formHabitacion) {
        formHabitacion.onsubmit = function(e) {
            e.preventDefault();
            const msgElement = document.getElementById('msgHabitacion');
            const numero = parseInt(document.getElementById('habNumero').value, 10);
            const tipo = document.getElementById('habTipo').value;
            const precio = parseFloat(document.getElementById('habPrecio').value) || 0;

            if (!numero || !tipo) {
                msgElement.textContent = 'Complete número y tipo de habitación.';
                msgElement.className = 'msg error';
                return;
            }

            // Por defecto nueva habitación queda LIBRE
            habitaciones.push({ numero, estado: 'LIBRE', tipo, precio });
            actualizarTablaHabitaciones(habitaciones);
            msgElement.textContent = `Habitación ${numero} registrada y disponible.`;
            msgElement.className = 'msg success';
            setTimeout(() => msgElement.textContent = '', 3000);
            this.reset();
        };
    }
    
    // Formulario de reserva (MVP)
    const formReserva = document.getElementById('formReserva');
    if (formReserva) {
        formReserva.onsubmit = function(e) {
            e.preventDefault();
            const entrada = document.getElementById('resEntrada').value;
            const salida = document.getElementById('resSalida').value;
            const msgElement = document.getElementById('msgReserva');
            
            if (salida <= entrada) {
                msgElement.textContent = 'La fecha de salida debe ser posterior a la fecha de entrada';
                msgElement.className = 'msg error';
                return;
            }
            
            // Validar que la habitación exista y no esté ocupada
            const habitacionNum = parseInt(document.getElementById('resHabitacion').value, 10);
            const habitacion = habitaciones.find(h => h.numero === habitacionNum);
            if (habitacion && habitacion.estado === 'OCUPADA') {
                msgElement.textContent = 'Esta habitación ya está ocupada.';
                msgElement.className = 'msg error';
                return;
            }

            // Registrar reserva
            reservasHistorial.unshift({ fecha: entrada + ' → ' + salida, habitacion: habitacionNum, cliente: document.getElementById('resCliente').value });
            if (habitacion) {
                habitacion.estado = 'RESERVADA';
            }
            actualizarTablaHabitaciones(habitaciones);
            actualizarDashboard();
            msgElement.textContent = 'Reserva registrada correctamente.';
            msgElement.className = 'msg success';
            setTimeout(() => msgElement.textContent = '', 3000);
            this.reset();
        };
    }
    
    // Formulario de producto (MVP)
    const formProducto = document.getElementById('formProducto');
    if (formProducto) {
        formProducto.onsubmit = function(e) {
            e.preventDefault();
            const msgElement = document.getElementById('msgProducto');
            msgElement.textContent = 'Producto registrado exitosamente (simulado)';
            msgElement.className = 'msg success';
            setTimeout(() => msgElement.textContent = '', 3000);
            this.reset();
        };
    }
    
    // Formulario de venta (MVP)
    const formVenta = document.getElementById('formVenta');
    if (formVenta) {
        formVenta.onsubmit = function(e) {
            e.preventDefault();
            const msgElement = document.getElementById('msgVenta');
            msgElement.textContent = 'Venta registrada exitosamente (simulado)';
            msgElement.className = 'msg success';
            setTimeout(() => msgElement.textContent = '', 3000);
            this.reset();
        };
    }
    
    // Formulario de producto (detallado)
    const productoForm = document.getElementById('productoForm');
    if (productoForm) {
        productoForm.onsubmit = function(e) {
            e.preventDefault();
            const stock = parseInt(document.getElementById('stock').value);
            const minimo = parseInt(document.getElementById('minimo').value);
            const msgElement = document.getElementById('msgProductoForm');
            
            if (stock < minimo) {
                msgElement.textContent = 'El stock inicial no puede ser menor al stock mínimo';
                msgElement.className = 'msg error';
                return;
            }
            
            // Agregar producto al inventario
            const nombre = document.getElementById('nombre').value.trim();
            const categoria = document.getElementById('categoria').value;
            const precio = parseFloat(document.getElementById('precio').value) || 0;
            const ubicacion = document.getElementById('ubicacion').value;
            const id = productos.length ? Math.max(...productos.map(p=>p.id)) + 1 : 1;
            productos.push({ id, nombre, precio, stock: stock, minimo: minimo, categoria, ubicacion });
            actualizarTablaProductos(productos);
            cargarProductosVenta();
            msgElement.textContent = 'Producto guardado correctamente.';
            msgElement.className = 'msg success';
            setTimeout(() => {
                msgElement.textContent = '';
                mostrarSeccion('inventario');
            }, 1500);
            this.reset();
        };
    }
    
    // Formulario de venta (detallado)
    const ventaForm = document.getElementById('ventaForm');
    if (ventaForm) {
        ventaForm.onsubmit = function(e) {
            e.preventDefault();
            const tipo = document.getElementById('tipo').value;
            const habitacion = document.getElementById('habitacionVenta').value;
            const msgElement = document.getElementById('msgVentaForm');
            const productoNombre = document.getElementById('ventaProductoSearch').value.trim();
            const producto = productos.find(p => p.nombre.toLowerCase() === productoNombre.toLowerCase());
            const cantidad = parseInt(document.getElementById('cantidad').value, 10) || 1;

            if (!producto) {
                msgElement.textContent = 'No existe el producto seleccionado. Verifique el nombre.';
                msgElement.className = 'msg error';
                return;
            }

            if (cantidad < 1) {
                msgElement.textContent = 'La cantidad debe ser al menos 1.';
                msgElement.className = 'msg error';
                return;
            }

            if (producto.stock < cantidad) {
                msgElement.textContent = `Stock insuficiente. Quedan ${producto.stock} unidades de ${producto.nombre}.`;
                msgElement.className = 'msg error';
                return;
            }

            if (tipo === 'HABITACION' && !habitacion) {
                msgElement.textContent = 'Debe indicar la habitación para consumo en habitación';
                msgElement.className = 'msg error';
                return;
            }

            // Registrar venta: decrementar stock y agregar al historial
            producto.stock -= cantidad;
            const now = new Date();
            const hora = now.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            ventasHistorial.unshift({ hora, producto: producto.nombre, cantidad, total: (producto.precio * cantidad) });
            movimientos.unshift({ hora, descripcion: `Venta: ${producto.nombre} x${cantidad}`, monto: (producto.precio * cantidad).toFixed(2) });
            actualizarTablaProductos(productos);
            actualizarDashboard(ventasHistorial.slice(0,5));
            updateRecentHistory();

            msgElement.textContent = `Venta de ${cantidad} x ${producto.nombre} registrada correctamente.`;
            msgElement.className = 'msg success';
            setTimeout(() => {
                msgElement.textContent = '';
                this.reset();
                document.getElementById('campoHabitacionContainer').style.display = 'none';
            }, 2000);
        };
    }
    
    // Formulario de reserva (detallado)
    const reservaForm = document.getElementById('reservaForm');
    if (reservaForm) {
        reservaForm.onsubmit = function(e) {
            e.preventDefault();
            const inicio = document.getElementById('inicioReserva').value;
            const fin = document.getElementById('finReserva').value;
            const msgElement = document.getElementById('msgReservaForm');
            
            if (fin <= inicio) {
                msgElement.textContent = 'La fecha fin debe ser posterior a la fecha inicio';
                msgElement.className = 'msg error';
                return;
            }
            
            msgElement.textContent = 'Reserva registrada correctamente (simulado)';
            msgElement.className = 'msg success';
            setTimeout(() => {
                msgElement.textContent = '';
                this.reset();
                mostrarSeccion('habitaciones');
            }, 2000);
        };
    }
}

// Cargar datos iniciales
function loadInitialData() {
    // Datos de ejemplo para productos
    productos = [
        { id: 1, nombre: 'Agua Mineral 500ml', precio: 1.5, stock: 50, minimo: 10, categoria: 'Bebidas' },
        { id: 2, nombre: 'Refresco Cola 330ml', precio: 2.0, stock: 30, minimo: 15, categoria: 'Bebidas' },
        { id: 3, nombre: 'Papas Fritas', precio: 2.5, stock: 20, minimo: 10, categoria: 'Snacks' },
        { id: 4, nombre: 'Chocolate', precio: 1.8, stock: 5, minimo: 10, categoria: 'Snacks' },
        { id: 5, nombre: 'Jabón de Baño', precio: 3.0, stock: 12, minimo: 5, categoria: 'Aseo' }
    ];
    
    // Datos de ejemplo para habitaciones
    habitaciones = [
        { numero: 101, estado: 'LIBRE' },
        { numero: 102, estado: 'OCUPADA' },
        { numero: 103, estado: 'RESERVADA' },
        { numero: 104, estado: 'LIBRE' },
        { numero: 105, estado: 'LIMPIEZA' },
        { numero: 106, estado: 'OCUPADA' },
        { numero: 107, estado: 'LIBRE' },
        { numero: 108, estado: 'RESERVADA' }
    ];
    
    // Datos de ejemplo para ventas
    const ventasDelDia = [
        { hora: '08:30', producto: 'Agua Mineral', cantidad: 2, total: 3.0 },
        { hora: '10:15', producto: 'Café', cantidad: 1, total: 2.5 },
        { hora: '12:45', producto: 'Sándwich', cantidad: 1, total: 5.0 },
        { hora: '15:20', producto: 'Refresco Cola', cantidad: 3, total: 6.0 },
        { hora: '18:30', producto: 'Cerveza', cantidad: 2, total: 7.0 }
    ];
    
    // Inicializar historiales
    ventasHistorial = ventasDelDia.slice();
    reservasHistorial = [
        { fecha: '2025-12-18', habitacion: 102, cliente: 'María López' },
        { fecha: '2025-12-17', habitacion: 103, cliente: 'Juan Pérez' }
    ];
    movimientos = [
        { hora: '08:30', descripcion: 'Venta inicial', monto: '3.00' },
        { hora: '10:15', descripcion: 'Ingreso caja', monto: '2.50' }
    ];

    // Cargar datos en el dashboard
    actualizarDashboard(ventasHistorial.slice(0,5));

    // Cargar productos en el inventario
    actualizarTablaProductos(productos);

    // Cargar habitaciones
    actualizarTablaHabitaciones(habitaciones);

    // Cargar productos en el formulario de venta (datalist)
    cargarProductosVenta();

    // Mostrar historial reciente
    updateRecentHistory();
}

// Configurar botones de acción
function setupActionButtons() {
    // Botón de actualizar
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', function() {
            // Simular loading
            const icon = this.querySelector('i');
            icon.style.animation = 'spin 1s linear';
            
            setTimeout(() => {
                const currentSection = document.querySelector('.content-section.active');
                if (currentSection) {
                    const sectionId = currentSection.id;
                    if (sectionId === 'dashboard') {
                        actualizarDashboard();
                    } else if (sectionId === 'inventario') {
                        actualizarTablaProductos(productos);
                    } else if (sectionId === 'habitaciones') {
                        actualizarTablaHabitaciones(habitaciones);
                    }
                }
                icon.style.animation = '';
                addNotification('✓ Actualizado', 'Datos actualizados correctamente', 'success');
            }, 600);
        });
    }
    
    // Botón de ayuda
    const helpBtn = document.getElementById('help-btn');
    if (helpBtn) {
        helpBtn.addEventListener('click', function() {
            showNotification('Sistema Hotelero Los Angeles\nAyuda disponible:\n/ = Búsqueda\nCtrl+N = Nueva venta\nCtrl+R = Actualizar', 'info');
        });
    }
}

// Función para mostrar una sección específica
function mostrarSeccion(id) {
    console.log('mostrarSeccion() llamada con id:', id);
    
    // Ocultar todas las secciones
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    const targetSection = document.getElementById(id);
    console.log('targetSection encontrada:', targetSection ? 'SÍ' : 'NO');
    
    if (targetSection) {
        targetSection.classList.add('active');
        console.log('Clase active añadida a:', id);
        
        // Actualizar título
        const sectionTitle = document.getElementById('section-title');
        const sectionNames = {
            'dashboard': 'Dashboard',
            'mvp': 'Gestión Principal',
            'habitaciones': 'Habitaciones',
            'inventario': 'Inventario',
            'producto-form': 'Editar Producto',
            'venta-form': 'Nueva Venta',
            'reserva-form': 'Nueva Reserva'
        };
        
        if (sectionNames[id]) {
            sectionTitle.textContent = sectionNames[id];
        }
        
        // Actualizar navegación activa
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-section') === id) {
                btn.classList.add('active');
            }
        });
    }
}

// Función para mostrar sección MVP (para navegación interna)
function mostrarMVPSection(sectionId) {
    // Ocultar todas las secciones MVP
    document.querySelectorAll('.mvp-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Mostrar la sección seleccionada
    document.getElementById(sectionId).classList.add('active');
    
    // Actualizar botones de navegación MVP
    const buttonTextMap = {
        'habitaciones-mvp': 'Habitaciones',
        'reservas-mvp': 'Reservas',
        'tienda-mvp': 'Tienda',
        'ventas-mvp': 'Ventas'
    };
    
    document.querySelectorAll('.mvp-nav-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.textContent.includes(buttonTextMap[sectionId])) {
            btn.classList.add('active');
        }
    });
}

// Actualizar dashboard con datos
function actualizarDashboard(ventasData) {
    // Actualizar ventas del día
    const tablaVentas = document.getElementById('tablaVentas');
    if (tablaVentas) {
        if (ventasData && ventasData.length > 0) {
            tablaVentas.innerHTML = '';
            ventasData.forEach(venta => {
                const row = `<tr>
                    <td data-label="Hora">${venta.hora}</td>
                    <td data-label="Producto">${venta.producto}</td>
                    <td data-label="Cantidad">${venta.cantidad}</td>
                    <td data-label="Total">$${venta.total.toFixed(2)}</td>
                </tr>`;
                tablaVentas.innerHTML += row;
            });
        } else {
            tablaVentas.innerHTML = '<tr><td colspan="4">No hay ventas registradas hoy</td></tr>';
        }
    }
    
    // Actualizar estado de habitaciones
    const tablaHabitaciones = document.getElementById('tablaHabitaciones');
    if (tablaHabitaciones && habitaciones.length > 0) {
        tablaHabitaciones.innerHTML = '';
        const habitacionesParaMostrar = habitaciones.slice(0, 5); // Mostrar solo 5
        
        habitacionesParaMostrar.forEach(habitacion => {
            const row = `<tr>
                <td data-label="Habitación">Hab. ${habitacion.numero}</td>
                <td data-label="Estado"><span class="badge ${habitacion.estado}">${habitacion.estado}</span></td>
            </tr>`;
            tablaHabitaciones.innerHTML += row;
        });
    }
    
    // Actualizar productos con stock bajo
    const tablaStock = document.getElementById('tablaStock');
    if (tablaStock && productos.length > 0) {
        tablaStock.innerHTML = '';
        const productosBajoStock = productos.filter(p => p.stock <= p.minimo);

        if (productosBajoStock.length > 0) {
            productosBajoStock.forEach(producto => {
                const clase = producto.stock <= 0 ? 'stock-critical' : 'stock-low';
                const row = `<tr>
                    <td data-label="Producto">${producto.nombre}</td>
                    <td data-label="Stock"><span class="badge ${clase}">${producto.stock}</span></td>
                </tr>`;
                tablaStock.innerHTML += row;
            });
        } else {
            tablaStock.innerHTML = '<tr><td colspan="2">Todo el stock está en niveles adecuados</td></tr>';
        }
    }
    
    // Calcular estadísticas
    const habitacionesOcupadas = habitaciones.filter(h => h.estado === 'OCUPADA' || h.estado === 'RESERVADA').length;
    const productosBajoStockCount = productos.filter(p => p.stock <= p.minimo).length;
    const totalVentas = ventasData ? ventasData.reduce((sum, venta) => sum + venta.total, 0) : 0;
    const proximasReservas = reservasHistorial.length;
    
    // Actualizar valores en las tarjetas de estadísticas
    const statValues = document.querySelectorAll('.stat-value');
    if (statValues[0]) statValues[0].textContent = `$${totalVentas.toFixed(2)}`;
    if (statValues[1]) statValues[1].textContent = `${habitacionesOcupadas}/${habitaciones.length}`;
    if (statValues[2]) statValues[2].textContent = productosBajoStockCount;
    if (statValues[3]) statValues[3].textContent = proximasReservas;
    
    // Actualizar cambios e indicadores
    const ventasChange = document.getElementById('ventasChange');
    if (ventasChange) ventasChange.textContent = totalVentas > 0 ? '+5% vs ayer' : 'Sin ventas hoy';
    
    const occupancyChange = document.getElementById('occupancyChange');
    if (occupancyChange) {
        const occupancyRate = habitaciones.length > 0 ? (habitacionesOcupadas / habitaciones.length * 100).toFixed(0) : 0;
        occupancyChange.textContent = `${occupancyRate}% ocupación`;
    }
    
    const stockChange = document.getElementById('stockChange');
    if (stockChange) stockChange.textContent = productosBajoStockCount === 0 ? 'Todos OK ✓' : `${productosBajoStockCount} críticos`;
}

// Actualizar tabla de productos en inventario
function actualizarTablaProductos(productosData) {
    const tablaProductos = document.getElementById('tablaProductos');
    if (!tablaProductos) return;
    
    tablaProductos.innerHTML = '';
    
    if (!productosData || productosData.length === 0) {
        tablaProductos.innerHTML = '<tr><td colspan="5" class="loading">No hay productos registrados</td></tr>';
        return;
    }
    
    // Aplicar ordenamiento
    let sortedProducts = [...productosData];
    if (currentSort === 'price') {
        sortedProducts.sort((a, b) => a.precio - b.precio);
    }
    
    // Aplicar paginación
    const paginated = paginateArray(sortedProducts, currentPage, pageSize);
    
    // Renderizar filas
    paginated.data.forEach(producto => {
        const stockClass = producto.stock <= 0 ? 'stock-critical' : (producto.stock <= producto.minimo ? 'stock-low' : 'stock-ok');
        const estadoTexto = producto.stock <= 0 ? 'Crítico' : (producto.stock <= producto.minimo ? 'Bajo Stock' : 'OK');
        const row = `<tr class="expandable-row" onclick="expandProductRow(this, ${producto.id})">
            <td data-label="Producto">${producto.nombre}</td>
            <td data-label="Precio">$${producto.precio.toFixed(2)}</td>
            <td data-label="Stock">${producto.stock}</td>
            <td data-label="Estado"><span class="badge ${stockClass}">${estadoTexto}</span></td>
            <td data-label="Acción">
                <button class="small-btn" onclick="event.stopPropagation(); editarProducto(${producto.id})">
                    <i class="fas fa-edit"></i> Editar
                </button>
            </td>
        </tr>
        <tr class="row-details" id="details-${producto.id}">
            <td colspan="5">
                <div class="row-details-content">
                    <dl>
                        <dt>Categoría:</dt>
                        <dd>${producto.categoria || 'N/A'}</dd>
                        <dt>Stock Mínimo:</dt>
                        <dd>${producto.minimo}</dd>
                        <dt>Ubicación:</dt>
                        <dd>${producto.ubicacion || 'N/A'}</dd>
                        <dt>Disponible:</dt>
                        <dd>${producto.stock > 0 ? 'Sí' : 'No - AGOTADO'}</dd>
                    </dl>
                </div>
            </td>
        </tr>`;
        tablaProductos.innerHTML += row;
    });
    
    // Renderizar paginación
    const paginationDiv = document.getElementById('productPagination');
    if (paginationDiv) {
        let paginationHTML = '';
        
        if (currentPage > 1) {
            paginationHTML += `<button onclick="goToPage(1)">« Primera</button>`;
            paginationHTML += `<button onclick="goToPage(${currentPage - 1})">‹ Anterior</button>`;
        }
        
        for (let i = 1; i <= paginated.totalPages; i++) {
            if (i === currentPage) {
                paginationHTML += `<span class="active">${i}</span>`;
            } else {
                paginationHTML += `<button onclick="goToPage(${i})">${i}</button>`;
            }
        }
        
        if (currentPage < paginated.totalPages) {
            paginationHTML += `<button onclick="goToPage(${currentPage + 1})">Siguiente ›</button>`;
            paginationHTML += `<button onclick="goToPage(${paginated.totalPages})">Última »</button>`;
        }
        
        paginationDiv.innerHTML = paginationHTML;
    }
}

function goToPage(page) {
    currentPage = page;
    actualizarTablaProductos(productos);
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function expandProductRow(row, productId) {
    const details = document.getElementById(`details-${productId}`);
    if (details) {
        details.classList.toggle('open');
    }
}

// Actualizar tabla de habitaciones completa
function actualizarTablaHabitaciones(habitacionesData) {
    const tablaHabitacionesFull = document.getElementById('tablaHabitacionesFull');
    if (tablaHabitacionesFull) {
        tablaHabitacionesFull.innerHTML = '';
        
        if (habitacionesData && habitacionesData.length > 0) {
            habitacionesData.forEach(habitacion => {
                const row = `<tr>
                    <td data-label="#">${habitacion.numero}</td>
                    <td data-label="Estado"><span class="badge ${habitacion.estado}">${habitacion.estado}</span></td>
                    <td data-label="Cambiar">
                        <button class="small-btn" onclick="cambiarEstadoHabitacion(${habitacion.numero}, '${habitacion.estado}')">
                            <i class="fas fa-exchange-alt"></i> Cambiar
                        </button>
                    </td>
                    <td data-label="Agendar">
                        <button class="small-btn" onclick="agendarHabitacion(${habitacion.numero})">
                            <i class="fas fa-calendar-plus"></i> Agendar
                        </button>
                    </td>
                </tr>`;
                tablaHabitacionesFull.innerHTML += row;
            });
        } else {
            tablaHabitacionesFull.innerHTML = '<tr><td colspan="4">No hay habitaciones registradas</td></tr>';
        }
    }
}

// Cargar productos en formulario de venta
function cargarProductosVenta() {
    // Rellenar datalist para autocompletado
    const dataList = document.getElementById('productosList');
    if (dataList) {
        dataList.innerHTML = '';
        productos.forEach(producto => {
            const opt = document.createElement('option');
            opt.value = producto.nombre;
            dataList.appendChild(opt);
        });
    }

    // Mantener compatibilidad si existe un select antiguo
    const productoSelect = document.getElementById('productoSelect');
    if (productoSelect) {
        productoSelect.innerHTML = '<option value="">Seleccione</option>';
        productos.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id;
            option.textContent = `${producto.nombre} (Stock: ${producto.stock}) - $${producto.precio.toFixed(2)}`;
            productoSelect.appendChild(option);
        });
    }
}

// Cambiar tipo de venta (mostrar/ocultar campo habitación)
function cambiarTipoVenta() {
    const tipo = document.getElementById('tipo').value;
    const campoHabitacion = document.getElementById('campoHabitacionContainer');
    
    if (tipo === 'HABITACION') {
        campoHabitacion.style.display = 'block';
    } else {
        campoHabitacion.style.display = 'none';
    }
}

// Filtrar productos en inventario
function filtrarProductos() {
    const filtro = document.getElementById('filtroNombre').value.toLowerCase();
    const productosFiltrados = productos.filter(producto => 
        producto.nombre.toLowerCase().includes(filtro)
    );
    actualizarTablaProductos(productosFiltrados);
}

// Editar producto (simulado)
function editarProducto(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        showNotification(`Editando producto: ${producto.nombre}`, 'info');
        // Cargar datos en formulario para edición (pre-llenar)
        mostrarSeccion('producto-form');
        setTimeout(() => {
            const nombre = document.getElementById('nombre');
            const categoria = document.getElementById('categoria');
            const precio = document.getElementById('precio');
            const stock = document.getElementById('stock');
            const minimo = document.getElementById('minimo');
            const ubicacion = document.getElementById('ubicacion');
            if (nombre) nombre.value = producto.nombre;
            if (categoria) categoria.value = producto.categoria || '';
            if (precio) precio.value = producto.precio;
            if (stock) stock.value = producto.stock;
            if (minimo) minimo.value = producto.minimo || 0;
            if (ubicacion) ubicacion.value = producto.ubicacion || '';
        }, 250);
    }
}

// Cambiar estado de habitación
function cambiarEstadoHabitacion(numero, estadoActual) {
    const nuevoEstado = prompt(`Cambiar estado de habitación ${numero}.\nEstados disponibles: LIBRE, OCUPADA, RESERVADA, LIMPIEZA`, estadoActual);
    
    if (nuevoEstado && ['LIBRE', 'OCUPADA', 'RESERVADA', 'LIMPIEZA'].includes(nuevoEstado.toUpperCase())) {
        // Confirmar si se marca como OCUPADA
        if (nuevoEstado.toUpperCase() === 'OCUPADA') {
            const confirmMsg = confirm(`Marcar habitación ${numero} como OCUPADA?`);
            if (!confirmMsg) return;
        }

        // Actualizar en datos
        const habitacionIndex = habitaciones.findIndex(h => h.numero === numero);
        if (habitacionIndex !== -1) {
            habitaciones[habitacionIndex].estado = nuevoEstado.toUpperCase();
            actualizarTablaHabitaciones(habitaciones);
            
            // Si estamos en dashboard, actualizar también
            const tablaHabitacionesDashboard = document.getElementById('tablaHabitaciones');
            if (tablaHabitacionesDashboard) {
                actualizarDashboard();
            }
            
            showNotification(`Estado de habitación ${numero} cambiado a ${nuevoEstado}`, 'success');
        }
    } else if (nuevoEstado) {
        showNotification('Estado no válido. Use: LIBRE, OCUPADA, RESERVADA o LIMPIEZA', 'error');
    }
}

// Agendar habitación
function agendarHabitacion(numero) {
    // Prellenar formulario de reserva
    const habitacionReserva = document.getElementById('habitacionReserva');
    if (habitacionReserva) {
        habitacionReserva.value = numero;
    }
    
    // Mostrar formulario de reserva
    mostrarSeccion('reserva-form');
}

// Establecer fecha actual en campos date
function setCurrentDate() {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    
    // Establecer fechas por defecto en formularios
    const dateInputs = [
        'resEntrada', 'resSalida',
        'inicioReserva', 'finReserva'
    ];
    
    dateInputs.forEach(id => {
        const input = document.getElementById(id);
        if (input) {
            if (id.includes('Salida') || id.includes('fin')) {
                input.value = tomorrowStr;
                input.min = today;
            } else {
                input.value = today;
                input.min = today;
            }
        }
    });

    // Valores por defecto inteligentes adicionales
    const cantidadInputs = document.querySelectorAll('#cantidad, #ventaCantidad');
    cantidadInputs.forEach(i => { if (i && !i.value) i.value = 1; });

    const pago = document.getElementById('pago');
    if (pago && !pago.value) pago.value = 'Efectivo';
}

// Mostrar notificación
function showNotification(message, type = 'info') {
    // Crear elemento de notificación
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button onclick="this.parentElement.remove()">&times;</button>
    `;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 5px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-width: 300px;
        max-width: 400px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        animation: slideIn 0.3s ease;
    `;
    
    // Colores según tipo
    if (type === 'success') {
        notification.style.backgroundColor = '#38a169';
    } else if (type === 'error') {
        notification.style.backgroundColor = '#e53e3e';
    } else {
        notification.style.backgroundColor = '#2c5282';
    }
    
    // Botón de cerrar
    notification.querySelector('button').style.cssText = `
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        margin-left: 15px;
        padding: 0;
    `;
    
    // Añadir al documento
    document.body.appendChild(notification);
    
    // Auto-eliminar después de 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentElement) {
                    notification.parentElement.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Añadir estilos de animación para notificaciones
const styleAnimations = document.createElement('style');
styleAnimations.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
    
    @keyframes slideInUp {
        from { transform: translateY(100%); opacity: 0; }
        to { transform: translateY(0); opacity: 1; }
    }
    
    @keyframes slideInDown {
        from { transform: translateY(0); opacity: 1; }
        to { transform: translateY(100%); opacity: 0; }
    }
`;
document.head.appendChild(styleAnimations);

// Actualizar el panel de historial reciente
function updateRecentHistory() {
    const recentReservas = document.getElementById('recentReservas');
    const recentMovimientos = document.getElementById('recentMovimientos');

    if (recentReservas) {
        recentReservas.innerHTML = '';
        if (reservasHistorial && reservasHistorial.length > 0) {
            reservasHistorial.slice(0,5).forEach(r => {
                const row = `<tr><td>${r.fecha}</td><td>${r.habitacion}</td><td>${r.cliente}</td></tr>`;
                recentReservas.innerHTML += row;
            });
        } else {
            recentReservas.innerHTML = '<tr><td colspan="3">No hay reservas recientes</td></tr>';
        }
    }

    if (recentMovimientos) {
        recentMovimientos.innerHTML = '';
        if (movimientos && movimientos.length > 0) {
            movimientos.slice(0,5).forEach(m => {
                const row = `<tr><td>${m.hora}</td><td>${m.descripcion}</td><td>$${m.monto}</td></tr>`;
                recentMovimientos.innerHTML += row;
            });
        } else {
            recentMovimientos.innerHTML = '<tr><td colspan="3">No hay movimientos recientes</td></tr>';
        }
    }
}

// Confirmación para botones Cancelar que descartan cambios
function confirmCancel(event, targetSection) {
    event.preventDefault();
    const ok = confirm('¿Desea cancelar? Se perderán los cambios no guardados.');
    if (ok) {
        mostrarSeccion(targetSection);
    }
}

// Acordeón: toggle para expandir/contraer historial
function toggleAccordion(headerBtn) {
    const content = headerBtn.nextElementSibling;
    const isActive = content.classList.contains('active');
    
    // Cerrar otros acordeones (opcional, solo si hay múltiples)
    document.querySelectorAll('.accordion-content.active').forEach(el => {
        if (el !== content) {
            el.classList.remove('active');
            el.previousElementSibling.classList.remove('active');
        }
    });
    
    // Toggle actual
    content.classList.toggle('active');
    headerBtn.classList.toggle('active');
}

// Bottom Navigation: sincronizar click con navegación principal
// Validación en tiempo real para campos de formulario
function setupRealtimeValidation() {
    // Validar campos mientras escribe
    document.querySelectorAll('.form-group input, .form-group select, .form-group textarea').forEach(field => {
        field.addEventListener('input', function() {
            validateField(this);
        });
        field.addEventListener('change', function() {
            validateField(this);
        });
    });
}

// Validar un campo específico
function validateField(field) {
    const formGroup = field.parentElement;
    let isValid = true;
    let errorMsg = '';

    const name = field.name || field.id || '';
    const value = field.value.trim();

    // Validaciones por tipo
    if (field.required && !value) {
        isValid = false;
        errorMsg = 'Este campo es requerido';
    } else if (field.type === 'email' && value && !isValidEmail(value)) {
        isValid = false;
        errorMsg = 'Email inválido';
    } else if (field.type === 'number' && value) {
        const num = parseFloat(value);
        if (isNaN(num)) {
            isValid = false;
            errorMsg = 'Debe ser un número';
        } else if (field.min && num < parseFloat(field.min)) {
            isValid = false;
            errorMsg = `Mínimo ${field.min}`;
        } else if (field.max && num > parseFloat(field.max)) {
            isValid = false;
            errorMsg = `Máximo ${field.max}`;
        }
    } else if (field.type === 'date' && value) {
        if (!isValidDate(value)) {
            isValid = false;
            errorMsg = 'Fecha inválida';
        }
    }

    // Aplicar estilos de validación
    if (!isValid) {
        formGroup.classList.add('has-error');
        formGroup.classList.remove('is-valid');
        
        // Mostrar/actualizar mensaje de error
        let errorDiv = formGroup.querySelector('.error-text');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'error-text';
            formGroup.appendChild(errorDiv);
        }
        errorDiv.textContent = errorMsg;
    } else {
        formGroup.classList.remove('has-error');
        if (value) {
            formGroup.classList.add('is-valid');
        }
        // Ocultar error si existe
        const errorDiv = formGroup.querySelector('.error-text');
        if (errorDiv) errorDiv.textContent = '';
    }

    return isValid;
}

function isValidEmail(email) {
    return /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(email);
}

function isValidDate(dateStr) {
    const date = new Date(dateStr);
    return date instanceof Date && !isNaN(date);
}

// Sincronizar bottom nav con navegación sidebar
function syncNavigation() {
    // Añadir event listeners a los botones bottom-nav
    const bottomNavBtns = document.querySelectorAll('.bottom-nav-btn');
    bottomNavBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const sectionId = this.getAttribute('data-section');
            mostrarSeccion(sectionId);
        });
    });
    
    // Cuando se muestra una sección, actualizar bottom nav si existe
    const observer = new MutationObserver(function() {
        const activeSection = document.querySelector('.content-section.active');
        if (activeSection) {
            const sectionId = activeSection.id;
            document.querySelectorAll('.bottom-nav-btn').forEach(btn => {
                btn.classList.remove('active');
                if (btn.getAttribute('data-section') === sectionId) {
                    btn.classList.add('active');
                }
            });
        }
    });
    
    observer.observe(document.querySelector('.sections-container'), {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['class']
    });
}

// ========== NUEVAS FUNCIONES PARA MEJORAS ==========

// Tema oscuro
function loadThemePreference() {
    const theme = localStorage.getItem('theme') || 'light';
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
    }
}

function setupThemeToggle() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
        btn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            const icon = btn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
            }
        });
    }
}

// Búsqueda global
function setupGlobalSearch() {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    try {
        searchInput.addEventListener('input', function(e) {
            const query = this.value.trim().toLowerCase();
            
            if (query.length < 2) {
                searchResults.classList.remove('active');
                return;
            }
            
            let results = [];
            
            // Buscar en productos
            if (productos && Array.isArray(productos)) {
                productos.forEach(p => {
                    if (p && p.nombre && p.nombre.toLowerCase().includes(query)) {
                        results.push({
                            type: 'Producto',
                            title: p.nombre,
                            detail: `Stock: ${p.stock} - $${p.precio.toFixed(2)}`,
                            sectionId: 'inventario'
                        });
                    }
                });
            }
            
            // Buscar en habitaciones
            if (habitaciones && Array.isArray(habitaciones)) {
                habitaciones.forEach(h => {
                    if (h && h.numero && h.numero.toString().includes(query)) {
                        results.push({
                            type: 'Habitación',
                            title: `Hab. ${h.numero}`,
                            detail: `Estado: ${h.estado}`,
                            sectionId: 'habitaciones'
                        });
                    }
                });
            }
            
            // Buscar en reservas
            if (reservasHistorial && Array.isArray(reservasHistorial)) {
                reservasHistorial.forEach((r) => {
                    if (r && r.cliente && r.cliente.toLowerCase().includes(query)) {
                        results.push({
                            type: 'Reserva',
                            title: `${r.cliente}`,
                            detail: `Hab. ${r.habitacion}`,
                            sectionId: 'dashboard'
                        });
                    }
                });
            }
            
            // Mostrar resultados
            if (results.length > 0) {
                searchResults.innerHTML = results.slice(0, 8).map((r) => `
                    <div class="search-result-item" onclick="mostrarSeccion('${r.sectionId}'); document.getElementById('searchResults').classList.remove('active');">
                        <div class="search-result-type">${r.type}</div>
                        <strong>${r.title}</strong>
                        <div style="font-size: 0.8rem; color: #718096;">${r.detail}</div>
                    </div>
                `).join('');
                searchResults.classList.add('active');
            } else {
                searchResults.innerHTML = '<div class="search-result-item">No se encontraron resultados</div>';
                searchResults.classList.add('active');
            }
        });
        
        // Cerrar resultados al hacer click fuera
        document.addEventListener('click', function(e) {
            if (searchInput && searchResults && !searchInput.contains(e.target) && !searchResults.contains(e.target)) {
                searchResults.classList.remove('active');
            }
        });
    } catch(err) {
        console.error('Error en búsqueda global:', err);
    }
}

// Sistema de notificaciones
let notificationsCount = 0;
let notificationsList = [];

function setupNotifications() {
    const notificationsBtn = document.getElementById('notifications-btn');
    if (notificationsBtn) {
        notificationsBtn.addEventListener('click', toggleNotificationPanel);
    }
    
    // Agregar notificaciones iniciales
    addNotification('¡Bienvenido!', 'Sistema hotelero cargado correctamente', 'info');
    
    // Verificar stock bajo cada minuto
    setInterval(checkLowStock, 60000);
    checkLowStock();
}

function addNotification(title, message, type = 'info') {
    notificationsCount++;
    const notification = {
        id: Date.now(),
        title,
        message,
        type,
        time: new Date().toLocaleTimeString()
    };
    
    notificationsList.unshift(notification);
    updateNotificationBadge();
    
    // Mostar toast
    const toast = document.createElement('div');
    toast.className = `notification-toast ${type}`;
    toast.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'critical' ? '#e53e3e' : type === 'warning' ? '#dd6b20' : '#2c5282'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 9999;
        animation: slideInUp 0.3s ease;
        max-width: 300px;
    `;
    toast.innerHTML = `
        <strong>${title}</strong><br>
        <small>${message}</small>
    `;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInDown 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

function updateNotificationBadge() {
    const badge = document.getElementById('notificationBadge');
    if (badge) {
        if (notificationsCount > 0) {
            badge.textContent = notificationsCount > 99 ? '99+' : notificationsCount;
            badge.style.display = 'flex';
        }
    }
}

function toggleNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.toggle('active');
        if (panel.classList.contains('active')) {
            renderNotifications();
            notificationsCount = 0;
            updateNotificationBadge();
        }
    }
}

function closeNotificationPanel() {
    const panel = document.getElementById('notificationPanel');
    if (panel) {
        panel.classList.remove('active');
    }
}

function renderNotifications() {
    const list = document.getElementById('notificationList');
    if (!list) return;
    
    if (notificationsList.length === 0) {
        list.innerHTML = '<p style="padding: 20px; text-align: center; color: #718096;">No hay notificaciones</p>';
        return;
    }
    
    list.innerHTML = notificationsList.map(n => `
        <div class="notification-item ${n.type}">
            <div class="notification-item-title">${n.title}</div>
            <div class="notification-item-message">${n.message}</div>
            <div class="notification-item-time">${n.time}</div>
        </div>
    `).join('');
}

function checkLowStock() {
    const lowStockProducts = productos.filter(p => p.stock <= p.minimo);
    if (lowStockProducts.length > 0) {
        const product = lowStockProducts[0];
        if (product.stock <= 0) {
            addNotification('⚠️ Stock Crítico', `${product.nombre} está agotado`, 'critical');
        } else {
            addNotification('⚠️ Stock Bajo', `${product.nombre} tiene ${product.stock} unidades`, 'warning');
        }
    }
    
    // Actualizar badges en navegación
    updateNavigationBadges();
}

function updateNavigationBadges() {
    const inventoryBadge = document.getElementById('inventoryBadge');
    const roomsBadge = document.getElementById('roomsBadge');
    
    if (inventoryBadge) {
        const lowStockCount = productos.filter(p => p.stock <= p.minimo).length;
        inventoryBadge.textContent = `(${lowStockCount})`;
    }
    
    if (roomsBadge) {
        const occupiedCount = habitaciones.filter(h => h.estado === 'OCUPADA').length;
        roomsBadge.textContent = `(${occupiedCount}/${habitaciones.length})`;
    }
}

// Controles de tabla: ordenamiento y paginación
let currentPage = 1;
let pageSize = 10;
let currentSort = null;

function setupTableControls() {
    const sortBtn = document.getElementById('sortByPrice');
    const pageSizeSelect = document.getElementById('pageSize');
    
    if (sortBtn) {
        sortBtn.addEventListener('change', function() {
            currentSort = this.checked ? 'price' : null;
            currentPage = 1;
            actualizarTablaProductos(productos);
        });
    }
    
    if (pageSizeSelect) {
        pageSizeSelect.addEventListener('change', function() {
            pageSize = parseInt(this.value);
            currentPage = 1;
            actualizarTablaProductos(productos);
        });
    }
}

function paginateArray(arr, page, size) {
    const start = (page - 1) * size;
    const end = start + size;
    const pages = Math.ceil(arr.length / size);
    return {
        data: arr.slice(start, end),
        currentPage: page,
        totalPages: pages,
        total: arr.length
    };
}

// Atajos de teclado
function setupKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Tecla "/" para búsqueda global
        if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
            e.preventDefault();
            const searchInput = document.getElementById('globalSearch');
            if (searchInput) searchInput.focus();
        }
        
        // Ctrl+N para nueva venta
        if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
            e.preventDefault();
            mostrarSeccion('venta-form');
        }
        
        // Ctrl+R para actualizar
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            const refreshBtn = document.getElementById('refresh-btn');
            if (refreshBtn) refreshBtn.click();
        }
    });
}

// Exportar datos a CSV
function exportToCSV(tableName) {
    let data = [];
    let filename = '';
    
    if (tableName === 'productos') {
        data = productos.map(p => ({
            'Producto': p.nombre,
            'Precio': p.precio.toFixed(2),
            'Stock': p.stock,
            'Mínimo': p.minimo,
            'Categoría': p.categoria
        }));
        filename = 'productos.csv';
    } else if (tableName === 'ventas') {
        data = ventasHistorial.map(v => ({
            'Hora': v.hora,
            'Producto': v.producto,
            'Cantidad': v.cantidad,
            'Total': v.total.toFixed(2)
        }));
        filename = 'ventas.csv';
    } else if (tableName === 'habitaciones') {
        data = habitaciones.map(h => ({
            'Habitación': h.numero,
            'Estado': h.estado,
            'Tipo': h.tipo || 'N/A',
            'Precio': h.precio || 'N/A'
        }));
        filename = 'habitaciones.csv';
    }
    
    if (data.length === 0) return;
    
    const headers = Object.keys(data[0]);
    const csv = [
        headers.join(','),
        ...data.map(row => headers.map(h => `"${row[h] || ''}"`).join(','))
    ].join('\n');
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    window.URL.revokeObjectURL(url);
    
    showNotification(`Exportado: ${filename}`, 'success');
}
