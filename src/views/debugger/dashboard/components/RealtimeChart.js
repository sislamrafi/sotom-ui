import React from "react";
import ReactApexChart from "react-apexcharts";
import ApexCharts from "apexcharts";

class ApexChart extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

            data:[10, 5, 18, 20, 15, 100],

            series: [{
                data: [10, 5, 18, 20, 15, 100]
            }],
            options: {
                chart: {
                    id: 'realtime',
                    height: 350,
                    type: 'line',
                    animations: {
                        enabled: true,
                        easing: 'linear',
                        dynamicAnimation: {
                            speed: 1000
                        }
                    },
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Dynamic Updating Chart',
                    align: 'left'
                },
                markers: {
                    size: 0
                },
                xaxis: {
                    type: 'numeric',
                    range: 10,
                },
                yaxis: {
                    max: 100
                },
                legend: {
                    show: false
                },
            },


        };
    }


    componentDidMount() {
        console.log("component mounted");
        // ApexCharts.exec('realtime', 'updateSeries', [{
        //         data: [10, 5, 18, 20, 100, 150 , 87 , 57]
        //     }])
        // ReactApexChart.exec('realtime', 'updateSeries', [{
        //     data: [10, 5, 18, 20, 15]
        // }])
        window.setInterval(() => {
            // getNewSeries(lastDate, {
            //     min: 10,
            //     max: 90
            // })
            //console.log('hello++'+this.state.data)

            this.setState((prv,props)=>({
                data: [...prv.data,10]
            }));

            ApexCharts.exec('realtime', 'updateSeries', [{
                data: this.state.data
            }])
        }, 1000)
    }


    render() {
        return (


            <div id="chart">
                <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} />
            </div>


        );
    }
}

export default ApexChart;