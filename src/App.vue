<template>
  <div id="app">
    <Header />
    <Banner />
    <Catalog />
    <Cart />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Banner from './components/Banner.vue';
import Catalog from './components/Catalog.vue';
import Cart from './components/Cart.vue';
import Footer from './components/Footer.vue';

export default {
  components: {
    Header,
    Banner,
    Catalog,
    Cart,
    Footer,
  },
};
</script>

<style>
/* Estilos generales */
body {
  font-family: Arial, sans-serif;
}
</style>

