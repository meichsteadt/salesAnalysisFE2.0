import { Component, OnInit, Input, onChanges } from '@angular/core';
import { SalesNumber } from '../sales-number.model';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';

@Component({
  selector: 'app-sales-numbers-chart',
  templateUrl: './sales-numbers-chart.component.html',
  styleUrls: ['./sales-numbers-chart.component.css']
})
export class SalesNumbersChartComponent implements OnInit, OnChanges {
  @Input() salesNumbers: SalesNumber[];
  constructor() { }

  ngOnInit() {
    setTimeout(i => {
      this.drawChart();
    }, 100)
  }

  drawChart() {
    var margin = {top: 20, right: 20, bottom: 20, left: 40}
    var width = ((window.innerWidth - 200) * 0.9 * (7/12)) * 0.9 - margin.left - margin.right;
    if(window.innerWidth <= 992) {
      width = ((window.innerWidth - 200) * 0.9) * 0.9 - margin.left - margin.right;
    }
    var height = window.innerHeight * .75;
    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var x1 = d3.scaleBand()
              .range([0, width])
              .padding(0.1);

    var y = d3.scaleLinear()
              .range([height, 0]);


    var svg = d3.select(".bar-chart").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        let dataset = ['#F74B5f', '#323552', "ff6600", '#33ccff', "#F793AC",  "#ACBDD7", "#ff9896", "#9467bd", "#c5b0d58"];
        let salesNumbers = this.salesNumbers;
          x.domain(salesNumbers.map(function(d: any) {
            return d.label;
          }));
          x1.domain(salesNumbers.map(function(d: any) {
            return d.label;
          }));

          y.domain([0, d3.max(salesNumbers, function(d) {
            return d.currentYear;
          })]);



          var select = svg.selectAll(".bar")
            .data(salesNumbers)
          .enter()

          select.append("rect")
            .attr("class", "bar")
           .style("fill", function(d) {
             return dataset[0];
           })
           .attr("width", x.bandwidth()/2)
            .attr("x", function(d) { return x(d.label); })
            .attr("y", height)
            .attr("height", 0).transition()
            .duration(1000).delay(function (d, i) { return i*100; })
            .attr("y", function(d) {
              return y(d.currentYear);
            })
            .attr("height", function(d) {
              return height - y(d.currentYear);
            });

          select.append("rect")
            .attr("class", "bar")
           .style("fill", function(d) {
             return dataset[1];
           })
           .attr("width", x.bandwidth()/2)
            .attr("x", function(d) { return x(d.label) + x.bandwidth()/2; })
            .attr("y", height)
            .attr("height", 0).transition()
            .duration(1000).delay(function (d, i) { return i*100; })
            .attr("y", function(d) {
              return y(d.currentYear);
            })
            .attr("height", function(d) {
              return height - y(d.currentYear);
            });


        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        svg.append("g")
            .call(d3.axisLeft(y));
    }

}
