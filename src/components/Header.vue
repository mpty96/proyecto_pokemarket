<template>
    <header>
      <div class="logo">PokeMarket</div>
      <nav>
        <ul>
          <li><a href="#home">Inicio</a></li>
          <li><a href="#catalog">Catálogo</a></li>
          <li><a href="#cart">Carrito</a></li>
        </ul>
      </nav>
    </header>
  </template>
  
  <style scoped>
  header {
    background-color: #ffcc00;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
  }
  
  header .logo {
    font-size: 1.5rem;
    font-weight: bold;
  }
  
  header nav ul {
    display: flex;
    list-style: none;
  }
  
  header nav ul li {
    margin: 0 10px;
  }
  
  header nav ul li a {
    text-decoration: none;
    color: #333;
    font-weight: bold;
  }
  </style>
  