<template>
    <div class="mis-anuncios">
      <h2>Mis Anuncios</h2>
      <div v-if="anuncios.length === 0">
        <p>No tienes anuncios publicados.</p>
      </div>
      <div v-else>
        <div v-for="anuncio in anuncios" :key="anuncio._id" class="anuncio">
          <h3>{{ anuncio.nombre }}</h3>
          <p>Tipo: {{ anuncio.tipo }}</p>
          <p>HP: {{ anuncio.hp }}</p>
          <p>Rareza: {{ anuncio.rareza }}</p>
          <p>Precio: ${{ anuncio.precio }}</p>
          <img :src="anuncio.imagen_url" alt="Imagen de la carta" />
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  import sessionStore from "../store/session";
  
  export default {
    data() {
      return {
        anuncios: [],
      };
    },
    mounted() {
      this.getMyAds();
    },
    methods: {
      async getMyAds() {
        try {
          const response = await axios.get(`http://localhost:8000/api/cards/user/${sessionStore.userId}`);
          this.anuncios = response.data;
        } catch (error) {
          console.error("Error al obtener los anuncios:", error);
        }
      },
    },
  };
  </script>
  