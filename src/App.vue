<template>
  <h1>Hola</h1>
  <NarvarHome />
</template>

<script>
import NarvarHome from '@/components/Narvar.vue'

export default {
  name: 'App',
  components: {
    NarvarHome,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
