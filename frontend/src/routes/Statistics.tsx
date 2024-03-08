import React, { useCallback, useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import Select from "react-select";
import { Grid, Typography } from "@mui/material";
import "./Statistics.css";

// types
type Data = [string, number, number, number, number, string, string, string];

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
const width = 1250;
const height = 300;
const margin = { top: 20, right: 20, bottom: 100, left: 100 };
const graphWidth = width - margin.left - margin.right;
const graphHeight = height - margin.top - margin.bottom;

const Statistics: React.FC = () => {
  const [years, setYears] = useState<SelectType[]>([]);
  const [year, setYear] = useState<string | null>("2023");
  const [countries, setCountries] = useState<SelectType[]>([]);
  const [country, setCountry] = useState<string | null>(null);
  const [allData, setAllData] = useState<Data[] | null>(null);
  const [chartData, setChartData] = useState<Data[] | null>(null);
  const [hoverData, setHoverData] = useState<Data | null>(null);
  const [query, setQuery] = useState<string>("2023");
  const ref = useRef(null);

  // format the data for the <Select> options
  const formatData = useCallback((arr: Set<string> | string[]) => {
    return Array.from(arr).map((c) => {
      return { value: c, label: c };
    });
  }, []);

  // set the <Select> options
  const setOptions = useCallback(
    (json: Json) => {
      setCountries(formatData(new Set(json.map((c) => c.to_country))));
      setYears(formatData(new Set(json.map((y) => y.year))));
    },
    [formatData]
  );

  // format data based on option
  const formatChartData = useCallback(
    (data: Data[]) => {
      const formattedData: Data[] = [];

      if (year !== null) {
        data.map((c) =>
          formattedData.push([c[0], c[1], c[2], c[3], c[4], c[5], c[6], c[7]])
        );
      }

      if (country !== null) {
        data.map((c) =>
          formattedData.push([c[7], c[1], c[2], c[3], c[4], c[5], c[6], c[0]])
        );
      }
      const sortedData = formattedData.sort((a, b) => a[1] - b[1]);
      setChartData(sortedData);
    },
    [country, year]
  );

  // filter fetched data
  const setFetchedData = useCallback(
    (json: Json) => {
      const fetchedData = (json as Json).map((d) => {
        return [
          d.to_country,
          +d.points_final,
          +d.points_tele_final,
          +d.points_jury_final,
          +d.place_contest,
          d.performer,
          d.song,
          d.year,
        ];
      });
      setAllData(fetchedData as Data[]);
      formatChartData(fetchedData as Data[]);
    },
    [formatChartData]
  );

  // fetch the data with query
  useEffect(() => {
    if (!query) return;

    fetch(`http://localhost:8080/eurovision?q=${query}`)
      .then((response) => response.json())
      .then((json) => {
        setOptions(json as Json);
        setFetchedData(json as Json);
      });
  }, [setOptions, setFetchedData, query]);

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
      .attr("width", 1400)
      .attr("height", 360);

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

    const max = d3.max(chartData as Data[], (d) => d[1])!;

    const y = d3.scaleLinear().domain([0, max]).range([graphHeight, 0]);

    const x = d3
      .scaleBand()
      .domain((chartData as Data[]).map((d) => d[0]))
      .range([0, width])
      .paddingInner(0.1);

    graph
      .selectAll("rect")
      .data(chartData as Data[])
      .join("rect")
      .attr("width", x.bandwidth)
      .attr("height", (d) => graphHeight - y(d[1]))
      .attr("fill", "#00ff00")
      .attr("x", (d) => x(d[0]) as number)
      .attr("y", (d) => y(d[1]))
      .attr("class", "bar")
      .on("mouseover", (_, i) => {
        setHoverData(i);
      })
      .on("mouseout", () => setHoverData(null));

    const xAxis = d3.axisBottom(x);
    const yAxis = d3.axisLeft(y).ticks(6);

    yAxisGroup.call(yAxis).selectAll("text").attr("font-size", "16px");
    xAxisGroup
      .call(xAxis)
      .selectAll("text")
      .style("text-anchor", "end")
      .attr("dx", "-.8em")
      .attr("dy", ".15em")
      .attr("font-size", "14px")
      .attr("transform", "rotate(-70)");
  }, [chartData]);

  // handle the change of the <Select> options
  const handleChange = (option: SelectType | null, type: string) => {
    if (option) setQuery(String(option.value).toLowerCase());
    if (type === "year") {
      setYear(option?.value as string);
      setCountry(null);
    } else if (type === "country") {
      setCountry(option?.value as string);
      setYear(null);
    }
  };

  return (
    <div className="statistics">
      <Grid container mt={3}>
        <Typography
          variant="h4"
          textAlign="center"
          className="chart-title"
          p={4}
        >
          {country && `Results for ${country}`}
          {year && `Results for ${year}`}
        </Typography>
        <Grid item className="scroll">
          <div className="bar" ref={ref}></div>
        </Grid>
      </Grid>
      <Grid container justifyContent="center">
        {!hoverData && (
          <>
            <Grid m={2}>
              <label>
                <Typography variant="h6" pb={1}>
                  Points by year:
                </Typography>
                <Select
                  className="select year"
                  onChange={(option) => handleChange(option, "year")}
                  options={years}
                  value={years.filter((option) => option.value === year)}
                />
              </label>
            </Grid>
            <Grid m={2}>
              <label>
                <Typography variant="h6" pb={1}>
                  Points by country:
                </Typography>
                <Select
                  className="select country"
                  onChange={(option) => handleChange(option, "country")}
                  options={countries}
                  value={countries.filter((option) => option.value === country)}
                />
              </label>
            </Grid>
          </>
        )}
      </Grid>
      {hoverData && (
        <Grid pl={10}>
          {hoverData[0] && <Typography variant="h6">{hoverData[0]}</Typography>}
          {hoverData[5] && (
            <Typography variant="body2">
              Performer: {`${hoverData[5]}`}
            </Typography>
          )}
          {hoverData[6] && (
            <Typography variant="body2">Song: {`${hoverData[6]}`}</Typography>
          )}
          {hoverData[4] && (
            <Typography variant="body2">
              Final Position: {`${hoverData[4]}`}
            </Typography>
          )}
          {hoverData[1] && (
            <Typography variant="body2">
              Total points: {hoverData[1]}
            </Typography>
          )}
          {hoverData[2] && (
            <Typography variant="body2">Jury: {hoverData[2]}</Typography>
          )}
          {hoverData[3] && (
            <Typography variant="body2">
              Audience: {`${hoverData[3]}`}
            </Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Statistics;
