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
                timerProgressBar: true,
                showConfirmButton: false,
                allowEscapeKey: false,
                allowOutsideClick: false,
                didOpen: () => {
                    Swal.showLoading();
                }
            });
        },
        closeSweet() {
            Swal.close();
        }
    }
}
</script>