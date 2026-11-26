# Starter Journey

> **Starter Journey has moved to the official Databricks documentation and is no longer maintained.**
> Go to the new guide: https://docs.databricks.com/aws/en/getting-started/starter-journey/

A step-by-step guide for people getting started on Databricks. Whether you're setting up your first workspace, connecting to data, building pipelines, or exploring AI/ML, this guide walks you through each stage from foundations to production-ready workflows.

Built with [Docusaurus](https://docusaurus.io/) and deployed to GitHub Pages.

## How to run locally

### Prerequisites

- [Node.js](https://nodejs.org/) v20 or higher
- npm (included with Node.js)

### Install dependencies

```bash
cd docs/starter-journey
npm install
```

### Start the development server

```bash
npx docusaurus start
```

The site will be available at `http://localhost:3000`.

### Build for production

```bash
npx docusaurus build
```

### Serve the production build locally

```bash
npx docusaurus serve
```

## Project Support

The code in this project is provided **for exploration purposes only** and is **not formally supported** by Databricks under any Service Level Agreements (SLAs). It is provided **AS-IS**, without any warranties or guarantees.

Please **do not submit support tickets** to Databricks for issues related to the use of this project.

The source code provided is subject to the Databricks [LICENSE](https://github.com/databricks-industry-solutions/security-analysis-tool/blob/main/LICENSE). All third-party libraries included or referenced are subject to their respective licenses set forth in the project license.

Any issues or bugs found should be submitted as **GitHub Issues** on the project repository. While these will be reviewed as time permits, there are **no formal SLAs** for support.

## License

&copy; 2025 Databricks, Inc. All rights reserved. The source in this notebook is provided subject to the Databricks License [https://databricks.com/db-license-source]. All included or referenced third party libraries are subject to the licenses set forth below.

| library | description | license | source |
|---------|-------------|---------|--------|
| Docusaurus | Static site generator for documentation websites | MIT | https://github.com/facebook/docusaurus |
