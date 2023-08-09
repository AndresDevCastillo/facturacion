<template>
    <v-card>
        <v-layout>
            <barra-home></barra-home>
            <v-main>
                <router-view></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>

<script>
import barraHome from './components/barraHome.vue';
export default {
    name: 'App',
    components: {
        barraHome
    },
    data: () => ({

    }),
    methods: {

    },
    mounted() {
        // this.$router.push('/inicio');
    },
}
</script>

<style>
:root {
    --bg-table-header: #f3f2f7;
}

#app {

    color: #2c3e50;
}

.bg-table-header>tr>th {
    background-color: var(--bg-table-header) !important;
    font-weight: bold !important;
}

.fw-600 {
    font-weight: 600;
}

.fw-bold {
    font-weight: bold;
}

.divider-dotted {
    border-style: dotted !important;
}</style>
