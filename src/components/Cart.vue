<template>
    <section id="cart" class="cart">
      <h2>Tu Carrito</h2>
      <div v-if="cart.length === 0">
        <p>No tienes cartas en el carrito.</p>
      </div>
      <ul v-else>
        <li v-for="(card, index) in cart" :key="index">
          {{ card.name }} - {{ card.price }}
          <button @click="removeFromCart(index)">Eliminar</button>
        </li>
      </ul>
      <button v-if="cart.length > 0" @click="checkout">Realizar Compra</button>
    </section>
  </template>
  
  <script>
  import axios from '../axios';
  
  export default {
    data() {
      return {
        cart: [], // Lista de cartas en el carrito
      };
    },
    methods: {
      removeFromCart(index) {
        this.cart.splice(index, 1);
      },
      async checkout() {
        try {
          const response = await axios.post('/checkout', { items: this.cart });
          alert('Compra realizada con éxito');
          this.cart = []; // Vaciar el carrito tras la compra
        } catch (error) {
          console.error('Error al realizar la compra:', error);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .cart {
    padding: 20px;
  }
  </style>
  