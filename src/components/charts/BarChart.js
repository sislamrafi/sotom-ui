import React, { Component } from "react";
import Chart from "react-apexcharts";

class ColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      chartData: [],
      chartOptions: {},
    };
  }

  componentDidMount() {
    console.log('Mounted chart data')
    console.log(this.chartData);
    this.setState({
      chartData: this.props.chartData,
      chartOptions: this.props.chartOptions,
    });
  }

  static getDerivedStateFromProps(props, current_state) {
    if (current_state.chartData !== props.chartData) {
      return {
        chartData: props.chartData,
        //computed_prop: heavy_computation(props.value)
      }
    }
    return null
  }

  render() {
    return (
      <Chart
        options={this.state.chartOptions}
        series={this.state.chartData}
        type='bar'
        width='100%'
        height='100%'
      />
    );
  }
}

export default ColumnChart;
