import Cafes from "./views/cafes"
import {
    createBrowserRouter,
} from "react-router-dom";

const routes = createBrowserRouter([
    {
        path: "/",
        element: <Cafes/>,
    }
]);

export default routes