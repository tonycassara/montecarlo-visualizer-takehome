import { LayoffDataPoint, LayoffDataPointOrUnknown } from "../types";

const formatPercentage = (percentage: number) => {
  return percentage * 100;
};

const formatTotalNumberLaidOff = (data: LayoffDataPoint[]) => {
  if (data.length) {
    return data.map(({ company, total_laid_off }: LayoffDataPoint) => {
      return {
        name: company,
        "Total Laid Off Employees": total_laid_off,
      };
    });
  }
};

const formatPercentageOfCompany = (data: LayoffDataPoint[]) => {
  if (data.length) {
    return data
      .filter(({ percentage_laid_off }: LayoffDataPoint) => {
        return typeof percentage_laid_off === "number";
      })
      .map(({ company, percentage_laid_off }: LayoffDataPoint) => {
        return {
          name: company,
          "Percentage of Company Laid Off":
            formatPercentage(percentage_laid_off),
        };
      });
  }
};

export const formatDataByProperty = (
  property: keyof LayoffDataPoint,
  data: LayoffDataPointOrUnknown
) => {
  if (Array.isArray(data)) {
    switch (property) {
      case "total_laid_off":
        return formatTotalNumberLaidOff(data);
      case "percentage_laid_off":
        return formatPercentageOfCompany(data);
      default:
        // default for data points that are incremental and can be summed
        const result: Record<string, number> = {};
        data.forEach((layoff) => {
          // sanitize undefined, null, and unknown values
          if (
            !layoff[property] ||
            String(layoff[property]).toLowerCase() === "unknown"
          ) {
            return;
          }

          if (!result[layoff[property]]) {
            result[layoff[property]] = 0;
          }

          result[layoff[property]] += 1;
        });
        const formattedResult = Object.entries(result).map(([key, value]) => ({
          name: key,
          "Total Laid Off Employees": value,
        }));
        return formattedResult;
    }
  }
};
