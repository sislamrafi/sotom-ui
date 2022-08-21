import React, { useState } from 'react';
import {
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
export function SearchBar({
  onClick,
  onKeyUp,
  variant,
  background,
  children,
  placeholder,
  borderRadius,
  ...rest
}) {
  // Pass the computed styles into the `__css` prop
  // Chakra Color Mode
  const searchIconColor = useColorModeValue('gray.700', 'white');
  const inputBg = useColorModeValue('secondaryGray.300', 'navy.900');
  const inputText = useColorModeValue('gray.700', 'gray.100');

  const [textInput, setTextInput] = useState('');

  const handleChange = (e) => {
    setTextInput(e.target.value);
  };

  return (
    <InputGroup w={{ base: '100%', md: '200px' }} {...rest}>
      <InputLeftElement
        children={
          <IconButton
            bg='inherit'
            borderRadius='inherit'
            _hover='none'
            onClick={() => onClick(textInput)}
            _active={{
              bg: 'inherit',
              transform: 'none',
              borderColor: 'transparent',
            }}
            _focus={{
              boxShadow: 'none',
            }}
            icon={<SearchIcon color={searchIconColor} w='15px' h='15px' />}
          ></IconButton>
        }
      />
      <Input
        variant='search'
        fontSize='sm'
        onChange={handleChange}
        onKeyUp={(e) => {
          if (e.key == 'Enter') {
            onClick(textInput);
          }
          onKeyUp(textInput);
        }}
        bg={background ? background : inputBg}
        color={inputText}
        fontWeight='500'
        _placeholder={{ color: 'gray.400', fontSize: '14px' }}
        borderRadius={borderRadius ? borderRadius : '30px'}
        placeholder={placeholder ? placeholder : 'Search...'}
      />
    </InputGroup>
  );
}
