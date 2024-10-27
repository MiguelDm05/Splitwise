class Usuario {
    constructor(nombre, pathImg) {
        this.nombre = nombre;
        this.gastos = [];
        this.pathImg = pathImg;
    }

    agregarGasto(gasto) {
        this.gastos.push(gasto);
    }
}

class Gasto {
    constructor(titulo, monto, fecha) {
        this.titulo = titulo;
        this.monto = monto;
        this.fecha = fecha;
    }
}

// Variable para almacenar el usuario
let usuario;

document.getElementById("mb-10").addEventListener("submit", function (event) {
    event.preventDefault();
    let isValid = true;

    const nombreInput = document.getElementById("nombre");
    const nombre = nombreInput.value.trim();

    // Si el nombre no está vacío
    if (nombre === "") {
        nombreInput.classList.add("invalido");
        nombreInput.classList.remove("valido");
        isValid = false;
    } else {
        nombreInput.classList.add("valido");
        nombreInput.classList.remove("invalido");
        
        // Si el usuario no existe, se crea uno nuevo
        if (!usuario || usuario.nombre !== nombre) {
            const pathImg = `img/usuarios/avatar_${nombre}.png`;
            usuario = new Usuario(nombre, pathImg);
        }
    }

    const concepto = document.getElementById("concepto");
    const conceptoPattern = /^[a-zA-Z0-9\s]{1,20}$/;
    if (!conceptoPattern.test(concepto.value)) {
        concepto.classList.add("invalido");
        concepto.classList.remove("valido");
        isValid = false;
    } else {
        concepto.classList.add("valido");
        concepto.classList.remove("invalido");
    }

    const importe = document.getElementById("importe");
    const importeValue = importe.value;

    if (importeValue === "" || importeValue < 0 || importeValue > 1000) {
        importe.classList.add("invalido");
        importe.classList.remove("valido");
        isValid = false;
    } else {
        importe.classList.add("valido");
        importe.classList.remove("invalido");
    }

    const fecha = document.getElementById("fecha");
    const fechaPattern = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
    if (!fechaPattern.test(fecha.value)) {
        fecha.classList.add("invalido");
        fecha.classList.remove("valido");
        isValid = false;
    } else {
        const [dia, mes, anio] = fecha.value.split("/").map(Number);
        if (dia < 1 || dia > 31 || mes < 1 || mes > 12) {
            fecha.classList.add("invalido");
            fecha.classList.remove("valido");
            isValid = false;
        } else {
            fecha.classList.add("valido");
            fecha.classList.remove("invalido");
        }
    }

    if (!isValid) {
        alert("Por favor, rellena todos los campos correctamente.");
    } else {
        const nuevoGasto = new Gasto(concepto.value, parseFloat(importeValue).toFixed(2), fecha.value);
        usuario.agregarGasto(nuevoGasto);

        const resumenGastos = document.getElementById("resumenGastos");
        const nuevoGastoDiv = document.createElement("div");
        nuevoGastoDiv.className = "card mb-12 espacio";  // Asegúrate de tener esta clase en CSS para estilizar
        nuevoGastoDiv.innerHTML = `
            <div class="row g-0">
                <div class="col-md-2">
                    <img src="${usuario.pathImg}" class="img-fluid rounded-start" alt="${usuario.nombre}">
                </div>
                <div class="col-md-10">
                    <div class="card-body">
                        <h5 class="card-title">${usuario.nombre}</h5>
                        <p class="card-text">Pagó ${nuevoGasto.monto}€ el ${nuevoGasto.fecha}.</p>
                    </div>
                </div>
            </div>
        `;
        resumenGastos.appendChild(nuevoGastoDiv);

        alert("Gasto añadido correctamente.");

        this.reset();
        Array.from(this.elements).forEach((el) => {
            el.classList.remove("valido", "invalido");
        });
    }
});
