<template>
    <div>
      <h2>Lista de Categorías</h2>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="categoria in categorias" :key="categoria.id">
            <td>{{ categoria.nombre }}</td>
            <td>
              <button @click="editCategoria(categoria)">Editar</button>
              <button @click="deleteCategoria(categoria.id)">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <CategoriaForm v-if="selectedCategoria" :isEdit="true" :categoria="selectedCategoria" @refresh="fetchCategorias" />
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import CategoriaForm from './CategoriaForm.vue';
  
  export default {
    components: { CategoriaForm },
    data() {
      return {
        categorias: [],
        selectedCategoria: null
      };
    },
    created() {
      this.fetchCategorias();
    },
    methods: {
      fetchCategorias() {
        axios.get('http://localhost:3000/categorias')
          .then(response => {
            this.categorias = response.data;
          });
      },
      editCategoria(categoria) {
        this.selectedCategoria = { ...categoria };
      },
      deleteCategoria(id) {
        axios.delete(`http://localhost:3000/categorias/${id}`)
          .then(() => this.fetchCategorias());
      }
    }
  };
  </script>
  