import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import facturaVista from '../views/facturaView.vue';
import productosVista from '../views/productosView';
import empleadoVista from '../views/empleadoView';
import agregarPedidoVista from '../views/agregarPedidoView.vue';
/* import crearPedidoVista from '../views/crearPedidoView.vue' */
import gananciasVista from '../views/gananciasView.vue';
import loginVista from '../views/loginView.vue';
import inicioVista from '../views/inicio.vue';
//Creación de rutas a los archivos
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
            },
            {
                path: '/inicio/productos',
                name: 'productos',
                component: productosVista
            },
            {
                path: '/inicio/empleados',
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
            }
        ]
    },

];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router