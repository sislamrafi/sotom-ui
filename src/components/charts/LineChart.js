import React from "react";
import ReactApexChart from "react-apexcharts";

class LineChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      chartData: [],
      chartOptions: {},
      text: 'init',
    };
  }

  componentDidMount() {
    console.log('Mounted')
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
      text: this.props.text
    });
  }

  static checkChartDataEqual(d1, d2) {
    let ret = true
    d1.forEach((x, i) => {

      if (x.name != d2[i].name) {
        ret = false
        return false
      };
      if (x.data.length != d2[i].data.length) {
        ret = false;
        return false;
      }

      x.data.forEach((y, j) => {
        if (y != d2[i].data[j]) {
          ret = false;
          return false;
        }
      });
    })
    return ret;
  };

  static getDerivedStateFromProps(props, current_state) {
    if (!LineChart.checkChartDataEqual(current_state.chartData, props.chartData)) {
      //console.log(props.chartData)
      //console.log('Ram chart data changes')
      //console.log(props.chartData);
      return {
        chartData: props.chartData,
        //computed_prop: heavy_computation(props.value)
      }
    }

    if (current_state.text !== props.text) {
      return {
        text: props.text,
        //computed_prop: heavy_computation(props.value)
      }
    }
    return null
  }

  render() {
    return (
        <ReactApexChart
          options={this.state.chartOptions}
          series={this.state.chartData}
          type='line'
          width='100%'
          height='100%'
        />
    );
  }
}

export default LineChart;
