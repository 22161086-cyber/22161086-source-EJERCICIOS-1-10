// Seleccionar los elementos importantes del DOM
const input = document.getElementById('nuevoElemento');
const botonAgregar = document.getElementById('agregarBtn');
const lista = document.getElementById('lista');

// Función para agregar un nuevo elemento a la lista
function agregarElemento() {
    const texto = input.value.trim(); // Obtiene el valor eliminando espacios vacíos

    if (texto !== '') {
        // Crear el elemento 'li' y añadirle las clases de diseño de Bootstrap
        const li = document.createElement('li');
        // 'list-group-item': Diseño de lista Bootstrap
        // 'd-flex justify-content-between align-items-center': Alinea texto a la izquierda y botón a la derecha
        // 'animate__animated animate__fadeIn': Opcional por si usas animaciones
        li.className = "list-group-item d-flex justify-content-between align-items-center shadow-sm-hover mb-2 rounded border";

        // Crear un contenedor de texto para que no se pegue al botón
        const spanTexto = document.createElement('span');
        spanTexto.textContent = texto;
        li.appendChild(spanTexto);

        // Crear el botón de eliminar estilizado con Bootstrap (Color rojo: btn-danger)
        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = "btn btn-danger btn-sm px-3 shadow-sm"; // Clases de Bootstrap para botones pequeños

        // Evento para eliminar el elemento del DOM al hacer clic
        botonEliminar.addEventListener('click', function() {
            li.remove(); // Remueve el nodo completo de la lista
        });

        // Añadir el botón dentro de nuestro renglón 'li'
        li.appendChild(botonEliminar);

        // Insertar el elemento 'li' completo dentro de la lista 'ul'
        lista.appendChild(li);

        // Limpiar el campo de texto y regresar el foco al input
        input.value = '';
        input.focus();
    } else {
        alert('Por favor, escribe algo para agregar a la lista.');
    }
}

// Asignar la función al botón de agregar mediante un escucha de eventos
botonAgregar.addEventListener('click', agregarElemento);

// EXTRA: Permitir agregar elementos presionando la tecla "Enter" en el teclado
input.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        agregarElemento();
    }
});