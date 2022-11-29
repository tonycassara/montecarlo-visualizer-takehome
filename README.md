This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

## Project Summary

This application is bringing transparency to the employee market by providing lesser known data points about Layoffs occurring worldwide since 2019.

Our future goals include using data as an overlay on maps, cross reference COVID restrictions by country/city, and also tying data to Gross GDP. We seek to uncover any predictors of layoffs and the scale of those causes effects on layoff severity.

We chose NextJS for its performance and built in API layer to quickly iterate on future tasks while remaining frontend heavy and TypeScript first.

## Roadmap

In the future we'd like to see the following features implemented:

- Fix data mapping helper to correctly add data based on type
  - For example: Company funding stage counts number of companies but displays "Total Laid Off Employees"
- Create chart mapping component that can generate different charts based on data type that can be easier to interpret than a bar graph
- Ability to share data views with URL params
- Automation and unit testing

## Production Readiness

In order to go to production our app needs the following checks in place:

1. Data reliability check (Monte Carlo)
2. Automation testing (Cypress.js)
3. Automated deployment pipeline (Zeit)
