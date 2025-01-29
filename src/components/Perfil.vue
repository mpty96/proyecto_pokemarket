<template>
    <div class="profile">
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {{ session.userName }}</p>
      <p><strong>Correo electrónico:</strong> {{ session.userEmail }}</p>
      <button @click="logout">Cerrar Sesión</button>
      <button @click="showModal = true" class="upload-button">Subir un anuncio</button>
      <button @click="goToMyAds" class="my-ads-button">Mis anuncios</button>
  
      <!-- Modal para subir un anuncio -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <h3>Subir un anuncio</h3>
          <form @submit.prevent="submitAd">
            <label for="nombre">Nombre de la carta:</label>
            <input type="text" v-model="ad.nombre" id="nombre" required />
  
            <label for="tipo">Tipo:</label>
            <input type="text" v-model="ad.tipo" id="tipo" required />
  
            <label for="hp">HP:</label>
            <input type="number" v-model="ad.hp" id="hp" required />
  
            <label for="rareza">Rareza:</label>
            <input type="text" v-model="ad.rareza" id="rareza" required />
  
            <label for="precio">Precio:</label>
            <input type="number" v-model="ad.precio" id="precio" required />
  
            <label for="imagen_url">URL de la Imagen:</label>
            <input type="url" v-model="ad.imagen_url" id="imagen_url" required />
  
            <button type="submit">Publicar Anuncio</button>
            <button type="button" @click="closeModal">Cancelar</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import sessionStore from "../store/session";
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  export default {
    data() {
      return {
        showModal: false, // Controla si el modal está abierto o cerrado
        ad: {
          nombre: "",
          tipo: "",
          hp: null,
          rareza: "",
          precio: null,
          imagen_url: "",
        },
      };
    },
    computed: {
      session() {
        return sessionStore;
      },
    },
    setup() {
      const router = useRouter();
  
      const logout = () => {
        sessionStore.logout();
        router.push("/"); // Redirige al inicio al cerrar sesión
      };
  
      const goToMyAds = () => {
        router.push("/mis-anuncios"); // Redirige a la página de "Mis anuncios"
      };
  
      return { logout, goToMyAds };
    },
    methods: {
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.ad = {
          nombre: "",
          tipo: "",
          hp: null,
          rareza: "",
          precio: null,
          imagen_url: "",
        };
      },
      async submitAd() {
        try {
          // Agrega el ID del usuario al anuncio
          const anuncioConUsuario = {
            ...this.ad,
            user_id: sessionStore.userId, // Obtiene el ID del usuario desde la sesión
          };
  
          await axios.post("http://localhost:8000/api/cards", anuncioConUsuario);
          alert("Anuncio publicado con éxito");
          this.closeModal();
        } catch (error) {
          console.error("Error al publicar el anuncio:", error);
          alert("Hubo un error al publicar el anuncio. Inténtalo nuevamente.");
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .profile {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
  }
  
  .upload-button {
    margin-top: 20px;
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  .upload-button:hover {
  background: #2345dd;
}

  .my-ads-button {
    display: block;
    margin: 10px auto;
    padding: 10px 20px;
    font-size: 16px;
    color: #fff;
    background: #275be7;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
  }

  .my-ads-button:hover {
  background: #e23737;
}
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    max-width: 90%;
  }
  
  form {
    display: flex;
    flex-direction: column;
  }
  
  label {
    margin: 10px 0 5px;
  }
  
  input,
  textarea {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    padding: 10px;
    margin-top: 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"] {
    background-color: #007bff;
    color: white;
  }
  
  button[type="button"] {
    background-color: #ffffff;
    color: white;
  }
  </style>
  
  
