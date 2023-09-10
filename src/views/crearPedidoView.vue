<template>
    <div class="crearPedido">
        <div>
            <v-card class="ma-3">
                <v-form v-model="valid">
                    <v-container>
                        <v-row>
                            <v-col cols="12" md="3">
                                <v-text-field class="inline-form-input-name" v-model="form.cedula" label="Cédula"
                                    type="number" placeholder="1062123536" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="12" md="3">
                                <v-text-field v-model="form.numero" label="Teléfono" placeholder="3104205923" required
                                    variant="outlined"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-text-field v-model="form.correo" label="Correo Electrónico"
                                    placeholder="pepito@gmail.com" required variant="outlined"></v-text-field>
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
                            <v-col cols="12" md="3"
                                v-if="form.ubicacion != 'Domicilio' && form.ubicacion != 'Recogido en persona'">
                                <v-select v-model="form.mesero" :items="meseros" label="Mesero" placeholder="Escoja mesero"
                                    required variant="outlined">
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-text-field v-model="form.descuento" label="Descuento(%)"
                                    placeholder="Porcentaje de descuento" required variant="outlined"></v-text-field>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-select v-model="add" :items="products" label="Productos" item-title="name"
                                    return-object="" placeholder="Escoja producto" required variant="outlined">
                                </v-select>
                            </v-col>

                            <v-col cols="12" md="3">
                                <v-text-field v-model="cantidad" label="Cantidad" type="number"
                                    placeholder="Ingrese cantidad del producto" required variant="outlined"></v-text-field>
                            </v-col>
                            <v-col cols="6" md="2">
                                <v-btn elevation="4" size="x-large" @click="addCompra" color="primary">Añadir</v-btn>
                            </v-col>
                            <v-col cols="12" md="2" v-if="form.compras.length != 0">
                                <v-btn elevation="4" size="x-large" @click="dialogTicket = true" color="red">Ver
                                    ticket</v-btn>
                            </v-col>
                            <v-col cols="12" md="2" v-if="form.compras.length != 0">
                                <v-btn elevation="4" size="x-large" @click="generarFactura()" color="red">Enviar</v-btn>
                            </v-col>
                            <v-col cols="12" md="2" v-if="form.compras.length != 0">
                                <v-btn elevation="4" size="x-large" @click="dialogTicketCocinero = true" color="red">Ver
                                    ticket cocinero</v-btn>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-form>
            </v-card>
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
        </div>
    </div>
</template>

<script>
export default {
    name: 'crearPedidoVista',
    data: () => ({

    })

}
</script>

<style></style>