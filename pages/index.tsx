import Head from "next/head";
import { useState } from "react";
import styles from "../styles/Home.module.css";
import { useGetLayoffData } from "../hooks";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Bar,
  Legend,
  Tooltip,
} from "recharts";
import type { LayoffDataPoint } from "../types";
import { formatDataByProperty } from "../helpers";

const organizeByOptions: Array<[keyof LayoffDataPoint, string]> = [
  ["company", "Company"],
  ["country", "Country"],
  ["date", "Date of Layoff"],
  ["funds_raised", "Funds Raised (in miilions USD)"],
  ["industry", "Industry"],
  ["location", "Location"],
  ["percentage_laid_off", "Percentage of Employees Laid Off"],
  ["stage", "Company Funding Stage"],
  ["total_laid_off", "Total Number of Employees Laid Off"],
];

const Home = () => {
  const { data, isLoading, isError } = useGetLayoffData();
  const [organizeBy, setOrganizeBy] =
    useState<keyof LayoffDataPoint>("industry");

  if (isError) {
    return <div>Failed to load</div>;
  }

  if (isLoading || !data) {
    return null;
  }

  const totalCompanies = data.length || 0;
  const chartData = formatDataByProperty(organizeBy, data);
  // this should be broken out into its own helper but I ran out of time
  const chartDataKey =
    organizeBy === "percentage_laid_off"
      ? "Percentage of Company Laid Off"
      : "Total Laid Off Employees";

  console.log(data, chartData);

  return (
    <div className={styles.container}>
      <Head>
        <title>Layoff Data Visualizer</title>
        <meta
          name="description"
          content="Visualize the unfolding chaos of people losing their jobs"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Layoff Data Visualizer</h1>
        <h2>
          {totalCompanies} companies have had layoffs since 2019. This is their
          data.
        </h2>
        <BarChart width={1280} height={480} data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey={chartDataKey} fill="#82ca9d" />
        </BarChart>
        <br />
        <div className={styles.grid}>
          {organizeByOptions.map(([property, title]) => {
            return (
              <button
                key={property}
                onClick={() => setOrganizeBy(property)}
                className={styles.button}
                type="button"
              >
                {title}
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default Home;
