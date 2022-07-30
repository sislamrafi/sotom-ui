import { Box, Text } from "@chakra-ui/react";
import React from "react";

class SideBarTerminal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "Terminal",
            text: ">> Init Complete",
            boxBg: 'black',
            textColor: 'white'
        };

        window.miniTerminal = this
    }

    componentDidMount() {
        this.setState({
            title: this.props.title ?? "Terminal",
            text: this.props.text ?? this.state.text,
            boxBg: this.props.boxBg ?? this.state.boxBg,
            textColor: this.props.textColor ?? this.state.textColor,
        }
        );
    }

    componentWillUnmount() {
    }

    updateText = (text, clear = false) => {
        if (this.state.text == text) return
        text = clear ? text : this.state.text + text;
        this.setState({
            text: text ?? '>> '
        })
    }

    static getDerivedStateFromProps(props, state) {
        if (props.boxBg != state.boxBg || props.textColor) {
            return {
                boxBg: props.boxBg,
                textColor: props.textColor,
            }
        }
        if (props.text != state.text) {
            return {
                text: props.text
            }
        }
    }

    render() {
        let textColor = this.state.textColor
        return (
            <Box
                pt='8px'
                pl='10px'
                pe={{ md: "16px", "2xl": "0px" }}
                mt='60px'
                mb='40px'
                ml={1.5}
                mr={1.5}
                h={60}
                bgColor={this.state.boxBg}
                borderRadius='5px'>
                <Text color={'green'} fontSize={13} fontWeight={700}>{this.state.title}</Text>
                {this.state.text.split("\n").slice(-9).map(function (txt, index) {
                    return <Text  key={index} color={textColor} fontSize={14} fontWeight={500}>{txt}</Text>;
                })}
            </Box>
        );
    }
}

export default SideBarTerminal;