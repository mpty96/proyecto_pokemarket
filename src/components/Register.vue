<template>
    <div class="register-container">
      <h2>Registrarse</h2>
      <form @submit.prevent="register">
        <input
          v-model="name"
          type="text"
          placeholder="Nombre completo"
          required
        />
        <input
          v-model="email"
          type="email"
          placeholder="Correo electrónico"
          required
        />
        <input
          v-model="password"
          type="password"
          placeholder="Contraseña"
          required
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes una cuenta? 
      <button @click="goToLogin">Iniciar Sesión</button>
    </p>
    </div>
  </template>
  
  <script>
  import { useRouter } from "vue-router";
  import axios from "axios";
  
  export default {
    data() {
      return {
        name: "", // Campo para el nombre
        email: "",
        password: "",
      };
    },
    setup() {
      const router = useRouter();
  
      const goToLogin = () => {
      router.push("/login"); // Redirige a la ruta de inicio de sesión
    };

    return { goToLogin };
  },
    methods: {
      async register() {
        try {
          // Llamada al backend para registrar al usuario
          const response = await axios.post("http://localhost:8000/api/register", {
            name: this.name, // Se incluye el nombre
            email: this.email,
            password: this.password,
          });
  
          alert("Registro exitoso. Ahora puedes iniciar sesión.");
          this.$router.push("/register");
        } catch (error) {
          alert("Error al registrarse. Intenta nuevamente.");
        }
      },
    },
  };
  </script>

<style scoped>
/* Estilos para centrar el formulario en la pantalla */
.register-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh; /* Altura completa de la ventana */
  text-align: center;
  padding: 20px;
  box-sizing: border-box; /* Asegura que el padding no sume al ancho total */
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

button {
  width: auto;
  margin-top: 10px;
}
</style>
  