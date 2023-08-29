<template>
    <div class="ganancias">
        <v-card class="ma-3">
            <div>
                <v-btn @click="cambiarDatosGraficaPie()" variant="elevated" color="red">Pie</v-btn>
                <v-btn @click="cambiarDatosGraficaBar()" variant="elevated" color="green">Bar</v-btn>
                <canvas id="myChart"></canvas>
            </div>
        </v-card>
    </div>
</template>

<script>
import Chart from 'chart.js/auto'
import Axios from 'axios';
export default {
    name: 'gananciasVista',
    data: () => ({
        mes: null,
        semana: null,
        nombre: null,
        chart: null,



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
                        data: Array(52).fill().map(() => Math.floor(Math.random() * 100) + 1),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }

            }
            this.mes = {
                type: 'pie',
                data: {
                    labels: this.nombre,
                    datasets: [{
                        label: 'Productos mas Vendidos Mensuales',
                        data: Array(52).fill().map(() => Math.floor(Math.random() * 100) + 1),
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }

            }
            this.chart = new Chart(ctx, this.semana);
        },
        cambiarDatosGraficaPie() {
            this.chart.destroy();
            let ctx2 = document.getElementById('myChart');
            this.chart = new Chart(ctx2, this.mes);
        },
        cambiarDatosGraficaBar() {
            this.chart.destroy();
            let ctx3 = document.getElementById('myChart');
            this.chart = new Chart(ctx3, this.semana);
        }
    },

    async mounted() {
        await this.listarGrafica();

    }

}
</script>

<style></style>