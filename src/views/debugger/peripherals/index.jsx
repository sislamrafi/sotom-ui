import { Box, Flex, HStack } from '@chakra-ui/react';
import Card from '../../../components/card/Card';
import PeripheralList from './PeripheralList';
import PeripheralView from './PeripheralView';

const Peripherals = ({}) => {
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <HStack alignItems={'start'}>
        <PeripheralList flex={1} />
        <PeripheralView flex={4} />
      </HStack>
    </Box>
  );
};

export default Peripherals;
