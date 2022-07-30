// Chakra imports
import {
  Avatar,
  Box,
  Flex,
  FormLabel,
  Icon,
  Select,
  SimpleGrid,
  useColorModeValue,
} from "@chakra-ui/react";
// Assets
import Usa from "assets/img/dashboards/usa.png";
// Custom components
import MiniCalendar from "components/calendar/MiniCalendar";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import React from "react";
import {
  MdAddTask,
  MdAttachMoney,
  MdBarChart,
  MdFileCopy, MdOutlineMemory,
  MdOutlineSdStorage, MdOutlineLanguage,
  MdAutoAwesomeMotion, MdOutlineSpeed,
} from "react-icons/md";
import CheckTable from "views/debugger/dashboard/components/CheckTable";
import ComplexTable from "views/debugger/dashboard/components/ComplexTable";
import DailyTraffic from "views/debugger/dashboard/components/DailyTraffic";
import PieCard from "views/debugger/dashboard/components/PieCard";
import Tasks from "views/debugger/dashboard/components/Tasks";
import TotalSpent from "views/debugger/dashboard/components/TotalSpent";
import WeeklyRevenue from "views/debugger/dashboard/components/WeeklyRevenue";
import {
  columnsDataCheck,
  columnsDataComplex,
} from "views/debugger/dashboard/variables/columnsData";
import { RamGraph, RamGraphOptions } from "variables/sotom_charts";
import tableDataCheck from "views/debugger/dashboard/variables/tableDataCheck.json";
import tableDataComplex from "views/debugger/dashboard/variables/tableDataComplex.json";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ButtonArray from "./components/ButtonArrayDisplay";
import ButtonArrayDisplay from "./components/ButtonArrayDisplay";
import ButtonArrayClickable from "./components/ButtonArrayClickable";
import SearchAddress from "./components/SearchAddress";
import { AnalogSlider } from "./components/AnalogSlider";
import ApexChart from "./components/RealtimeChart";
import ApiLoaderSotom from "api";
import StatusCards from "./components/StatusCards";

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue("brand.500", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");


  const [debugButton, setDebugButton] = useState(1)
  const [analogDebugButton, setAnalogDebugButton] = useState(100)

  const [addressOfButtons, setaddressOfButtons] = useState(0)
  const [addressOfAnalogDebug, setAddressOfAnalogDebug] = useState(1)

  const [ramGraphPoint, setRamGraphPoint] = useState({ stack: 0, ram: 0 })

  function numToSize(number, ext = 'B', div = 1024) {
    var sizes = ['', 'K', 'M', 'G', 'T'];
    if (number == 0) return '0 ' + ext;
    var i = parseInt(Math.floor(Math.log(number) / Math.log(div)));
    return Math.round(number / Math.pow(div, i), 2) + ' ' + sizes[i] + ext;
  }

  const callMemoryInfoApi = () => {
    axios.get(process.env.REACT_APP_API_URL + "get_memory_info/", {
      params: {

      }
    })
      .then(res => {
        //console.log(res.data);
        changeCardValuesIfChanged(res.data)
      })
      .catch(err => {

      })
  }

  const changeCardValuesIfChanged = (data) => {
    if (data.status !== 'ok') return

    //console.log('counter :'+counter);

    let fs = numToSize(data.total_flash)
    let ms = numToSize(data.total_sram)
    let cs = numToSize(data.text_size)
    let gbs = numToSize(data.data_size + data.bss_size)
    let ss = numToSize(data.stack_size + data.data_size + data.bss_size)
    let sclk = numToSize(data.sys_clock_speed, 'Hz', 1000)
    let ffs = ((data.total_flash - data.text_size) / data.total_flash) * 100;
    let dbd = data.debug_button
    let dba = data.debug_button_addr
    let dbaa = data.debug_analog_io_addr
    //RamGraph[0].data.push(data.stack_size + data.data_size + data.bss_size)
    //RamGraph[1].data.push(data.stack_size)
    //RamGraphOptions.xaxis.categories.append(18)

    // if (fs != flashSize){
    //   console.log("Flash Size %d , %d",fs,flashSize)
    //   setFlashSize(fs)
    // }

    // if (ms != sramSize)
    //   setSramSize(ms)

    // if (cs != flashInfo.used)
    //   setFlashInfo({ used: cs, free: ffs.toFixed(2) + '%' })

    // if (gbs != globalVariableSize)
    //   setGlobalVariableSize(gbs)

    // if (ss != stackSize) {
    //   setStackSize(ss)
    //   setRamGraphPoint({ stack: data.stack_size, ram: data.stack_size + data.data_size + data.bss_size })
    // }

    // if (sclk != sysClockSpeed) {
    //   //console.log("address sys clock");
    //   setSysClockSpeed(sclk)
    // }

    // if (dbaa != addressOfAnalogDebug) {
    //   setAddressOfAnalogDebug(dbaa)
    // }

    // if (dba != addressOfButtons) {
    //   //console.log("address update in main :" + addressOfButtons + ' ' + dba);
    //   setaddressOfButtons(dba)
    // }

    // if (dbd != debugButton) {
    //   //console.log('address')
    //   setDebugButton(dbd)
    // }

    //setFlashSize(prv=>prv+1);

  }


  useEffect(() => {
    console.log("Init Once");
    callMemoryInfoApi()
    const interval = setInterval(() => callMemoryInfoApi(), 3000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>

      <StatusCards boxBg={boxBg} brandColor={brandColor} />

      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ApexChart />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <ButtonArrayClickable value={debugButton} dbgAddress={addressOfButtons} />
          <ButtonArrayDisplay value={debugButton} />

        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <AnalogSlider address={addressOfAnalogDebug} />
          <SearchAddress value={debugButton} />
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 2, xl: 2 }} gap='20px'>
          <PieCard />
          <MiniCalendar h='100%' minW='100%' selectRange={false} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
