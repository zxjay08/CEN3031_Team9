/*!

=========================================================
* Now UI Dashboard React - v1.5.2
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Dashboard2 from "views/Dashboard2.js";
import Notifications from "./views/Assignment.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/TableList.js";
import AwardView from "./views/AwardView.js";
import Upgrade from "views/Upgrade.js";
import UserPage from "views/UserPage.js";
import Login from "views/Login.js"
import Chat from "views/Chat.js"

var dashRoutes = [
  {
    // Login page
    path: "/login",
    name: "Log-In",
    icon: "gestures_tap-01",
    component: <Login />,
    layout: "/admin",
  },
  {
    // User page
    path: "/user-page",
    name: "Student Profile",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
  },
  {
    // Notifications page
    path: "/notifications",
    name: "Assignment Calendar",
    icon: "ui-1_calendar-60",
    component: <Notifications />,
    layout: "/admin",
  },
  {
    // Chat page
    path: "/chat",
    name: "Chat",
    icon: "design_vector",
    component: <Chat />,
    layout: "/admin",
  },
  {
    // Award view page
    path: "/awardview",
    name: "Award View",
    icon: "sport_trophy",
    component: <AwardView />,
    layout: "/admin",
  },
  {
    // Secretary trends page
    path: "/dashboard",
    name: "Secretary Trends",
    icon: "media-2_sound-wave",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    // Teacher trends page
    path: "/dashboard2",
    name: "Teacher Trends",
    icon: "media-2_sound-wave",
    component: <Dashboard2 />,
    layout: "/admin",
  },
  {
    // Teacher contact information page (for parents)
    path: "/extended-tables",
    name: "Contact Information",
    icon: "ui-1_bell-53",
    component: <TableList />,
    layout: "/admin",
  },
    // Unused
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "design_image",
  //   component: <Icons />,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "design-2_ruler-pencil",
  //   component: <Typography />,
  //   layout: "/admin",
  // },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "objects_spaceship",
  //   component: <Upgrade />,
  //   layout: "/admin",
  // },
];
export default dashRoutes;
