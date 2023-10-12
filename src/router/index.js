import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import facturaVista from '../views/facturaView.vue';
import productosVista from '../views/productosView';
import empleadoVista from '../views/empleadoView';
import agregarPedidoVista from '../views/agregarPedidoView.vue';
import gastosVista from '../views/gastosView.vue';
/* import crearPedidoVista from '../views/crearPedidoView.vue' */
import gananciasVista from '../views/gananciasView.vue';
import loginVista from '../views/loginView.vue';
import inicioVista from '../views/inicio.vue';
import empleadosVista from '../views/empleadosView.vue';
import clientesVista from '../views/clienteView.vue';
import adminFacturasVista from '../views/adminFacturasView.vue';
//Creación de rutas a los archivos
//Store para validar tipoCargo
import store from '../store';
const routes = [{
    path: '/',
    name: 'login',
    component: loginVista
},
{
    path: '/inicio',
    name: 'inicio',
    component: inicioVista,
    children: [{
        path: '/inicio/factura',
        name: 'factura',
        component: facturaVista,
        beforeEnter: (to, from, next) => {
            const cargo = store.getters.usuario.empleado.tipoCargo.toLowerCase();
            if (cargo == "mesero" || cargo == undefined) {
                return next(from);
            }
            next();
        }
    },
    {
        path: '/inicio/productos',
        name: 'productos',
        component: productosVista
    },
    {
        //Para Engineersoft
        path: '/inicio/empleados',
        name: 'empleadosEngineersoft',
        component: empleadosVista
    },
    {
        path: '/inicio/empleado',
        name: 'empleados',
        component: empleadoVista
    },
    {
        path: '/inicio/agregarPedido',
        name: 'agregarPedido',
        component: agregarPedidoVista,
    },
    {
        path: '/inicio/ganancias',
        name: 'gananciasVista',
        component: gananciasVista,
    },
    {
        path: '/inicio/clientes',
        name: 'clientesVista',
        component: clientesVista
    },
    {
        path: '/inicio/facturas',
        name: 'facturasView',
        component: adminFacturasVista
    },
    {
        path: '/inicio/gastos',
        name: 'gastosView',
        component: gastosVista
    }
    ]
},

];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router