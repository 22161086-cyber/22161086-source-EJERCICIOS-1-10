// CLOSURE: Explicación de Scope y Encapsulamiento
// 'crearGestorTareas' genera un entorno léxico privado. La variable 'claveStorage' 
// y las funciones internas tienen Scope Local aquí dentro, protegiendo los datos de accesos externos directos.
const crearGestorTareas = () => {
    const claveStorage = "tareas_ejercicio17";

    // 1. obtenerTareas: Recupera y parsea desde JSON a Array de JS
    const obtenerTareas = () => {
        const tareasJSON = localStorage.getItem(claveStorage);
        return tareasJSON ? JSON.parse(tareasJSON) : [];
    };

    // 2. agregarTarea: Inserta una tarea convirtiendo el Array a JSON de texto plano
    const agregarTarea = (textoTarea) => {
        const tareas = obtenerTareas();
        const nuevaTarea = {
            id: Date.now(), // Identificador único basado en tiempo
            texto: textoTarea
        };
        tareas.push(nuevaTarea);
        localStorage.setItem(claveStorage, JSON.stringify(tareas));
    };

    // 3. eliminarTarea: Filtra el array removiendo el ID seleccionado
    const eliminarTarea = (id) => {
        let tareas = obtenerTareas();
        tareas = tareas.filter(tarea => tarea.id !== id);
        localStorage.setItem(claveStorage, JSON.stringify(tareas));
    };

    // Retornamos las funciones públicas que recuerdan este entorno (El Closure en acción)
    return {
        listar: obtenerTareas,
        agregar: agregarTarea,
        eliminar: eliminarTarea
    };
};

// Instanciamos nuestro módulo/closure (Scope Global para la constante 'gestor')
const gestor = crearGestorTareas();

// 4. renderizarTareas: Dibuja dinámicamente los elementos en el HTML
const renderizarTareas = () => {
    const listaUI = document.getElementById("listaTareas");
    listaUI.innerHTML = ""; // Limpiar lista antes de redibujar

    const tareas = gestor.listar();

    tareas.forEach(tarea => {
        const li = document.createElement("li");
        li.innerHTML = `
            <span>${tarea.texto}</span>
            <button class="btn-delete" onclick="confirmarEliminar(${tarea.id})">Eliminar</button>
        `;
        listaUI.appendChild(li);
    });
};

// Acción de agregar tarea con validaciones de Scope Local
document.getElementById("btnAgregar").addEventListener("click", () => {
    const input = document.getElementById("nuevaTarea");
    const texto = input.value.trim();

    if (texto === "") {
        Swal.fire({
            icon: 'warning',
            title: 'Campo vacío',
            text: 'Por favor, escribe una descripción para la tarea.'
        });
        return;
    }

    gestor.agregar(texto);
    input.value = ""; // Limpiar input
    renderizarTareas(); // Actualizar UI
});

// 5. Alerta "Sweet" y eliminación controlada
window.confirmarEliminar = (id) => {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¡No podrás revertir esta acción!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            gestor.eliminar(id);
            renderizarTareas(); // Refrescar lista
            Swal.fire(
                '¡Eliminado!',
                'La tarea ha sido borrada.',
                'success'
            );
        }
    });
};

// Cargar tareas existentes de forma persistente al iniciar la página
document.addEventListener("DOMContentLoaded", renderizarTareas);