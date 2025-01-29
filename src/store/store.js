import { defineStore } from 'pinia';


export const useCarritoStore = defineStore('carrito', {
    state: () => ({
      carrito: [], // Array para almacenar las cartas en el carrito
    }),
    actions: {
      // Método para agregar una carta al carrito
      agregarAlCarrito(carta) {
        // Asegúrate de que el precio sea un número
        if (typeof carta.precio !== 'number') {
          carta.precio = parseFloat(carta.precio); // Convierte a número si es una cadena
        }
        this.carrito.push(carta);
      },
      // Método para eliminar una carta del carrito
      eliminarDelCarrito(index) {
        this.carrito.splice(index, 1);
      },
      // Método para vaciar el carrito
      vaciarCarrito() {
        this.carrito = [];
      },
    },
    getters: {
      // Getter para calcular el total del carrito
      total() {
        return this.carrito.reduce((acc, carta) => acc + carta.precio, 0);
      },
    },
  });