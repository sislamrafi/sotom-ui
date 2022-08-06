import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  Text,
  useColorModeValue,
  VStack,
} from '@chakra-ui/react';
import ApiLoaderSotom from 'api';
import { SearchBar } from '../../../components/navbar/searchBar/SearchBar';
import { useEffect, useState } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

// const perilist = {
//   gpio: [
//     { name: 'gpioa', address: '0x0001' },
//     { name: 'gpiob', address: '0x0002' },
//   ],
//   dma: [{ name: 'dma', address: '0x0001' }],
// };

const RegButton = ({
  periClicked,
  periId,
  periName,
  peribaseAddress,
  ...props
}) => {
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

const PeripheralAccordionItem = ({ peri, onPeriSelect, ...props }) => {
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
                        onClick={() => onPeriSelect(subperi)}
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

const PeripheralList = ({ onPeriSelect, ...props }) => {
  const [peripherals, setPeripherals] = useState([]);
  const [searchKey, setSearchKey] = useState('');

  const onSuccessCallback = (res) => {
    const peripherals = Object.entries(res.data['peripherals']);
    setPeripherals(peripherals);
    onPeriSelect(peripherals[0][1][0]);
  };

  useEffect(() => {
    ApiLoaderSotom.getPeripherals(onSuccessCallback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log('haha');
  return (
    <Flex
      mr={2}
      maxH={'84vh'}
      borderRadius={'2xl'}
      overflow={'hidden'}
      flex={1}
      {...props}
    >
      <Accordion
        w={'full'}
        allowMultiple
        p={2}
        backgroundColor={useColorModeValue('white', 'navy.800')}
      >
        <Scrollbars
          autoHide
          style={{ width: '100%', height: '84vh', overflowX: 'hidden' }}
        >
          <Box p={2}>
            <SearchBar
              onClick={setSearchKey}
              onKeyUp={setSearchKey}
              w={'full'}
            />
          </Box>
          {peripherals.length > 0 ? (
            peripherals
              .filter(
                ([key, value]) => key.indexOf(searchKey.toUpperCase()) !== -1
              )
              .map(([key, value], idx) => {
                return (
                  <PeripheralAccordionItem
                    key={idx}
                    peri={value}
                    name={key}
                    onPeriSelect={onPeriSelect}
                  />
                );
              })
          ) : (
            <Text>Loading..</Text>
          )}
        </Scrollbars>
      </Accordion>
    </Flex>
  );
};

export default PeripheralList;
