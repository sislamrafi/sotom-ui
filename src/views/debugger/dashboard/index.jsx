// Chakra imports
import { Box, SimpleGrid, useColorModeValue } from '@chakra-ui/react';
import React from 'react';

import { useEffect } from 'react';
import { useState } from 'react';
import ButtonArrayClickable from './components/ButtonArrayClickable';
import SearchAddress from './components/SearchAddress';
import { AnalogSlider } from './components/AnalogSlider';
import ApexChart from './components/RealtimeChart';
import StatusCards from './components/StatusCards';

export default function UserReports() {
  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');

  const [example, setExample] = useState(10);

  const [debugButton, setDebugButton] = useState(1);
  const [analogDebugButton, setAnalogDebugButton] = useState(100);

  const [addressOfButtons, setaddressOfButtons] = useState(0);
  const [addressOfAnalogDebug, setAddressOfAnalogDebug] = useState(1);

  const [ramGraphPoint, setRamGraphPoint] = useState({ stack: 0, ram: 0 });

  function numToSize(number, ext = 'B', div = 1024) {
    var sizes = ['', 'K', 'M', 'G', 'T'];
    if (number == 0) return '0 ' + ext;
    var i = parseInt(Math.floor(Math.log(number) / Math.log(div)));
    return Math.round(number / Math.pow(div, i), 2) + ' ' + sizes[i] + ext;
  }

  const changeCardValuesIfChanged = (data) => {
    if (data.status !== 'ok') return;

    //console.log('counter :'+counter);

    let fs = numToSize(data.total_flash);
    let ms = numToSize(data.total_sram);
    let cs = numToSize(data.text_size);
    let gbs = numToSize(data.data_size + data.bss_size);
    let ss = numToSize(data.stack_size + data.data_size + data.bss_size);
    let sclk = numToSize(data.sys_clock_speed, 'Hz', 1000);
    let ffs = ((data.total_flash - data.text_size) / data.total_flash) * 100;
    let dbd = data.debug_button;
    let dba = data.debug_button_addr;
    let dbaa = data.debug_analog_io_addr;

    //setExample(ss);
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
  };

  useEffect(() => {
    // console.log("Init Once");
    // callMemoryInfoApi()
    // const interval = setInterval(() => callMemoryInfoApi(), 300)
    // return () => {
    //   clearInterval(interval);
    // }
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <StatusCards boxBg={boxBg} brandColor={brandColor} />
      <SimpleGrid columns={{ base: 1, md: 1, xl: 2 }} gap='20px' mb='20px'>
        <ApexChart />
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <ButtonArrayClickable
            value={debugButton}
            dbgAddress={addressOfButtons}
          />
          <AnalogSlider address={addressOfAnalogDebug} />
        </SimpleGrid>
      </SimpleGrid>
      <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px' mb='20px'>
        <SimpleGrid columns={{ base: 1, md: 1, xl: 1 }} gap='20px'>
          <SearchAddress value={debugButton} />
        </SimpleGrid>
      </SimpleGrid>
    </Box>
  );
}
