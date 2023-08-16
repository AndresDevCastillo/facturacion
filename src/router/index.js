import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import facturaVista from '../views/facturaView.vue';
import productosVista from '../views/productosView';
import empleadoVista from '../views/empleadoView';
import agregarPedidoVista from '../views/agregarPedidoView.vue';
//Creación de rutas a los archivos
const routes = [{
        path: '/factura',
        name: 'factura',
        component: facturaVista,
    },
    {
        path: '/productos',
        name: 'productos',
        component: productosVista
    },
    {
        path: '/empleados',
        name: 'empleados',
        component: empleadoVista
    },
    {
        path: '/',
        name: 'agregarPedido',
        component: agregarPedidoVista,
    }
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router