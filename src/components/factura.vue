<template>
    <v-row justify="center">
        <v-dialog v-model="verDialog" fullscreen :scrim="false" transition="dialog-bottom-transition">
            <v-card>
                <v-toolbar dark theme="dark">
                    <v-btn icon dark @click="cerrarDialogo()">
                        <v-icon>mdi-close</v-icon>
                    </v-btn>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                        <v-btn variant="text">
                            Imprimir
                        </v-btn>
                    </v-toolbar-items>
                </v-toolbar>
                <v-card-text>
                    <v-col md="8" xl="9" cols="12" class="ma-auto">
                        <v-card rounded="4" class="pa-4">
                            <v-row justify="space-between">
                                <v-col cols="4">
                                    <v-img width="40" cover :src="require('@/assets/logo.png')"
                                        :lazy-src="require('@/assets/logo.png')"></v-img>
                                </v-col>
                                <v-col cols="8" class="text-right">
                                    <label class="text-dark mr-1">Factura</label>
                                    <label class="text-muted fw-600"><strong>#123</strong></label>
                                </v-col>
                            </v-row>
                            <v-row justify="space-between">
                                <v-col cols="6">
                                    <p class="text-dark">Calle 3 #30-46 Barrio el mora, Montería, Córdoba, Colombia</p>
                                    <p class="text-dark">Nombre empresa</p>
                                    <p class="text-dark">3101004354 - empresa@gmail.com</p>
                                </v-col>
                                <v-col cols="6 text-right">
                                    <p class="text-dark">Fecha generación</p>
                                    <p class="text-dark fw-600">03-06-2023</p>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row class="mt-4" justify="space-between">
                                <v-col cols="8">
                                    <h4 class="fw-600">Cliente</h4>
                                    <p>Luis Salgado</p>
                                    <p>3123458234</p>
                                    <p>luis@gmail.com</p>
                                </v-col>
                                <v-col cols="4">
                                    <h4 class="fw-600">Detalle del pago</h4>
                                    <p>Total pagado: $100.000</p>
                                    <p>Método de pago: Tarjeta crédito</p>
                                </v-col>
                            </v-row>
                            <v-row>
                                <v-table class="w-100" fixed-header height="auto">
                                    <thead class="bg-table-header fw-bold" style="z-index: 999999;">
                                        <tr>
                                            <th class="text-left">
                                                Producto
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

                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in form.compras" :key="item.name">
                                            <td class="text-left">{{ index + 1 }}</td>
                                            <td class="text-left">{{ item.name }}</td>
                                            <td class="text-left">{{ item.descripcion }}</td>
                                            <td class="text-left">{{ item.descuento }}</td>
                                            <td class="text-left">{{ item.precio }}</td>
                                        </tr>
                                    </tbody>
                                </v-table>
                            </v-row>
                            <v-row>
                                <v-col cols="8">
                                    <h4 class="fw-600">Empleado</h4>
                                    <p class="text-dark">Pepito Peréz</p>
                                    <p class="text-dark">Lugar: Mesa 1</p>
                                </v-col>
                                <v-col cols="4">
                                    <v-row justify="space-between" no-gutters>
                                        <v-col cols="7" class="px-0 pb-0">
                                            <p class="fw-600 bc-gray">SUBTOTAL</p>
                                        </v-col>
                                        <v-col cols="5" class="pb-0">
                                            <p class="fw-600">$ 10.000</p>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="space-between" no-gutters>
                                        <v-col cols="7" class="px-0 py-0">
                                            <p class="fw-600 bc-gray">IVA</p>
                                        </v-col>
                                        <v-col cols="5" class="pb-0 py-0">
                                            <p class="fw-600">$ 0</p>
                                        </v-col>
                                    </v-row>
                                    <v-row justify="space-between" no-gutters>
                                        <v-col cols="7" class="px-0 pt-0">
                                            <p class="fw-600 bc-gray">INC</p>
                                        </v-col>
                                        <v-col cols="5" class="pt-0">
                                            <p class="fw-600">$ 0</p>
                                        </v-col>
                                    </v-row>
                                    <v-divider class="divider-dotted"></v-divider>
                                    <v-row no-gutters>
                                        <v-col cols="7">
                                            <p class="fw-600">TOTAL</p>
                                        </v-col>
                                        <v-col cols="5">
                                            <p class="fw-600">$ 10.000</p>
                                        </v-col>
                                    </v-row>
                                </v-col>
                            </v-row>
                            <v-divider></v-divider>
                            <v-row>
                                <v-col cols="12">
                                    <p>
                                        <strong class="fw-600">Nota: </strong> Comida muy buena.
                                    </p>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-col>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-row>
</template>
<script>
export default {
    name: 'facturaComponent',
    props: { dialog: { type: Boolean, default: false, required: true } },
    data: () => ({
        verDialog: false,
        form: {
            compras: [{

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
            },]
        }
    }),
    methods: {
        cerrarDialogo() {
            this.$emit('cerrarDialogo');
        }
    },
    watch: {
        dialog() {
            console.log('Cambio');
            this.verDialog = this.$props.dialog;
        }
    }
}
</script>