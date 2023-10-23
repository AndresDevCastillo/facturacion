<template>
    <div class="cocinero">
        <v-card class="ma-3">
            <v-card-title>
                <v-row class="px-6 my-4">
                    <v-col cols="12">
                        <v-row class="align-center" no-gutters>
                            <v-icon size="x-large" icon="mdi mdi-chef-hat"></v-icon>
                            <h1 class="px-3">Pedidos</h1>
                        </v-row>
                    </v-col>
                </v-row>
            </v-card-title>
            <v-card-text>
                <div class="table-responsive">
                    <v-table fixed-header fixed-footer class="w-100">
                        <thead style="z-index: 1000;" class="bg-table-header">
                            <tr>
                                <th class="text-left">
                                    # pedido
                                </th>
                                <th class="text-left">
                                    Plato
                                </th>
                                <th class="text-left">
                                    Nota
                                </th>
                                <th class="text-left">Mesa</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-if="pedidosTabla.length == 0">
                                <td colspan="7" class="text-center">Sin pedidos</td>
                            </tr>
                            <tr v-for="(pedido, index) in pedidosTabla" :key="index">
                                <td class="text-left">{{ pedido.ticket }}</td>
                                <td>
                                    {{ pedido.plato }}
                                </td>
                                <td>
                                    {{ pedido.nota }}
                                </td>
                                <td>{{ pedido.mesa }}</td>
                            </tr>
                        </tbody>
                    </v-table>
                </div>
            </v-card-text>
        </v-card>
    </div>
</template>
<script>
import axios from 'axios'
import Swal from 'sweetalert2';
//import ticketComponent from "../components/ticket.vue";


export default {
    name: 'adminFacturasVista',
    components: {

    },
    data: () => ({
        disableBtn: false,
        pedidos: [],
        pedidosTabla: [],
        api: process.env.VUE_APP_API_URL,
        items: [],
    }),
    methods: {
        async obtenerPedidos() {

            await axios.get(`${this.api}/pedido/cocinero`).then(response => {
                this.pedidosTabla = [];
                this.pedidos = response.data;
                this.pedidos.forEach(pedido => {
                    const t = pedido.ticket.toString().length;
                    pedido.detalleTicket.forEach(detalle => {
                        detalle.comentario.forEach(com => {
                            this.pedidosTabla.push({ ticket: (t == 1 ? '000' : t == 2 ? '00' : t == 3 ? '0' : '') + pedido.ticket, plato: `${detalle.producto.nombre} - ${detalle.producto.descripcion}`, nota: com, mesa: pedido.mesa.nombre });
                        });
                    });
                });
            });
            setInterval(() => {
                this.obtenerPedidos();
            }, 30000);
        },
        eliminarFacturaDialog(id = null) {
            if (id) {
                this.formEliminarFactura.id = parseInt(id);
                this.dialogEliminarFactura = true;
            }
        },
        async eliminarFactura() {
            const { valid } = await this.$refs.formEliminarFactura.validate();
            if (valid) {
                this.disableBtn = true;
                this.formEliminarFactura.razon = this.formEliminarFactura.razon.trim();
                await axios.put(`${this.api}/factura/eliminar`, this.formEliminarFactura).then(response => {
                    const m = response.data ? 'Factura eliminada' : 'No se pudo eliminar';
                    const i = response.data ? 'success' : 'error';
                    Swal.fire({ text: m, icon: i, showConfirmButton: false, timer: 1500 });
                    this.dialogEliminarFactura = false;
                }).catch(error => {
                    console.log(error);
                    Swal.fire({ text: 'Sucedio algo eliminando, inténtelo nuevamente', icon: 'error', showConfirmButton: false, timer: 1600 });
                });
                this.obtenerFacturas();
                this.disableBtn = false;
            }

            /*     Swal.fire({
                    icon: "info",
                    title: "Seguro quiere eliminar el la factura?",
                    showDenyButton: true,
                    denyButtonText: "No",
                    confirmButtonText: "Eliminar",
                })
                    .then(async (result) => {
                        /* Read more about isConfirmed, isDenied below 
                        if (result.isConfirmed) {
                            await axios.delete(`${this.api}/factura/${codigo}`).then(async () => {
                                Swal.fire({
                                    icon: "success",
                                    title: "Se elimino correctamente",
                                    timer: 1000,
                                    showConfirmButton: false,
                                });
                                this.facturaId = null;
                                await this.obtenerFacturas();
                            });
                        }
                    })
                    .catch(() => {
                        return Swal.fire({
                            icon: "error",
                            title: "No se pudo eliminar la factura",
                            timer: 1000,
                        });
                    });
     */
        },
        verPedido(index) {
            const pedido = this.pedidos[index];
            pedido.detalleTicket.forEach(detalle => {
                this.items.push({ type: 'subheader', title: `${detalle.producto.nombre}: ${detalle.producto.descripcion}` });
                console.log(detalle.cantidad);
                detalle.comentario.forEach((comen, index) => {
                    this.items.push({ title: `Plato ${index + 1}: \nNota: ${comen}` });
                });
                this.items.push({ type: 'divider' });
            });
            this.dialogPedido = true;
        },
        async verFacturaGeneral() {
            this.$emit('loadingSweet');
            await axios.get(`${process.env.VUE_APP_API_URL}/factura/${this.facturaId}`).then(resp => {
                if (resp.data.response) {
                    return Swal.fire({
                        icon: "error",
                        title: "No se pudo encontrar la factura",
                        timer: 1000,
                    });
                }
                else {
                    this.$emit('closeSweet');
                    this.verFactura(resp.data);
                }
            });
            this.$emit('closeSweet');
        }

    },
    async created() {
        this.$emit('loadingSweet');
        await this.obtenerPedidos();
        this.$emit('closeSweet');
    }
}
</script>
