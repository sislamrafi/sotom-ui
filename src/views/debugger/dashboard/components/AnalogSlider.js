import { Flex, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useColorMode, useColorModeValue } from "@chakra-ui/react";
import ApiLoaderSotom from "api";
import axios from "axios";
import Card from "components/card/Card";
import React, { useEffect, useRef, useState } from "react";

export function AnalogSlider(props) {

    // Chakra Color Mode
    const textColor = useColorModeValue("secondaryGray.900", "white");
    const cardColor = useColorModeValue("white", "navy.700");
    const cardShadow = useColorModeValue(
        "15px 25px 50px rgba(112, 144, 176, 0.12)",
        "unset"
    );

    const [sliderValue, setSliderValue] = useState(0)
    const [sendForApi, setSendForApi] = useState(false)
    const [prvSliderVal, setPrvSliderVal] = useState(0)

    const sliderValueRefCurrent = useRef(0)
    const sliderValueRefPast = useRef(0)

    const labelStyles = {
        mt: '2',
        ml: '-2.5',
        fontSize: 'sm',
    }

    const callCommand = () => {
        //setSendForApi(prv=>!prv)
        let cur = sliderValueRefCurrent.current
        let past = sliderValueRefPast.current
        //console.log("analog slider :" +past+ " "+cur);
        if(cur===past)return;
        console.log("analog slider Api gone");
        sliderValueRefPast.current = cur;
        let command = 'write16'

        ApiLoaderSotom.commandDevice(command,props.address,cur)
    }

    const handelSliderValue = (val) => {
        console.log(val);
        setSliderValue(val);
        sliderValueRefCurrent.current=val
    }

    useEffect(() => {
        console.log(props.address);
        setPrvSliderVal(sliderValue)
        const interval = setInterval(() => callCommand(), 250)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <Card p='20px' align='center' direction='column' w='100%' >
            <Flex justify='space-between' align='start' px='10px' pt='5px'>
                <Flex
                    px={{ base: "0px", "2xl": "10px" }}
                    justifyContent='space-between'
                    alignItems='center'
                    w='100%'
                    mb='8px'>
                    <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
                        Analog Button Slider
                    </Text>

                </Flex>

                <Flex align='center'>
                    <Text color='green.500' fontSize='sm' fontWeight='700'>
                        0x{sliderValue.toString(16)}
                    </Text>
                </Flex>
            </Flex>


            <Card
                justifyContent='center'
                bg={cardColor}

                flexDirection='column'
                boxShadow={cardShadow}
                w='100%'

                p='25px'
                px='20px'
                mt='15px'
                mx='auto'>

                <Slider minH='15' min={0} max={0xffff} aria-label='slider-ex-6' defaultValue={sliderValue} onChange={(val) => handelSliderValue(val)}>
                    <SliderMark value={((0xffff - 1) * 0.25).toFixed(0)} {...labelStyles}>
                        {((0xffff - 1) * 0.25).toFixed(0)}
                    </SliderMark>
                    <SliderMark value={((0xffff - 1) * 0.5).toFixed(0)} {...labelStyles}>
                        {((0xffff - 1) * 0.5).toFixed(0)}
                    </SliderMark>
                    <SliderMark value={((0xffff - 1) * 0.75).toFixed(0)} {...labelStyles}>
                        {((0xffff - 1) * 0.75).toFixed(0)}
                    </SliderMark>
                    <SliderMark
                        value={sliderValue}
                        textAlign='center'
                        bg='blue.500'
                        color='white'
                        mt='-9'
                        ml='-4'
                        w='12'
                    >
                        {sliderValue}
                    </SliderMark>
                    <SliderTrack>
                        <SliderFilledTrack />
                    </SliderTrack>
                    <SliderThumb />
                </Slider>

            </Card>
        </Card>
    );
}