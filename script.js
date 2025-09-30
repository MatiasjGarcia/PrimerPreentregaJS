// Productos
const productos = [
    { id: 1, nombre: "Remera Oversize", precio: 23500 },
    { id: 2, nombre: "Buzo Hoodie", precio: 39900 },
    { id: 3, nombre: "Jogger", precio: 28900 }
];

// Carrito en LocalStorage o vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Elementos del DOM
const divProductos = document.getElementById("productos");
const ulCarrito = document.getElementById("carrito");
const totalTexto = document.getElementById("total");
const btnVaciar = document.getElementById("vaciar");

// Mostrar productos
function mostrarProductos() {
    divProductos.innerHTML = "";
    productos.forEach(prod => {
        let btn = document.createElement("button");
        btn.textContent = `Agregar ${prod.nombre} - $${prod.precio}`;
        btn.addEventListener("click", () => agregarAlCarrito(prod.id));
        divProductos.appendChild(btn);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    let producto = productos.find(p => p.id === id);
    carrito.push(producto);
    actualizarCarrito();
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
});

// Inicialización
mostrarProductos();
actualizarCarrito();
