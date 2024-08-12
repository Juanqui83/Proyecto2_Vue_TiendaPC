<template>
  <div>
    <h2>{{ isEdit ? 'Editar Producto' : 'Agregar Nuevo Producto' }}</h2>
    <form @submit.prevent="submitForm">
      <div>
        <label for="nombre">Nombre:</label>
        <input type="text" v-model="producto.nombre" required />
      </div>
      <div>
        <label for="categoria">Categoría:</label>
        <select v-model="producto.categoriaId" required>
          <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">
            {{ categoria.nombre }}
          </option>
        </select>
      </div>
      <div>
        <label for="precio">Precio:</label>
        <input type="number" v-model.number="producto.precio" required />
      </div>
      <button type="submit">{{ isEdit ? 'Guardar Cambios' : 'Crear Producto' }}</button>
      <button type="button" @click="cancelar">Cancelar</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    isEdit: Boolean,
    producto: Object,
  },
  data() {
    return {
      categorias: [],
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
    submitForm() {
      if (this.isEdit) {
        axios.put(`http://localhost:3000/productos/${this.producto.id}`, this.producto)
          .then(() => {
            this.$emit('refresh'); // Emitir el evento refresh para actualizar la lista
            this.$emit('close');
          });
      } else {
        axios.post('http://localhost:3000/productos', this.producto)
          .then(() => {
            this.$emit('refresh'); // Emitir el evento refresh para actualizar la lista
            this.$emit('close');
          });
      }
    },
    cancelar() {
      this.$emit('close');
    }
  }
};
</script>
