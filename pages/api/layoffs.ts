// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import Papa, { ParseError } from "papaparse";
import path from "path";
import { promises as fs } from "fs";
import { LayoffDataPoint } from "../../types";

type Data = {
  data: LayoffDataPoint[] | unknown;
  error: ParseError[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const csvDirectory = path.join(process.cwd(), "csv");
  const fileContents = await fs.readFile(csvDirectory + "/layoffs.csv", "utf8");
  const result = await Papa.parse(fileContents, {
    dynamicTyping: true,
    header: true,
  });
  const data = result.data;
  const error = result.errors;
  res.status(200).json({ data, error });
}
