//array de todos los envios
var envios = [];

//envia los pedidos solicitando y verificando los strings y numeros
function botonEnvio() {

	const nombre = prompt("Introduce el nombre:");
	const recibirFecha = prompt("Introduce una fecha yyyy/mm/dd:", "2024/04/26");
	const recibirFechaSplit = recibirFecha.split('/');
	const fechaRecepcion = new Date(recibirFechaSplit[0], recibirFechaSplit[1] - 1, recibirFechaSplit[2]);
	const coste = prompt("Introduce el costo:");
	if (!nombre || isNaN(fechaRecepcion) || isNaN(coste)) {
		alert("Asegurese que los valores sea correcto");
		return;
	}
	const fechaEntrega = calcularFechaEntrega(fechaRecepcion);

	const envio = {
		nombre,
		fechaRecepcion,
		fechaEntrega,
		coste,
	};

	envios.push(envio);
	mostrarEnvios();
	mostrarAviso();
}

//calcula la fecha de entrega con la fecha de partida "fechaRecepcion" y le suma 5 dias
//y si cae en el week 0 le suma otro dia  
function calcularFechaEntrega(fechaRecepcion) {
	const fecha = new Date(fechaRecepcion);
	fecha.setDate(fecha.getDate() + 5);
	if (fecha.getDay() === 0) {
		fecha.setDate(fecha.getDate() + 1);
	}
	return fecha;
}
//funcion que muestra los envios como tabla
function mostrarEnvios() {
	//
	const tablaEnvios = document.getElementById("tabla-envios");
	let tablaHTML = "";

	envios.forEach(envio => {
		tablaHTML += `
            <tr>
                <td>${envio.nombre}</td>
                <td>${envio.coste + "€"}</td>
                <td>${envio.fechaRecepcion}</td>
                <td>${envio.fechaEntrega}</td>
            </tr>
        `;
	});

	tablaEnvios.innerHTML = tablaHTML;
}

//La funcion quita el ultimo pedido solicitado
function quitar() {
	if (envios.length > 0) {
		envios.pop();
		mostrarEnvios();
		alert("El último envío ha sido eliminado correctamente.");
	} else {
		alert("No hay envíos para eliminar.");
	}
}

//Muestra el primer pedido que ha llegado para entrega
function mostrarAviso() {
    const tablaEnvios = document.getElementById("tabla-Mostrar");
    let tablaHTML = "";

    if (envios.length > 0) {
        const primerEnvio = envios[0];
        
        tablaHTML += `
            <div>
                <p>${primerEnvio.fechaEntrega}</p>
                <p>${primerEnvio.nombre}</p>
                <p>${primerEnvio.coste + "€"}</p>
            </div>
        `;
    } else {
        tablaHTML += "<p>No hay envíos para mostrar.</p>";
    }

    tablaEnvios.innerHTML = tablaHTML;
}
