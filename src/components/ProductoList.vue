<template>
  <div>
    <h2>Lista de Productos</h2>
    <input v-model="search" placeholder="Buscar por nombre" />
    
    <!-- Campo de entrada para precio mínimo -->
    <div>
      <label for="precio-minimo">Filtrar por precio mayor a:</label>
      <input
        type="number"
        id="precio-minimo"
        v-model.number="precioMinimo"
        placeholder="Ingrese precio mínimo"
      />
    </div>
    
    <table>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Categoría</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="producto in filteredProductos" :key="producto.id">
          <td>{{ producto.nombre }}</td>
          <td>{{ getCategoriaNombre(producto.categoriaId) }}</td>
          <td>{{ producto.precio }}</td>
          <td>
            <button @click="editProducto(producto)">Editar</button>
            <button @click="deleteProducto(producto.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Componente de Formulario para Agregar/Editar Producto -->
    <ProductoForm 
      v-if="selectedProducto" 
      :isEdit="isEditing" 
      :producto="selectedProducto" 
      @refresh="fetchProductos"
      @close="selectedProducto = null"
    />
  </div>
</template>

<script>
import axios from 'axios';
import ProductoForm from './ProductoForm.vue';

export default {
  components: { ProductoForm },
  data() {
    return {
      productos: [],
      categorias: [],
      search: '',
      precioMinimo: 0,
      selectedProducto: null,
      isEditing: false
    };
  },
  computed: {
    filteredProductos() {
      return this.productos
        .filter(p => p.nombre.toLowerCase().includes(this.search.toLowerCase()))
        .filter(p => p.precio > this.precioMinimo);
    }
  },
  created() {
    this.fetchProductos();
    this.fetchCategorias();
  },
  methods: {
    fetchProductos() {
      axios.get('http://localhost:3000/productos')
        .then(response => {
          this.productos = response.data;
        });
    },
    fetchCategorias() {
      axios.get('http://localhost:3000/categorias')
        .then(response => {
          this.categorias = response.data;
        });
    },
    getCategoriaNombre(categoriaId) {
      const categoria = this.categorias.find(c => c.id === categoriaId);
      return categoria ? categoria.nombre : 'Desconocido';
    },
    editProducto(producto) {
      this.selectedProducto = { ...producto };
      this.isEditing = true;
    },
    deleteProducto(id) {
      axios.delete(`http://localhost:3000/productos/${id}`)
        .then(() => this.fetchProductos());
    }
  }
};
</script>

<style scoped>
/* Estilos para el componente */
</style>
