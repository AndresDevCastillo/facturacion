<template>
    <v-card class="ma-3">
        <v-row class="d-flex align-center px-6">

            <v-col cols="4" md="4">
                <v-text-field single-line variant="underlined" label="Buscar producto" append-inner-icon="mdi-magnify"
                    class="ma-3"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">

            </v-col>
            <v-col cols="2" md="2">
                <v-btn prepend-icon="mdi-plus" color="green">Producto</v-btn>
            </v-col>
            <v-col cols="2" md="2">
                <v-btn prepend-icon="mdi-plus" color="yellow">Categoria</v-btn>
            </v-col>

        </v-row>

    </v-card>
</template>

<script>
export default {
    name: 'productosVista'


}
</script>

<style></style>