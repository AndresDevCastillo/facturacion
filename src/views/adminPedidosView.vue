<template>
    <div class="adminPedido">
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
                                    N. productos
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
                                <td class="text-left">{{ pedido.fecha }} - {{ pedido.hora }}</td>
                                <td class="text-left">{{ pedido.detalleTicket.length }}</td>
                                <td class="text-left">{{ pedido.mesa.nombre }}</td>
                                <td class="text-left">{{ pedido.empleado.nombre }}</td>
                                <td class="text-right">
                                    <v-btn color="red" density="comfortable" @click="eliminarPedido(pedido.ticket)">Eliminar
                                        pedido</v-btn>
                                </td>
                                <td> <v-btn color="blue" density="comfortable"
                                        @click="mostrarTicket(Object.assign({}, pedido))">
                                        ver
                                    </v-btn></td>

                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-card-text>
        </v-card>
        <ticket-cocinero-component :dialog2="dialogTicket" :ticket="ticketImpreso"
            @cerrarDialogoTicketCocinero="dialogTicket = false"></ticket-cocinero-component>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
import ticketCocineroComponent from '../components/ticketCocinero.vue'
export default {
    name: 'adminPedidosVista',
    components: {
        ticketCocineroComponent
    },
    data: () => ({
        dialogTicket: false,
        pedidos: [],
        api: process.env.VUE_APP_API_URL,
        ticketImpreso: {
            ticket: null,
            fecha: null,
            hora: null,
            detalleTicket: [],
            empleado: {},
            mesa: {},
        }
    }),
    methods: {
        async obtenerPedidos() {
            await axios.get(`${this.api}/pedido`).then(response => {
                this.pedidos = response.data;

            });
        },
        async eliminarPedido(ticket) {
            Swal.fire({
                icon: "info",
                title: "Seguro quiere eliminar el pedido?",
                showDenyButton: true,
                denyButtonText: "No",
                confirmButtonText: "Eliminar",
            })
                .then(async (result) => {
                    /* Read more about isConfirmed, isDenied below */
                    if (result.isConfirmed) {
                        await axios.delete(`${this.api}/pedido/${ticket}`).then(async () => {
                            Swal.fire({
                                icon: "success",
                                title: "Se elimino correctamente",
                                timer: 1000,
                                showConfirmButton: false,
                            });
                            await this.obtenerPedidos();
                        });
                    }
                })
                .catch(() => {
                    return Swal.fire({
                        icon: "error",
                        title: "No se pudo eliminar el gasto",
                        timer: 1000,
                    });
                });

        },
        mostrarTicket(ticket) {
            this.ticketImpreso = ticket;
            this.dialogTicket = true;
        }
    },
    async created() {
        this.$emit('loadingSweet');
        await this.obtenerPedidos();
        this.$emit('closeSweet');
    }
}
</script>