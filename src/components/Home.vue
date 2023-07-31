<template>
    <div>

        <p>Home</p>

    </div>
</template>
  
<script>
export default {
    name: 'HomePrincipal',
    components: {
    },
    data: () => ({
        drawer2: true,
        group: null,
    }),
    methods: {
        cambiarVista() {
            this.$router.push('/saludo');
        }
    },
}
</script>

<style>
.items-bar>.v-list-item__content>.v-list-item-title {
    font-size: 1.4rem;
    padding-top: 10px;
    text-align: left;
}
</style>