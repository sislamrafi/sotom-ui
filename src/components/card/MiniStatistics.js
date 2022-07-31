// Chakra imports
// Chakra imports
import {
  Flex,
  Stat,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Text,
  Icon,
} from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import IconBox from "components/icons/IconBox";
// Custom icons
import React, { memo, useEffect } from "react";
import { MdAutoAwesomeMotion } from "react-icons/md";

function Default(props) {
  const { iconS, brandColor, boxBg, endContent, name, growth, value, growthTxt } = props;
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorSecondary = "secondaryGray.600";

  // useEffect(() => {
  //   console.log('Update Mini Stat')
  // },[])

  return (
    <Card py='15px'>
      <Flex
        my='auto'
        h='100%'
        align={{ base: "center", xl: "start" }}
        justify={{ base: "center", xl: "center" }}>
        {
          iconS &&
          (<IconBox
            w='56px'
            h='56px'
            //bg='linear-gradient(90deg, #4481EB 0%, #04BEFE 100%)'
            bg={boxBg}
            icon={<Icon w='28px' h='28px' as={iconS} color={brandColor} />}
          />)
          
        }

        <Stat my='auto' ms={iconS ? "18px" : "0px"}>
          <StatLabel
            lineHeight='100%'
            color={textColorSecondary}
            fontSize={{
              base: "sm",
            }}>
            {name}
          </StatLabel>
          <StatNumber
            color={textColor}
            fontSize={{
              base: "2xl",
            }}>
            {value}
          </StatNumber>
          {growth ? (
            <Flex align='center'>
              <Text color='green.500' fontSize='xs' fontWeight='700' me='5px'>
                {growth}
              </Text>
              <Text color='secondaryGray.600' fontSize='xs' fontWeight='400'>
                {growthTxt}
              </Text>
            </Flex>
          ) : null}
        </Stat>
        <Flex ms='auto' w='max-content'>
          {endContent}
        </Flex>
      </Flex>
    </Card>
  );
}

export default memo(Default)