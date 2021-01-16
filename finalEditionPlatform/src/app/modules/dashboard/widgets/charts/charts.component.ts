import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js'
import { Color, Label } from 'ng2-charts'
@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
/*line chart configuration*/
  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75,60,65] }
  ]
  lineChartLabels: Label[] = ['Jan', 'Feb', 'Mar', 'Apri', 'May', 'Jun','jull','aug'];

  lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title:{
      display:true,
      text:'TOTAL REGISTRATION FLOW PER MONTH',
      fontFamily:'Arial'
    },
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 5,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    scales: {
      yAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgb(105, 86, 86)',
          zeroLineColor: "transparent",
        },
        ticks: {
          suggestedMin:70,
          suggestedMax:90,
          padding: 10,
          fontColor: "white"
        }
      }],

      xAxes: [{
        barPercentage: 1.6,
        gridLines: {
          drawBorder: false,
          color: 'rgba(29,140,248,0.1)',
          zeroLineColor: "transparent",
        },
        ticks: {
          padding: 20,
          fontColor: "white"
        }
      }]
    }
  }
  lineChartColors: Color[] = [{
    borderColor: 'red',
  }];
  lineChartLegend = false;
  lineChartPlugins = [];
  lineChartType = 'line';
/* radar chart configuration*/
  radarChartData: ChartDataSets[] = [
    { data: [10,20,30,40,50,60,70,80] }
  ]
  radarChartLabels: Label[] = ['TUN', 'ALGR', 'USA', 'KSA', 'GAB', 'DEU','ITA','KEN'];

  radarChartOptions = {
    responsive: true,
    title:{
      display:true,
      text:'MOST REGISTRED NATIONALITIES PER MONTH'
    },
    maintainAspectRatio: false,
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 5,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    scales: {
    }
  }
  radarChartColors: Color[] = [{
    borderColor: 'red',
  }];
  radarChartLegend = false;
  radarChartPlugins = [];
  radarChartType = 'radar';

  /* bar chart configuration*/
  barChartData: ChartDataSets[] = [
    { data: [10,20,30,40,50,60,70] }
  ]
  barChartLabels: Label[] = ['MON', 'TUS', 'THUR', 'WED', 'FRI', 'SAT','SUN'];

  barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    title:{
      display:true,
      text:'WEEKLY REGISTRATION FLOW'
    },
    tooltips: {
      backgroundColor: '#f5f5f5',
      titleFontColor: '#333',
      bodyFontColor: '#666',
      bodySpacing: 4,
      xPadding: 5,
      mode: "nearest",
      intersect: 0,
      position: "nearest"
    },
    scales: {
    }
  }
  barChartColors: Color[] = [{
    borderColor: 'red',
  }];
  barChartLegend = false;
  barChartPlugins = [];
  barChartType = 'bar';

  

  constructor() { }

  ngOnInit() {

  }
}


