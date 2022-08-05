import { Flex, Box, Text } from '@chakra-ui/react';

const RegisterBlock2 = ({
  bitPos = [0, 1],
  bitValues = ['1', '1'],
  blockTitle = 'RXNE',
}) => {
  return (
    <Flex
      spacing={'0'}
      // width={'fit-content'}
      direction={'column'}
      border={'1px'}
      // borderRadius={'lg'}
      borderColor={'gray.500'}
      overflow={'hidden'}
    >
      <Flex columnGap={2} gap={'0px'} borderBottom={'1px'}>
        {bitPos.map((pos, idx) => (
          <Flex
            flex={1}
            key={idx}
            borderLeft={idx && '1px'}
            direction={'column'}
            alignItems={'center'}
          >
            <Text margin={0} align='center' color={'green.600'} p={2}>
              {` ${pos.toString()}`}
            </Text>
            <Box w={'full'} borderTop={'1px'} />
            <Text margin={0} align='center' p={2}>
              {bitValues[idx]}
            </Text>
          </Flex>
        ))}
      </Flex>
      <Text padding={2} align={'center'} fontSize={'14'} fontWeight={'bold'}>
        {blockTitle}
      </Text>
    </Flex>
  );
};

const RegisterBlock = ({
  bitPos = [0, 1],
  bitValues = ['1', '1'],
  blockTitle = 'RXNE',
}) => {
  return (
    <Flex
      spacing={'0'}
      direction={'column'}
      my={2}
    >
      {/* bit positions */}
      <Flex
        margin={'0'}
        alignItems={'center'}
        columnGap={4}
        px={2}
        // borderWidth={'1px 1px 0px 1px'}
        // borderStyle={'solid'}
        // borderColor={'gray.500'}
      >
        {bitPos.map((val, idx) => (
          <Text
            color={'green.500'}
            key={idx}
            flex={'1'}
            align={'center'}
          >
            {val.toString()}
          </Text>
        ))}
      </Flex>
      {/* block title */}
      <Text
        border={'1px'}
        borderColor={'gray.500'}
        colorScheme={'brand'}
        paddingX={'4'}
        paddingY={'1'}
        textAlign={'center'}
      >
        {blockTitle}
      </Text>
      {/* bit values */}
      <Flex
        margin={'0'}
        alignItems={'center'}
        borderBottom={'1px'}
        borderColor={'gray.500'}
      >
        {bitValues.map((val, idx) => (
          <Text
            key={idx}
            flex={'1'}
            align={'center'}
            borderInline={'1px'}
            borderColor={'gray.500'}
          >
            {val}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default RegisterBlock;
