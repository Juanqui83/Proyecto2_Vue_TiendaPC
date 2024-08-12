<template>
  <div>
    <h1>Categorías</h1>
    <CategoriaList />
    <CategoriaForm :isEdit="false" :categoria="{ nombre: '' }" @refresh="fetchCategorias" />
  </div>
</template>

<script>
import CategoriaList from '../components/CategoriaList.vue';
import CategoriaForm from '../components/CategoriaForm.vue';

export default {
  components: { CategoriaList, CategoriaForm }
};
</script>
