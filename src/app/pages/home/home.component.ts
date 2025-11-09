import { Component, OnInit } from '@angular/core';
import { NgxEchartsDirective } from 'ngx-echarts';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, CardModule, NgxEchartsDirective],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  chartOptions: any;
  chartOptions1: any;
  chartOptions2: any;
  constructor() { }

  ngOnInit() {
    this.renderChart([]);
    this.renderChart1([]);
    this.renderChart2([]);
  }
  renderChart(data: number[]) {
    this.chartOptions = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          data: ['Opened Po', 'Past', 'Total', 'Closed Po'],
          axisTick: {
            alignWithLabel: true
          }
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Direct',
          type: 'bar',
          barWidth: '60%',
          data: [11, 11, 347, 510],
        }
      ]
    };
  }
  renderChart1(data: number[]) {
    this.chartOptions1 = {
      title: {
        text: 'Po Status',
        left: 'center'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 11, name: 'Opened Po' },
            { value: 11, name: 'Past Due' },
            { value: 347, name: 'Total Received' },
            { value: 510, name: 'Closed Po' },
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };
  }
  renderChart2(data: number[]) {
    this.chartOptions2 = {
      title: {
        text: 'Catalogs'
      },
      toolbox: {
        feature: {
          dataView: { readOnly: false },
          restore: {},
          saveAsImage: {}
        }
      },
      legend: {},
      tooltip: {},
      dataset: {
        dimensions: ['product', '2015', '2016', '2017'],
        source: [
          { product: 'Matcha Latte', 2015: 43.3, 2016: 85.8, 2017: 93.7 },
          { product: 'Milk Tea', 2015: 83.1, 2016: 73.4, 2017: 55.1 },
          { product: 'Cheese Cocoa', 2015: 86.4, 2016: 65.2, 2017: 82.5 },
          { product: 'Walnut Brownie', 2015: 72.4, 2016: 53.9, 2017: 39.1 }
        ]
      },
      xAxis: { type: 'category' },
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [{ type: 'bar' }, { type: 'bar' }, { type: 'bar' }]
    }
  }
}
