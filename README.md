# Coral Health Dashboard

This project is a web-based dashboard for visualizing coral reef health data. It allows users to upload a CSV file containing sensor data (temperature, light intensity, pH, and salinity) and view the data in a series of charts.

## Features

*   Upload CSV data file.
*   Visualize data with interactive charts.
*   Download a sample CSV template.
*   Responsive design for different screen sizes.

## Getting Started

### Prerequisites

*   [Node.js](https://nodejs.org/) (v22 or higher)
*   [npm](https://www.npmjs.com/)
*   [Docker](https://www.docker.com/) (optional, for containerized deployment)

### Local Development

1.  **Install dependencies:**

    ```bash
    make install
    ```

2.  **Start the development server:**

    ```bash
    make start
    ```

    This will open the application in your default browser at `http://localhost:3000`.

### Docker Deployment

1.  **Build the Docker image:**

    ```bash
    make docker-build
    ```

2.  **Run the Docker container:**

    ```bash
    make docker-run
    ```

    The application will be available at `http://localhost:8080`.

## Data Format

The application expects a CSV file with the following columns:

*   `date`: The date of the measurement (e.g., `2025-07-06`).
*   `temperature`: The water temperature in degrees Celsius.
*   `light_intensity`: The light intensity in lux.
*   `ph`: The pH level of the water.
*   `salinity`: The salinity of the water in parts per thousand (ppt).

### Sample Data

You can download a sample CSV template from the application's upload page. Here is an example of the expected format:

```csv
date,temperature,light_intensity,ph,salinity
2025-07-06,26.5,160,8.2,35.1
2025-07-07,26.6,162,8.2,35.2
2025-07-08,26.7,165,8.3,35.3
```

## Built With

*   [React](https://reactjs.org/)
*   [Chart.js](https://www.chartjs.org/)
*   [Bootstrap](https://getbootstrap.com/)
*   [Nginx](https://www.nginx.com/)
*   [Docker](https://www.docker.com/)