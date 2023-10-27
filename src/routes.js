import Index from "views/Index.js";
import Profile from "views/Admin/Profile.js";
import Tables from "views/Admin/Tables.js";
import Icons from "views/Admin/Icons.js";
import Developpeur from "./views/Admin/Developpeur";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Liste des projets",
    icon: "ni ni-bullet-list-67 text-indigo",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/developpeurs",
    name: "Développeurs",
    icon: "ni fa-solid fa-users text-orange",
    component: <Developpeur/>,
    layout: "/admin",
  },
  {
    path: "/tables",
    name: "Tous les tikets",
    icon: "ni fa-regular fa-rectangle-list text-red",
    component: <Tables />,
    layout: "/admin",
  },
  {
    path: "/tikets",
    name: "Mes tikets",
    icon: "ni fa-regular fa-bookmark text-blue",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/statistique",
    name: "Statistique",
    icon: "ni ni-chart-bar-32 text-cyan",
    component: <Profile />,
    layout: "/admin",
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
  },
  // {
  //   path: "/login",
  //   name: "Login",
  //   icon: "ni ni-key-25 text-info",
  //   component: <Login />,
  //   layout: "/auth",
  // },
  // {
  //   path: "/register",
  //   name: "Register",
  //   icon: "ni ni-circle-08 text-pink",
  //   component: <Register />,
  //   layout: "/auth",
  // },

];
export default routes;
