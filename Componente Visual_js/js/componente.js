/**
 Componente Reutilizable: Ventana Modal Centrada Interactiva
  @param {string} titulo - Encabezado del modal
  @param {string} mensaje - Mensaje descriptivo
  @param {string} textoBoton - Texto del botón de cierre (ej: 'Entendido')
 */
function mostrarModal(titulo, mensaje, textoBoton = 'Entendido') {
    // 1. Creamos el contenedor del fondo oscuro
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';

    // 2. Creamos la estructura interna de la caja blanca centradita
    overlay.innerHTML = `
        <div class="modal-box">
            <h2>${titulo}</h2>
            <p>${mensaje}</p>
            <button class="btn-modal-close">${textoBoton}</button>
        </div>
    `;

    // 3. Inyectamos el componente dentro del body del HTML
    document.body.appendChild(overlay);

    // 4. Activamos la animación de aparición (un pequeño delay para activar el CSS transition)
    setTimeout(() => {
        overlay.classList.add('active');
    }, 10);

    // 5. Programamos el botón para cerrar y destruir el modal de la pantalla
    const botonCerrar = overlay.querySelector('.btn-modal-close');
    botonCerrar.addEventListener('click', () => {
        overlay.classList.remove('active');
        
        // Esperamos a que acabe la animación de desvanecido para eliminarlo del DOM completamente
        setTimeout(() => {
            overlay.remove();
        }, 300);
    });
}