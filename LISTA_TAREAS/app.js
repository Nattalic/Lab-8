// Seleccionar los elemento x id del DOM: ingresar-tarea, boton-agregar y lista-tareas
const ingresarTarea = document.getElementById("ingresar-tarea")
const botonAgregar = document.getElementById("boton-agregar")
const listaTareas = document.getElementById("lista-tareas")

// Obtener tareas del localStorage
function obtenerTareasLocalStorage() {
    const tareas = localStorage.getItem("tareas")
    if (tareas !== null) {
        return JSON.parse(tareas)
    } else {
        return []
    }
}
// Guardar tareas en localStorage
function guardarTareasLocalStorage(tareas) {
    localStorage.setItem("tareas", JSON.stringify(tareas))
}

// Renderizar la lista de tareas en el DOM
function mostrarTareas() {
    const tareas = obtenerTareasLocalStorage()
    listaTareas.innerHTML = "" // Limpiar lista antes de renderizar

    tareas.forEach((tarea, index) => {
        const tareaDiv = document.createElement("div")
        tareaDiv.className = "tarea"
        if (tarea.completada) {
            tareaDiv.classList.add("completada")
        }

        const texto = document.createElement("p")
        texto.className = "texto-tarea"
        texto.textContent = tarea.texto
        if (tarea.completada) {
            texto.classList.add("completada")
        }

        const botones = document.createElement("div")
        botones.className = "botones-tarea"

        const botonOk = document.createElement("button")
        botonOk.className = "btn_ok"
        botonOk.textContent = "✔️"
        botonOk.onclick = () => completarTarea(index)

        const botonEliminar = document.createElement("button")
        botonEliminar.className = "btn_eliminar"
        botonEliminar.textContent = "❌";
        botonEliminar.onclick = () => eliminarTarea(index)

        botones.appendChild(botonOk)
        botones.appendChild(botonEliminar)

        tareaDiv.appendChild(texto)
        tareaDiv.appendChild(botones)
        listaTareas.appendChild(tareaDiv)
    });
}

// Marcar una tarea como completada
function completarTarea(index) {
    const tareas = obtenerTareasLocalStorage()
    tareas[index].completada = !tareas[index].completada
    guardarTareasLocalStorage(tareas)
    mostrarTareas()
}

// Eliminar la Tarea correspondiente
function eliminarTarea(index) {
    const tareas = obtenerTareasLocalStorage()
    tareas.splice(index, 1) // Eliminar tarea en la posición
    guardarTareasLocalStorage(tareas)
    mostrarTareas()
}

// Crear una nueva tarea
function nuevaTarea() {
    const texto = ingresarTarea.value.trim()
    if (texto === "") {
        alert("Por favor ingresa una tarea :)")
        return
    }

    const tareas = obtenerTareasLocalStorage()
    tareas.push({ texto: texto, completada: false })
    guardarTareasLocalStorage(tareas)
    ingresarTarea.value = "" // Limpiar
    mostrarTareas()
}

// Escuchar el boton Agregar y en el evento click llamar a nuevaTarea
botonAgregar.addEventListener("click", nuevaTarea)

// Escuchar el inputTarea (ingresar tarea) y en el evento keypress con la tecla Enter 
ingresarTarea.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
        nuevaTarea() // llamar a nuevaTarea
    }
})

// Cargar tareas al iniciar con mostrarTareas
mostrarTareas()
