<template>
    <div>
        <v-form v-model="valid">
            <v-container>
                <v-row>
                    <v-col cols="12" md="3">
                        <v-text-field v-model="form.nombre" :counter="10" label="Nombre" required></v-text-field>
                    </v-col>



                    <v-col cols="12" md="3">
                        <v-text-field v-model="form.cedula" label="Cedula" type="number" placeholder="1062123536"
                            required></v-text-field>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="form.pago" :items="pagos" label="Medio de pago">
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="form.mesero" :items="meseros" label="Mesero">
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="form.ubicacion" :items="ubicaciones" label="Lugar">
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="3">
                        <v-select v-model="add" :items="products" label="Productos" item-title="name" return-object="">
                        </v-select>
                    </v-col>

                    <v-col cols="12" md="2">
                        <v-text-field v-model="cantidad" label="Candidad" type="number" required></v-text-field>
                    </v-col>
                    <v-col cols="6" md="2">
                        <v-btn elevation="4" size="x-large" @click="addCompra" color="primary">Añadir</v-btn>
                    </v-col>
                    <v-col cols="12" md="2" v-if="form.compras.length != 0">
                        <v-btn elevation="4" size="x-large" @click="generarFactura()" color="red">Enviar</v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-form>
        <v-table fixed-header fixed-footer height="400" v-if="form.compras.length != 0">
            <thead style="z-index: 999999;">
                <tr>
                    <th class="text-left">
                        Name
                    </th>
                    <th class="text-left">
                        Descripcion
                    </th>
                    <th class="text-left">
                        Descuento
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
                    <td class="text-left">{{ item.name }}</td>
                    <td class="text-left">{{ item.descripcion }}</td>
                    <td class="text-left">{{ item.descuento }}</td>
                    <td class="text-left">{{ item.cantidad }}</td>
                    <td class="text-left">{{ item.precio }}</td>
                    <td><v-btn elevation="4" @click="eliminarCompra(index)">eliminar</v-btn> </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td class="text-left footer-table" colspan="2">Pago : {{ total.total }}</td>
                    <td class="text-left footer-table" colspan="1">{{ total.descuento }}</td>
                    <td class="text-left footer-table" colspan="1">{{ total.cantidad }}</td>
                    <td class="text-left footer-table" colspan="2">{{ total.neto }}</td>
                </tr>
            </tfoot>
        </v-table>
        {{ $data.form }}
        {{ $data.add }}
        <facturaView :dialog="dialog" @cerrarDialogo="dialog = false" />
    </div>
</template>
  
<script>
import Swal from 'sweetalert2';
import facturaView from './factura.vue';
export default {
    name: 'HomePrincipal',
    components: {
        facturaView
    },
    data: () => ({
        dialog: false,
        add: null,
        cantidad: null,
        drawer2: true,
        group: null,
        pagos: ['Efectivo', 'Tarjeta Credito', 'Tarjeta Debito', 'Transferencia'],
        form: {
            nombre: null,
            cedula: null,
            pago: null,
            compras: [],
            ubicacion: null,
            mesero: null,

        },
        meseros: ['Javier Gómez', 'María Rodríguez', 'Carlos Pérez', 'Ana Martínez', 'Luis Ramírez'],
        ubicaciones: ['Domicilio', 'Recogido En Persona', 'Mesa 1', 'Mesa 2', 'Mesa 3', 'Mesa 4'],
        defect: 'No hay medios disponibles',
        products: [{
            name: "Manzanas",
            descripcion: "Frescas manzanas rojas.",
            precio: 1000,
            descuento: 30,
        },
        {
            name: "Arroz",
            descripcion: "Arroz de grano largo, 1kg.",
            precio: 1800,
            descuento: 0,
        },
        {
            name: "Leche",
            descripcion: "Leche semidesnatada, 1L.",
            precio: 2200,
            descuento: 0,
        },
        {
            name: "Pan",
            descripcion: "Pan blanco recién horneado.",
            precio: 500,
            descuento: 900,
        },
        {
            name: "Huevos",
            descripcion: "Huevos frescos, docena.",
            precio: 200,
            descuento: 700,
        },],
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
            this.add.descuento = this.add.descuento * this.cantidad;
            this.add.cantidad = parseInt(this.cantidad);
            this.form.compras.push(this.add);
            this.add = null;
            this.cantidad = null;
            this.calcularMonto();

        },
        eliminarCompra(posicion = null) {
            this.form.compras.splice(posicion, 1);
            this.calcularMonto();

        },
        calcularMonto() {

            let descuentoTemp = 0;
            let cantidadTemp = 0;
            let netoTemp = 0;
            for (let item of this.form.compras) {
                console.log(item);
                descuentoTemp += item.descuento;
                cantidadTemp += item.cantidad;
                netoTemp += item.precio;
            }
            this.total.total = netoTemp - descuentoTemp;
            this.total.descuento = descuentoTemp;
            this.total.neto = netoTemp;
            this.total.cantidad = cantidadTemp;
        },
        generarFactura() {
            this.dialog = true;
        }
    },

}
</script>

<style>
.items-bar>.v-list-item__content>.v-list-item-title {
    font-size: 1.4rem;
    padding-top: 10px;
    text-align: left;
}

.footer-table {
    font-weight: bold;
}
</style>