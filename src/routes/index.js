import { createRouter, createWebHistory } from "vue-router";
import RecentCards from "../components/RecentCards.vue";
import CarritoCompras from "../components/CarritoCompras.vue";
import Login from "../components/Login.vue";
import Register from "../components/Register.vue";
import Perfil from "../components/Perfil.vue";
import MisAnuncios from "../components/MisAnuncios.vue";

const routes = [
  { path: "/", component: RecentCards, name: "Inicio" },
  { path: "/carritocompras", component: CarritoCompras, name: "CarritoCompras" },
  { path: "/login", component: Login, name: "Login" },
  { path: "/register", component: Register, name: "Register"},
  { path: "/perfil", component: Perfil, name: "Perfil"},
  { path: "/mis-anuncios", component: MisAnuncios, name: "MisAnuncios"}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
