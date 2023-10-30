import Index from "views/Index.js";
import Profile from "views/Admin/Profile.js";
import Developpeur from "./views/Admin/Developpeur";
import Projets from "./views/Admin/Projets";
import ViewDeveloppeur from "./views/Admin/ViewDeveloppeur";
import Tikets from "./views/Admin/Tikets";

var routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/projets",
    name: "Liste des projets",
    icon: "ni ni-bullet-list-67 text-indigo",
    component: <Projets />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/developpeurs",
    name: "Développeurs",
    icon: "ni fa-solid fa-users text-orange",
    component: <Developpeur/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/tikets",
    name: "Tous les tikets",
    icon: "ni fa-regular fa-rectangle-list text-red",
    component: <Tikets utilisateur={10988}/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/tiket/me",
    name: "Mes tikets",
    icon: "ni fa-regular fa-bookmark text-blue",
    component: <Tikets utilisateur={1} />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/statistique",
    name: "Statistique",
    icon: "ni ni-chart-bar-32 text-cyan",
    component: <Profile />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/user-profile",
    name: "User Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile />,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/developpeurs/view",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewDeveloppeur />,
    layout: "/admin",
    hide: true,
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
