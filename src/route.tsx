import Cafes from "./views/cafes/cafes"
import AddCafe from './views/cafes/addCafe'
import Employees from "./views/employees/employees"

const routes = [
    {
        path: "/",
        element: <Cafes/>,
    },
    {
        path: "/cafe/add",
        element: <AddCafe/>,
    },
    {
        path: "/cafe/edit/:id",
        element: <AddCafe/>,
    },
    {
        path: "/employees",
        element: <Employees/>,
    },
    {
        path: "/employees/:cafeid",
        element: <Employees/>,
    },
]

export default routes