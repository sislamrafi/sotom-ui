import { Box, Flex, Grid, GridItem, HStack, SimpleGrid } from '@chakra-ui/react';
import { useState } from 'react';
import Card from '../../../components/card/Card';
import PeripheralList from './PeripheralList';
import PeripheralView from './PeripheralView';

const Peripherals = ({ }) => {
  const [peripheral, setPeripheral]
    = useState({
      name: "DCMI",
      id: 0,
      address: 100
    })

  const periClicked = (idx)=>{
    console.log(idx);
    setPeripheral(idx)
  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Grid alignItems={'start'} templateColumns='repeat(6, 1fr)' gap={4}>
      <GridItem colSpan={{ base: 2, sm:6, md: 3, xl: 2 }}><PeripheralList periclicked={periClicked} flex={0.1} /></GridItem>
      <GridItem colSpan={{ base: 4, sm:6, md: 3, xl: 4 }}> <PeripheralView peripheral={peripheral} /></GridItem>
      </Grid>
    </Box>
  );
};

export default Peripherals;
