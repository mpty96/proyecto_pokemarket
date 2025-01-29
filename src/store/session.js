import { reactive } from "vue";

const sessionStore = reactive({
  isLoggedIn: false,
  userName: "",
  userEmail: "",

  login(name, email) {
    this.isLoggedIn = true;
    this.userName = name;
    this.userEmail = email;
    localStorage.setItem("user", JSON.stringify({ name, email })); // Guarda los datos en el almacenamiento local
  },

  logout() {
    this.isLoggedIn = false;
    this.userName = "";
    localStorage.removeItem("user"); // Limpia el almacenamiento local
  },

  checkLogin() {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      this.isLoggedIn = true;
      this.userName = user.name;
    } else {
      this.isLoggedIn = false;
      this.userName = "";
    }
  },
});

export default sessionStore;

