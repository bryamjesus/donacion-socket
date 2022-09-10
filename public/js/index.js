const socket = io();
const inputNombre = document.getElementById("inputNombre");
const inputDNI = document.getElementById("inputDNI");
const inputMonto = document.getElementById("inputMonto");

const limpiar = () => {
  inputNombre.value = "";
  inputDNI.value = "";
  inputMonto.value = "";
};

const enviar = () => {
  console.log("Enviando donacion...");
  const datos = {
    nombre: inputNombre.value,
    dni: inputDNI.value,
    monto: inputMonto.value,
  };
  socket.emit("enviar-donacion", datos);
  limpiar();
};

const list = document.getElementById("lista");
const total = document.getElementById("total");

socket.on("historico", (datos) => {
  console.log(datos);
  for (donante of datos.donantes) {
    lista.innerHTML += `<li>${donante}</li>`;
  }
  total.innerHTML = datos.total;
});

socket.on("respuesta", (datos) => {
  //console.log(datos);
  list.innerHTML += `<li>${datos.persona}</li>`;
  total.innerHTML = datos.total;
});