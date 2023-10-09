<template>
    <div class="ganancias">
        <v-row class="ma-6 mb-6">
            <v-col lg="6" md="6" sm="12">
                <canvas class="mb-6" id="graficaDia"></canvas>
            </v-col>
            <v-col lg="6" md="6" sm="12">
                <canvas class="mb-6" id="graficaMes"></canvas>
            </v-col>
            <v-col lg="12" md="12" sm="12">
                <canvas class="mb-6" id="graficaYear"></canvas>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import Chart from "chart.js/auto";
import Axios from "axios";
export default {
    name: "gananciasVista",
    data: () => ({
        year: null,
        dataYearName: null,
        dataYearCantidad: null,
        dataMesName: null,
        dataMesCantidad: null,
        dataDiaName: null,
        dataDiaCantidad: null,
        chart: null,
        datosCharts: null,
    }),
    methods: {
        async listarGraficaYear(year) {
            this.dataYearName = [];
            this.dataYearCantidad = [];
            await Axios.get(
                `${process.env.VUE_APP_API_URL}/factura/estadisticas/year/${year}`
            ).then((resp) => {
                resp.data.map((producto) => {
                    this.dataYearName.push(producto.nombre);
                    this.dataYearCantidad.push(producto.cantidad);
                });
            });
            let ctx = document.getElementById("graficaYear");
            this.year = {
                type: "bar",
                data: {
                    labels: this.dataYearName,
                    datasets: [
                        {
                            label: "Ventas totales",
                            data: this.dataYearCantidad,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Ventas Anuales',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            this.chart = new Chart(ctx, this.year);
        },
        async listarGraficaMes(year, mes) {
            this.dataMesName = [];
            this.dataMesCantidad = [];
            await Axios.get(
                `${process.env.VUE_APP_API_URL}/factura/estadisticas/mes/${year}/${mes}`
            ).then((resp) => {
                resp.data.map((producto) => {
                    this.dataMesName.push(producto.nombre);
                    this.dataMesCantidad.push(producto.cantidad);
                });
            });
            let ctx = document.getElementById("graficaMes");
            this.year = {
                type: "pie",
                data: {
                    labels: this.dataMesName,
                    datasets: [
                        {
                            label: "Ventas totales",
                            data: this.dataMesCantidad,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Ventas Mensuales',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            this.chart = new Chart(ctx, this.year);
        },
        async listarGraficaDia(year, mes, dia) {
            this.dataDiaName = [];
            this.dataDiaCantidad = [];
            await Axios.get(
                `${process.env.VUE_APP_API_URL}/factura/estadisticas/dia/${year}/${mes}/${dia}`
            ).then((resp) => {
                resp.data.map((producto) => {
                    this.dataDiaName.push(producto.nombre);
                    this.dataDiaCantidad.push(producto.cantidad);
                });
            });
            let ctx = document.getElementById("graficaDia");
            this.dia = {
                type: "polarArea",
                data: {
                    labels: this.dataDiaName,
                    datasets: [
                        {
                            label: "Ventas totales",
                            data: this.dataDiaCantidad,
                            borderWidth: 1,
                        },
                    ],
                },
                options: {
                    plugins: {
                        title: {
                            display: true,
                            text: 'Ventas Diarias',
                        },
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                        },
                    },
                },
            };

            this.chart = new Chart(ctx, this.dia);
        },
    },

    async mounted() {
        const fechaActual = new Date();
        const year = fechaActual.getFullYear();
        const mes = fechaActual.getMonth() + 1;
        const hoy = fechaActual.getDate();
        const dia = hoy.toString().padStart(2, '0');
        await this.listarGraficaYear(year);
        await this.listarGraficaMes(year, mes);
        await this.listarGraficaDia(year, mes, dia);
    },
};
</script>

<style></style>
