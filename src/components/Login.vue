<template>
  <div class="login-wrapper">
    <!-- Si el usuario está logueado, muestra el mensaje de bienvenida -->
    <div v-if="session.isLoggedIn" class="welcome-container">
      <h2>Bienvenido entrenador, {{ session.userName }}!</h2>
      <button @click="logout">Cerrar Sesión</button>
    </div>
    <!-- Si no está logueado, muestra el formulario de inicio de sesión -->
    <div v-else class="login-container">
      <h2>Iniciar Sesión</h2>
      <form @submit.prevent="login">
        <input v-model="email" type="email" placeholder="Correo electrónico" required />
        <input v-model="password" type="password" placeholder="Contraseña" required />
        <button type="submit">Iniciar Sesión</button>
      </form>
      <p class="register-question">
        ¿No tienes una cuenta? 
        <button @click="goToRegister">Registrarse</button>
      </p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import sessionStore from "../store/session";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  computed: {
    session() {
      return sessionStore; // Usamos el estado reactivo desde el store
    },
  },
  methods: {
    async login() {
  try {
    const response = await axios.post("http://localhost:8000/api/login", {
      email: this.email,
      password: this.password,
    });

    // Verifica que la respuesta tenga los datos del usuario
    if (response.data.user) {
      const user = {
        name: response.data.user.name, // Nombre del usuario
        email: response.data.user.email, // Correo electrónico del usuario
      };

      // Guardar en localStorage
      localStorage.setItem("user", JSON.stringify(user));

      // Actualizar el estado de sesión en Pinia
      sessionStore.isLoggedIn = true;
      sessionStore.userName = user.name;
      sessionStore.userEmail = user.email
    }
     else {
      alert("No se encontraron datos del usuario.");
    }
  } catch (error) {
    alert("Error al iniciar sesión. Verifica tus credenciales.");
  }
},

    logout() {
      sessionStore.logout(); // Limpia el estado de sesión
    },
    goToRegister() {
      this.$router.push("/register"); // Redirige a la página de registro si el usuario lo solicita
    },
  },
};
</script>

<style scoped>
/* Estilos para centrar el formulario de inicio de sesión en la pantalla */
.login-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Ocupa el 100% de la altura de la ventana */
  padding: 20px;
  box-sizing: border-box;
}

form {
  width: 100%;
  max-width: 400px; /* Tamaño máximo del formulario */
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  box-sizing: border-box; /* Asegura que el padding se quede dentro del ancho total */
}

input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  box-sizing: border-box; /* Asegura que el padding no afecte el ancho total */
}

button:hover {
  background-color: #0056b3;
}

p {
  margin-top: 15px;
}

.register-question {
  margin-top: 15px;
  text-align: center; /* Centra el contenido */
}

button {
  width: auto;
  margin-top: 10px;
}
</style>