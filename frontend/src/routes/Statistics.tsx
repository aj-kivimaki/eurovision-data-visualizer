import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { Grid, Paper, Typography } from "@mui/material";
import "./Statistics.css";

type Data = [string, number, number, number, number, string, string];
type Json = [
  {
    to_country: string;
    points_final: number;
    points_tele_final: number;
    points_jury_final: number;
    place_contest: number;
    performer: string;
    song: string;
  }
];

// constants
const width = 800;
const height = 400;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const Statistics: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", 1000)
      .attr("height", 500);

    const graph = svg
      .append("g")
      .attr("width", graphWidth)
      .attr("height", graphHeight)
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

    const xAxisGroup = graph
      .append("g")
      .attr("id", "x-axis")
      .attr("transform", `translate(0, ${graphHeight})`);

    const yAxisGroup = graph.append("g").attr("id", "y-axis");

    fetch("http://localhost:8000/testData")
      .then((response) => response.json())
      .then((json) => {
        const data = (json as Json)
          .map((d) => {
            return [
              d.to_country,
              d.points_final,
              d.points_tele_final,
              d.points_jury_final,
              d.place_contest,
              d.performer,
              d.song,
            ];
          })
          .sort((a, b) => (a[1] as number) - (b[1] as number)); // sort, ascending order

        console.log(data);
        const max = d3.max(data as Data[], (d) => d[1])!;

        const y = d3.scaleLinear().domain([0, max]).range([graphHeight, 0]);

        const x = d3
          .scaleBand()
          .domain((data as Data[]).map((d) => d[0]))
          .range([0, width])
          .paddingInner(0.1);

        graph
          .selectAll("rect")
          .data(data as Data[])
          .enter()
          .append("rect")
          .attr("width", x.bandwidth)
          .attr("height", (d) => graphHeight - y(d[1]))
          .attr("fill", "#FF43EC")
          .attr("x", (d) => x(d[0]) as number)
          .attr("y", (d) => y(d[1]))
          .attr("class", "bar")
          .attr("data-gdp", (d) => d[1])
          .attr("data-date", (d) => d[0]);

        const xAxis = d3.axisBottom(x);
        const yAxis = d3.axisLeft(y).ticks(10);

        yAxisGroup.call(yAxis);
        xAxisGroup.call(xAxis);
      });
  }, []);

  return (
    <div className="statistics">
      <Grid container alignItems="center" justifyContent="center">
        <Grid item m={10}>
          <Typography variant="h4" align="center" p={2}>
            Points and Winner country
          </Typography>
          <Paper className="bar" ref={ref} />
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
