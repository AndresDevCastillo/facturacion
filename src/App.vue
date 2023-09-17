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

.bg-table-header>tr>th {
    background-color: var(--bg-table-header) !important;
    font-weight: bold !important;
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

.fw-bold-important {
    font-weight: bold !important;
}

.cursor-pointer {
    cursor: pointer;

}

.no-select {
    user-select: none !important;
}

.cursor-not-allowed {
    cursor: not-allowed !important;
}

.no-pointer-events {
    pointer-events: none !important;
}

.divider-dotted {
    border-style: dotted !important;
}

/* Para que las alertas de Swal se vean adelante de los dialogs */
.swal2-container.swal2-backdrop-show {
    z-index: 99999 !important;
}</style>
