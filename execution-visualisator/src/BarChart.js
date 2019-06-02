import React, { Component }  from 'react';
import * as d3 from 'd3';
import {getImage} from '../src/ImageMap'

class BarChart extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        this.drawGraph();
    }

    drawGraph() {
        const height = 1700;
        const width = 1700;
        const radius = 4;

        let drag = (simulation) => {

            function dragstarted(d) {
                if (!d3.event.active) simulation.alphaTarget(0.3).restart();
                d.fx = d.x;
                d.fy = d.y;
            }

            function dragged(d) {
                d.fx = d3.event.x;
                d.fy = d3.event.y;
            }

            function dragended(d) {
                if (!d3.event.active) simulation.alphaTarget(0);
                d.fx = null;
                d.fy = null;
            }

            return d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended);
        };

        d3.json("http://localhost:3000/log_final.json").then((data) => {
            const links = data.links.map(d => Object.create(d));
            const nodes = data.nodes.map(d => Object.create(d));
            // console.log('LINKS: ', links);
            // console.log('NODES: ', nodes);

            const simulation = d3.forceSimulation(nodes)
                .force("link", d3.forceLink(links).id(d => d.id))
                .force("charge", d3.forceManyBody())
                .force("collide", d3.forceCollide())
                .force("center", d3.forceCenter(width / 2, height / 2));

            simulation.force("collide").radius(radius);

            const svg = d3.select('.graph2');

            const link = svg.append("g")
                .attr("stroke", "#999")
                .attr("stroke-opacity", 0.6)
                .selectAll("line")
                .data(links)
                .join("line")
                .attr("stroke-width", d => Math.sqrt(d.value));

            const node2 = svg.selectAll(".node")
                .data(nodes)
                .enter().append("g")
                .attr("class", "node")
                .call(drag(simulation));

            node2.append("image")
                .attr("xlink:href", function(d) { return getImage(d.type) })
                .attr("x", "-12px")
                .attr("y", "-12px")
                .attr("width", "24px")
                .attr("height", "24px");

            node2.append("title")
                .text(d => d.desc);

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node2.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")";});
            });
            return svg.node();
        });
    }

    render(){
        return <div>
            <div className="graph1">
                <svg className="graph2" width="1700px" height="1700px"/>
            </div>
        </div>
    }
}

export default BarChart;