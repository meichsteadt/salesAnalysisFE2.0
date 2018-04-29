import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { SalesNumber } from '../sales-number.model';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';
import * as $ from 'jquery';
import * as M from 'materialize-css';

declare var Materialize: any;
declare var $: any;
declare const InstallTrigger: any;

@Component({
  selector: 'app-sales-numbers-chart',
  templateUrl: './sales-numbers-chart.component.html',
  styleUrls: ['./sales-numbers-chart.component.css']
})
export class SalesNumbersChartComponent implements OnChanges {
  @Input() salesNumbers: SalesNumber[];
  @Input() salesNumbers2: SalesNumber[];
  @Input() salesYtd: number;
  @Input() period: string;
  @Output() emitPeriod = new EventEmitter();
  height: number = (window.innerHeight * .6) + 80;
  constructor() { }

  ngOnChanges() {
    this.drawChart('bar-chart1', this.salesNumbers);
    if(typeof InstallTrigger !== 'undefined') {
      console.log(typeof InstallTrigger)
      $('.bar-chart1').css('position', 'relative');
    }
  }

  active(period) {
    return (period === this.period ? true : false)
  }

  setPeriod(period) {
    this.emitPeriod.emit(period);
  }

  scroll() {
    var left = $('.bar-chart1').scrollLeft();
    $('#y').css('transform', 'translateX(' + left + 'px)');
    var y = $('#legend1').attr('transform').split(',')[1].split(')')[0]
    $('#legend1').attr('transform', 'translate(' + left + ',' + y + ')')
    y = $('#legend0').attr('transform').split(',')[1].split(')')[0]
    $('#legend0').attr('transform', 'translate(' + left + ',' + y + ')')
  }

  drawChart(elementName, salesNumbers) {
    var el = document.getElementsByClassName(elementName)[0];
    while (el.firstChild) {
      el.removeChild(el.firstChild);
    }

    var margin = {top: 20, right: 20, bottom: 20, left: 60}
    var width = ((window.innerWidth - 200) * 0.9 * (7/12)) * 1.8 - margin.left - margin.right;
    if(window.innerWidth <= 992) {
      width = ((window.innerWidth - 200) * 0.9) * 0.9 - margin.left - margin.right;
    }
    var height = window.innerHeight * .6;

    var x = d3.scaleBand()
              .range([0, width])
              .padding(0.1);
    var x1 = d3.scaleBand()
              .range([0, width])
              .padding(0.1);

    var y = d3.scaleLinear()
              .range([height, 50]);

    var y1 = d3.scaleLinear()
              .range([height, 50]);

    var tooltip = d3.select('.' + elementName)
                    .append('div')
                    .attr('class', 'tooltip');

    tooltip.append('div')
      .attr('class', 'amount')


    var svg = d3.select("." + elementName).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

        let dataset = ['#F74B5f', '#323552', "ff6600", '#33ccff', "#F793AC",  "#ACBDD7", "#ff9896", "#9467bd", "#c5b0d58"];

        function abbr(string) {
          return (string.split(" ").slice(0, 2).join(" ")).replace("Furniture", "Furn")
        }

          x.domain(salesNumbers.map(function(d: any) {
            return abbr(d.label);
          }));
          x1.domain(salesNumbers.map(function(d: any) {
            return abbr(d.label);
          }));

          y.domain([0, d3.max(salesNumbers, function(d) {
            return Math.max((Math.round(d.currentYear/1000) * 1000), (Math.round(d.lastYear/1000) * 1000));
          })]);

          y1.domain([0, d3.max(salesNumbers, function(d) {
            return Math.max((Math.round(d.currentYear/1000) * 1000), (Math.round(d.lastYear/1000) * 1000));
          })]);


          var number = elementName.split('').pop()
          var select = svg.selectAll(".bar" + number)
            .data(salesNumbers)
          .enter()

          var currentYear = select.append("rect")
            .attr("class", "bar")
           .style("fill", function(d) {
             return dataset[0];
           })

           currentYear.attr("width", x.bandwidth()/2)
            .attr("x", function(d) { return x(abbr(d.label)); })
            .attr("y", height)
            .attr("height", 0).transition()
            .duration(1000).delay(function (d, i) { return i*100; })
            .attr("y", function(d) {
              return y(d.currentYear);
            })
            .attr("height", function(d) {
              return height - y(d.currentYear);
            })
            .attr("data-legend", "current year");

          var lastYear = select.append("rect")
            .attr("class", "bar")
           .style("fill", function(d) {
             return dataset[1];
           })

           lastYear.attr("width", x.bandwidth()/2)
            .attr("x", function(d) { return x(abbr(d.label)) + x.bandwidth()/2; })
            .attr("y", height)
            .attr("height", 0).transition()
            .duration(1000).delay(function (d, i) { return i*100; })
            .attr("y", function(d) {
              return y(d.lastYear);
            })
            .attr("height", function(d) {
              return height - y(d.lastYear);
            })
            .attr("data-legend", "last year");

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));

        var labels = svg.append("g")
            .call(d3.axisLeft(y))
            .attr("id", "y");

        function moneyPipe(number){
          var string = (Math.round(number) + "").split('')
          var newString = "";
          for(var i = string.length - 1; i >= 0 ; i --) {
            if(((string.length - i) % 3 == 0) && (string.length - i + 1 > 0) && string.length > 3 && i !=0) {
              newString = "," + string[i] + newString
            }
            else {
              newString = string[i] + newString
            }
          }
          return "$ " + newString
        }

        function getNodePos(el)
          {
              var body = d3.select('body').node();

              for (var lx = 0, ly = 0;
                   el != null && el != body;
                   lx += (el.offsetLeft || el.clientLeft), ly += (el.offsetTop || el.clientTop), el = (el.offsetParent || el.parentNode))
                  ;
              return {x: lx, y: ly};
          }

            currentYear.on('mouseover', function(d: any) {
              tooltip.select('.amount').html(moneyPipe(d.currentYear));
              tooltip.style('display', 'block');
              tooltip.style('opacity', 1);
              tooltip.style('background-color', 'rgba(255,255,255,.9)');
              tooltip.style('padding', '4px');
              tooltip.style('position', 'absolute');
              tooltip.style('font-family', 'Open Sans');
              tooltip.style('white-space', 'nowrap');
              tooltip.select('.label').style('color', '#333');
            });

            lastYear.on('mouseover', function(d: any) {
              tooltip.select('.amount').html(moneyPipe(d.lastYear));
              tooltip.style('display', 'block');
              tooltip.style('opacity', 1);
              tooltip.style('background-color', 'rgba(255,255,255,.9)');
              tooltip.style('padding', '4px');
              tooltip.style('position', 'absolute');
              tooltip.style('font-family', 'Open Sans');
              tooltip.select('.label').style('color', '#333');
            });

            currentYear.on('mouseout', function() {
              tooltip.style('display', 'none')
            });

            currentYear.on('mousemove', function(d) {
              tooltip.style('left', x + "px" );
              tooltip.style('top', (d3.event.layerY + 10) + 'px')
                    .style('left', (d3.event.layerX + 10) + 'px')

            });

            lastYear.on('mouseout', function() {
              tooltip.style('display', 'none')
            });

            lastYear.on('mousemove', function(d) {
              tooltip.style('top', (d3.event.layerY + 10) + 'px')
                    .style('left', (d3.event.layerX + 10) + 'px')
            });

            var legendRectSize = 18;
            var legendSpacing = 4;

            var legend = svg.selectAll('.legend')
              .data([{label: "Current Year", color: dataset[0]}, {label: "Last Year", color: dataset[1]}])
              .enter()
              .append('g')
              .attr('class', 'legend');

              legend.append('rect')
                .attr('width', legendRectSize)
                .attr('height', legendRectSize)
                .style('fill', function(d) { return d.color })
                .style('stroke', function(d) { return d.color} );

              legend.append('text')
                .attr('x', legendRectSize + legendSpacing)
                .attr('y', legendRectSize - legendSpacing)
                .text(function(d) { return d.label; });

            legend.attr('transform', function(d, i) {
              var height = legendRectSize + legendSpacing;
              var offset =  height / 2;
              var horz = 1;
              var vert = i * height - offset;
              return 'translate(' + horz + ',' + vert + ')';
            }).attr('id', function(d, i) {
              return 'legend' + i;
            })
    }

}
