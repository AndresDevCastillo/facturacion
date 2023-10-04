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
import barraHome from '../components/barraHome.vue';
export default{
    name:'inicioView',
    components: {
        barraHome
    },
}
</script>