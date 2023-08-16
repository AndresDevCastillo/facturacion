<template>
    <div class="empleados">
        <v-card class="ma-3">
            <v-row class="d-flex align-center px-6 my-4">
                <v-col cols="4" md="4">
                    <div class="d-flex align-center "><v-icon size="x-large" icon="mdi-account"></v-icon>
                        <h1 class="px-3">Empleados</h1>
                    </div>
                </v-col>
                <v-col cols="4" md="4">

                </v-col>
                <v-col cols="2" md="2">
                    <v-btn prepend-icon="mdi-plus" color="green" @click="dialogE = true;">Empleado</v-btn>
                </v-col>
                <v-col cols="2" md="2">
                    <v-btn prepend-icon="mdi-plus" color="yellow" @click="dialogC = true;">Cargo</v-btn>
                </v-col>

            </v-row>
            <v-row class="flex-column">
                <v-card class="ma-3">
                    <v-table fixed-header fixed-footer class="w-100" v-if="empleados.length > 0">
                        <thead style="z-index: 999999;" class="bg-table-header">
                            <tr>
                                <th class="text-left">
                                    Cedula
                                </th>
                                <th class="text-left">
                                    Nombre
                                </th>
                                <th class="text-left">
                                    Teléfono
                                </th>
                                <th class="text-left">
                                    Dirección
                                </th>
                                <th class="text-left">
                                    Cargo
                                </th>
                                <th colspan="2" class="text-center">Acción</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(persona) in empleados" :key="persona.cedula">
                                <td class="text-left">{{ persona.cedula }}</td>
                                <td class="text-left">{{ persona.nombre }}</td>
                                <td class="text-left">{{ persona.telefono }}</td>
                                <td class="text-left">{{ persona.direccion }}</td>
                                <td class="text-left">{{ persona.tipo_cargo.cargo }}</td>
                                <td><v-btn color="blue" density="comfortable"
                                        @click="editarEmpleado(Object.assign({}, persona))">Editar</v-btn></td>
                                <td><v-btn color="red" density="comfortable"
                                        @click="eliminarEmpleado(persona.cedula)">Eliminar</v-btn></td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>
            </v-row>
            <v-dialog v-model="dialogC" width="700">
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="formCargo">
                                <v-row>
                                    <v-col cols="12" sm="12" md="12">
                                        <v-text-field class="inline-form-input-name" label="Cargo" type="text" required
                                            variant="outlined" v-model="formCargo.cargo" :counter="40"></v-text-field>
                                    </v-col>
                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red-darken-1" variant="tonal" @click="dialogC = false">
                            Cerrar
                        </v-btn>
                        <v-btn color="green-darken-1" variant="tonal" @click="crearCargo()">
                            Crear
                        </v-btn>
                    </v-card-actions>
                    <v-table fixed-header fixed-footer height="400" class="w-100" v-if="tipo_cargo.length > 0">
                        <thead style="z-index: 999999;" class="bg-table-header">
                            <tr>
                                <th class="text-left">
                                    Cargo
                                </th>
                                <th colspan="2" class="text-center">Acción</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item) in tipo_cargo" :key="item.id">
                                <td class="text-left">{{ item.cargo }}</td>
                                <td class="text-right"><v-btn density="comfortable" @click="eliminarCargo(item.id)"
                                        color="red">eliminar</v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-card>

            </v-dialog>
            <v-dialog v-model="dialogE" persistent width="700">
                <v-card>
                    <v-card-title>
                    </v-card-title>
                    <v-card-text>
                        <v-container>
                            <v-form ref="formEmpleado">
                                <v-row>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field class="inline-form-input-name" label="Nombre" type="text" required
                                            variant="outlined" v-model="formEmpleado.nombre" :rules="nombreRules"
                                            :counter="65"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" md="6">
                                        <v-text-field label="Cedula" type="number" variant="outlined"
                                            hint="Sin comas o puntos (, .)" persistent-hint required :counter="14"
                                            v-model="(formEmpleado.cedula)" :rules="cedulaRules"></v-text-field>
                                    </v-col>
                                    <v-col cols="12">
                                        <v-text-field class="inline-form-input-name" label="Dirección" type="text" required
                                            variant="outlined" v-model="formEmpleado.direccion"
                                            :rules="[v => !!v || 'La descripción es requerida']"></v-text-field>
                                    </v-col>
                                    <v-col cols="12" sm="6" v-if="tipo_cargo.length > 0">
                                        <v-select :items="tipo_cargo" item-title="cargo" item-value="id" variant="outlined"
                                            label="Cargo" required v-model="formEmpleado.tipo_cargo"
                                            :rules="[v => !!v || 'Seleccione una Cargo']"></v-select>
                                    </v-col>
                                    <v-col cols="12" sm="6">
                                        <v-text-field class="inline-form-input-name" label="Teléfono" type="text" required
                                            variant="outlined" v-model="formEmpleado.telefono"
                                            :rules="[v => !!v || 'La telefono es requerido']">

                                        </v-text-field>
                                    </v-col>

                                </v-row>
                            </v-form>
                        </v-container>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="red-darken-1" variant="tonal" @click="dialogE = false">
                            Cerrar
                        </v-btn>
                        <v-btn color="green-darken-1" variant="tonal" @click="crearEmpleado()">
                            Crear
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-card>
        <editarEmpleadoComponent v-model="ShowEditarEmpleado" :editarEmpleado="paqueteEditar"
            @cerrar="ShowEditarEmpleado = false" @noactualizo="noEditoEmpleado()" @actualizo="editarEmpleadoCorrecto()">
        </editarEmpleadoComponent>
    </div>
</template>

<script>
import axios from 'axios';
import Swal from 'sweetalert2';
import editarEmpleadoComponent from '../components/editarEmpleado.vue';
export default {
    name: "empleadoVista",
    components: {
        editarEmpleadoComponent
    },
    data: () => ({
        empleados: [],
        tipo_cargo: [],
        dialogC: false,
        dialogE: false,
        ShowEditarEmpleado: false,
        formCargo: {
            cargo: null
        },
        formEmpleado: {
            cedula: null,
            tipo_cargo: null,
            nombre: null,
            telefono: null,
            direccion: null,
        },
        paqueteEditar: null,
        nombreRules: [
            v => !!v || 'El nombre es requerido',
            v => (v && v.length <= 65) || 'EL nombre no puede superar los 65 caracteres',
        ],
        cedulaRules: [v => !!v || 'El cedula es requerido', v => (v && /^[0-9]+$/.test(v)) || 'El numero no debe contener caracteres'],

    }),
    methods: {
        async listarEmpleados() {
            await axios.get(`${process.env.VUE_APP_API_URL}/empleado`).then(resp => {
                if (resp.data.length > 0) {
                    resp.data.sort((a, b) => a.nombre.localeCompare(b.nombre));
                }
                this.empleados = resp.data;

            });
        },
        async eliminarEmpleado(cedula) {
            Swal.fire({
                icon: 'info',
                title: 'Seguro quiere eliminar un empleado?',
                showDenyButton: true,
                denyButtonText: 'No',
                confirmButtonText: 'Eliminar',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await axios.delete(`${process.env.VUE_APP_API_URL}/empleado/${cedula}`).then(() => {
                        Swal.fire({ icon: 'success', text: 'Se elimino correctamente el empleado', timer: 1500, showConfirmButton: false });
                        this.listarEmpleados();
                    });
                }
            }).catch(() => {
                return Swal.fire({ icon: 'error', title: 'No se pudo eliminar el producto', timer: 1000 });
            });

        },
        async listarCargos() {
            await axios.get(`${process.env.VUE_APP_API_URL}/tipo-cargo`).then((resp) => {
                if (resp.data.length > 0) {
                    resp.data.sort((a, b) => a.cargo.localeCompare(b.cargo));
                }
                this.tipo_cargo = resp.data;

            })
        },
        async crearCargo() {
            await axios.post(`${process.env.VUE_APP_API_URL}/tipo-cargo/crear`, this.formCargo).then(() => {
                this.dialogC = false;
                this.listarCargos();
                this.formCargo = {
                    cargo: null
                }
                Swal.fire({ icon: 'success', text: 'Se creo el cargo correctamente', timer: 1500, showConfirmButton: false });
            })
        },
        async eliminarCargo(id) {
            this.dialogC = false;
            Swal.fire({
                icon: 'info',
                title: 'Seguro quiere eliminar el cargo?',
                showDenyButton: true,
                denyButtonText: 'No',
                confirmButtonText: 'Eliminar',
            }).then(async (result) => {
                /* Read more about isConfirmed, isDenied below */
                if (result.isConfirmed) {
                    await axios.delete(`${process.env.VUE_APP_API_URL}/tipo-cargo/${id}`).then(() => {
                        Swal.fire({ icon: 'success', text: 'Se elimino el cargo correctamente', timer: 1500, showConfirmButton: false });
                        this.listarCargos();
                    })
                }
            }).catch(() => {
                return Swal.fire({ icon: 'error', title: 'No se pudo eliminar el cargo', timer: 1000 });
            });

        },
        async crearEmpleado() {
            const { valid } = await this.$refs.formEmpleado.validate();
            if (valid) {
                this.formEmpleado.cedula = parseInt(this.formEmpleado.cedula);
                try {
                    await axios.post(`${process.env.VUE_APP_API_URL}/empleado/crear`, this.formEmpleado).then(() => {
                        this.formEmpleado = {
                            cedula: null,
                            tipo_cargo: null,
                            nombre: null,
                            telefono: null,
                            direccion: null,
                        };
                        this.dialogE = false;
                        Swal.fire({ icon: 'success', title: 'Se creo Correctamente el empleado', showConfirmButton: false, timer: 1500 });
                        this.listarEmpleados();
                    });
                }
                catch {
                    this.dialogE = false;
                    Swal.fire({ icon: 'error', text: 'No se pudo crear el empleado', showConfirmButton: false, timer: 1500 });
                }
            }
        },
        editarEmpleado(empleado) {
            this.paqueteEditar = empleado;
            this.ShowEditarEmpleado = true;
        },
        editarEmpleadoCorrecto() {
            this.ShowEditarEmpleado = false;
            this.listarEmpleados();
            Swal.fire({ icon: 'success', text: 'Se edito correctamente', showConfirmButton: false, timer: 1500 });
        },
        noEditoEmpleado() {
            this.ShowEditarEmpleado = false;
            Swal.fire({ icon: 'error', text: 'No se edito el empleado', showConfirmButton: false, timer: 1500 });
        }
    },
    created() {
        this.listarEmpleados();
        this.listarCargos();
    }
}
</script>

<style></style>