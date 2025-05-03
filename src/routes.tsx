import App from "./App";
import ExamPlan from "./pages/ExamPlan";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import PricingPage from "./pages/public/PricingPage";
import AboutPage from "./pages/public/AboutPage";
import NotFound from "./pages/public/NotFound";
import ExamInput from "./pages/ExamInput";
import HomeLayout from "./pages/HomeLayout";
import SignupPage from "./pages/public/SignupPage";
import Dashboard from "./pages/Dashboard";

const routes = [
    {
        path: "/",
        element: <App />,
        children: [
          { path: "", element: <LandingPage /> },
          { path: "login", element: <LoginPage /> },
          { path: "signup", element: <SignupPage /> },
          { path: "pricing", element: <PricingPage /> },
          { path: "about", element: <AboutPage /> },
        ],
        errorElement: <NotFound />,
      },
      {
        path: "/home",
        element: <HomeLayout />,
        children: [
          { path: "dashboard", element: <Dashboard /> },
          { path: "exam-info", element: <ExamInput /> },
          { path: "exam-plan", element: <ExamPlan /> },
        ],
      },
];

export default routes;