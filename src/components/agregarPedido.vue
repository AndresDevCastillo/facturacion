<template>
    <div>
        <v-card class="ma-3">
            <v-card-title>
                <div class="d-flex align-center ">
                    <v-icon size="x-large">mdi mdi-cart-plus</v-icon>
                    <h1 class="px-3">Agregar pedido</h1>
                </div>
            </v-card-title>
            <v-card-text>
                <v-form ref="form">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="6">
                                <v-autocomplete :items="this.ubicaciones" item-title="ubicacion" item-value="id" v-model="this.form.ubicacion" label="Mesa" placeholder="Escoja mesa" required
                                    variant="outlined"></v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="6">
                                <v-select :items="this.meseros" item-title="nombre" item-value="id" v-model="this.form.mesero" label="Mesero" placeholder="Escoja mesero" required
                                    variant="outlined"></v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-autocomplete v-model="add" :items="productos" label="Productos" no-data-text="Sin productos" item-title="nombre" return-object
                                    placeholder="Escoja producto" required variant="outlined">
                                </v-autocomplete>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="cantidad" label="Cantidad" type="number"
                                    placeholder="Ingrese cantidad del producto" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="2">
                                <v-btn elevation="4" size="x-large" @click="addCompra" color="primary">Añadir</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card-text>
        </v-card>
        <v-table class="pb-5" fixed-header fixed-footer v-if="form.compras.length != 0">
            <thead style="z-index: 999999;">
                <tr>
                    <th class="text-left">
                        Producto
                    </th>
                    <th class="text-left">
                        Cantidad
                    </th>
                    <th class="text-left">
                        Precio
                    </th>
                    <th>Acción</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in form.compras" :key="item.name">
                    <td class="text-left">{{ item.nombre }}</td>
                    <td class="text-left">{{ item.cantidad }}</td>
                    <td class="text-left">{{ item.precio }}</td>
                    <td><v-btn elevation="4" @click="eliminarCompra(index)" color="red">eliminar</v-btn> </td>
                </tr>
            </tbody>
            <tfoot style="z-index: 999999;">
                <tr>
                    <td class="text-left footer-table" colspan="4">
                        <strong> Pagar : {{ pagarNeto }}</strong>
                    </td>
                </tr>
            </tfoot>
        </v-table>
        <v-row no-gutters justify="space-evenly" class="mb-4" v-if="this.form.compras.length != 0">
            <v-btn elevation="4" @click="cancelarPedido()" color="blue" size="x-large">Cancelar</v-btn>
            <v-btn elevation="4" @click="guardarPedido()" color="green" size="x-large" class="mr-2 mb-2">Guardar</v-btn>
        </v-row>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'agregarPedidoComponent',
    components: {
    },
    data: () => ({
        buscandoCliente: null,
        clientes: [{ id: 1, nombre: 'Luis' }, { id: 2, nombre: 'Juan' }, { id: 3, nombre: 'José' }],
        bCliente: null,
        valid: null,
        add: null,
        cantidad: null,
        pagos: ['Efectivo', 'Tarjeta Credito', 'Tarjeta Debito', 'Transferencia'],
        form: {
            compras: [],
            ubicacion: null,
            mesero: null,

        },
        meseros: [{ id: 1, nombre: 'Javier Gómez' }, { id: 2, nombre: 'María Rodríguez' }, { id: 3, nombre: 'Carlos Pérez' }, { id: 4, nombre: 'Ana Martínez' }, { id: 5, nombre: 'Luis Ramírez' }],
        domiciliarios: ['Carlos Lopéz', 'Daver Mercado', 'José Armando Ortega'],
        ubicaciones: [{ id: 1, ubicacion: 'Mesa 1' }, { id: 2, ubicacion: 'Mesa 2' }, { id: 3, ubicacion: 'Mesa 3' }],

        productos: [],

    }),

    methods: {
        addCompra() {
            this.cantidad = parseFloat(this.cantidad);
            if (this.cantidad <= 0 || !Number.isInteger(this.cantidad) || this.add == null) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Ingrese la cantidad correctamente'
                });
            }
            this.form.compras.push({ id: this.add.id, nombre: this.add.nombre, precio: this.add.precio, cantidad: this.cantidad });
            this.add = null;
            this.cantidad = null;
        },
        eliminarCompra(posicion = null) {
            this.form.compras.splice(posicion, 1);
        },
        guardarPedido() {
            if (this.form.ubicacion == null || this.form.ubicacion.length == 0) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'La ubicación no puede estar vacía',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            //Envio al backend
            console.log(this.form);
        },
        cancelarPedido() {
            Swal.fire({ title: 'Cancelar pedido', text: '¿Seguro de qué quiere cancelar el pedido?', icon: 'warning', showCancelButton: true, cancelButtonText: 'No, cerrar', confirmButtonText: 'Sí, cancelar' }).then(resp => {
                if (resp.value) {
                    this.form = {
                        compras: [],
                        ubicacion: null,
                        mesero: null
                    };
                }
            });
        },
        buscarCliente(busqueda) {
            const indexCliente = this.clientes.findIndex(cliente => cliente === busqueda);
            if (indexCliente == -1) {
                this.form.nombre = busqueda;
            }
        },
        async obtenerProductos() {
            let prod;
            await axios.get(`${process.env.VUE_APP_API_URL}/producto`).then((resp) => {
                if (resp.data.length > 0) {
                    resp.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                }
                prod = resp.data;
            });
            console.log(prod);
            this.productos = [{ nombre: 'Pepe' }, { nombre: 'Pepito' }];
        }
    },
    watch: {
        /*  buscandoCliente() {
             this.form.nombre = this.buscandoCliente;
         }, */
        /* nombreCliente() {
            
        } */
    },
    async created() {
        await axios.get(`${process.env.VUE_APP_API_URL}/producto`).then((resp) => {
            /* if (resp.data.length > 0) {
                resp.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
            } */
            this.productos = resp.data;
        });
    },
    computed: {
        pagarNeto() {
            let pagoN = 0;
            for (let item of this.form.compras) {
                pagoN += parseInt(item.cantidad * item.precio);
            }
            return pagoN;
        }
    },
    mounted() {


    }
}
</script>

<style></style>