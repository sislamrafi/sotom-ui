import { createContext } from "react";

let device = {
    name: 'STM32',
    flash: '512KB',
    sram: '512B',
} 

export const DeviceContext = createContext(device)

