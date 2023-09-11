<template>
    <div>
        <v-card class="ma-3">
            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col cols="12" md="3">
                            <v-autocomplete label="Nombre del cliente" item-value="id" :items="clientes" item-title="nombre"
                                variant="outlined" v-model="form.cliente" @keyup="buscarCliente()"></v-autocomplete>
                            <!-- <v-text-field v-model="form.nombre" label="Nombre del cliente" placeholder="Pepito pérez" required
                                variant="outlined"></v-text-field> -->
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field class="inline-form-input-name" v-model="form.cedula" label="Cédula" type="number"
                                placeholder="1062123536" required variant="outlined"></v-text-field>
                        </v-col>
                        <v-col cols="12" md="3">
                            <v-text-field v-model="form.telefono" label="Teléfono" placeholder="3104205923" required
                                variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-text-field v-model="form.correo" label="Correo Electrónico" placeholder="pepito@gmail.com"
                                required variant="outlined"></v-text-field>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-select v-model="form.pago" :items="pagos" label="Medio de pago"
                                placeholder="Escoja medio de pago" required variant="outlined">
                            </v-select>
                        </v-col>

                        <v-col cols="12" md="3">
                            <v-select v-model="form.ubicacion" :items="ubicaciones" label="Lugar"
                                placeholder="Escoja lugar de atención" required variant="outlined">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="3" v-if="form.ubicacion === 'Domicilio'">
                            <v-select v-model="form.domiciliario" :items="domiciliarios" label="Domiciliario"
                                placeholder="Escoja domicialiario" required variant="outlined">
                            </v-select>
                        </v-col>
                        <v-col cols="12" md="3" v-if="form.ubicacion === 'Domicilio'">
                            <v-text-field v-model="form.direccion" label="Dirección domicilio"
                                placeholder="Ingrese dirección del domicilio" required variant="outlined">
                            </v-text-field>
                        </v-col>

                        <v-col cols="12" md="2">
                            <v-btn elevation="4" size="x-large" @click="dialogTicket = true" color="red">Ver ticket</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn elevation="4" size="x-large" @click="generarFactura()" color="red">Comprar</v-btn>
                        </v-col>
                        <v-col cols="12" md="2">
                            <v-btn elevation="4" size="x-large" @click="dialogTicketCocinero = true" color="red">Ver ticket
                                cocinero</v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
            {{ pedidos }}
        </v-card>
        <v-table fixed-header fixed-footer height="400" v-if="form.compras.length != 0">
            <thead style="z-index: 999999;">
                <tr>
                    <th class="text-left" colspan="2">
                        Nombres
                    </th>
                    <th class="text-left">
                        Cantidad
                    </th>
                    <th class="text-left">
                        Precio Neto
                    </th>
                    <th>Acción</th>

                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.compras" :key="item.name">
                    <td class="text-left" colspan="2">{{ item.nombre }}</td>
                    <td class="text-left">{{ item.cantidad }}</td>
                    <td class="text-left">{{ item.precio }}</td>
                    <td><v-btn elevation="4" @click="eliminarCompra(index)">eliminar</v-btn> </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="text-left footer-table" colspan="2">Pago : {{ total.total }}</td>
                    <td class="text-left footer-table" colspan="1">{{ total.cantidad }}</td>
                    <td class="text-left footer-table" colspan="1">{{ total.neto }}</td>
                    <td class="text-left footer-table" colspan="1">Descuento {{ total.descuento }}%</td>
                </tr>
            </tfoot>
        </v-table>
        <facturaComponent :dialog="dialog" :datos="form" @cerrarDialogo="dialog = false" />
        <ticketComponent :dialog="dialogTicket" @cerrarDialogoTicket="dialogTicket = false"></ticketComponent>
        <ticketCocineroComponent :dialog2="dialogTicketCocinero"
            @cerrarDialogoTicketCocinero="dialogTicketCocinero = false"></ticketCocineroComponent>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import facturaComponent from '../components/factura.vue';
import ticketComponent from '../components/ticket.vue';
import ticketCocineroComponent from '../components/ticketCocinero.vue';
import axios from 'axios';
export default {
    name: 'facturaVista',
    components: {
        facturaComponent,
        ticketComponent,
        ticketCocineroComponent
    },
    data: () => ({
        clientes: [],
        pedidos: [],
        bCliente: null,
        valid: null,
        dialog: false,
        dialogTicket: false,
        dialogTicketCocinero: true,
        add: null,
        cantidad: null,
        drawer2: true,
        group: null,
        pagos: ['Efectivo', 'Tarjeta Credito', 'Tarjeta Debito', 'Transferencia'],
        form: {
            cliente: null,
            nombre: null,
            cedula: null,
            telefono: null,
            pago: null,
            compras: [],
            ubicacion: null,
            mesero: null,
            domiciliario: null,
            direccion: null,
            correo: null,
            descuento: 0,

        },
        trabajadores: [],
        ubicaciones: ['Domicilio', 'Recogido en persona', 'Restaurante'],
        defect: 'No hay medios disponibles',
        productos: [],
        total: {
            total: null,
            descuento: null,
            cantidad: null,
            neto: null
        },

    }),
    methods: {
        addCompra() {
            this.cantidad = parseFloat(this.cantidad);
            console.log(typeof (this.cantidad))
            if (this.cantidad <= 0 || !Number.isInteger(this.cantidad) || this.add == null) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese la cantidad correctamente'
                })
            }
            this.add.precio = this.add.precio * this.cantidad;
            this.add.cantidad = parseInt(this.cantidad);
            this.form.compras.push(Object.assign({}, this.add));
            this.add = null;
            this.cantidad = null;
            this.calcularMonto();

        },
        eliminarCompra(posicion = null) {
            this.form.compras.splice(posicion, 1);
            this.calcularMonto();

        },
        calcularMonto() {

            let descuentoTemp = this.form.descuento;
            let cantidadTemp = 0;
            let netoTemp = 0;
            for (let item of this.form.compras) {
                console.log(item);
                cantidadTemp += item.cantidad;
                netoTemp += item.precio;
            }
            if (descuentoTemp == 0) {
                this.total.total = netoTemp;
            }
            else {
                this.total.total = (netoTemp - (descuentoTemp / 100) * netoTemp);
            }
            this.total.descuento = descuentoTemp;
            this.total.neto = netoTemp;
            this.total.cantidad = cantidadTemp;
        },
        generarFactura() {
            this.dialog = true;
        },
        buscarCliente() {
            console.log('Buscando cliente');
        },
        async buscarEmpleados() {
            try {
                await axios.get(`${process.env.VUE_APP_API_URL}/empleado`).then(data => {
                    this.trabajadores = data.data;
                })
            }
            catch (error) {
                console.log(error);
            }
        },
        async buscarProductos() {
            try {
                await axios.get(`${process.env.VUE_APP_API_URL}/producto`).then(data => {
                    this.productos = data.data;
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        async buscarClientes() {
            try {
                await axios.get(`${process.env.VUE_APP_API_URL}/cliente`).then(data => {
                    this.clientes = data.data;
                });
            }
            catch (error) {
                console.log(error);
            }
        },
        async cargarPedidos() {
            try {
                axios.get(`${process.env.VUE_APP_API_URL}/pedido`).then(data => {
                    this.pedidos = data.data;
                })
            }
            catch (error) {
                console.log(error);
            }
        }
    },
    watch: {
        'form.cliente': {
            handler(newNombre, oldNombre) {
                // Esta función se ejecutará cuando 'form.nombre' cambie
                console.log(`El valor de 'nombre' cambió de "${oldNombre}" a "${newNombre}"`);
                this.clientes.map(cliente => {
                    if (this.form.cliente == cliente.id) {
                        this.form.cedula = cliente.cedula;
                        this.form.correo = cliente.correo;
                        this.form.telefono = cliente.telefono;
                    }
                })
            },
        },
    },
    async mounted() {
        await this.buscarEmpleados();
        await this.buscarProductos();
        await this.buscarClientes();
        await this.cargarPedidos();
    }
}
</script>

<style></style>