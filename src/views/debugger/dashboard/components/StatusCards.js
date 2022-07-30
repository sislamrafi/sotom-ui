import { Icon, SimpleGrid, Text } from "@chakra-ui/react"
import { useEffect, useRef, useState } from "react"
import {
    MdOutlineMemory,
    MdOutlineSdStorage, MdOutlineLanguage,
    MdAutoAwesomeMotion, MdOutlineSpeed,
} from "react-icons/md";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";

export default function StatusCards(props) {
    const { boxBg, brandColor } = props

    const flashSizeX = useRef(0)
    const [flashSize, setFlashSize] = useState('Loading..')
    const [sramSize, setSramSize] = useState('Loading..')
    const [flashInfo, setFlashInfo] = useState({ used: 'loading..', free: 'loading..' })
    const [globalVariableSize, setGlobalVariableSize] = useState('Loading..')
    const [stackSize, setStackSize] = useState('Loading..')
    const [sysClockSpeed, setSysClockSpeed] = useState('Loading..')

    function numToSize(number, ext = 'B', div = 1024) {
        var sizes = ['', 'K', 'M', 'G', 'T'];
        if (number == 0) return '0 ' + ext;
        var i = parseInt(Math.floor(Math.log(number) / Math.log(div)));
        return Math.round(number / Math.pow(div, i), 2) + ' ' + sizes[i] + ext;
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

    const testCall = () => {
        //setFlashSize("500B")
        setSramSize(prv => prv + 1)
        //setFlashSizeX(prv=>prv+1) 
        flashSizeX.current += 1
    }

    useEffect(() => {
        console.log("Init Once");
        // callMemoryInfoApi()
        setSramSize(0)
        const interval = setInterval(() => testCall(), 300)
        return () => {
            clearInterval(interval);
        }
    }, [])


    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap='20px'
            mb='20px'>
            <MiniStatistics
                iconS = {MdOutlineSdStorage}
                brandColor = {brandColor}
                boxBg = {boxBg}
                name='Flash Size'
                value={flashSize}
            />
            <MiniStatistics
                iconS = {MdOutlineMemory}
                brandColor = {brandColor}
                boxBg = {boxBg}
                name='SRAM Size'
                value={sramSize}
            />

            <MiniStatistics growth={flashInfo.free} name='Flash Used' value={flashInfo.used} growthTxt="Free Flash Space" />

            <MiniStatistics
                iconS = {MdOutlineLanguage}
                brandColor = {brandColor}
                boxBg = {boxBg}
                name='Global Variables'
                value={globalVariableSize}
            />

            <MiniStatistics
                iconS = {MdAutoAwesomeMotion}
                brandColor = {brandColor}
                boxBg = {boxBg}
                growth="In Last 1.5"
                growthTxt="Seconds"
                name='SRAM Usage'
                value={stackSize}
            />
            <MiniStatistics
                iconS = {MdOutlineSpeed}
                brandColor = {brandColor}
                boxBg = {boxBg}
                name='System Clock'
                value={sysClockSpeed}
            />
        </SimpleGrid>
    )
}