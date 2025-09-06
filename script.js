// Array de productos
const productos = [
    { id: 1, nombre: "Japan Style Oversize", precio: 23500, stock: 16 },
    { id: 2, nombre: "Full Black SlimFit", precio: 21500, stock: 63 },
    { id: 3, nombre: "Impak Traino", precio: 21500, stock: 63 }
];

let carrito = [];

// Funcion para mostrar y agregr al carrito
function comprar() {
    let seguir = true;

    while (seguir) {
        let mensaje = "Productos disponibles:\n";
        productos.forEach(p => {
            mensaje += `${p.id} - ${p.nombre} - $${p.precio} - Stock: ${p.stock}\n`;
        });

        let eleccion = prompt(mensaje + "\nIngresa el ID del producto que querés comprar:");

        // Buscar el producto elegido
        const producto = productos.find(p => p.id == eleccion);

        if (producto) {
            carrito.push(producto); // Agregar al carrito
            console.log(`Agregaste ${producto.nombre} al carrito.`);
            alert(`Agregaste ${producto.nombre} al carrito.`);
        } else {
            alert("No se encontró el producto.");
        }

        seguir = confirm("¿Querés seguir comprando?");
    }

    // Comprado
    if (carrito.length > 0) {
        let total = 0;
        let resumen = "Tu carrito:\n";
        carrito.forEach(item => {
            resumen += `${item.nombre} - $${item.precio}\n`;
            total += item.precio;
        });
        resumen += `Total a pagar: $${total}`;
        console.log(resumen);
        alert(resumen);
    } else {
        alert("No compraste nada.");
    }
}

// Invocar
comprar();


