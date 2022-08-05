import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import { isNull } from '@chakra-ui/utils';
import ApiLoaderSotom from 'api';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

const perilist = {
  gpio: [
    { name: "gpioa", address: '0x0001' },
    { name: "gpiob", address: '0x0002' },
  ],
  dma: [
    { name: "dma", address: '0x0001' },
  ]
};

const RegButton = ({ periClicked, periId, periName, peribaseAddress, ...props }) => {
  return (
    <Button
      w={'full'}
      fontWeight={'light'}
      _focus={{ border: '1px' }}
      fontSize={'sm'}
      {...props}
    >
      <Flex
        w={'full'}
        justifyContent={'space-between'}
        direction={['column', 'row']}
        gap={2}
      >
        <Text>{periName}</Text>
        <Text fontFamily={'mono'}>0x{peribaseAddress.toString(16)}</Text>
      </Flex>
    </Button>
  );
};

const PeripheralAccordionItem = ({ peri, ...props }) => {
  const { periClicked } = props;
  return (
    <AccordionItem
      backgroundColor={useColorModeValue('#F4F7FE', 'navy.900')}
      m={3}
      justifyContent={'space-between'}
      border={'none'}
      borderRadius={'lg'}
      overflow={'hidden'}
    >
      {({ isExpanded }) => {
        return (
          <>
            <AccordionButton
              _focus={{
                boxShadow: 'none',
              }}
              color={isExpanded ? 'brand.500' : 'currentColor'}
            >
              <Box flex='1' textAlign='left'>
                {props.name}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack>
                {peri.length > 0 ? (
                  peri.map((subperi, idx) => {
                    return (
                      <RegButton
                        key={idx}
                        onClick={() => periClicked(subperi)}
                        periName={subperi.name}
                        peribaseAddress={subperi.address}
                      />
                    );
                  })
                ) : (
                  <RegButton
                    periName={peri[0].name + '56'}
                    peribaseAddress={peri[0].address}
                  />
                )}
              </VStack>
            </AccordionPanel>
          </>
        );
      }}
    </AccordionItem>
  );
};

const PeripheralList = (props) => {
  const { periclicked } = props
  const [peripheras, setPeripheras] = useState({})

  const onSuccessCallback = (res) => {
    setPeripheras(res.data['peripherals'])
    periclicked(res.data['peripherals'][Object.keys(res.data['peripherals'])[0]][0])
  }

  useEffect(() => {
    ApiLoaderSotom.getPeripherals(onSuccessCallback)
  }, [])

  return (
    <Flex
      mr={2}
      maxH={'84vh'}
      borderRadius={'2xl'}
      overflow={'hidden'}
      flex={1}

    >
      <Accordion
        w={'full'}
        allowToggle
        p={2}
        backgroundColor={useColorModeValue('white', 'navy.800')}
      >
        <Scrollbars
          autoHide
          style={{ width: '100%', height: '84vh', overflowX: 'hidden' }}
        >
          {!isNull(peripheras) ? Object.entries(peripheras).map(([key, value], idx) => {
            return <PeripheralAccordionItem key={idx} peri={value} name={key} periClicked={periclicked} />;
          }) : (<Text>Loading..</Text>)}
        </Scrollbars>
      </Accordion>
    </Flex>
  );
};

export default PeripheralList;
