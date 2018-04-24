import { Component, OnInit, Input } from '@angular/core';
import { ProductMix } from '../product-mix.model';
import { Observable } from 'rxjs/Rx';
import * as d3 from 'd3';

@Component({
  selector: 'app-product-mix-chart',
  templateUrl: './product-mix-chart.component.html',
  styleUrls: ['./product-mix-chart.component.css']
})
export class ProductMixChartComponent implements OnInit {
  @Input() productMixObservable: Observable<any>;
  productMix: ProductMix;
  constructor() { }

  ngOnInit() {
    this.productMixObservable.subscribe(
      response => {
        var productMix = new ProductMix(response["dining"], response["seating"], response["bedroom"], response["youth"], response["occasional"], response["home"])
        this.productMix = productMix;
        this.drawChart(productMix);
      }
    )
  }

  drawChart(productMix) {
    var margin = {top: 20, right: 20, bottom: 20, left: 40}
    var width = ((window.innerWidth - 200) * 0.9 * (5/12)) * 0.9 - margin.left - margin.right;
    if(window.innerWidth <= 992) {
      width = ((window.innerWidth - 200) * 0.9) * 0.9 - margin.left - margin.right;
    }
    var height = window.innerHeight * .5;
    var radius = Math.min(width, height) / 2 - 8;
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    var svg = d3.select('#chart')
                      .append('svg')
                      .attr('width', width)
                      .attr('height', height)
                      .attr('style', 'margin:0 auto; display:block;')
                      .append('g')
                      .attr('transform', 'translate(' + (width  / 2 ) + ',' + (height / 2) + ')')


    var arc = d3.arc().innerRadius(0).outerRadius(radius);

    var tooltip = d3.select('#chart')
                    .append('div')
                    .attr('class', 'tooltip');
    tooltip.append('div')
      .attr('class', 'contributor')
    tooltip.append('div')
      .attr('class', 'amount')
    tooltip.append('div')
      .attr('class', 'percent')

      let productMixArr = [
        {label: "Dining", amount: productMix.dining, color: '#F74B5f'},
        {label: "Bedroom", amount: productMix.bedroom, color: '#9493A2'},
        {label: "Seating", amount: productMix.seating, color: "#ff6600"},
        {label: "Youth", amount: productMix.youth, color: '#33ccff'},
        {label: "Occasional", amount: productMix.occasional, color: "#F793AC"},
        {label: "Home", amount: productMix.home, color: "#ACBDD7"}
       ]

      var pie = d3.pie().value(function(d: any) {
        return d.amount;
      })
      .sort(null);
      var path = svg.selectAll('path')
                    .data(pie(productMixArr))
                    .enter()
                    .append('path')
                    .attr('d', <any>arc)
                    .attr('fill', function(d: any) {
                      return d.data.color
                    })
                    .style('stroke', '#333')
                    .style('stroke-width', '2px');


      var text = setTimeout(function() {
                  svg.selectAll('text')
                  .data(pie(productMixArr))
                  .enter()
                  .append('text')
                  .transition()
                  .duration(200)
                  .attr("transform", function(d: any) {
                    return "translate(" + arc.centroid(d) + ")";
                  })
                  .attr('text-anchor', 'middle')
                  .text(function(d: any) {
                    var total = d3.sum(productMixArr.map(function(d){
                        return d.amount;
                    }));
                    if(d.data.amount > 0) {
                      return d.data.label[0].toUpperCase();
                    }
                    else {
                      return ""
                    }
                  })
                  .style("color", '#fff')
                  .style('font-family', 'Open Sans');
                }, 1000);

      path.on('mouseover', function(d: any) {
        var total = d3.sum(productMixArr.map(function(d){
            return d.amount;
        }));
        let percent = Math.round(1000 * d.data.amount / total) / 10;
        tooltip.select('.contributor').html(d.data.label);
        tooltip.select('.amount').html(Math.round(d.data.amount * 10000) / 100 + " %");
        tooltip.style('display', 'block');
        tooltip.style('opacity', 1);
        tooltip.style('background-color', 'rgba(255,255,255,.9)');
        tooltip.style('padding', '4px');
        tooltip.style('position', 'absolute');
        tooltip.style('font-family', 'Open Sans');
        tooltip.select('.label').style('color', '#333');
      });

      path.on('mouseout', function() {
        tooltip.style('display', 'none')
      });

      path.on('mousemove', function(d) {
        tooltip.style('top', (d3.event.layerY + 10) + 'px')
              .style('left', (d3.event.layerX + 10) + 'px')
      });

      path.transition()
        .duration(1000)
        .attrTween('d', function(d: any) {
            var interpolate = d3.interpolate({startAngle: 0, endAngle: 0}, d);
            return function(t: any) {
                return arc(interpolate(t));
            };
        })
  }
}
