import { Flex, Text, useColorModeValue } from '@chakra-ui/react';
import ApiLoaderSotom from 'api';
import { lowerFirst } from 'lodash';
import { useEffect, useRef, useState } from 'react';
import RegisterBlock from './RegisterBlock';
import RegisterView from './RegisterView';


const PeripheralView = ({ ...props }) => {
  const { peripheral } = props
  const periColor = useColorModeValue('brand.500', 'white');
  const regColor = useColorModeValue('#333', 'gray.300');
  const regValuesBgColor = useColorModeValue('#F4F7FE', 'navy.900');
  // request to backend value of the peripheral registers
  // const regValues = axios.get('localhost:8888/memory?address=${peripheral.address}&size=${peripheral.size}')
  const [registers, setRegisters] = useState([])
  
  const registerList = useRef([])
  const [regValues,setRegValues] = useState([]);

  const onSuccessCallback = (res) => {
    console.log(res.data['registers']);
    registerList.current = res.data['registers']
    setRegisters(res.data['registers']);
  }

  useEffect(() => {
    ApiLoaderSotom.getPeripheralById(peripheral.id, onSuccessCallback)
  }, [peripheral])

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
          {peripheral.name}
        </Text>
        <Text color={'green.500'}>Base Address: 0x{peripheral.address.toString(16)}</Text>
      </Flex>
      {registers?.map((reg, idx) => {
        return <RegisterView baseAddress={peripheral.address} key={idx} regValuesBgColor={regValuesBgColor} regColor={regColor} reg={reg} idx={idx}></RegisterView>
      })}
    </Flex>
  );
};

export default PeripheralView;
