<template>
    <v-card class="ma-3">
        <v-card-title>
            <v-row class="px-6 my-4">
                <v-col cols="12">
                    <v-row class="align-center" no-gutters>
                        <v-icon size="x-large" icon="mdi mdi-order-bool-descending-variant"></v-icon>
                        <h1 class="px-3">Pedidos</h1>
                    </v-row>
                </v-col>
            </v-row>
        </v-card-title>
        <v-card-text>
            <div class="table-responsive">
                <v-table fixed-header fixed-footer class="w-100">
                    <thead style="z-index: 999999;" class="bg-table-header">
                        <tr>
                            <th class="text-left">
                                # pedido
                            </th>
                            <th class="text-left">
                                Fecha
                            </th>
                            <th class="text-left">
                                # productos
                            </th>
                            <th class="text-left">
                                Mesa
                            </th>
                            <th class="text-left">
                                Empleado
                            </th>
                            <th colspan="2" class="text-center">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="pedidos.length == 0">
                            <td colspan="6" class="text-center">Sin pedidos</td>
                        </tr>
                        <tr v-for="(pedido, index) in pedidos" :key="index">
                            <td class="text-left">{{ pedido.ticket }}</td>
                            <td class="text-left">{{ pedido.fechaP }} - {{ pedido.hora }}</td>
                            <td class="text-left">{{ pedido.detalleTicket.length }}</td>
                            <td class="text-left">{{ pedido.mesa.nombre }}</td>
                            <td class="text-left">{{ pedido.empleado.nombre }}</td>
                            <td>
                                <v-btn color="red" density="comfortable" @click="eliminarPedido(pedido.ticket)">Eliminar
                                    pedido</v-btn>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </div>
        </v-card-text>
    </v-card>
</template>
<script>
import axios from 'axios'
export default {
    name: 'adminPedidosVista',
    data: () => ({
        pedidos: [],
        api: process.env.VUE_APP_API_URL,
    }),
    methods: {
        async obtenerPedidos() {
            await axios.get(`${this.api}/pedido`).then(response => {
                response.data.map(pedido => {
                    const fechaCompleta = pedido.fecha;
                    const [fechaP, horaE] = fechaCompleta.split('T');
                    const [hora] = horaE.split('.', 1);
                    this.pedidos.push({
                        ...pedido,
                        fechaP,
                        hora
                    })
                });

            });
        },
        async eliminarPedido(ticket) {
            await axios.delete(`${this.api}/pedido/${ticket}`).then(() => {
                this.obtenerPedidos();
            });
        }
    },
    async created() {
        this.$emit('loadingSweet');
        await this.obtenerPedidos();
        this.$emit('closeSweet');
    }
}
</script>