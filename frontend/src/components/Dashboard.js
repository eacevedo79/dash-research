import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const downloadTemplate = (e) => {
    e.preventDefault();
    const csvContent = "data:text/csv;charset=utf-8,"
        + "date,temperature,light_intensity,ph,salinity\n"
        + "2025-07-06,26.5,160,8.2,35.1\n";
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sample_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleFileUpload = () => {
    if (!selectedFile) {
      alert('Please select a file first.');
      return;
    }
    setIsLoading(true);
    setUploadSuccess(false);
    setChartData(null);

    // Simulate backend processing
    setTimeout(() => {
      console.log('File uploaded:', selectedFile);
      // In a real application, you would parse the CSV here
      // and set the chartData based on its content.
      // For now, we'll just use the mock data.
      setChartData({
          labels: ['1', '2', '3', '4', '5', '6', '7'],
          datasets: [
            {
              label: 'Temperature',
              data: [22, 23, 25, 24, 26, 27, 25],
              borderColor: 'rgba(255, 99, 132, 1)',
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
              label: 'Light Intensity',
              data: [150, 160, 155, 165, 170, 168, 172],
              borderColor: 'rgba(54, 162, 235, 1)',
              backgroundColor: 'rgba(54, 162, 235, 0.2)',
            },
            {
              label: 'pH Level',
              data: [8.1, 8.2, 8.1, 8.3, 8.2, 8.4, 8.3],
              borderColor: 'rgba(75, 192, 192, 1)',
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
              label: 'Salinity',
              data: [35, 35.2, 35.1, 35.3, 35.4, 35.2, 35.5],
              borderColor: 'rgba(153, 102, 255, 1)',
              backgroundColor: 'rgba(153, 102, 255, 0.2)',
            },
          ],
        });
      setIsLoading(false);
      setUploadSuccess(true);
    }, 2000);
  };

  const handleReset = () => {
    setChartData(null);
    setSelectedFile(null);
    setUploadSuccess(false);
  }

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Coral Health Dashboard</h1>

      {!chartData && !isLoading && (
        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Upload Data</h5>
            <p className="card-text text-muted">Please upload a CSV file. Max size: 5MB.</p>
            <div className="input-group">
              <input className="form-control" type="file" onChange={handleFileChange} accept=".csv" />
              <button className="btn btn-primary" type="button" onClick={handleFileUpload}>Upload</button>
            </div>
            <div className="mt-2">
              <a href="#" onClick={downloadTemplate}>Download Sample Template</a>
            </div>
          </div>
        </div>
      )}

      {isLoading && (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="ms-2">Processing data...</p>
        </div>
      )}

      {uploadSuccess && (
        <div className="alert alert-success d-flex justify-content-between align-items-center" role="alert">
          <span>✓ Data uploaded and processed successfully!</span>
          <button type="button" className="btn btn-secondary btn-sm" onClick={handleReset}>Upload Another File</button>
        </div>
      )}

      {chartData && (
        <div className="row">
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Temperature (°C)</h5>
                <Line data={{
                  labels: chartData.labels,
                  datasets: [chartData.datasets[0]]
                }} />
              </div>
            </div>
          </div>
          <div className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Light Intensity (lux)</h5>
                <Line data={{
                  labels: chartData.labels,
                  datasets: [chartData.datasets[1]]
                }} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">pH Level</h5>
                <Line data={{
                  labels: chartData.labels,
                  datasets: [chartData.datasets[2]]
                }} />
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Salinity (ppt)</h5>
                <Line data={{
                  labels: chartData.labels,
                  datasets: [chartData.datasets[3]]
                }} />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;

