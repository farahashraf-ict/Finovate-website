import { createBrowserRouter } from "react-router-dom";
import { Root } from "./components";
import Home from "./pages/Home";
import About from "./pages/About";
import Solutions from "./pages/Solutions";
import SolutionDetail from "./pages/SolutionDetail";
import AskNabeh from "./pages/AskNabeh";
import Partners from "./pages/Partners";
import Blog from "./pages/Blog";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "home", Component: Home },
      { path: "about", Component: About },
      { path: "solutions", Component: Solutions },
      { path: "solutions/:solutionId", Component: SolutionDetail },
      { path: "ask-nabeh", Component: AskNabeh },
      { path: "partners", Component: Partners },
      { path: "blog", Component: Blog },
      { path: "careers", Component: Careers },
      { path: "contact", Component: Contact },
    ],
  },
]);
