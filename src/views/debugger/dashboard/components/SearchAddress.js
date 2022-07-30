import React, { useEffect, useState } from "react";

// Chakra imports
import { Box, Flex, Icon, SimpleGrid, StatLabel, Text, useColorModeValue } from "@chakra-ui/react";
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
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { VSeparator } from "components/separator/Separator";
import axios from "axios";

export default function SearchAddress(props) {
  const { value } = props;

  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const inputBg = useColorModeValue("secondaryGray.300", "navy.900");
  const textColorSecondary = "secondaryGray.600";

  const [searchFound, setSearchFound] = useState(null)
  const [address, setAddress] = useState(null)
  const [variableName, setVariableName] = useState(null)
  const [valueReg, setValueReg] = useState(0)

  const callMemorySearchApi = (value) => {
    axios.get(process.env.REACT_APP_API_URL + "search_memory/", {
      params: {
        'value': value
      }
    })
      .then(res => {
        console.log(res.data);
        console.log('returned api')
        var sec = 'Section: '+res.data['section']+' (Size: '+res.data['size']+')'
        setSearchFound(sec)
        setValueReg(res.data['value']??0)
        setVariableName(res.data['name'])
        setAddress(res.data['address'])
      })
      .catch(err => {
        setSearchFound('Error')
      })
  }

  const onSearchClicked = (txt) => {
    console.log("Search Button clicked from parent: +" + txt);
    //setValueReg(554454)
    callMemorySearchApi(txt.toString())
  }

  useEffect(() => {
    console.log("Search Button Init");
  },[])

  return (
    <Card align='center' direction='column' w='100%' >
      <Flex justify='space-between' align='start' px='10px' pt='5px'>
        <Flex flexDirection='column' align='start' me='20px'>

          <Flex align='end'>
            <SearchBar w={"100%"} onClick={(e) => onSearchClicked(e)} placeholder={'Address or Variable'}></SearchBar>

          </Flex>
        </Flex>
        <Flex align='center'>
          <Text color='green.500' fontSize='sm' fontWeight='700'>
            {searchFound ?? 'Nothing Searched'}
          </Text>
        </Flex>
      </Flex>
      <Box mb='auto'>
        {/* <Flex flexDirection='column' align='start' me='20px'>
          <Flex flexDirection='row' align='start' me='20px'>
            <Text color='green.500' fontSize='sm' fontWeight='700'>
              Hello world
            </Text>
            <Text color='green.500' fontSize='sm' fontWeight='700'>
              Hello world
            </Text>
          </Flex>
        </Flex> */}
        <SimpleGrid pt={3} pl={2} columns={{ sm: 1, md: 2, xl: 2 }} spacing='20px'>

          <Card pt={3} pl={5} pb={3} pr={5} bg={inputBg} align='left' direction='column' w='100%' >
            <Text
              lineHeight='100%'
              color={textColorSecondary}
              fontSize={{
                base: "sm",
              }}>
              Variable Name
            </Text>
            <Text color={textColor}
              fontSize={{
                base: "xl",
              }} fontWeight='600'>
              {variableName ?? 'No variable name'}
            </Text>
          </Card>
          <Card pt={3} pl={5} pb={3} pr={5} bg={inputBg} align='left' direction='column' w='100%' >
            <Text
              lineHeight='100%'
              color={textColorSecondary}
              fontSize={{
                base: "sm",
              }}>
              Variable Address
            </Text>
            <Text color={textColor}
              fontSize={{
                base: "xl",
              }} fontWeight='600'>
              {address!=null? '0x'+address.toString(16) : 'No address'}
            </Text>
          </Card>
        </SimpleGrid>
        <Card
          bg={inputBg}
          flexDirection='row'
          //boxShadow={cardShadow}
          w='100%'
          p='15px'
          px='20px'
          mt='15px'
          mr='12px'
          ml='8px'>
          <Flex width={"20%"} direction='column' py='5px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='brand.500' borderRadius='50%' me='4px' />
              <Text
                fontSize='xs'
                color='secondaryGray.600'
                fontWeight='700'
                mb='0px'>
                Hex :
              </Text>
            </Flex>
            <Text align={'left'} fontSize='md' color={textColor} fontWeight='700'>
              0x {(valueReg).toString(16).padStart(8, '0').replace(/(.{2})/g, '$1 ').trim()}
            </Text>
          </Flex>
          <VSeparator mx={{ base: "30px", xl: "30px", "2xl": "30px" }} />
          <Flex width={"70%"} direction='column' py='5px' me='10px'>
            <Flex align='center'>
              <Box h='8px' w='8px' bg='#6AD2FF' borderRadius='50%' me='4px' />
              <Text
                fontSize='xs'
                color='secondaryGray.600'
                fontWeight='700'
                mb='0px'>
                Binary :
              </Text>
            </Flex>
            <Text mr={10} align={'left'} fontSize='md' letterSpacing={0} color={textColor} fontWeight='700'>
              0b {valueReg.toString(2).padStart(32, '0').replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim()}
            </Text>
          </Flex>
        </Card>
      </Box>
    </Card>
  );
}
