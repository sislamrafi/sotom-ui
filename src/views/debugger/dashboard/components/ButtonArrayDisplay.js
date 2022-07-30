import React, { useEffect, useState } from "react";

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

export default function ButtonArrayDisplay(props) {
  const { value } = props;

  const [barValues,setBarValues] = useState(debugCharValues)

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");

  const valueToBar = (val)=>{
    let len = 16;
    let arr = [];
    for(let i = 0; i<len;i++){
      if((val>>i)&0b1)arr.push(1)
      else arr.push(0)
    }
    //arr.push(0.1)
    //console.log(arr);
    return arr;
  }

  useEffect(()=>{
    //console.log(value)
    setBarValues([
      {
        name: "Buttons",
        data: valueToBar(value),
      },
    ])
  },[value])

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
              color={textColor}
              fontSize='34px'
              fontWeight='700'
              lineHeight='100%'>
              0x{value.toString(16)}
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
