export type LayoffDataPoint = {
  company: string;
  country: string;
  date: string;
  funds_raised: number;
  industry: string;
  location: string;
  percentage_laid_off: number;
  stage: string;
  total_laid_off: number;
};

export type LayoffDataPointOrUnknown = LayoffDataPoint | unknown;
