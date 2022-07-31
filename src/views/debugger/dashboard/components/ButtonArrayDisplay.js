import React, { useEffect, useRef, useState } from "react";

// Chakra imports
import { Box, Flex, Icon, Text, useColorModeValue } from "@chakra-ui/react";
import BarChart from "components/charts/BarChart";

// Custom components
import Card from "components/card/Card.js";
import {
  barChartDataDailyTraffic,
  barChartOptionsDailyTraffic,
} from "variables/charts";

// Assets
import { RiArrowUpSFill } from "react-icons/ri";
import { barChartIptionsDebugButtons } from "variables/sotom_charts";
import { debugCharValues } from "variables/sotom_charts";
import ApiLoaderSotom from "api";

export default function ButtonArrayDisplay(props) {
  const { value } = props;

  const [barValues, setBarValues] = useState(debugCharValues)
  const oldValue = useRef(0)
  const curValue = useRef(0)

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const valueToBar = (val) => {
    let len = 16;
    let arr = [];
    for (let i = 0; i < len; i++) {
      if ((val >> i) & 0b1) arr.push(1)
      else arr.push(0)
    }
    //arr.push(0.1)
    //console.log(arr);
    return arr;
  }

  const getAddressSuccess = (res) => {
    if(oldValue.current == res.data.value) return;
    curValue.current = res.data.value
    setBarValues([
      {
        name: "Buttons",
        data: valueToBar(res.data.value),
      },
    ])
    oldValue.current = res.data.value
  }

  useEffect(() => {
    ApiLoaderSotom.searchMemory('DEBUG_BUTTON', getAddressSuccess, null)
    const interval = setInterval(() =>
      ApiLoaderSotom.searchMemory('DEBUG_BUTTON', getAddressSuccess, null),
      333)
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <Card align='center' direction='column' w='100%' >
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>
          <Flex w='100%'>
            <Text
              me='auto'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              Debug Button
            </Text>
          </Flex>
          <Flex align='end'>
            <Text
            letterSpacing={3}
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              0x{curValue.current.toString(16).padStart(4, '0')}
            </Text>
            <Text
              ms='6px'
              color='secondaryGray.600'
              fontSize='sm'
              fontWeight='500'>
              value
            </Text>
          </Flex>
        </Flex>
        <Flex align='center'>
          <Icon as={RiArrowUpSFill} color='green.500' />
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            Realtime
          </Text>
        </Flex>
      </Flex>
      <Box h='130px' mt='auto'>
        <BarChart
          chartData={barValues}
          chartOptions={barChartIptionsDebugButtons}
        />
      </Box>
    </Card>
  );
}
