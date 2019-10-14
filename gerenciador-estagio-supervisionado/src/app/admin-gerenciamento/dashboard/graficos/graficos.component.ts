import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-graficos',
  templateUrl: './graficos.component.html',
  styleUrls: ['./graficos.component.css']
})
export class GraficosComponent implements OnInit {

  BarChart = [];
  DoughnutChart = [];

  ngOnInit() {

    this.BarChart = new Chart('barraChart', {
      type: 'bar',
      data: {
        labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out"],
        datasets: [{
          label: 'Estagiários contratados por mês',
          data: [9, 7, 12, 23, 12, 11, 3, 12, 2, 12],
          fill: false,
          lineTension: 0.2,
          borderColor: "red",
          borderWidth: 1,
          backgroundColor: "rgba(200, 54, 54, 0.5)"
        }]
      },
      options: {
        title:{
          text:"Ano: 2019",
          display: true
        },
        scales:{
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    })

    this.DoughnutChart = new Chart('circuloChart', {
      type: 'doughnut',
      data: {
        labels: ["Tegra", "Ventron", "IBM", "Infox"],
        datasets: [{
          label: '# of labels',
          data: [9, 7, 12, 8],
          borderWidth: 1,
          backgroundColor: [
            'rgba(163, 9, 9, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)'
          ],
        }]
      },
      options: {
        title:{
          text:"Empresas que mais contratam Fatecanos",
          display: true
        },
      }
    })
  }
}