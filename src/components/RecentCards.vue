<template>
  <section id="recent-cards" class="recent-cards">
    <h2>Cartas Añadidas Recientemente</h2>

    <!-- Campo de búsqueda -->
    <div class="search-container">
      <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar carta..."
        @input="searchCards"
      />
    </div>

    <div class="card-container" v-if="filteredCards.length > 0">
      <div class="card" v-for="(card, index) in filteredCards" :key="index">
        <img :src="card.imagen_url" :alt="card.nombre" />
        <h3>{{ card.nombre }}</h3>
        <p>Tipo: {{ card.tipo }}</p>
        <p>HP: {{ card.hp }}</p>
        <p>Rareza: {{ card.rareza }}</p>
        <p>Precio: ${{ card.precio }} CLP</p>
        <button @click="addToCart(card)">Comprar</button>
      </div>
    </div>
  </section>
</template>

<script>
import { useCarritoStore } from "../store/store";
import axios from "axios";

export default {
  data() {
    return {
      cards: [],
      searchQuery: "",
      filteredCards: [],
      loading: true,
      error: "",
    };
  },

  setup() {
    const cartStore = useCarritoStore();

    // Método para agregar una carta al carrito
    const addToCart = (card) => {
      cartStore.agregarAlCarrito(card); // Usa la acción del store
      alert(`${card.nombre} ha sido añadida al carrito.`);
    };

    return {
      addToCart,
    };
  },

  methods: {
    async fetchCards() {
      try {
        const response = await axios.get("http://localhost:8000/api/cards");
        this.cards = response.data;
        this.filteredCards = this.cards;  // Inicialmente mostramos todas las cartas
        console.log("Cartas cargadas: ", this.cards);  // Verifica que las cartas estén llegando correctamente
        this.loading = false;
      } catch (err) {
        this.error = "No se pudieron cargar las cartas. Intenta nuevamente.";
        this.loading = false;
      }
    },

    searchCards() {
      console.log("Búsqueda activada, query:", this.searchQuery);  // Verifica lo que el usuario está buscando

      if (this.searchQuery.trim() === "") {
        this.filteredCards = this.cards;  // Si no hay búsqueda, mostramos todas las cartas
      } else {
        this.filteredCards = this.cards.filter((card) => {
          // Convertimos todos los valores a minúsculas para comparar sin importar mayúsculas/minúsculas
          const query = this.searchQuery.toLowerCase();

          const matchesNombre = card.nombre.toLowerCase().includes(query);
          const matchesTipo = card.tipo.toLowerCase().includes(query);
          const matchesRareza = card.rareza.toLowerCase().includes(query);
          const matchesHp = card.hp.toString().includes(query);  // Convertir hp a string para comparar
          const matchesPrecio = card.precio.toString().includes(query); // Convertir precio a string para comparar

          return matchesNombre || matchesTipo || matchesRareza || matchesHp || matchesPrecio;
        });
      }
      
      
      console.log("Cartas filtradas: ", this.filteredCards);  // Verifica que las cartas filtradas estén cambiando correctamente
    },
  },

  // El hook `mounted()` se coloca aquí
  mounted() {
    this.fetchCards();  // Llama a la función que obtiene las cartas al montar el componente
  },
};
</script>

<style scoped>
.cards-container {
  display: flex;
  flex-wrap: wrap; /* Permite que las cartas salten a la siguiente fila si no caben */
  gap: 20px; /* Espacio entre las cartas */
  justify-content: flex-start; /* Alinea las cartas al inicio (izquierda) */
  padding: 20px;
}

.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  padding: 15px;
  text-align: center;
  background: #fff; /* Fondo blanco solo para la carta */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 200px; /* Ancho máximo de la carta */
  flex: 0 0 calc(25% - 20px); /* Cuatro cartas por fila con espacio entre ellas */
  box-sizing: border-box;
}

.search-container {
  margin-bottom: 20px;
  text-align: center;
}

.search-container input {
  padding: 8px;
  font-size: 16px;
  width: 200px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
.card img {
  max-width: 100%; /* Ajusta el tamaño de la imagen al contenedor */
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
  background: #2263db;
}

/* Ajustes para pantallas medianas */
@media (max-width: 768px) {
  .card {
    flex: 0 0 calc(50% - 20px); /* Dos cartas por fila en pantallas medianas */
  }
}

/* Ajustes para pantallas pequeñas */
@media (max-width: 480px) {
  .card {
    flex: 0 0 100%; /* Una carta por fila en pantallas pequeñas */
  }
}
</style>


  