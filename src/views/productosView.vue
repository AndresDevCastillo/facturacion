<template>
    <v-card class="ma-3">
        <v-row class="d-flex align-center px-6">

            <v-col cols="4" md="4">
                <v-text-field single-line variant="underlined" label="Buscar producto" append-inner-icon="mdi-magnify"
                    class="ma-3"></v-text-field>
            </v-col>
            <v-col cols="4" md="4">

            </v-col>
            <v-col cols="2" md="2">
                <v-btn prepend-icon="mdi-plus" color="green" @click="dialog = true">Producto</v-btn>
            </v-col>
            <v-col cols="2" md="2">
                <v-btn prepend-icon="mdi-plus" color="yellow">Categoria</v-btn>
            </v-col>

        </v-row>
        <v-row class="flex-column">
            <v-card class="ma-3">
                <v-table fixed-header fixed-footer height="400" class="w-100" v-if="productos.length > 0">
                    <thead style="z-index: 999999;" class="bg-table-header">
                        <tr>
                            <th class="text-left">
                                Nombre
                            </th>
                            <th class="text-left">
                                Categoría
                            </th>
                            <th class="text-left">
                                Descripcion
                            </th>
                            <th class="text-left">
                                Precio
                            </th>
                            <th class="text-left">
                                Estado
                            </th>
                            <th>Acción</th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item) in productos" :key="item.id">
                            <td class="text-left">{{ item.nombre }}</td>
                            <td class="text-left">{{ item.categoria.nombre }}</td>
                            <td class="text-left">{{ item.descripcion }}</td>
                            <td class="text-left">{{ item.precio }}</td>
                            <td v-if="item.estado" class="text-left"><v-chip color="green">Activo</v-chip></td>
                            <td v-else class="text-left"><v-chip color="red">No Activo</v-chip></td>
                            <td><v-btn elevation="4" density="comfortable">eliminar</v-btn> </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-card>
        </v-row>
        <p>{{ data }}</p>

    </v-card>
    <v-dialog v-model="dialog" persistent width="1024">
        <v-card>
            <v-card-title>
                <span class="text-h5">User Profile</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal first name*" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal middle name"
                                hint="example of helper text only on focus"></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="4">
                            <v-text-field label="Legal last name*" hint="example of persistent helper text" persistent-hint
                                required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Email*" required></v-text-field>
                        </v-col>
                        <v-col cols="12">
                            <v-text-field label="Password*" type="password" required></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-select :items="['0-17', '18-29', '30-54', '54+']" label="Age*" required></v-select>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-autocomplete
                                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                                label="Interests" multiple></v-autocomplete>
                        </v-col>
                    </v-row>
                </v-container>
                <small>*indicates required field</small>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Close
                </v-btn>
                <v-btn color="blue-darken-1" variant="text" @click="dialog = false">
                    Save
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
import axios from 'axios';


export default {
    name: 'productosVista',
    data: () => ({
        productos: [],
        dialog: false
    }),
    mounted() {
        this.listarProductos();
    },
    methods: {
        async listarProductos() {
            await axios.get('http://18.117.142.149:3000/producto').then((resp) => {
                this.productos = resp.data;
            });
        }
    }
}
</script>

<style></style>