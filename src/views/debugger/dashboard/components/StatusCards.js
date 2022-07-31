import { Icon, SimpleGrid, Text } from "@chakra-ui/react"
import React, { useEffect, useRef, useState } from "react"
import {
    MdOutlineMemory,
    MdOutlineSdStorage, MdOutlineLanguage,
    MdAutoAwesomeMotion, MdOutlineSpeed,
} from "react-icons/md";
import MiniStatistics from "components/card/MiniStatistics";
import IconBox from "components/icons/IconBox";
import { DeviceContext } from "contexts/DeviceContext";
import ApiLoaderSotom from "api";

export default function StatusCards(props) {
    const { boxBg, brandColor } = props

    const flashSize = useRef('Loading..')
    const sramSize = useRef('Loading..')
    const flashInfo = useRef({ used: 'loading..', free: 'loading..' })
    const globalVariableSize = useRef('Loading..')
    const stackSize = useRef('Loading..')
    const sysClockSpeed = useRef('Loading..')

    const [state, setState] = useState(0)

    function numToSize(number, ext = 'B', div = 1024) {
        var sizes = ['', 'K', 'M', 'G', 'T'];
        if (number == 0) return '0 ' + ext;
        var i = parseInt(Math.floor(Math.log(number) / Math.log(div)));
        return Math.round(number / Math.pow(div, i), 2) + ' ' + sizes[i] + ext;
    }

    let changeCardValuesIfChanged = (data) => {
        if (data.status !== 'ok') return

        let fs = numToSize(data.total_flash)
        let ms = numToSize(data.total_sram)
        let cs = numToSize(data.text_size)
        let gbs = numToSize(data.data_size + data.bss_size)
        let ss = numToSize(data.stack_size + data.data_size + data.bss_size)
        let sclk = numToSize(data.sys_clock_speed, 'Hz', 1000)
        let ffs = ((data.total_flash - data.text_size) / data.total_flash) * 100;

        if (fs != flashSize.current) {
            console.log("Flash Size %d , %d", fs, flashSize)
            flashSize.current = fs
        }

        if (ms != sramSize.current) {
            sramSize.current = ms
        }

        if (cs != flashInfo.current.used) {
            flashInfo.current = { used: cs, free: ffs.toFixed(2) + '%' }
        }

        if (gbs != globalVariableSize.current)
            globalVariableSize.current = gbs

        if (ss != stackSize.current) {
            stackSize.current = ss
            if (window.setSramUsage != null) {
                window.$ram_usage = []
            }
            window.setSramUsage(data.stack_size + data.data_size + data.bss_size)
            setState(prv => prv + 1)
        }

        if (sclk != sysClockSpeed.current) {
            sysClockSpeed.current = sclk
        }

    }

    const onSuccessCallback = (res) => {
        changeCardValuesIfChanged(res.data)
    }

    useEffect(() => {
        const interval = setInterval(() => ApiLoaderSotom.getMemoryInfo(onSuccessCallback), 300)
        return () => {
            clearInterval(interval);
        }
    }, [])

    const value = React.useContext(DeviceContext)


    return (
        <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3, "2xl": 6 }}
            gap='20px'
            mb='20px'>
            <MiniStatistics
                iconS={MdOutlineSdStorage}
                brandColor={brandColor}
                boxBg={boxBg}
                name='Flash Size'
                value={flashSize.current}
            />
            <MiniStatistics
                iconS={MdOutlineMemory}
                brandColor={brandColor}
                boxBg={boxBg}
                name='SRAM Size'
                value={sramSize.current}
            />

            <MiniStatistics growth={flashInfo.current.free} name='Flash Used' value={flashInfo.current.used} growthTxt="Free Flash Space" />

            <MiniStatistics
                iconS={MdOutlineLanguage}
                brandColor={brandColor}
                boxBg={boxBg}
                name='Global Variables'
                value={globalVariableSize.current}
            />

            <MiniStatistics
                iconS={MdAutoAwesomeMotion}
                brandColor={brandColor}
                boxBg={boxBg}
                growth="In Last 1.5"
                growthTxt="Seconds"
                name='SRAM Usage'
                value={stackSize.current}
            />
            <MiniStatistics
                iconS={MdOutlineSpeed}
                brandColor={brandColor}
                boxBg={boxBg}
                name='System Clock'
                value={sysClockSpeed.current}
            />
        </SimpleGrid>
    )
}