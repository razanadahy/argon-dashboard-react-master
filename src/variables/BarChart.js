import React, { Component } from 'react';
// import {Chart} from "chart.js";

const Chart = require("chart.js")

class BarChart extends Component {
    constructor(props) {
        super(props);
    }
    chartRef = React.createRef();

    componentDidMount() {
        this.buildChart();
    }

    generateRandomColor() {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        const alpha = 0.6;
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
    randomColors() {
        const colors = this.props.data.map(() => this.generateRandomColor());
        colors[colors.length - 1] = 'rgba(206,27,27,0.6)';
        return colors;
    }
    buildChart() {
        const myChartRef = this.chartRef.current.getContext('2d');
        new Chart(myChartRef, {
            type: this.props.type,
            data: {
                labels: this.props.label,
                datasets: [
                    {
                        // label: this.props.label,
                        data: this.props.data,
                        backgroundColor:this.randomColors(),
                    },
                ],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                    },
                    x:{
                        beginAtZero: true,
                    }
                },
            },
        });
    }

    render() {
        return (
            <div className="row p-0 m-0 w-100">
                <canvas id="myChart" ref={this.chartRef}  height={300} />
            </div>
        );
    }
}

export default BarChart;
