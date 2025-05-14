import App from "./App";
import LandingPage from "./pages/public/LandingPage";
import LoginPage from "./pages/public/LoginPage";
import PricingPage from "./pages/public/PricingPage";
import AboutPage from "./pages/public/AboutPage";
import NotFound from "./pages/public/NotFound";
import HomeLayout from "./HomeLayout";
import SignupPage from "./pages/public/SignupPage";
import Dashboard from "./pages/Dashboard";
import ExamsPage from "./pages/ExamsPage";
import TasksPage from "./pages/TasksPage";
import CalendarPage from "./pages/CalendarPage";
import ExamPage from "./pages/ExamPage";
import ProfilePage from "./pages/ProfilePage";

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
      { path: "", element: <Dashboard /> },
      { path: "exams", element: <ExamsPage /> },
      { path: "exams/:id", element: <ExamPage /> },
      { path: "calendar", element: <CalendarPage /> },
      { path: "tasks", element: <TasksPage /> },
      { path: "profile", element: <ProfilePage /> },
    ],
  },
];

export default routes;