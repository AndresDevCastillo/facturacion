<template>
    <div class="ganancias">
        <v-row class="ma-6">
            <v-col md="12" sm="12">
                <v-card>
                    <canvas id="myChart"></canvas>
                </v-card>
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
        semana: null,
        nombre: null,
        chart: null,
        datosCharts: null,
        referenciaChart: null,



    }),
    methods: {
        async listarGrafica() {
            this.nombre = [];
            await Axios.get(`${process.env.VUE_APP_API_URL}/producto`).then(data => {
                data.data.map(producto => {
                    this.nombre.push(producto.nombre);
                });
            })

            let ctx = document.getElementById('myChart');
            this.semana = {
                type: 'bar',
                data: {
                    labels: this.nombre,
                    datasets: [{
                        label: 'Productos mas Vendidos Semanales',
                        data: this.datosCharts,
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

            this.chart = new Chart(ctx, this.semana);
        }
    },

    async mounted() {
        this.datosCharts = Array(52).fill().map(() => Math.floor(Math.random() * 100) + 1);
        this.referenciaChart = document.getElementById('myChart');
        await this.listarGrafica();

    }

}
</script>

<style></style>