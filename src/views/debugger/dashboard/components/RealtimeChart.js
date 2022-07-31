import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";
import Card from "components/card/Card";
import { Flex, Text } from "@chakra-ui/react";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.xRange = 50
        this.aSpeed = 250
        this.newDataSize = 0

        this.state = {

            data: [0],

            last_data: 0,

            series: [{
                data: [0]
            }],
            options: {
                chart: {
                    id: 'realtime',
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: this.aSpeed
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    dropShadow: {
                        enabled: true,
                        top: 13,
                        left: 0,
                        blur: 10,
                        opacity: 0.1,
                        color: "#4318FF",
                    },
                },
                colors: ["#4318FF", "#39B8FF"],
                tooltip: {
                    theme: "dark",
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    type: "line",
                },
                markers: {
                    size: 0,
                    colors: "white",
                    strokeColors: "#7551FF",
                    strokeWidth: 3,
                    strokeOpacity: 0.9,
                    strokeDashArray: 0,
                    fillOpacity: 1,
                    discrete: [],
                    shape: "circle",
                    radius: 2,
                    offsetX: 0,
                    offsetY: 0,
                    showNullDataPoints: true,
                },
                xaxis: {
                    show: false,
                    type: "numeric",

                    labels: {
                        show: false,
                        style: {
                            colors: "#A3AED0",
                            fontSize: "12px",
                            fontWeight: "500",
                        },
                    },
                    axisBorder: {
                        show: false,
                    },
                    axisTicks: {
                        show: false,
                    },
                    display: false,
                    range: this.xRange,
                },
                yaxis: {
                    show: true,
                    type: "numeric",
                    labels: {
                        formatter: function (value) {
                            var ext = 'B'
                            var div = 1024
                            var number = value
                            var sizes = ['', 'K', 'M', 'G', 'T'];
                            if (number == 0) return '0 ' + ext;
                            var i = parseInt(Math.floor(Math.log(number) / Math.log(div)));
                            return Math.round(number / Math.pow(div, i), 2) + ' ' + sizes[i] + ext;
                        },
                        style: {
                            colors: "#A3AED0",
                            fontSize: "12px",
                            fontWeight: "500",
                        },
                    },
                    max: 100
                },
                legend: {
                    show: false
                },
                grid: {
                    show: true,
                    column: {
                        color: ["#7551FF", "#39B8FF"],
                        opacity: 0.5,
                    },
                },
            },


        };

        window.setSramUsage = this.setRamUsage;
    }

    setRamUsage = (ramArr) => {
        this.state.data.push(ramArr)
        this.state.last_data = ramArr
        this.newDataSize++
    }


    componentDidMount() {

        window.setInterval(() => {

            if (this.newDataSize === 0) {
                this.state.data.push(this.state.last_data)
            }
            this.newDataSize = 0

            let mx = Math.max(...this.state.data.slice(-this.xRange))

            if (this.state.options.yaxis.max - 20 !== mx)
                this.setState(prv => ({
                    ...prv,
                    options: {
                        ...prv.options,
                        yaxis: {
                            ...prv.options.yaxis,
                            max: mx + 20
                        }
                    }
                }))

            ApexCharts.exec('realtime', 'updateSeries', [{
                data: [... this.state.data]
            }])
        }, this.aSpeed+250)
    }


    render() {
        return (
            <Card align='center' direction='column' w='100%'>
                <Flex justify='space-between' align='start' px='10px' pt='5px'>
                    <Flex flexDirection='column' align='start' me='20px'>
                        <Flex w='100%'>
                            <Text
                                me='auto'
                                color='secondaryGray.600'
                                fontSize='sm'
                                fontWeight='500'>
                                Ram usage Vs Time
                            </Text>
                        </Flex>
                        <Flex align='end'>
                            <Text
                                color={this.props.textColor}
                                fontSize='34px'
                                fontWeight='700'
                                lineHeight='100%'>
                                SRAM
                            </Text>
                            <Text
                                ms='6px'
                                color='secondaryGray.600'
                                fontSize='sm'
                                fontWeight='500'>
                                Usage
                            </Text>
                        </Flex>
                    </Flex>
                </Flex>
                <ReactApexChart
                    width='100%'
                    height='100%'
                    options={this.state.options}
                    series={this.state.series}
                    type="line" />
            </Card>


        );
    }
}

export default ApexChart;