<template>
    <div class="ganancias">
        <v-row class="ma-6 mb-6">
            <v-col lg="12" md="12" sm="12">

                <canvas class="mb-6" id="graficaYear"></canvas>

            </v-col>
        </v-row>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
import Axios from 'axios';
export default {
    name: 'gananciasVista',
    data: () => ({
        year: null,
        dataYearName: null,
        dataYearCantidad: null,
        chart: null,
        datosCharts: null,
        referenciaChart: null,



    }),
    methods: {
        async listarGraficaYear(añoActual) {
            this.dataYearName = [];
            this.dataYearCantidad = [];
            await Axios.get(`${process.env.VUE_APP_API_URL}/factura/estadisticas/year/${añoActual}`).then(resp => {
                resp.data.map(producto => {
                    this.dataYearName.push(producto.nombre);
                    this.dataYearCantidad.push(producto.cantidad);
                })
            });
            let ctx = document.getElementById('graficaYear');
            this.year = {
                type: 'pie',
                data: {
                    labels: this.dataYearName,
                    datasets: [{
                        label: 'Productos mas Vendidos del Año',
                        data: this.dataYearCantidad,
                        borderWidth: 1
                    }]
                },
                options: {

                    scales: {
                        y: {
                            beginAtZero: true
                        },
                    },
                }

            }

            this.chart = new Chart(ctx, this.year);
        }
    },

    async mounted() {
        const fechaActual = new Date();
        const añoActual = fechaActual.getFullYear();
        // const mesActual = fechaActual.getMonth() + 1;
        this.referenciaChart = document.getElementById('graficaYear');
        await this.listarGraficaYear(añoActual);

    }

}
</script>

<style></style>