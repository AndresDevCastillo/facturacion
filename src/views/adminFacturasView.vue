<template>
    <v-card class="ma-3">
        <v-card-title>
            <v-row class="px-6 my-4">
                <v-col cols="12">
                    <v-row class="align-center" no-gutters>
                        <v-icon size="x-large" icon="mdi mdi-file-settings"></v-icon>
                        <h1 class="px-3">Facturas</h1>
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
                                # factura
                            </th>
                            <th class="text-left">
                                Fecha
                            </th>
                            <th class="text-left">
                                Descuento
                            </th>
                            <th class="text-left">
                                Propina
                            </th>
                            <th class="text-left">
                                Total
                            </th>
                            <th class="text-left">
                                Cliente
                            </th>
                            <th colspan="2" class="text-center">
                                Acción
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-if="facturas.length == 0">
                            <td colspan="7" class="text-center">Sin facturas</td>
                        </tr>
                        <tr v-for="(factura, index) in facturas" :key="index">
                            <td class="text-left">{{ factura.codigo.toString().length == 1 ? '000' :
                                factura.codigo.toString().length == 2 ? '00' : factura.codigo.toString().length == 3 ? '0' :
                                    null }}{{ factura.codigo }}</td>
                            <td class="text-left">{{ factura.fecha }} {{ factura.hora }}</td>
                            <td class="text-left">{{ factura.descuento }}</td>
                            <td class="text-left">{{ factura.propina }}</td>
                            <td class="text-left">{{ factura.total.toLocaleString() }}</td>
                            <td class="text-left">{{ factura.cliente.nombre }}</td>
                            <td>
                                <v-btn color="red" density="comfortable" @click="eliminarFactura(factura.codigo)">Eliminar
                                    factura</v-btn>
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
    name: 'adminFacturasVista',
    data: () => ({
        facturas: [],
        api: process.env.VUE_APP_API_URL,
    }),
    methods: {
        async obtenerFacturas() {
            await axios.get(`${this.api}/factura`).then(response => {
                this.facturas = response.data;
            });
        },
        async eliminarFactura(codigo) {
            await axios.delete(`${this.api}/factura/${codigo}`).then(response => {
                console.log(response.data);
                this.obtenerFacturas();
            });
        }
    },
    created() {
        this.obtenerFacturas();
    }
}
</script>