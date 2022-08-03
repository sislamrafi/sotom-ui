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
      // width={'fit-content'}
      direction={'column'}
      // border={'1px'}
      // borderColor={'gray.500'}
    >
      <Flex
        margin={'0'}
        alignItems={'center'}
        columnGap={4}
        p={2}
        borderBottom={'1px'}
      >
        {bitPos.map((val, idx) => (
          <Text
            // fontFamily={'Courier Prime'}
            color={'green.600'}
            key={idx}
            flex={'1'}
            align={'center'}
            // whiteSpace={'pre'}
          >
            {val.toString()}
          </Text>
        ))}
      </Flex>

      <Text
        border={'1px'}
        colorScheme={'brand'}
        paddingX={'4'}
        paddingY={'1'}
        textAlign={'center'}
      >
        {blockTitle}
      </Text>
      <Flex margin={'0'} alignItems={'center'} borderBottom={'1px'}>
        {bitValues.map((val, idx) => (
          <Text
            // fontFamily={'DM Mono'}
            // fontFamily={'Courier Prime'}
            key={idx}
            flex={'1'}
            align={'center'}
            borderInline={'1px'}
            // borderLeft={'1px'}
            // borderRight={'1px'}
          >
            {val}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

export default RegisterBlock;
