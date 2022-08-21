import React from 'react';

import { Icon } from '@chakra-ui/react';
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdDeviceHub,
  MdMemory,
  MdRequestQuote,
} from 'react-icons/md';

// Admin Imports
import MainDashboard from 'views/debugger/dashboard';
import Peripherals from 'views/debugger/peripherals';
import MemoryView from 'views/debugger/memoryview';

const routes = [
  {
    name: 'Dashboard',
    layout: '/debugger',
    path: '/dashboard',
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: 'Peripheral',
    layout: '/debugger',
    path: '/peripheral',
    icon: <Icon as={MdDeviceHub} width='20px' height='20px' color='inherit' />,
    component: Peripherals,
  },
  {
    name: 'Memory View',
    layout: '/debugger',
    path: '/memoryview',
    icon: <Icon as={MdMemory} width='20px' height='20px' color='inherit' />,
    component: MemoryView,
  },
];

export default routes;
