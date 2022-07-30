// Chakra imports
import {
  Box,
  Button,
  Flex,
  Icon,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import LineChart from "components/charts/LineChart";
import React, { useEffect, useState } from "react";
import { IoCheckmarkCircle } from "react-icons/io5";
import { MdBarChart, MdOutlineCalendarToday } from "react-icons/md";
// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { RamGraph } from "variables/sotom_charts";
import { RamGraphOptions } from "variables/sotom_charts";

export default function TotalSpent(props) {
  const { graphPoints } = props;

  // Chakra Color Mode

  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = useColorModeValue("secondaryGray.600", "white");
  const boxBg = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const iconColor = useColorModeValue("brand.500", "white");
  const bgButton = useColorModeValue("secondaryGray.300", "whiteAlpha.100");
  const bgHover = useColorModeValue(
    { bg: "secondaryGray.400" },
    { bg: "whiteAlpha.50" }
  );
  const bgFocus = useColorModeValue(
    { bg: "secondaryGray.300" },
    { bg: "whiteAlpha.100" }
  );

  const [graphPointsM, setGraphPointsM] = useState(props.graphPoints)
  const [graphData, setGraphData] = useState(RamGraph)
  const [sramQ, setSramQ] = useState([0, 0, 0, 0, 0, 0, 0])
  const [stackQ, setStackQ] = useState([0, 0, 0, 0, 0, 0, 0])
  const [upDown, setUpDown] = useState(0)

  const gLen = 35

  const upDownCalculator = (sram) => {
    let len = sram.length;
    if (sram[len - 1] - sram[len - 2] == 0) return 0
    return ((sram[len - 2] / (sram[len - 1] - sram[len - 2])) * 100).toFixed(2)
  }

  const graphUpdateNeed = (data) => {
    let len = gLen;
    for (let i = 1; i < data.length; i++) {
      if (data[i]!=data[i-1]) return true
    }
    return false;
  }

  const formatGraphArray = (arr, newData) => {
    let len = gLen;
    let thres = 1000;

    arr = arr.slice(1);
    arr.push(newData)

    let max = Math.max.apply(Math, arr);

    while (arr.length < len)
      arr.push(0)

    // for (let i=0; i<arr.length; i++ ){
    //   if(arr[i] < max-thres)arr[i]=newData
    // }
    return arr;
  }

  const callChartUpdate = () => {

  }

  useEffect(() => {
    //if (!graphUpdateNeed(sramQ)) return;
    //console.log('its running');

    setSramQ(prv=>formatGraphArray(prv, graphPoints.ram))
    setStackQ(formatGraphArray(stackQ, graphPoints.stack))
    setUpDown(upDownCalculator(sramQ))
    setGraphPointsM(graphPoints)
    setGraphData([
      {
        name: "SRAM",
        data: sramQ,
      },
      {
        name: "STACK",
        data: stackQ,
      }]
    );
    //setCounter(current => current + 1)

  }, [graphPoints])

  return (
    <Card
      justifyContent='center'
      align='center'
      direction='column'
      w='100%'
      mb='0px'
    >
      <Flex justify='space-between' ps='0px' pe='20px' pt='5px'>
        <Flex align='center' w='100%'>
          <Button
            bg={boxBg}
            fontSize='sm'
            fontWeight='500'
            color={textColorSecondary}
            borderRadius='7px'>
            <Icon
              as={MdOutlineCalendarToday}
              color={textColorSecondary}
              me='4px'
            />
            {props.title}
          </Button>
          <Button
            ms='auto'
            align='center'
            justifyContent='center'
            bg={bgButton}
            _hover={bgHover}
            _focus={bgFocus}
            _active={bgFocus}
            w='37px'
            h='37px'
            lineHeight='100%'
            borderRadius='10px'
          >
            <Icon as={MdBarChart} color={iconColor} w='24px' h='24px' />
          </Button>
        </Flex>
      </Flex>
      <Flex w='100%' flexDirection={{ base: "column", lg: "row" }}>
        <Flex flexDirection='column' me='20px' mt='28px'>
          <Text
            color={textColor}
            fontSize='34px'
            textAlign='start'
            fontWeight='700'
            lineHeight='100%'>
            {props.value}
          </Text>
          <Flex align='center' mb='20px'>
            <Text
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'
              mt='4px'
              me='12px'>
              Usage
            </Text>
            <Flex align='center'>
              <Icon as={RiArrowUpSFill} color='green.500' me='2px' mt='2px' />
              <Text color='green.500' fontSize='sm' fontWeight='700'>
                0%
              </Text>
            </Flex>
          </Flex>

          <Flex align='center'>
            <Icon as={IoCheckmarkCircle} color='green.500' me='4px' />
            <Text color='green.500' fontSize='md' fontWeight='700'>
              {props.status}
            </Text>
          </Flex>
        </Flex>
        <Box minH='260px' minW='75%' mt='auto'>
          <LineChart
            chartData={graphData}
            chartOptions={RamGraphOptions}
            text={''}
          />
        </Box>
      </Flex>
    </Card>
  );
}
