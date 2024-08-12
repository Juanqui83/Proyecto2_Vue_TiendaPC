<template>
    <div>
      <h2>{{ isEdit ? 'Editar Categoría' : 'Nueva Categoría' }}</h2>
      <form @submit.prevent="submitForm">
        <div>
          <label>Nombre:</label>
          <input v-model="categoria.nombre" required />
        </div>
        <button type="submit">{{ isEdit ? 'Actualizar' : 'Crear' }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['isEdit', 'categoria'],
    methods: {
      submitForm() {
        if (this.isEdit) {
          axios.put(`http://localhost:3000/categorias/${this.categoria.id}`, this.categoria)
            .then(() => this.$emit('refresh'));
        } else {
          axios.post('http://localhost:3000/categorias', this.categoria)
            .then(() => this.$emit('refresh'));
        }
      }
    }
  };
  </script>
  