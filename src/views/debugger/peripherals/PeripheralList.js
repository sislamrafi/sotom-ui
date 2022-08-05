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
import { Scrollbars } from 'react-custom-scrollbars-2';

const perilist = [
  {
    periName: 'GPIO',
    baseAddress: '0x40001400',
    subPeriList: [
      {
        subPeriName: 'GPIOA',
        baseAddress: '0x40014014',
      },
      {
        subPeriName: 'GPIOB',
        baseAddress: '0x4001408C',
      },
      {
        subPeriName: 'GPIOC',
        baseAddress: '0x400140F0',
      },
    ],
  },
  {
    periName: 'USART',
    baseAddress: '0x40005400',
    subPeriList: [
      {
        subPeriName: 'USART1',
        baseAddress: '0x40014014',
      },
      {
        subPeriName: 'USART2',
        baseAddress: '0x4001408C',
      },
      {
        subPeriName: 'USART3',
        baseAddress: '0x400140F0',
      },
    ],
  },
  {
    periName: 'RCC',
    baseAddress: '0x40234030',
  },
];

const RegButton = ({ periName, peribaseAddress, ...props }) => {
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
        <Text fontFamily={'mono'}>{peribaseAddress}</Text>
      </Flex>
    </Button>
  );
};

const PeripheralAccordionItem = ({ peri = perilist[0], ...props }) => {
  return (
    <AccordionItem
      backgroundColor={useColorModeValue('#F4F7FE', 'navy.900')}
      m={3}
      justifyContent={'space-between'}
      border={'none'}
      borderRadius={'lg'}
      overflow={'hidden'}
      {...props}
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
                {peri.periName}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              <VStack>
                {peri.subPeriList ? (
                  peri.subPeriList.map((subperi, idx) => {
                    return (
                      <RegButton
                        periName={subperi.subPeriName}
                        peribaseAddress={subperi.baseAddress}
                      />
                    );
                  })
                ) : (
                  <RegButton
                    periName={peri.periName}
                    peribaseAddress={peri.baseAddress}
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
  return (
    <Flex
      mr={2}
      maxH={'84vh'}
      borderRadius={'2xl'}
      overflow={'hidden'}
      {...props}
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
          {perilist.map((peri, idx) => {
            return <PeripheralAccordionItem key={idx} peri={peri} />;
          })}
        </Scrollbars>
      </Accordion>
    </Flex>
  );
};

export default PeripheralList;
