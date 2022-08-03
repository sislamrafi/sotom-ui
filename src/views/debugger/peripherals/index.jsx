import { Box, Flex, HStack } from '@chakra-ui/react';
import Card from '../../../components/card/Card';
import PeripheralList from './PeripheralList';

import RegisterBlock from './RegisterBlock';

// blockSize: how many bits in one block, block is the meaningful unit, DR register is 8 bit, AF reg is 4 bit
const Peripherals = ({ blockSize = 4, blockCount = 8 }) => {
  const getBlocks = (regValueDecimal = 0) => {
    const blocks = [];
    for (let i = blockCount * blockSize - 1; i >= 0; ) {
      let bitValues = [];
      let bitPos = [];
      for (let j = blockSize - 1; j >= 0; j--, i--) {
        bitPos.push(i);
        bitValues.push(((regValueDecimal >> i) & 1).toString()[0]);
      }
      blocks.push(
        <RegisterBlock key={i + 1} bitValues={bitValues} bitPos={bitPos} />
      );
    }
    return blocks;
  };

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <HStack alignItems={'start'}>
        <PeripheralList flex={1} />
        <Card flex={4}>
          <Flex flexWrap={'wrap'}>{getBlocks(1234)}</Flex>
        </Card>
      </HStack>
    </Box>
  );
};

export default Peripherals;

// responsive width for grid
// const getMinChildWidth = () => {
//   if (blockSize == 1 || blockSize == 2) {
//     return '85px';
//   } else if (blockSize == 3 || blockSize == 4) {
//     return '140px';
//   } else {
//     return '280px';
//   }
// };
// <SimpleGrid gap={0} minChildWidth={getMinChildWidth()}>
//   {getBlocks(255431)}
// </SimpleGrid>
