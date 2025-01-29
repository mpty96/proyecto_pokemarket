<template>
  <div id="app">
    <header>
      <h1>PokeMarket</h1>
      <nav>
        <ul>
          <li><router-link to="/">Inicio</router-link></li>
          <li><router-link to="/carritocompras">Carrito de compras</router-link></li>
          <!-- Cambiar dinámicamente entre "Iniciar Sesión" y "Mi Perfil" -->
          <li v-if="!session.isLoggedIn"><router-link to="/login">Iniciar Sesión</router-link></li>
          <li v-else><router-link to="/perfil">Mi Perfil</router-link></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import sessionStore from "./store/session";

export default {
  name: "App",
  computed: {
    session() {
      return sessionStore; // Usamos el estado reactivo de sesión
    },
  },
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header {
  background: #2758df;
  color: #fff;
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

header h1 {
  margin: 0;
  font-size: 1.5rem;
}

nav ul {
  list-style: none;
  display: flex;
  gap: 20px;
  margin: 0;
  padding: 0;
}

nav a {
  color: #fff;
  text-decoration: none;
}

main {
  padding: 20px;
}
</style>
