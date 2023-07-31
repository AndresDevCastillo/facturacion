import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
//Creación de rutas a los archivos
const routes = [{
    path: '/producto',
    name: 'principal',
    component: () =>
        import('../components/AddProducto.vue'),
    children: [{
        path: '/inicio',
        name: 'inicio',
        component: () =>
            import('../components/AddProducto.vue')
    }]
}];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router