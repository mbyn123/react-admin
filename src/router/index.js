const router = [
    {
        title: '控制台',
        icon: '',
        key: '/control/index'
    },
    {
        title: '用户管理',
        icon: 'laptop',
        key: '/user',
        child: [
            { key: '/user/list', title: '用户列表', icon: '' },
            { key: '/user/add', title: '添加用户', icon: '' },
        ]
    },
    {
        title: '部门管理',
        icon: 'bars',
        key: '/department',
        child: [
            { key: '/department/list', title: '部门列表', icon: '' },
            { key: '/department/add', title: '添加部门', icon: '' },
        ]
    },
    {
        title: '职位管理',
        icon: 'position',
        key: '/position',
        child: [
            { key: '/position/list', title: '职位列表', icon: '' },
            { key: '/position/add', title: '添加职位', icon: '' },
        ]
    },
    {
        title: '请假',
        icon: 'info-circle-o',
        key: '/leave'
    },
    {
        title: '加班',
        icon: 'info-circle-o',
        key: '/overtime'
    },
]


export default router