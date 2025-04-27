import App from "./App";
import ExampInput from "./pages/ExamInput";


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