<template>
  <div>
    <h1>Productos</h1>
    <ProductoList />
    <ProductoForm :isEdit="false" :producto="{ nombre: '', categoriaId: null, precio: 0 }" @refresh="fetchProductos" />
  </div>
</template>

<script>
import ProductoList from '../components/ProductoList.vue';
import ProductoForm from '../components/ProductoForm.vue';

export default {
  components: { ProductoList, ProductoForm }
};
</script>
