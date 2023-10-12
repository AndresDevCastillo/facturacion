<template>
    <div>
        <v-card class="ma-3">
            <v-card-title>
                <div class="d-flex align-center flex-wrap">
                    <v-icon size="x-large">mdi mdi-cart-plus</v-icon>
                    <div class="px-3">
                        <h1>Agregar pedido</h1>
                        <div class="text-subtitle-1">Escoja una mesa para agregarle un pedido</div>
                    </div>
                </div>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row justify="start">
                        <p class="fw-bold text-dark w-100 text-center" v-if="ubicaciones.length == 0">No hay mesas, por
                            favor regístrelas</p>
                        <v-col v-for="(ubicacion, index) in ubicaciones" :key="index" sm="5" md="4" xl="4" xxl="4">
                            <v-tooltip activator="parent" location="top" contained eager max-width="300">{{
                                this.mesaOcupada(ubicacion.id) ? 'No puedes escoger esta mesa, tiene un pedido en curso' :
                                'Agregar pedido a esta mesa' }}
                            </v-tooltip>
                            <v-card elevation="10" :color="obtenerColor(ubicacion.id)"
                                :class="[obtenerClases(ubicacion.id)]" @click="agregarPedidoMesa(ubicacion.id)">
                                <v-card-text class="fw-bold-important text-center">
                                    {{ ubicacion.nombre }}
                                </v-card-text>
                            </v-card>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
        </v-card>

        <!-- Dialog agregar productos -->
        <v-row justify="center">
            <v-dialog v-model="dialog" persistent width="800">
                <v-card>
                    <v-card-title class="text-h5">
                        Agregar productos
                    </v-card-title>
                    <v-card-text class="pa-md-5">
                        <v-form ref="form">
                            <v-row>
                                <v-col :cols="cols[0]">
                                    <v-autocomplete v-model="add" id="selectProducto" ref="selectProducto"
                                        :items="productos" label="Productos" no-data-text="Sin productos"
                                        item-title="nombre" return-object placeholder="Escoja producto" required
                                        variant="outlined">
                                    </v-autocomplete>
                                </v-col>
                                <v-col :cols="cols[1]">
                                    <v-text-field v-model="cantidad" label="Cantidad" type="number" min="1"
                                        placeholder="Ingrese cantidad del producto" required
                                        variant="outlined"></v-text-field>

                                </v-col>
                                <v-col :cols="cols[2]">
                                    <v-btn elevation="4" size="x-large" @click="agregarProducto"
                                        color="primary">Añadir</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                        <v-table class="pb-5" fixed-header fixed-footer v-if="compras.length != 0">
                            <thead style="z-index: 999999;">
                                <tr>
                                    <th class="text-left">
                                        Producto
                                    </th>
                                    <th class="text-left">
                                        Cantidad
                                    </th>
                                    <th class="text-left">
                                        Precio unitario
                                    </th>
                                    <th class="text-left">
                                        Neto
                                    </th>
                                    <th>Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(item, index) in compras" :key="index">
                                    <td class="text-left">{{ item.nombre }}</td>
                                    <td class="text-left">{{ item.cantidad }}</td>
                                    <td class="text-left">{{ item.precioU }}</td>
                                    <td class="text-left">{{ item.cantidad * item.precioU }}</td>
                                    <td><v-btn elevation="4" @click="eliminarCompra(index)" color="red">eliminar</v-btn>
                                    </td>
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
                        <v-row no-gutters justify="space-evenly" class="mb-4" v-if="compras.length != 0">
                            <v-btn elevation="4" @click="cancelarPedido" color="blue" size="x-large"
                                class="mb-3">Cancelar</v-btn>
                            <v-btn elevation="4" @click="guardarPedido" color="green" size="x-large"
                                class="mr-2 mb-2">Guardar</v-btn>
                        </v-row>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn v-if="compras.length == 0" color="error" variant="text" @click="cancelarPedido">
                            Cancelar
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-row>
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import axios from 'axios';
export default {
    name: 'agregarPedidoVista',
    components: {
    },
    data: () => ({
        dialog: false,
        valid: null,
        add: null,
        cantidad: null,
        form: {
            mesa: null,
            empleado: 1,//Se asigna al crear el componente
            detallePedido: [],
        },
        compras: [],
        ubicaciones: [],
        ubicacionesOcupadas: [],
        productos: [],
    }),

    methods: {
        agregarProducto() {
            if (this.cantidad != null && this.cantidad > 0 && this.add != null) {
                this.compras.push({ nombre: this.add.nombre, cantidad: parseInt(this.cantidad), precioU: this.add.precio });
                this.form.detallePedido.push({ pedido: 1, producto: this.add.id, cantidad: parseInt(this.cantidad) });
                this.cantidad = null;
                this.add = null;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Escoja un producto e ingrese una cantidad mayor a 0',
                    timer: 1700,
                    showConfirmButton: false,
                });
            }
        },
        agregarPedidoMesa(id) {
            if (!this.mesaOcupada(id)) {
                this.form.mesa = id;
                this.dialog = true;
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'No se puede agregar pedido',
                    text: 'Todavía está mesa tiene un pedido en curso',
                    showConfirmButton: false,
                    timer: 1400
                });
            }
        },
        eliminarCompra(posicion = null) {
            this.compras.splice(posicion, 1);
            this.form.detallePedido.splice(posicion, 1);
        },
        async guardarPedido() {
            if (this.form.mesa == null || this.form.mesa.length == 0 || this.form.detallePedido.length == 0) {
                return Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Debe seleccionar una mesa y productos',
                    timer: 1500,
                    showConfirmButton: false,
                });
            }
            const resp = await axios.post(`${process.env.VUE_APP_API_URL}/pedido/crear`, this.form).then(resp => {
                return resp;
            });
            switch (resp.status) {
                case 201:
                    this.reiniciarForm();
                    this.compras = [];
                    this.cantidad = null;
                    this.add = null;
                    Swal.fire({
                        icon: 'success',
                        title: 'Creado',
                        text: 'Pedido creado correctamente',
                        timer: 1780,
                        showConfirmButton: false,
                    });
                    this.dialog = false;
                    this.getMesasOcupadas();
                    this.getMesas();
                    this.getProductos();
                    break;

                default:
                    break;
            }
        },
        cancelarPedido() {
            this.$refs.selectProducto.isFocused = false;
            this.$refs.selectProducto.blur();
            Swal.fire({ title: 'Cancelar pedido', text: '¿Seguro de qué quiere cancelar el pedido?', icon: 'warning', showCancelButton: true, cancelButtonText: 'No, cerrar', confirmButtonText: 'Sí, cancelar', allowOutsideClick: false, stopKeydownPropagation: false }).then(resp => {
                if (resp.value) {
                    this.compras = [];
                    this.reiniciarForm();
                    this.dialog = false;
                }
            });
            this.$refs.selectProducto.blur();
        },
        obtenerClases(id) {
            return this.ubicacionesOcupadas.includes(id) ? 'cursor-not-allowed no-pointer-events' : 'cursor-pointer';
        },
        obtenerColor(id) {
            return this.ubicacionesOcupadas.includes(id) ? 'red' : 'green';
        },
        mesaOcupada(id) {
            return this.ubicacionesOcupadas.includes(id);
        },
        async getMesasOcupadas() {
            await axios.get(`${process.env.VUE_APP_API_URL}/pedido/mesas`).then(resp => {
                this.ubicacionesOcupadas = Array.isArray(resp.data) ? resp.data : [];
            });
        },
        async getMesas() {
            await axios.get(`${process.env.VUE_APP_API_URL}/mesa`).then(resp => {
                this.ubicaciones = Array.isArray(resp.data) ? resp.data : [];
            });

        },
        async getProductos() {
            await axios.get(`${process.env.VUE_APP_API_URL}/producto`).then((resp) => {
                this.productos = Array.isArray(resp.data) ? resp.data : [];
            });
        },
        reiniciarForm() {
            this.form = {
                mesa: null,
                empleado: this.$store.getters.usuario.empleado.id,
                detallePedido: [],
            };
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
        this.$emit('loadingSweet');
        await this.getMesasOcupadas();
        await this.getMesas();
        this.$emit('closeSweet');
        await this.getProductos();
        this.reiniciarForm();


    },
    computed: {
        pagarNeto() {
            let pagoN = 0;
            for (let item of this.compras) {
                pagoN += parseInt(item.cantidad * item.precioU);
            }
            return pagoN;
        },
        cols() {
            //Para que los input del modal sean responsive
            const { xxl, xl, lg, md } = this.$vuetify.display;
            let resp = [12, 12, 4];
            if (xxl || xl || lg) {
                resp = [4, 4, 4];
            }
            else if (md) {
                resp = [5, 5, 2];
            }
            return resp;
        }
    },

}
</script>

<style></style>