<template>
    <v-card>
        <v-layout>
            <v-app-bar theme="dark" prominent app>
                <v-app-bar-nav-icon variant="text" @click.stop="drawer = !drawer"></v-app-bar-nav-icon>

                <v-toolbar-title>Nombre empresa</v-toolbar-title>

                <v-spacer></v-spacer>

                <v-btn variant="text" icon="mdi-magnify"></v-btn>

                <v-btn variant="text" icon="mdi-filter"></v-btn>

                <v-btn variant="text" icon="mdi-dots-vertical"></v-btn>
            </v-app-bar>
            <v-navigation-drawer app theme="dark" v-model="drawer">
                <v-list>
                    <v-list-item prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg" title="Andres Peréz"
                        subtitle="AndresP07@gmailcom"></v-list-item>
                </v-list>

                <v-divider></v-divider>

                <v-list density="comfortable" nav>
                    <v-list-item prepend-icon="mdi mdi-folder" title="Facturación" value="myfiles"
                        class="items-bar"></v-list-item>
                    <v-list-item prepend-icon="mdi-account-multiple" @click="cambiarVista()" title="Shared with me" value="shared"
                        class="items-bar"></v-list-item>
                    <v-list-item prepend-icon="mdi-star" title="Starred" value="starred" class="items-bar"></v-list-item>
                </v-list>
            </v-navigation-drawer>
            <v-main>
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>

export default {
    name: 'App',
    components: {
    },
    data: () => ({

        drawer: true
    }),
    methods:{
        
    },
    mounted() {
       // this.$router.push('/inicio');
    },
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
