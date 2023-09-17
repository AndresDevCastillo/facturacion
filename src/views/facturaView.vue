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
              <v-text-field v-model="form.correo" label="Correo Electrónico" placeholder="pepito@gmail.com" required
                variant="outlined"></v-text-field>
            </v-col>

            <v-col cols="12" md="3">
              <v-select label="Pedidos" v-model="pedidoTablero" required variant="outlined" :items="pedidos"
                item-title="mesa.nombre" return-object>
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select v-model="formFactura.medio_pago" :items="pagos" label="Medio de pago"
                placeholder="Escoja medio de pago" required variant="outlined">
              </v-select>
            </v-col>

            <v-col cols="12" md="3">
              <v-select v-model="formFactura.lugar" :items="ubicaciones" label="Lugar"
                placeholder="Escoja lugar de atención" required variant="outlined">
              </v-select>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Descuento" placeholder="0-100" variant="outlined" v-model="form.descuento"
                v-if="form.compras.length != 0" :rules="porcentajeRule"></v-text-field>
            </v-col>
            <v-col cols="12" md="3">
              <v-text-field label="Propina" placeholder="0" variant="outlined" v-model="formFactura.propina"
                v-if="form.compras.length != 0" :rules="propinaRule"></v-text-field>
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
              <v-btn elevation="4" size="x-large" @click="generarFactura()" color="red">Comprar</v-btn>
            </v-col>
            <v-col cols="12" md="2">
              <v-btn elevation="4" size="x-large" @click="vender()" color="red">Vender</v-btn>
            </v-col>
          </v-row>
        </v-container>
      </v-form>
    </v-card>
    <v-table fixed-header fixed-footer height="400" v-if="form.compras.length != 0">
      <thead style="z-index: 999999">
        <tr>
          <th class="text-left" colspan="2">Nombres</th>
          <th class="text-left">Cantidad</th>
          <th class="text-left">Precio Unitario</th>
          <th class="text-left">Precio Neto</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in form.compras[0].detalleTicket" :key="item.name">
          <td class="text-left" colspan="2">{{ item.producto.nombre }}</td>
          <td class="text-left">{{ item.cantidad }}</td>
          <td class="text-left">{{ item.producto.precio }}</td>
          <td class="text-left">{{ item.cantidad * item.producto.precio }}</td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="text-left footer-table" colspan="2">
            <b>Descuento {{ total.descuento }}%</b>
          </td>
          <td class="text-left footer-table" colspan="1">
            <b>{{ total.cantidad }}</b>
          </td>
          <td class="text-left footer-table" colspan="1">
            <b>{{ total.neto }}</b>
          </td>
          <td class="text-left footer-table" colspan="1">
            <b>{{ total.total }}</b>
          </td>
        </tr>
      </tfoot>
    </v-table>
    <facturaComponent :dialog="dialog" :datos="facturaImpresa" @cerrarDialogo="dialog = false" />
    <ticketComponent :dialog="dialogTicket" :datos="facturaImpresa" @cerrarDialogoTicket="dialogTicket = false">
    </ticketComponent>
    <ticketCocineroComponent :dialog2="dialogTicketCocinero" @cerrarDialogoTicketCocinero="dialogTicketCocinero = false">
    </ticketCocineroComponent>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import facturaComponent from "../components/factura.vue";
import ticketComponent from "../components/ticket.vue";
import ticketCocineroComponent from "../components/ticketCocinero.vue";
import axios from "axios";
export default {
  name: "facturaVista",
  components: {
    facturaComponent,
    ticketComponent,
    ticketCocineroComponent,
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
    pedidoTablero: null,
    propinaRule: [
      (v) => !!v || "La propina es requerida en 0 almenos",
      (v) =>
        (v && /^[0-9]+$/.test(v)) || "El numero no debe contener caracteres",
      (v) => (v && parseInt(v) > -1) || "El numero debe ser mayor o igual a 0",
    ],
    porcentajeRule: [
      (v) => !!v || "El porcentaje es requerido",
      (v) =>
        (v && /^[0-9]+$/.test(v)) || "El numero no debe contener caracteres",
      (v) =>
        (v && parseInt(v) > -1 && parseInt(v) < 101) ||
        "El numero debe ser un porcentaje",
    ],
    pagos: ["Efectivo", "Tarjeta Credito", "Tarjeta Debito", "Transferencia"],
    form: {
      cliente: null,
      nombre: null,
      cedula: null,
      telefono: null,
      compras: [],
      ubicacion: null,
      mesero: null,
      domiciliario: null,
      direccion: null,
      correo: null,
      descuento: 0,
    },
    formFactura: {
      cliente: null,
      empleado: null,
      mesa: null,
      medio_pago: null,
      descuento: null,
      total: null,
      propina: 0,
      lugar: null,
      detalleFactura: [],
    },
    trabajadores: [],
    ubicaciones: ["Restaurante", "Domicilio", "Recogido en persona"],
    defect: "No hay medios disponibles",
    productos: [],
    total: {
      total: null,
      descuento: null,
      cantidad: null,
      neto: null,
    },
    facturaImpresa: null,
  }),
  methods: {
    addCompra() {
      this.cantidad = parseFloat(this.cantidad);
      console.log(typeof this.cantidad);
      if (
        this.cantidad <= 0 ||
        !Number.isInteger(this.cantidad) ||
        this.add == null
      ) {
        return Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Ingrese la cantidad correctamente",
        });
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
      let totalTemp = 0;
      for (let item of this.form.compras[0].detalleTicket) {
        cantidadTemp += item.cantidad;
        netoTemp += item.producto.precio;
        totalTemp += item.cantidad * item.producto.precio;
      }
      if (descuentoTemp == 0) {
        this.total.total = totalTemp + parseInt(this.formFactura.propina);
      } else {
        this.total.total =
          totalTemp -
          (descuentoTemp / 100) * totalTemp +
          parseInt(this.formFactura.propina);
      }
      this.total.descuento = descuentoTemp;
      this.total.neto = netoTemp;
      this.total.cantidad = cantidadTemp;
      this.formFactura.total = this.total.total;
    },
    generarFactura() {
      this.dialog = true;
    },
    buscarCliente() {
      console.log("Buscando cliente");
    },
    async buscarEmpleados() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/empleado`)
          .then((data) => {
            this.trabajadores = data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async buscarProductos() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/producto`)
          .then((data) => {
            this.productos = data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async buscarClientes() {
      try {
        await axios
          .get(`${process.env.VUE_APP_API_URL}/cliente`)
          .then((data) => {
            this.clientes = data.data;
          });
      } catch (error) {
        console.log(error);
      }
    },
    async cargarPedidos() {
      try {
        axios.get(`${process.env.VUE_APP_API_URL}/pedido`).then((data) => {
          this.pedidos = data.data;
        });
      } catch (error) {
        console.log(error);
      }
    },
    async vender() {
      this.formFactura.cliente = this.form.cliente;
      this.formFactura.descuento = parseInt(this.form.descuento);
      this.formFactura.propina = parseInt(this.formFactura.propina);
      await axios
        .post(`${process.env.VUE_APP_API_URL}/factura/crear`, this.formFactura)
        .then((data) => {
          this.facturaImpresa = data.data;
          Swal.fire({
            icon: "success",
            title: "Se genero la factura",
            showConfirmButton: false,
            showCancelButton: false,
            timer: 2000,
          }).finally(() => {
            this.dialogTicket = true;
          });
        })
        .catch((error) => {
          Swal.fire({ icon: "error", title: "Oops...", titleText: error });
        });
    },
  },
  watch: {
    "form.cliente": {
      handler(newNombre, oldNombre) {
        // Esta función se ejecutará cuando 'form.nombre' cambie
        console.log(
          `El valor de 'nombre' cambió de "${oldNombre}" a "${newNombre}"`
        );
        this.clientes.map((cliente) => {
          if (this.form.cliente == cliente.id) {
            this.form.cedula = cliente.cedula;
            this.form.correo = cliente.correo;
            this.form.telefono = cliente.telefono;
          }
        });
      },
    },
    pedidoTablero: {
      handler(newPedido, oldPedido) {
        console.log(oldPedido);
        console.log(newPedido);
        this.form.compras.splice(0, 1);
        this.form.compras.push(newPedido);
        this.formFactura.empleado = newPedido.empleado.id;
        this.formFactura.mesa = newPedido.mesa.id;
        this.formFactura.descuento = parseInt(this.form.descuento);
        this.calcularMonto();
        this.formFactura.total = this.total.total;
        this.formFactura.detalleFactura = newPedido.detalleTicket.map(
          (producto) => {
            return {
              producto: producto.producto.id,
              cantidad: producto.cantidad,
            };
          }
        );
      },
    },
    "form.descuento": {
      handler(newDescuento, oldDescuento) {
        this.calcularMonto();
      },
    },
    "formFactura.propina": {
      handler(newDescuento, oldDescuento) {
        this.calcularMonto();
      },
    },
  },
  async mounted() {
    await this.buscarEmpleados();
    await this.buscarProductos();
    await this.buscarClientes();
    await this.cargarPedidos();

  },
};
</script>

<style></style>
