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
                icon: 'mdi-account-tie',
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
            }
        ]
    },
    {
        cargo: 'Mesero',
        menu: [{
            icon: 'mdi mdi-chef-hat',
            title: 'Pedido',
            href: '/inicio/agregarPedido'
        }]
    }, {
        cargo: 'Admin',
        menu: [{
            icon: 'mdi mdi-food',
            title: 'Productos',
            href: '/inicio/productos'
        }, {
            icon: 'mdi-account-tie',
            title: 'Empleados',
            href: '/inicio/empleados'
        }, {
            icon: 'mdi mdi-chart-bar',
            title: 'Ganacias',
            href: '/inicio/ganancias'
        }]
    }, {
        cargo: 'Cajero',
        menu: [{
            icon: 'mdi mdi-cash-plus',
            title: 'Facturación',
            href: '/inicio/factura'
        }]
    }
]

export default menu;