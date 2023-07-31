import {
    createRouter,
    createWebHashHistory
} from 'vue-router';
//Creación de rutas a los archivos
const routes = [{
    path: '/',
    name: 'principal',
    component: () =>
        import ('../components/Home.vue'),
    children: [{
        path: '/inicio',
        name: 'inicio',
        component: () =>
            import ('../components/Home.vue')
    }]
}];

const router = createRouter({
    history: createWebHashHistory(process.env.BASE_URL),
    routes
})
export default router