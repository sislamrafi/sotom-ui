// Chakra Imports
import {
  Avatar,
  Button,
  Flex,
  Icon,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useColorModeValue,
  useColorMode,
  Tooltip,
} from "@chakra-ui/react";
// Custom Components
import { ItemContent } from "components/menu/ItemContent";
import { SearchBar } from "components/navbar/searchBar/SearchBar";
import { SidebarResponsive } from "components/sidebar/Sidebar";
import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
// Assets
import navImage from "assets/img/layout/Navbar.png";
import {
  MdNotificationsNone,
  MdInfoOutline, MdRestartAlt,
  MdOutlineCancel, MdPauseCircleOutline,
  MdResetTv, MdPlayCircleOutline,
  MdOutlineFlashOn,MdOutlineArrowForwardIos,
  MdBuild
} from "react-icons/md";
import { IoMdMoon, IoMdSunny } from "react-icons/io";
import { FaEthereum } from "react-icons/fa";
import routes from "routes.js";
import axios from "axios";
import ApiLoaderSotom from "api";

export default function HeaderLinks(props) {
  const { secondary } = props;
  const { colorMode, toggleColorMode } = useColorMode();

  // Chakra Color Mode
  const navbarIcon = useColorModeValue("gray.400", "white");
  let menuBg = useColorModeValue("white", "navy.800");
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const textColorBrand = useColorModeValue("brand.700", "brand.400");
  const ethColor = useColorModeValue("gray.700", "white");
  const borderColor = useColorModeValue("#E6ECFA", "rgba(135, 140, 189, 0.3)");
  const ethBg = useColorModeValue("secondaryGray.300", "navy.900");
  const ethBox = useColorModeValue("white", "navy.800");
  const shadow = useColorModeValue(
    "14px 17px 40px 4px rgba(112, 144, 176, 0.18)",
    "14px 17px 40px 4px rgba(112, 144, 176, 0.06)"
  );

  const setStateOfActions = (state_) => {
    switch (state_) {
      case 1:
        setResumeColor('green')
        setHaltColor(navbarIcon)
        break;
      case 2:
        setResumeColor(navbarIcon)
        setHaltColor('red')
        break;
      default:
        break;
    }
  }

  const onCommandSuccess = (res) => {
    console.log(res.data);
    setStateOfActions(res.data['device_state'])

    if(res.data['command']=='build'){
      setBuildColor(navbarIcon)
    }
  }

  const onCommandErr = (err,command) => {
    if(command=='build'){
      setBuildColor('red')
    }
  }

  const callCommand = (command) => {
    ApiLoaderSotom.commandDevice(command,null,null,onCommandSuccess)
  }


  useEffect(() => {
    callCommand(null);
    const interval = setInterval(() => callCommand(null), 5000)
    return () => {
      clearInterval(interval);
    }
  }, [])

  const [resetColor, setResetColor] = useState(navbarIcon);
  const [haltColor, setHaltColor] = useState(navbarIcon);
  const [resetHaltColor, setResetHaltColor] = useState(navbarIcon);
  const [resumeColor, setResumeColor] = useState(navbarIcon);

  const [buildColor, setBuildColor] = useState(navbarIcon);

  useColorModeValue("gray.400", "white");

  const borderButton = useColorModeValue("secondaryGray.500", "whiteAlpha.200");
  return (
    <Flex
      w={{ sm: "100%", md: "auto" }}
      alignItems='center'
      flexDirection='row'
      bg={menuBg}
      flexWrap={secondary ? { base: "wrap", md: "nowrap" } : "unset"}
      p='10px'
      borderRadius='30px'
      boxShadow={shadow}>
      
      <Flex
        bg={ethBg}
        display={secondary ? "flex" : "none"}
        borderRadius='30px'
        ms='auto'
        p='6px'
        align='center'
        me='6px'>

      </Flex>

      <SidebarResponsive routes={routes} />

      <Tooltip label='Halt' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => callCommand('halt')}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            as={MdPauseCircleOutline}
            color={haltColor}
          />
        </Button>
      </Tooltip>

      <Tooltip label='Resume' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => callCommand('resume')}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            as={MdPlayCircleOutline}
            color={resumeColor}
          />
        </Button>
      </Tooltip>

      <Tooltip label='Step' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => callCommand('step')}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            as={MdOutlineArrowForwardIos}
            color={navbarIcon}
          />
        </Button>
      </Tooltip>


      <Tooltip label='Reset &amp; Halt' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => callCommand('reset_and_halt')}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            as={MdResetTv}
            color={navbarIcon}
          />
        </Button>
      </Tooltip>


      <Tooltip label='Reset' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => callCommand('reset')}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={MdRestartAlt}
          />
        </Button>
      </Tooltip>

      <Tooltip isDisabled label='Theme Switch' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => {
            setResetColor(navbarIcon)
            toggleColorMode();

          }}>
          <Icon
            me='10px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={colorMode === "light" ? IoMdMoon : IoMdSunny}
          />
        </Button>
      </Tooltip>

      
      <Tooltip label='Flash' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          pl='25px'
          pt='2px'
          minW='unset'
          minH='unset'
          h='28px'
          w='max-content'
          onClick={() => callCommand('flash')}>
          <Icon
            me='0px'
            h='18px'
            w='18px'
            color={navbarIcon}
            as={MdOutlineFlashOn}
          />
        </Button>
      </Tooltip>

      <Tooltip label='Build' fontSize='md'>
        <Button
          variant='no-hover'
          bg='transparent'
          p='0px'
          minW='unset'
          minH='unset'
          h='18px'
          w='max-content'
          onClick={() => {setBuildColor('yellow') ;callCommand('build')}}>
          <Icon
            me='10px'
            h='16px'
            w='16px'
            color={buildColor}
            as={MdBuild}
          />
        </Button>
      </Tooltip>


    </Flex>
  );
}

HeaderLinks.propTypes = {
  variant: PropTypes.string,
  fixed: PropTypes.bool,
  secondary: PropTypes.bool,
  onOpen: PropTypes.func,
};
