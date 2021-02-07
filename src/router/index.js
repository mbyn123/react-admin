const router = [
    {
        title: '控制台',
        icon: '',
        key: '/control'
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
        key: '/navigation',
        child: [
            { key: '/navigation/dropdown', title: '部门列表', icon: '' },
            { key: '/navigation/menu', title: '添加部门', icon: '' },
        ]
    },
    {
        title: '职位管理',
        icon: 'edit',
        key: '/entry',
        child: [
            { key: '/entry/base-form', title: '职位列表', icon: '' },
            { key: '/entry/step-form', title: '添加职位', icon: '' },
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