import App from "./App";
import ExampInput from "./pages/examInput";


const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/exam-info",
        element: <ExampInput />
    }


];

export default routes;