// Arreglo para almacenar los objetos de los estudiantes
let estudiantes = [];

// Captura de elementos del DOM
const inputNombre = document.getElementById('nombre');
const inputCalificacion = document.getElementById('calificacion');
const btnAgregar = document.getElementById('btnAgregar');
const btnCalcular = document.getElementById('btnCalcular');

const resPromedio = document.getElementById('resPromedio');
const resAlta = document.getElementById('resAlta');
const resBaja = document.getElementById('resBaja');

// Evento para AGREGAR ESTUDIANTE
btnAgregar.addEventListener('click', () => {
    const nombre = inputNombre.value.trim();
    const calificacionTexto = inputCalificacion.value.trim();

    if (nombre === "" || calificacionTexto === "") {
        alert("Por favor, complete todos los campos.");
        return;
    }

    const calificacion = parseFloat(calificacionTexto);

    if (isNaN(calificacion) || calificacion < 0 || calificacion > 100) {
        alert("Por favor, ingrese una calificación válida entre 0 y 100.");
        return;
    }

    // Guardar en el arreglo
    estudiantes.push({
        nombre: nombre,
        calificacion: calificacion
    });

    // Limpiar campos
    inputNombre.value = "";
    inputCalificacion.value = "";
    inputNombre.focus();

    alert(`Estudiante ${nombre} agregado correctamente.`);
});

// Evento para CALCULAR RESULTADOS
btnCalcular.addEventListener('click', () => {
    if (estudiantes.length === 0) {
        alert("No hay estudiantes registrados para calcular.");
        return;
    }

    // Cálculo del promedio
    let promedio = estudiantes.reduce((total, estudiante) => total + estudiante.calificacion, 0) / estudiantes.length;

    // Obtener valores máximos y mínimos
    let calificacionMaxima = Math.max(...estudiantes.map(e => e.calificacion));
    let calificacionMinima = Math.min(...estudiantes.map(e => e.calificacion));

    // Buscar los objetos correspondientes
    let estudianteMaximo = estudiantes.find(e => e.calificacion === calificacionMaxima);
    let estudianteMinimo = estudiantes.find(e => e.calificacion === calificacionMinima);

    // Asignar los valores a los inputs bloqueados
    resPromedio.value = promedio.toFixed(2);
    resAlta.value = estudianteMaximo.nombre;
    resBaja.value = estudianteMinimo.nombre;
});