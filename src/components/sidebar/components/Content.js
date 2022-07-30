// chakra imports
import { Text, Box, Flex, Stack, useColorModeValue } from "@chakra-ui/react";
//   Custom components
import Brand from "components/sidebar/components/Brand";
import Links from "components/sidebar/components/Links";

import React from "react";
import SideBarTerminal from "./SideBarTerminal";

// FUNCTIONS

function SidebarContent(props) {
  const { routes } = props;

  const textColor = useColorModeValue("black", "white");
  const boxBg = useColorModeValue("#E5ECFA", "#0B1437");


  // SIDEBAR
  return (
    <Flex direction='column' height='100%' pt='5px' borderRadius='30px'>
      <Brand />
      <Stack direction='column' mb='auto' mt='8px'>
        <Box ps='20px' pe={{ md: "16px", "2xl": "1px" }}>
          <Links routes={routes} />
        </Box>
      </Stack>

      <SideBarTerminal title="#Terminal" textColor={textColor} boxBg={boxBg} ></SideBarTerminal>
    </Flex>
  );
}

export default SidebarContent;
