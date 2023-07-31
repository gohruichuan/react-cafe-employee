import Cafes from "./views/cafes"
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
        path: "/employees",
        element: <Employees/>,
    },
]);

export default routes