import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdDeviceHub,
  MdRequestQuote,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/debugger/dashboard";
import DataTable from "views/debugger/dataTables";

const routes = [
  {
    name: "Dashboard",
    layout: "/debugger",
    path: "/dashboard",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "Peripheral",
    layout: "/debugger",
    path: "/peripheral",
    icon: <Icon as={MdDeviceHub} width='20px' height='20px' color='inherit' />,
    component: DataTable,
  },
];

export default routes;
