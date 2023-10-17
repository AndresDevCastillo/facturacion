let menu = [{
    cargo: 'Engineersoft',
    menu: [{
        icon: 'mdi mdi-chef-hat',
        title: 'Pedido',
        href: '/inicio/agregarPedido'
    },
    {
        icon: 'mdi mdi-food',
        title: 'Productos',
        href: '/inicio/productos'
    }, {
        icon: 'mdi mdi-account-cog',
        title: 'Administración',
        href: '/inicio/empleados'
    }, {
        icon: 'mdi mdi-chart-bar',
        title: 'Ganacias',
        href: '/inicio/ganancias'
    },
    {
        icon: 'mdi mdi-cash',
        title: 'Gastos',
        href: '/inicio/gastos'
    },
    {
        icon: 'mdi mdi-cash-plus',
        title: 'Facturación',
        href: '/inicio/factura'
    }, {
        icon: 'mdi mdi-order-bool-descending-variant',
        title: 'Pedidos',
        href: '/inicio/pedidos'
    }, {
        icon: 'mdi mdi-file-settings',
        title: 'Facturas',
        href: '/inicio/facturas'
    }, {
        icon: 'mdi mdi-account-group-outline',
        title: 'Clientes',
        href: '/inicio/clientes'
    },

    ]
},
{
    cargo: 'Admin',
    menu: [{
        icon: 'mdi mdi-food',
        title: 'Productos',
        href: '/inicio/productos'
    }, {
        icon: 'mdi mdi-order-bool-descending-variant',
        title: 'Pedidos',
        href: '/inicio/pedidos'
    }, {
        icon: 'mdi mdi-file-settings',
        title: 'Facturas',
        href: '/inicio/facturas'
    }, {
        icon: 'mdi mdi-account-tie',
        title: 'Empleados',
        href: '/inicio/empleado'
    }, {
        icon: 'mdi mdi-chart-bar',
        title: 'Ganacias',
        href: '/inicio/ganancias'
    }, {
        icon: 'mdi mdi-cash-plus',
        title: 'Facturación',
        href: '/inicio/factura'
    },
    {
        icon: 'mdi mdi-cash',
        title: 'Gastos',
        href: '/inicio/gastos'
    }, {
        icon: 'mdi mdi-account-group-outline',
        title: 'Clientes',
        href: '/inicio/clientes'
    }
    ]
},
{
    cargo: 'Mesero',
    menu: [{
        icon: 'mdi mdi-chef-hat',
        title: 'Pedido',
        href: '/inicio/agregarPedido'
    }, {
        icon: 'mdi mdi-order-bool-descending-variant',
        title: 'Pedidos',
        href: '/inicio/pedidos'
    },]
}, {
    cargo: 'Cajero',
    menu: [{
        icon: 'mdi mdi-cash-plus',
        title: 'Facturación',
        href: '/inicio/factura'
    }, {
        icon: 'mdi mdi-food',
        title: 'Productos',
        href: '/inicio/productos'
    }, {
        icon: 'mdi mdi-order-bool-descending-variant',
        title: 'Pedidos',
        href: '/inicio/pedidos'
    }]
}
]

export default menu;