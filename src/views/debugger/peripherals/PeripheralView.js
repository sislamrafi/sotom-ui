import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import RegisterBlock from './RegisterBlock';

const getBitInPosFromInt = (regValueDecimal = 0, pos = 0) => {
  return ((regValueDecimal >> pos) & 1).toString()[0];
};

const GPIOA = {
  peripheralName: 'GPIOA',
  address: '0x40005000',
  regCount: 4,
  regInfos: [
    {
      regName: 'MODER',
      addrOffset: '0x00',
      bitInfos: [
        { name: 'MODER0', size: 2 },
        { name: 'MODER1', size: 2 },
        { name: 'MODER2', size: 2 },
        { name: 'MODER3', size: 2 },
        { name: 'MODER4', size: 2 },
        { name: 'MODER5', size: 2 },
        { name: 'MODER6', size: 2 },
        { name: 'MODER7', size: 2 },
        { name: 'MODER8', size: 2 },
        { name: 'MODER9', size: 2 },
        { name: 'MODER10', size: 2 },
        { name: 'MODER11', size: 2 },
        { name: 'MODER12', size: 2 },
        { name: 'MODER13', size: 2 },
        { name: 'MODER14', size: 2 },
        { name: 'MODER15', size: 2 },
      ],
    },

    {
      regName: 'OTYPER',
      addrOffset: '0x08',
      bitInfos: [
        { name: 'OT0', size: 1 },
        { name: 'OT1', size: 1 },
        { name: 'OT2', size: 1 },
        { name: 'OT3', size: 1 },
        { name: 'OT4', size: 1 },
        { name: 'OT5', size: 1 },
        { name: 'OT6', size: 1 },
        { name: 'OT7', size: 1 },
        { name: 'OT8', size: 1 },
        { name: 'OT9', size: 1 },
        { name: 'OT10', size: 1 },
        { name: 'OT11', size: 1 },
        { name: 'OT12', size: 1 },
        { name: 'OT13', size: 1 },
        { name: 'OT14', size: 1 },
        { name: 'OT15', size: 1 },
      ],
    },
    {
      regName: 'AFRL',
      addrOffset: '0x20',
      bitInfos: [
        { name: 'AFRL0', size: 4 },
        { name: 'AFRL1', size: 4 },
        { name: 'AFRL2', size: 4 },
        { name: 'AFRL3', size: 4 },
        { name: 'AFRL4', size: 4 },
        { name: 'AFRL5', size: 4 },
        { name: 'AFRL6', size: 4 },
        { name: 'AFRL7', size: 4 },
      ],
    },
    {
      regName: 'AFRH',
      addrOffset: '0x28',
      bitInfos: [
        { name: 'AFRH8', size: 4 },
        { name: 'AFRH9', size: 4 },
        { name: 'AFRH10', size: 4 },
        { name: 'AFRH11', size: 4 },
        { name: 'AFRH12', size: 4 },
        { name: 'AFRH13', size: 4 },
        { name: 'AFRH14', size: 4 },
        { name: 'AFRH15', size: 4 },
      ],
    },
  ],
};

const PeripheralView = ({ peripheral = GPIOA, ...props }) => {
  const periColor = useColorModeValue('brand.500', 'white');
  const regColor = useColorModeValue('#333', 'gray.300');
  const regValuesBgColor = useColorModeValue('#F4F7FE', 'navy.900');
  // request to backend value of the peripheral registers
  // const regValues = axios.get('localhost:8888/memory?address=${peripheral.address}&size=${peripheral.size}')
  const regValues = [];
  for (let i = 0; i < peripheral.regCount; i++) {
    regValues.push(Math.ceil(Math.random() * 10000));
  }
  return (
    <Flex
      {...props}
      backgroundColor={useColorModeValue('white', 'navy.800')}
      borderRadius={'2xl'}
      direction={'column'}
      p={4}
      gap={2}
      maxH={'84vh'}
      overflow={'auto'}
    >
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} color={periColor}>
          {peripheral.peripheralName}
        </Text>
        <Text color={'green.500'}>Base Address: {peripheral.address}</Text>
      </Flex>
      {peripheral.regInfos?.map((reg, idx) => {
        let pos = 0;
        return (
          <Flex key={idx} direction={'column'} gap={4} mt={idx === 0 ? 4 : 12}>
            {/* register name */}
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Text fontSize={'lg'} color={regColor}>
                {reg.regName} Register
              </Text>
              <Text color={'green.500'}>{reg.addrOffset}</Text>
            </Flex>
            {/* hex and decimal values */}
            <Flex alignItems={'center'} justifyContent={'space-between'}>
              <Flex
                direction={'column'}
                alignItems={'left'}
                justifyContent={'space-between'}
                gap={2}
              >
                <Text>Hex value:</Text>
                <Text
                  align={'center'}
                  px={4}
                  py={1}
                  borderRadius={'lg'}
                  backgroundColor={regValuesBgColor}
                >
                  0x{regValues[idx].toString(16).padStart(8, '0')}
                </Text>
              </Flex>
              <Flex
                direction={'column'}
                alignItems={'right'}
                justifyContent={'space-between'}
                gap={2}
              >
                <Text>Decimal value:</Text>
                <Text
                  align={'center'}
                  px={4}
                  py={1}
                  borderRadius={'lg'}
                  backgroundColor={regValuesBgColor}
                >
                  {regValues[idx].toString()}
                </Text>
              </Flex>
            </Flex>
            {/* Binary values */}
            <Flex
              w={'full'}
              flexWrap={'wrap'}
              backgroundColor={regValuesBgColor}
              px={4}
              pb={5}
              borderRadius={'xl'}
            >
              {reg.bitInfos
                // ?.slice(0)
                // .reverse()
                .map((bitBlock, idx2) => {
                  const bitPos = [];
                  const bitValues = [];

                  for (let i = bitBlock.size - 1; i >= 0; i--) {
                    bitPos.push(pos + i);
                    bitValues.push(getBitInPosFromInt(regValues[idx], pos + i));
                  }
                  pos += bitBlock.size;

                  return (
                    <RegisterBlock
                      key={idx2}
                      bitPos={bitPos}
                      bitValues={bitValues}
                      blockTitle={bitBlock.name}
                    />
                  );
                })
                .reverse()}
            </Flex>
          </Flex>
        );
      })}
    </Flex>
  );
};

export default PeripheralView;
