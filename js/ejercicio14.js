document.getElementById('btn-calcular').addEventListener('click', function() {
    // 1. Obtener elementos del DOM
    const entrada = document.getElementById('entrada-numeros').value.trim();
    const errorTxt = document.getElementById('error-validacion');
    
    const txtMayor = document.getElementById('resultado-mayor');
    const txtMenor = document.getElementById('resultado-menor');
    const txtPromedio = document.getElementById('resultado-promedio');

    // Resetear estados visuales previos
    errorTxt.style.display = "none";
    errorTxt.innerText = "";

    // 2. Validación: Verificar que el campo no esté vacío
    if (entrada === "") {
        mostrarError("Por favor, ingresa una serie de números.");
        return;
    }

    // 3. Procesar la cadena: Separar por comas empleando split()
    let arregloCadenas = entrada.split(',');

    // 4. Transformar y limpiar: Convertir cada elemento a Número real
    let arregloNumeros = arregloCadenas.map(str => Number(str.trim()));

    // 5. Validación: Verificar que todos los valores sean números válidos
    const tieneErrores = arregloNumeros.some(num => isNaN(num));
    if (tieneErrores) {
        mostrarError("Formato incorrecto. Asegúrate de ingresar solo números separados por comas.");
        limpiarResultados();
        return;
    }

    // 6. Realizar Cálculos Operacionales
    let maximo = Math.max(...arregloNumeros);
    let minimo = Math.min(...arregloNumeros);
    
    // AQUÍ ESTÁ CORREGIDO (Todo junto: sumaTotal)
    let sumaTotal = arregloNumeros.reduce((acc, valor) => acc + valor, 0);
    let promedio = sumaTotal / arregloNumeros.length;

    // 7. Mostrar resultados en pantalla
    txtMayor.value = maximo;
    txtMenor.value = minimo;
    txtPromedio.value = Number.isInteger(promedio) ? promedio : promedio.toFixed(2);
    
    // Función auxiliar para imprimir el mensaje de error
    function mostrarError(mensaje) {
        errorTxt.innerText = mensaje;
        errorTxt.style.display = "block";
    }

    // Función auxiliar para vaciar los campos si falla la validación
    function limpiarResultados() {
        txtMayor.value = "";
        txtMenor.value = "";
        txtPromedio.value = "";
    }
});