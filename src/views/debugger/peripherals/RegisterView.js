import ApiLoaderSotom from "api";
import { useCallback, useEffect, useRef, useState } from "react";
import RegisterBlock from "./RegisterBlock";

const { Flex, Text } = require("@chakra-ui/react");

const RegisterView = ({ ...props }) => {
    const { baseAddress, reg, regValuesBgColor, regColor, idx } = props
    const [regValue, setRegValue] = useState(0);
    const bitLen = useRef(0);

    const getBitInPosFromInt = useCallback((regValueDecimal = 0, pos = 0) => {
        return ((regValueDecimal >> pos) & 1).toString()[0];
    }, []);

    let pos = bitLen.current

    const onSuccessCall = (res) => {
        // console.log(res.data["value"]);
        //registerList.current = res.data['registers']
        //setRegisters(res.data['registers']);
        setRegValue(res.data['value'])
      }

    useEffect(() => {
        reg.fields.map((v, i) => {
            bitLen.current += v.bit_width
        })
        const interval = setInterval(() =>
            ApiLoaderSotom.searchMemory(baseAddress+reg.address_offset, onSuccessCall, null),
            300)
        return () => {
            clearInterval(interval);
        }
    }, [reg,baseAddress])

    return (
        <Flex key={idx} direction={'column'} gap={4} mt={idx === 0 ? 4 : 12}>
            {/* register name */}
            <Flex alignItems={'center'} justifyContent={'space-between'}>
                <Text fontSize={'lg'} color={regColor}>
                    {reg.name}: Offset(0x{reg.address_offset.toString(16)})
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
                        0x{regValue?.toString(16)}
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
                        {regValue}
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

                {
                    // ?.slice(0)
                    // .reverse()
                    reg.fields.sort((a, b) => (a.bit_offset < b.bit_offset) ? 1 : -1).map((bitBlock, idx2) => {
                        let posX = bitBlock.bit_offset + bitBlock.bit_width
                        let bitPos = [];
                        let bitValues = [];

                        for (let i = bitBlock.bit_width - 1; i >= 0; i--) {
                            bitPos.push(--posX);
                            bitValues.push(getBitInPosFromInt(regValue, posX));
                        }
                        //pos += bitBlock.bit_width;

                        return (


                            <RegisterBlock
                                key={idx2}
                                bitPos={bitPos}
                                bitValues={bitValues}
                                blockTitle={bitBlock.name}
                            />

                        );
                    })
                }
            </Flex>
        </Flex>
    );
}

export default RegisterView