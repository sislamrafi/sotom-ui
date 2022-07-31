// Chakra imports
import { Box, Flex, Text, Select, useColorModeValue, Checkbox, CheckboxGroup, Stack, SimpleGrid } from "@chakra-ui/react";
// Custom components
import Card from "components/card/Card.js";
import PieChart from "components/charts/PieChart";
import { pieChartData, pieChartOptions } from "variables/charts";
import { VSeparator } from "components/separator/Separator";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import ApiLoaderSotom from "api";

export default function ButtonArrayClickable(props) {
  const buttonSize = 16

  const valueToBar = (val) => {
    let len = buttonSize;
    let arr = [];
    for (let i = 0; i < len; i++) {
      if ((val >> i) & 0b1) arr.push(true)
      else arr.push(false)
    }
    //arr.push(0.1)
    //console.log(arr);
    return arr;
  }

  const [switchArray, setSwitchArray] = useState(valueToBar(0))
  

  const analogIoAddress = useRef(0)
  const oldValue = useRef(0)


  // Chakra Color Mode
  const textColor = useColorModeValue("secondaryGray.900", "white");
  const cardColor = useColorModeValue("white", "navy.700");
  const cardShadow = useColorModeValue(
    "0px 18px 40px rgba(112, 144, 176, 0.12)",
    "unset"
  );

  const onSuccessCall = (res) => {
    analogIoAddress.current = res.data.address
    if (oldValue.current == res.data.value)return;
    oldValue.current = res.data.value
    setSwitchArray(valueToBar(res.data.value))
  }

  const handlechange = (e, index) => {
    let val = valueToBar(oldValue.current);
    val[index] = val[index] ? false : true;
    setSwitchArray(val)
    let command = 'write16'
    if(val[index])
    oldValue.current |= (1<<index)
    else
    oldValue.current &= ~(1<<index)
    ApiLoaderSotom.commandDevice(command, analogIoAddress.current, oldValue.current, null)
  }


  useEffect(() => {
    //console.log("Updating...............");
    //console.log(switchArray);
    // let getNewValue = false;
    // for (let i = 0; i < switchArray.length; i++) {
    //   if (switchArray[i] != valueToBar(value)[i]) getNewValue = true;
    // }
    // if (getNewValue) {
    //   //console.log("New value get In ButtonArrray");
    //   setSwitchArray(valueToBar(value))
    // }

    // if (address != dbgAddress) {
    //   //console.log("New address get In ButtonArrray " + dbgAddress);
    //   setAddress(dbgAddress)
    // }

    ApiLoaderSotom.searchMemory("DEBUG_BUTTON", onSuccessCall)
    const interval = setInterval(() =>
      ApiLoaderSotom.searchMemory('DEBUG_BUTTON', onSuccessCall, null),
      333)
    return () => {
      clearInterval(interval);
    }
  }, [])

  return (
    <Card p='20px' align='center' direction='column' w='100%' >
      <Flex
        px={{ base: "0px", "2xl": "10px" }}
        justifyContent='space-between'
        alignItems='center'
        w='100%'
        mb='8px'>
        <Text color={textColor} fontSize='md' fontWeight='600' mt='4px'>
          Debug Button Switch
        </Text>

      </Flex>


      <Card
        justifyContent='center'
        bg={cardColor}
        border='1px'
        flexDirection='column'
        boxShadow={cardShadow}
        w='100%'
        p='15px'
        px='20px'
        mt='15px'
        mx='auto'>

        <CheckboxGroup colorScheme='blue' defaultValue={[switchArray]}>
          <SimpleGrid minChildWidth='30px' spacing={2}>
            {useMemo(() => {
              return switchArray.map((x, i) =>
                <Checkbox onChange={(e) => handlechange(e, i)} isChecked={x} key={i} size='sm' >  {i.toString()}&nbsp;</Checkbox>);
            })}
            

          </SimpleGrid>
          {/* <Checkbox onChange={(e) =>this.handlechange(e,3)} isChecked={this.state.cb1}  size='sm' > h</Checkbox>
        <Text>{this.state.array[5]+'s'}</Text> */}
        </CheckboxGroup>

      </Card>
    </Card>
  );
}

class CheckboxArray extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      address: [],
      value: 0,
    };

    //binding in constuctor 
    //this.handlechange = this.handlechange.bind(this);
  }

  callCommand = (command, pin, value) => {
    var val = value;
    var valueX

    console.log("api :++>> " + (value === true))

    if (value === true) {
      valueX = this.state.value | (1 << pin);
    }
    else {
      valueX = this.state.value & ~(1 << pin);
    }

    console.log("api call write16: " + this.state.address + ' prvVal:' + this.state.value + ' valueR:' + val + ' valueP:' + valueX + ' pin:' + pin)

    axios.get(process.env.REACT_APP_API_URL + "command_device/", {
      params: {
        'command': command,
        'address': this.state.address,
        'value': valueX,
      }
    })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {

      })
  }

  handlechange(e, index) {
    //const course = { …this.state.course, title: event.target.value };
    //this.setState({ course });
    //console.log("is changing state");
    //let isChecked = true;

    // this.setState({
    //   value:[0,0,0,1,1,1,0,0,0,0,0,1,0,1,1],
    // });
    let val = this.state.array;
    val[index] = val[index] ? false : true;
    this.setState({
      array: val,
    });
    this.callCommand('write16', index, val[index])
    //console.log("GO FOR CHANGE" + index);
  }

  componentDidMount() {

    console.log("Is mounting comp addr " + this.props.address)
    this.setState({
      array: this.props.array,
      address: this.props.address,
      value: this.props.value,
    });
  }

  static getDerivedStateFromProps(props, current_state) {
    let gotit = false;
    for (let i = 0; i < current_state.array.length; i++) {
      if (props.array[i] != current_state.array[i]) {
        gotit = true;
        break;
      }
    }
    if (current_state.address != props.address)
      gotit = true;
    if (current_state.value != props.value)
      gotit = true;
    // console.log("Hello::")
    // console.log(props.array);
    // console.log(current_state.array);
    if (!gotit) return null;
    //console.log("Hello Changing")
    //console.log(props.array);
    //console.log(current_state.array);
    //console.log(props.address);
    return ({
      array: props.array,
      address: props.address,
      value: props.value,
    })
  }

  render() {
    return (
      <CheckboxGroup colorScheme='blue' defaultValue={[this.state.array]}>
        <SimpleGrid minChildWidth='30px' spacing={2}>
          {
            this.state.array.map((x, i) => {

              return (<Checkbox onChange={(e) => this.handlechange(e, i)} isChecked={x} key={i} size='sm' >  {i.toString()}&nbsp;</Checkbox>);
            })
          }
        </SimpleGrid>
        {/* <Checkbox onChange={(e) =>this.handlechange(e,3)} isChecked={this.state.cb1}  size='sm' > h</Checkbox>
        <Text>{this.state.array[5]+'s'}</Text> */}
      </CheckboxGroup>
    )
  }

}