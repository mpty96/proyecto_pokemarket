<template>
  <div class="carrito-container">
    <h2>Carrito de Compras</h2>
    <div v-if="carrito.length === 0">
      <p>No hay cartas en el carrito.</p>
    </div>
    <div v-else>
      <div class="cards-container">
        <div class="card" v-for="(carta, index) in carrito" :key="index">
          <img :src="carta.imagen_url" :alt="carta.nombre" />
          <h3>{{ carta.nombre }}</h3>
          <p>Precio: ${{ carta.precio }}</p>
          <button @click="eliminarDelCarrito(index)">Eliminar</button>
        </div>
      </div>
      <div class="total-container">
        <h3>Total: ${{ total }} CLP</h3>
        <!-- Botón de Pagar -->
        <button class="pagar-button" @click="pagar">Pagar</button>
      </div>
    </div>
  </div>
</template>

<script>
import { useCarritoStore } from "../store/store";
import { computed } from "vue";

export default {
  name: "CarritoCompras",
  setup() {
    const carritoStore = useCarritoStore();

    // Accede al carrito y al total
    const carrito = carritoStore.carrito;
    const total = computed(() => carritoStore.total);

    // Método para eliminar una carta del carrito
    const eliminarDelCarrito = (index) => {
      carritoStore.eliminarDelCarrito(index);
    };

    // Método para realizar el pago
    const pagar = () => {
      alert("Pago realizado con éxito. ¡Gracias por tu compra!");
      carritoStore.vaciarCarrito();
    };

    return {
      carrito,
      total,
      eliminarDelCarrito,
      pagar,
    };
  },
};
</script>

<style scoped>
.carrito-container {
  padding: 20px;
  text-align: center;
}

.cards-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-bottom: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background: #fff;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 200px;
  flex: 1 1 calc(25% - 20px);
}

.card img {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
}

button {
  background: #ff4444;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s ease;
}

button:hover {
  background: #ffcc00;
}

.total-container {
  margin-top: 20px;
}

.pagar-button {
  background: #28a745;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.pagar-button:hover {
  background: #218838;
}
</style>
