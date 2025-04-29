import App from "./App";
import ExampInput from "./pages/ExamInput";
import ExamPlan from "./pages/ExamPlan";


const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/exam-info",
        element: <ExampInput />
    },
    {   path: "/exam-plan",
        element: <ExamPlan />
    }
];

export default routes;