<template>
    <section id="catalog" class="catalog">
      <h2>Catálogo de Cartas</h2>
      <div class="card-grid">
        <div class="card" v-for="(card, index) in cards" :key="index">
          <img :src="card.image" :alt="card.name" />
          <h3>{{ card.name }}</h3>
          <p>Precio: {{ card.price }}</p>
          <button @click="addToCart(card)">Agregar al carrito</button>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import axios from '../axios'; // Importamos la instancia global de Axios
  
  export default {
    data() {
      return {
        cards: [], // Lista de cartas
      };
    },
    methods: {
      // Cargar las cartas desde el backend
      async fetchCards() {
        try {
          const response = await axios.get('/cards');
          this.cards = response.data; // Suponemos que el backend devuelve un array de cartas
        } catch (error) {
          console.error('Error al cargar las cartas:', error);
        }
      },
      addToCart(card) {
        alert(`${card.name} agregado al carrito`);
      },
    },
    mounted() {
      this.fetchCards(); // Llamamos al método al montar el componente
    },
  };
  </script>
  
  
  <style scoped>
  .catalog {
    padding: 20px;
  }
  
  .catalog .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
  }
  
  .card {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    padding: 10px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }
  
  .card img {
    max-width: 100%;
    height: auto;
  }
  
  .card h3 {
    font-size: 1.2rem;
    margin: 10px 0;
  }
  
  .card button {
    background-color: #ffcc00;
    border: none;
    color: #333;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  .card button:hover {
    background-color: #ff9900;
  }
  </style>
  