import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
import facturaVista from '../views/facturaView.vue';
import productosVista from '../views/productosView';
import empleadoVista from '../views/empleadoView';
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
}
];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router