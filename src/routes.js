import Index from "views/Index.js";
import Profile from "views/Admin/Profile.js";
import Developpeur from "./views/Admin/Developpeur";
import Projets from "./views/Admin/Projets";
import ViewDeveloppeur from "./views/Admin/ViewDeveloppeur";
import Tikets from "./views/Admin/Tikets";
import ViewProject from "./views/Admin/ViewProject";
import ViewSite from "./views/Admin/ViewSite";
import MesTopPrios from "./views/Admin/MesTopPrios";
import Calendrier from "./views/Admin/Calendrier";

const routes = [
  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/projets",
    name: "Liste des projets",
    icon: "ni ni-bullet-list-67 text-indigo",
    component: <Projets type={"admin"}/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/developpeurs",
    name: "Développeurs",
    icon: "ni fa-solid fa-users text-orange",
    component: <Developpeur author="admin"/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/tiket/me",
    name: "Mes tikets",
    icon: "ni fa-regular fa-bookmark text-blue",
    component: <Tikets author="admin"/>,
    layout: "/admin",
    hide: false,
  },
  // {
  //   path: "/statistique",
  //   name: "Statistique",
  //   icon: "ni ni-chart-bar-32 text-cyan",
  //   component: <Profile/>,
  //   layout: "/admin",
  //   hide: false,
  // },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile/>,
    layout: "/admin",
    hide: false,
  },
  {
    path: "/developpeurs/view",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewDeveloppeur author={"admin"}/>,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/developpeurs/view",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewDeveloppeur author={"auth"}/>,
    layout: "/auth",
    hide: true,
  },


  {
    path: "/index",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: <Index/>,
    layout: "/auth",
    hide: false,
  },
  {
    path: "/projets",
    name: "Liste des projets",
    icon: "ni ni-bullet-list-67 text-indigo",
    component: <Projets type={"auth"}/>,
    layout: "/auth",
    hide: false,
  },
  {
    path: "/developpeurs",
    name: "Développeurs",
    icon: "ni fa-solid fa-users text-orange",
    component: <Developpeur author="auth"/>,
    layout: "/auth",
    hide: false,
  },
  {
    path: "/tiket/me",
    name: "Mes tikets",
    icon: "ni fa-regular fa-bookmark text-blue",
    component: <Tikets author="auth"/>,
    layout: "/auth",
    hide: false,
  },
  // {
  //   path: "/statistique",
  //   name: "Statistique",
  //   icon: "ni ni-chart-bar-32 text-cyan",
  //   component: <Profile author={"admin"}/>,
  //   layout: "/auth",
  //   hide: false,
  // },
  {
    path: "/user-profile",
    name: "Profile",
    icon: "ni ni-single-02 text-yellow",
    component: <Profile author={"auth"}/>,
    layout: "/auth",
    hide: false,
  },

  {
    path: "/projets/view/:id",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewProject author={"auth"}/>,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/projets/view/:id",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewProject author={"admin"}/>,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/projets/view/site/:id/:nomPrpjet/:idProjet",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewSite author={"auth"}/>,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/projets/view/site/:id/:nomPrpjet/:idProjet",
    name: "",
    icon: "ni ni-single-02 text-yellow",
    component: <ViewSite author={"admin"}/>,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/nav/topPrios",
    name: "Mes Top Prios",
    icon: "ni ni-single-02 text-yellow",
    component: <MesTopPrios author={"auth"}/>,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/nav/topPrios",
    name: "Mes Top Prios",
    icon: "ni ni-single-02 text-yellow",
    component: <MesTopPrios author={"admin"}/>,
    layout: "/admin",
    hide: true,
  },
  {
    path: "/nav/calendrier",
    name: "calendrier",
    icon: "ni ni-single-02 text-yellow",
    component: <Calendrier author={"auth"}/>,
    layout: "/auth",
    hide: true,
  },
  {
    path: "/nav/calendrier",
    name: "Calendrier",
    icon: "ni ni-single-02 text-yellow",
    component: <Calendrier author={"admin"}/>,
    layout: "/admin",
    hide: true,
  },
];
export default routes;
