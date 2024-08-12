import { createRouter, createWebHistory } from 'vue-router';
import Productos from '../views/Productos.vue';
import Categorias from '../views/Categorias.vue';

const routes = [
  { path: '/', redirect: '/productos' },  // Redirige la raíz a /productos
  { path: '/productos', name: 'Productos', component: Productos },
  { path: '/categorias', name: 'Categorias', component: Categorias }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
