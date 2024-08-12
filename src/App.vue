<template>
  <div id="app">
    <nav>
      <router-link to="/productos">Productos</router-link>
      <router-link to="/categorias">Categorías</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
};
</script>

<style>
/* Estilos personalizados */
</style>
