import routerList from "@/router"
const firstRouterItem = routerList[0]
let path = firstRouterItem.child && firstRouterItem.child.length > 0 ? firstRouterItem.child[0].key : firstRouterItem.key

export default path