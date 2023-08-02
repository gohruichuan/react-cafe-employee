import Cafes from "./views/cafes/cafes"
import AddCafe from './views/cafes/addCafe'
import Employees from "./views/employees/employees"
import AddEmployee from './views/employees/addEmployee'

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
    {
        path: "/employee/add",
        element: <AddEmployee/>,
    },
    {
        path: "/employee/edit/:id",
        element: <AddEmployee/>,
    },
]

export default routes