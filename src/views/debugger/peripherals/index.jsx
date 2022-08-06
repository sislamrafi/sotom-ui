import {
  Box,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
} from '@chakra-ui/react';
import { useCallback } from 'react';
import { useState } from 'react';
import Card from '../../../components/card/Card';
import PeripheralList from './PeripheralList';
import PeripheralView from './PeripheralView';

const Peripherals = ({}) => {
  const [peripheral, setPeripheral] = useState({
    name: 'DCMI',
    id: 0,
    address: 100,
  });

  const onPeriSelect = useCallback((idx) => {
    setPeripheral(idx);
  }, []);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      {/* <Grid alignItems={'start'} templateColumns='repeat(10, 1fr)' gap={4}>
        <GridItem colSpan={{ base: 10, sm: 10, md: 3, lg: 3, xl: 2 }}> */}
      <Flex direction={{ base: 'column', md: 'row' }} gap={2}>
        <PeripheralList
          onPeriSelect={onPeriSelect}
          flex={{ base: 1, md: 3, lg: 3, xl: 2, '2xl': 1 }}
        />
        {/* </GridItem> */}
        {/* <GridItem colSpan={{ base: 10, sm: 10, md: 7, lg:7, xl: 8 }}> */}
        <PeripheralView
          peripheral={peripheral}
          flex={{ base: 1, md: 5, lg: 7, xl: 5, '2xl': 4 }}
        />
        {/* </GridItem>
      </Grid> */}
      </Flex>
    </Box>
  );
};

export default Peripherals;
