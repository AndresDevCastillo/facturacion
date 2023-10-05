<template>
    <router-view />
</template>

<script>

export default {
    name: 'App',
    data: () => ({

    }),
    methods: {

    },
    mounted() {
    },
}
</script>

<style>
body,
html {
    height: 100vh !important;
}

:root {
    --bg-table-header: #f3f2f7;

}

.bg-table-header>tr>th {
    background-color: var(--bg-table-header) !important;
    font-weight: bold !important;
}

#app {
    height: 100%;
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
}
body.swal2-shown.swal2-height-auto{
    height: 100vh !important;
}
</style>
