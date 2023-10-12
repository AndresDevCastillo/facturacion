<template>
    <v-card>
        <v-layout>
            <barra-home></barra-home>
            <v-main>
                <router-view @loadingSweet="loadingSweet" @closeSweet="closeSweet"></router-view>
            </v-main>
        </v-layout>
    </v-card>
</template>
<script>
import barraHome from '../components/barraHome.vue';
import Swal from 'sweetalert2';
export default {
    name: 'inicioView',
    components: {
        barraHome
    },
    data: () => ({
        alerta: null
    }),
    methods: {
        loadingSweet() {
            this.alerta = Swal.fire({
                text: 'Cargando, por favor, espere...',
                timerProgressBar: true,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                },
                customClass: {
                    popup: 'loader'
                }
            });
        },
        closeSweet() {
            Swal.close();
        }
    }
}
</script>
<style>
div:where(.swal2-container).swal2-backdrop-show,
div:where(.swal2-container).swal2-noanimation {
    background: rgba(0, 0, 0, .6) !important;
}

.loader {
    background: transparent;
    color: #FFF;
}

div:where(.swal2-container) div:where(.swal2-loader) {
    border-top-color: #FFF;
    border-bottom-color: #000;
}
</style>