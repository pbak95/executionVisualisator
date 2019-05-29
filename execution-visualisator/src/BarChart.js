import React, { Component }  from 'react';
import * as d3 from 'd3';


class BarChart extends Component {
    constructor(props){
        super(props);
    }

    componentDidMount() {
        //this.drawChart();
        this.drawGraph();
    }

    drawChart() {
        const data = [12, 5, 6, 6, 9, 10];
        let w = 700;
        let h = 300;


        const svg = d3.select(".graph2")
            .append("svg")
            .attr("width", w)
            .attr("height", h)
            .style("margin-left", 100);

        svg.selectAll("rect")
            .data(data)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i * 70)
            .attr("y", (d, i) => h - 10 * d)
            .attr("width", 65)
            .attr("height", (d, i) => d * 10)
            .attr("fill", "green")
    }

    drawGraph() {
        const height = 1700;
        const width = 1700;
        const radius = 10;

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

        d3.json("http://localhost:3000/patryk_nowe.json").then((data) => {
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

            const node = svg.append("g")
                .attr("stroke", "#fff")
                .attr("stroke-width", 1.5)
                .selectAll("circle")
                .data(nodes)
                .join("circle")
                .attr("r", radius)
                .attr("fill", d => d.color)
                .attr('data-toggle', 'tooltip')
                .attr('data-placement', 'top')
                .attr('title', d => d.id)
                .call(drag(simulation));

            node.append("title")
                .text(d => d.id);

            simulation.on("tick", () => {
                link
                    .attr("x1", d => d.source.x)
                    .attr("y1", d => d.source.y)
                    .attr("x2", d => d.target.x)
                    .attr("y2", d => d.target.y);

                node
                    .attr("cx", d => d.x)
                    .attr("cy", d => d.y);
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