<template>
    <v-card>
        <v-card-title>
            <v-row justify="end" no-gutters>
                <v-btn prepend-icon="mdi-plus" color="blue" @click="dialogCliente = true;">Agregar cliente</v-btn>
            </v-row>
        </v-card-title>
        <v-card-text>
            <v-table fixed-header style="margin-bottom: 100px;">
                <thead style="z-index: 999999">
                    <tr>
                        <th class="text-left">Cédula</th>
                        <th class="text-left">Nombres</th>
                        <th class="text-left">Correo</th>
                        <th class="text-left">Teléfono</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-if="clientes.length == 0">
                        <td colspan="4" class="text-center">Sin clientes</td>
                    </tr>
                    <tr v-for="(cliente, index) in clientes" :key="index">
                        <td class="text-left">{{ cliente.cedula }}</td>
                        <td class="text-left">{{ cliente.nombre }}</td>
                        <td class="text-left">{{ cliente.correo }}</td>
                        <td class="text-left">{{ cliente.telefono }}</td>
                    </tr>
                </tbody>
            </v-table>
        </v-card-text>
        <v-dialog v-model="dialogCliente" persistent width="700">
            <clienteComponent @save="$emit('loadingSweet')" @endSave="$emit('closeSweet')" @cerrarDialog="dialogCliente = false;" @cerrarYLlenar="nuevoCliente" />
        </v-dialog>
    </v-card>
</template>
<script>
import axios from 'axios';
import clienteComponent from '../components/cliente.vue';
export default {
    components: {
        clienteComponent
    },
    data: () => ({
        dialogCliente: false,
        clientes: [],
        api: process.env.VUE_APP_API_URL,
    }),
    methods: {
        async obtenerClientes() {
            this.$emit('loadingSweet');
            await axios.get(`${this.api}/cliente`).then(response => {
                this.clientes = response.data;
            });
            this.$emit('closeSweet');
        },
        nuevoCliente(cliente) {
            if (typeof cliente === 'object') {
                this.clientes.push(cliente);
            }
        }
    },
    created() {
        this.obtenerClientes();
    }
}
</script>