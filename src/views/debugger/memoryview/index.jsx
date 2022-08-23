import ApiLoaderSotom from 'api';
import Card from 'components/card/Card';
import { SearchBar } from 'components/navbar/searchBar/SearchBar';
import { VSeparator } from 'components/separator/Separator';
import { isNull } from 'lodash';
import { useRef } from 'react';
import { useState } from 'react';
import { column } from 'stylis';

const {
  Box,
  Flex,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Text,
  useColorModeValue,
  Spinner,
  Spacer,
} = require('@chakra-ui/react');

const memValues = [1, 2, 255, 1024, 12345, 123456, 12345667, 9, 10, 11];

const MemoryView = ({ }) => {
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');

  const address = useRef(0x20000000);
  const numOfBlocks = useRef(10);
  const isSearched = useRef(false);
  const [memContent, setMemContent] = useState([]);

  const onSuccessCallBack = (res) => {
    console.log(res.data.data);
    setMemContent(res.data.data);
  }

  const onSearchBlock = () => {

  }

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
      <Flex
        bgColor={useColorModeValue('white', 'navy.800')}
        minH={'84vh'}
        p={8}
        borderRadius={'3xl'}
        gap={'2rem'}
        direction={'column'}
      >
        <Flex gap={'2rem'}>
          <Flex direction={'column'}>
            <Text ml={2} mb={2}>
              Search Address
            </Text>
            <SearchBar
              onKeyUp={(text) => {
                address.current = text
              }}
              onClick={() => {
                address.current = Number(address.current)
                numOfBlocks.current = Number(numOfBlocks.current)
                isSearched.current = true
                console.log(address.current)
                console.log(numOfBlocks.current)
                // search sotom memory with address and block count.. memValues = api.search(address, count)
                //setMemContent(memValues);
                //onSearchBlock()
                ApiLoaderSotom.readMemoryBlock(address.current, numOfBlocks.current, onSuccessCallBack, null)
                setMemContent([]);
              }}
            />
          </Flex>
          <Flex direction={'column'} height={'min-content'}>
            <Text ml={2} mb={2}>
              Block count
            </Text>
            <NumberInput
              size={'md'}
              defaultValue={10}
              step={5}
              onChange={(val) => {
                numOfBlocks.current = val
              }}
              w={'150px'}
            >
              <NumberInputField
                borderRadius={'1000px'}
                pl={5}
                bgColor={inputBg}
                color={inputText}
                border={'none'}
              />
              <NumberInputStepper pe={'2'}>
                <NumberIncrementStepper border={'none'} />
                <NumberDecrementStepper border={'none'} />
              </NumberInputStepper>
            </NumberInput>
          </Flex>
          <Spacer />
          <Flex pt={5} direction={'column'} height={'min-content'}>
            {Array.isArray(memContent) && memContent.length==0 && isSearched.current?
              <Spinner
              thickness='4px'
              speed='0.65s'
              emptyColor='gray.200'
              color='blue.500'
              size='md'
            />
            :
            null
            }
          </Flex>

        </Flex>
        <Flex direction={'column'}>
          {
            Array.isArray(memContent) ? memContent.map((register, idx) => {
              return (
                <Flex key={idx} gap={4}>
                  {/* <Text>Decimal value: {mem}</Text>
                <Text>Hex value: {mem.toString(16)}</Text>
                <Text>Binary value: {mem.toString(2)}</Text> */}
                  <Card
                    bg={inputBg}
                    flexDirection='row'
                    //boxShadow={cardShadow}
                    w='100%'
                    p='15px'
                    px='20px'
                    mt='10px'
                    mr='12px'
                    ml='8px'
                  >
                    <Flex
                      direction={'column'}
                      alignItems={'center'}
                      justifyContent={'center'}
                    >
                      <Text
                        fontSize='xs'
                        color='secondaryGray.600'
                        fontWeight='700'
                        mb='0px'
                      >
                        0x{(register['address']).toString(16)}
                      </Text>
                      <Text
                        align={'left'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='700'
                      >
                        0x{(Number(register['address']) - Number(memContent[0]['address'])).toString(16)}
                      </Text>
                    </Flex>
                    <VSeparator
                      mx={{ base: '30px', xl: '30px', '2xl': '30px' }}
                    />
                    <Flex width={'15%'} direction='column' py='5px'>
                      <Flex align='center'>
                        <Box
                          h='8px'
                          w='8px'
                          bg='#6AD2FF'
                          borderRadius='50%'
                          me='4px'
                        />
                        <Text
                          fontSize='xs'
                          color='secondaryGray.600'
                          fontWeight='700'
                          mb='0px'
                        >
                          Dec:
                        </Text>
                      </Flex>
                      <Text
                        align={'left'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='700'
                      >
                        {Number(register['value']).toLocaleString('en')}
                      </Text>
                    </Flex>
                    <VSeparator
                      mx={{ base: '30px', xl: '30px', '2xl': '30px' }}
                    />
                    <Flex width={'15%'} direction='column' py='5px'>
                      <Flex align='center'>
                        <Box
                          h='8px'
                          w='8px'
                          bg='brand.500'
                          borderRadius='50%'
                          me='4px'
                        />
                        <Text
                          fontSize='xs'
                          color='secondaryGray.600'
                          fontWeight='700'
                          mb='0px'
                        >
                          Hex:
                        </Text>
                      </Flex>
                      <Text
                        align={'left'}
                        fontSize='md'
                        color={textColor}
                        fontWeight='700'
                      >
                        0x{' '}
                        {isNull(register['value']) ? 0 : register['value']
                          .toString(16)
                          .padStart(8, '0')
                          .replace(/(.{2})/g, '$1 ')
                          .trim()}
                      </Text>
                    </Flex>
                    <VSeparator
                      mx={{ base: '30px', xl: '30px', '2xl': '30px' }}
                    />
                    <Flex width={'70%'} direction='column' py='5px' me='10px'>
                      <Flex align='center'>
                        <Box
                          h='8px'
                          w='8px'
                          bg='#6AD2FF'
                          borderRadius='50%'
                          me='4px'
                        />
                        <Text
                          fontSize='xs'
                          color='secondaryGray.600'
                          fontWeight='700'
                          mb='0px'
                        >
                          Binary :
                        </Text>
                      </Flex>
                      <Text
                        mr={10}
                        align={'left'}
                        fontSize='md'
                        letterSpacing={0}
                        color={textColor}
                        fontWeight='700'
                      >
                        0b{' '}
                        {isNull(register['value']) ? 0 : register['value']
                          .toString(2)
                          .padStart(32, '0')
                          .replace(/[^\dA-Z]/g, '')
                          .replace(/(.{4})/g, '$1 ')
                          .trim()}
                      </Text>
                    </Flex>
                  </Card>
                </Flex>
              );
            }) :
              null
          }
        </Flex>
      </Flex>
    </Box>
  );
};

export default MemoryView;
