import Cafes from "./views/cafes/cafes"
import AddCafe from './views/cafes/addCafe'

import Employees from "./views/employees"

import {
    createBrowserRouter,
} from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Cafes/>,
    },
    {
        path: "/cafe/add",
        element: <AddCafe/>,
    },
    {
        path: "/employees",
        element: <Employees/>,
    },
]);

export default routes