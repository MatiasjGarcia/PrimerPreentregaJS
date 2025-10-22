// Carrito en LocalStorage o vacio
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const divProductos = document.getElementById("productos");
const ulCarrito = document.getElementById("carrito");
const totalTexto = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");

// Cargar productos desde archivo JSON
async function cargarProductos() {
    try {
        const respuesta = await fetch("productos.json");
        const productos = await respuesta.json();
        mostrarProductos(productos);
    } catch (error) {
        console.error("Error al cargar productos:", error);
        Swal.fire({
            icon: "error",
            title: "Error al cargar productos",
            text: "No se pudieron obtener los datos remotos.",
            confirmButtonColor: "black"
        });
    }
}

// Mostrar productos
function mostrarProductos(productos) {
    divProductos.innerHTML = "";
    productos.forEach(prod => {
        let btn = document.createElement("button");
        btn.textContent = `Agregar ${prod.nombre} - $${prod.precio}`;
        btn.addEventListener("click", () => agregarAlCarrito(prod));
        divProductos.appendChild(btn);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(producto) {
    carrito.push(producto);
    actualizarCarrito();
    Swal.fire({
        position: "top-end",
        icon: "success",
        title: `${producto.nombre} agregado al carrito`,
        showConfirmButton: false,
        timer: 1000
    });
}

// Actualizar carrito
function actualizarCarrito() {
    ulCarrito.innerHTML = "";

    carrito.forEach((item, index) => {
        let li = document.createElement("li");
        li.textContent = `${item.nombre} - $${item.precio}`;

        let btnEliminar = document.createElement("button");
        btnEliminar.textContent = "X";
        btnEliminar.addEventListener("click", () => eliminarDelCarrito(index));

        li.appendChild(btnEliminar);
        ulCarrito.appendChild(li);
    });

    let total = carrito.reduce((acc, item) => acc + item.precio, 0);
    totalTexto.textContent = `Total: $${total}`;

    localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Eliminar producto
function eliminarDelCarrito(index) {
    carrito.splice(index, 1);
    actualizarCarrito();
}

// Vaciar carrito
btnVaciar.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
    Swal.fire({
        icon: "info",
        title: "Carrito vaciado",
        confirmButtonColor: "black"
    });
});

// Inicializacion / Invoacion 
cargarProductos();
actualizarCarrito();
