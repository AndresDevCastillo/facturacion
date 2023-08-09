<template>
    <v-app-bar theme="dark" prominent app>
        <v-app-bar-nav-icon variant="text" @click.stop="ocultar = !ocultar"></v-app-bar-nav-icon>

        <v-toolbar-title><router-link to="/" class="Titulo-Home">Empresa X</router-link></v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn variant="text" icon="mdi-magnify"></v-btn>

        <v-btn variant="text" icon="mdi mdi-bell"></v-btn>

        <v-btn variant="text" icon="mdi mdi-help"></v-btn>
    </v-app-bar>
    <v-navigation-drawer app theme="dark" :rail=ocultar>
        <v-list>
            <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Andrea López"
                subtitle="Empleado"></v-list-item>
        </v-list>

        <v-divider></v-divider>

        <v-list density="comfortable" nav>
            <v-list-item prepend-icon="mdi mdi-cash-plus" title="Facturación" class="items-bar" to="/factura"></v-list-item>
            <v-list-item prepend-icon="mdi mdi-cart" title="Productos" class="items-bar" to="/productos"></v-list-item>
            <v-list-item prepend-icon="mdi-account-tie" title="Empleados" class="items-bar"></v-list-item>
            <v-list-item prepend-icon="mdi-star" title="Starred" class="items-bar"></v-list-item>
        </v-list>
        <v-footer class="d-flex flex-column" v-if=!ocultar style="position: absolute;
        bottom: 0; width: 100%;">
            <div class="d-flex w-100 align-center px-2">

                <v-btn v-for="icon in icons" :key="icon" class="mx-2" :icon="icon" variant="plain" size="small"></v-btn>
            </div>

            <div class=" py-2  text-center w-100">
                {{ new Date().getFullYear() }} — Engineersoft
            </div>
        </v-footer>
    </v-navigation-drawer>
</template>

<script>

export default {
    name: 'barraHome',
    components: {

    },
    data: () => ({

        ocultar: false,
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
    methods: {

    },
    mounted() {
    },
}
</script>

<style >
.v-main {
    min-height: 700px !important;
}



.items-bar>.v-list-item__content>.v-list-item-title {
    padding: 10px 0;
}

.items-bar>.v-list-item__content>.v-list-item-title {
    font-size: 1.2rem;
    padding-top: 10px;
    text-align: left;
}



.Titulo-Home {
    text-decoration: none;
    color: white;
}
</style>