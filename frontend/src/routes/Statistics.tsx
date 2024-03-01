import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Select from "react-select";
import { Grid, Paper, Typography } from "@mui/material";
import "./Statistics.css";

// types
type Data = [string, number, number, number, number, string, string, string];

type ChartData = [string, number];

type Json = [
  {
    to_country: string;
    points_final: number;
    points_tele_final: number;
    points_jury_final: number;
    place_contest: number;
    performer: string;
    song: string;
    year: string;
  }
];

type SelectType = {
  value: string;
  label: string;
};

// constants for the bar chart
const width = 600;
const height = 300;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const Statistics: React.FC = () => {
  const [years, setYears] = useState<SelectType[]>([]);
  const [year, setYear] = useState<string | null>(null);
  const [countries, setCountries] = useState<SelectType[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | null>(null);
  const ref = useRef(null);

  // format the data for the <Select> options
  const formatData = useCallback((arr: Set<string> | string[]) => {
    return Array.from(arr).map((c) => {
      return { value: c, label: c };
    });
  }, []);

  // format data based on option
  const formatChartData = useCallback(
    (data: Data[]) => {
      const formattedData: ChartData[] = [];
      console.log(data);

      if (year !== null && country === null) {
        data.map((c) => formattedData.push([c[0], c[1]]));
      }

      if (country !== null && year === null) {
        data.map((c) => formattedData.push([c[7], c[1]]));
      }
      setChartData(formattedData);
    },
    [country, year]
  );

  // set the <Select> options
  const setOptions = useCallback(
    (json: Json) => {
      setCountries(formatData(new Set(json.map((c) => c.to_country))));
      setYears(formatData(new Set(json.map((y) => y.year))));
    },
    [formatData]
  );

  // filter fetched data
  const setFetchedData = useCallback((json: Json) => {
    const fetchedData = (json as Json)
      .map((d) => {
        return [
          d.to_country,
          d.points_final,
          d.points_tele_final,
          d.points_jury_final,
          d.place_contest,
          d.performer,
          d.song,
          d.year.toString(),
        ];
      })
      .sort((a, b) => (a[1] as number) - (b[1] as number)); // sort, ascending order
    setAllData(fetchedData as Data[]);
    formatChartData(fetchedData as Data[]);
  }, []);

  // fetch the data
  useEffect(() => {
    fetch("http://localhost:8000/testData")
      .then((response) => response.json())
      .then((json) => {
        setOptions(json as Json);
        setFetchedData(json as Json);
      });
  }, [setOptions, setFetchedData]);

  // show data by country or year
  useEffect(() => {
    if (!allData) return;

    let filtered: Data[] = [];

    if (country) {
      filtered = allData.filter((d) => d[0] === country?.toString());
    } else if (year) {
      filtered = allData.filter((d) => d[7] === year?.toString());
    }

    formatChartData(filtered);
  }, [allData, country, year, formatChartData]);

  // create the bar chart
  useEffect(() => {
    d3.select(ref.current).selectAll("svg").remove();
    if (!chartData) return;

    const svg = d3
      .select(ref.current)
      .append("svg")
      .attr("width", 750)
      .attr("height", 280);

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

    const max = d3.max(chartData as ChartData[], (d) => d[1])!;

    const y = d3.scaleLinear().domain([0, max]).range([graphHeight, 0]);

    const x = d3
      .scaleBand()
      .domain((chartData as ChartData[]).map((d) => d[0]))
      .range([0, width])
      .paddingInner(0.1);

    graph
      .selectAll("rect")
      .data(chartData as ChartData[])
      .join("rect")
      .attr("width", x.bandwidth)
      .attr("height", (d) => graphHeight - y(d[1]))
      .attr("fill", "#00ff00")
      .attr("x", (d) => x(d[0]) as number)
      .attr("y", (d) => y(d[1]))
      .attr("class", "bar")
      .attr("data-gdp", (d) => d[1])
      .attr("data-date", (d) => d[0]);

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(6);

    yAxisGroup.call(yAxis);
    xAxisGroup.call(xAxis);
  }, [chartData]);

  const handleYear = (option) => {
    setYear(option?.value as string);
    setCountry(null);
  };

  const handleCountry = (option) => {
    setCountry(option?.value as string);
    setYear(null);
  };

  return (
    <div className="statistics">
      <Grid container m={4}>
        <Grid item>
          <Paper className="bar" ref={ref}>
            <Typography variant="h4" className="chart-title" p={4}>
              {country && `Results for ${country}`}
              {year && `Results for ${year}`}
            </Typography>
          </Paper>
        </Grid>
        <Grid item m={6}>
          <Grid m={4}>
            <label>
              <Typography variant="h6" pb={1}>
                Points by year:
              </Typography>
              <Select
                className="select year"
                onChange={(option) => handleYear(option)}
                options={years}
                value={years.filter((option) => option.value === year)}
              />
            </label>
          </Grid>
          <Grid m={4}>
            <label>
              <Typography variant="h6" pb={1}>
                Points by country:
              </Typography>
              <Select
                className="select country"
                onChange={(option) => handleCountry(option)}
                options={countries}
                value={countries.filter((option) => option.value === country)}
              />
            </label>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;

// TODO:

/*
- modify to show the data from all of the years when country is selected, not just one
- change the naming under the chart to 'year' instead of 'country name'.
- create tooltips to show additional information
*/
