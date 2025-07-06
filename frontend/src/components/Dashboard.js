import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Typography, Grid, Paper, Button, Alert, CircularProgress, Link as MuiLink } from '@mui/material';
import { LineChart } from '@mui/x-charts/LineChart';
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
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import { useTheme } from '@mui/material/styles';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const drawerWidth = 240;

const Dashboard = () => {
  const [chartData, setChartData] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();

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

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        <ListItem button key="Upload">
          <ListItemIcon>
            <UploadFileIcon />
          </ListItemIcon>
          <ListItemText primary="Upload Data" />
        </ListItem>
        <ListItem button key="Charts">
          <ListItemIcon>
            <ShowChartIcon />
          </ListItemIcon>
          <ListItemText primary="Charts" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Coral Health Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar />
        {/* Upload and Chart Content */}
        {!chartData && !isLoading && (
          <Paper sx={{ p: 3, mb: 4 }}>
            <Typography variant="h5" gutterBottom>Upload Data</Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Please upload a CSV file. Max size: 5MB.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mb: 2 }}>
              <input
                style={{ display: 'none' }}
                id="upload-csv"
                type="file"
                onChange={handleFileChange}
                accept=".csv"
              />
              <label htmlFor="upload-csv">
                <Button variant="outlined" component="span" startIcon={<UploadFileIcon />}>
                  Choose File
                </Button>
              </label>
              <Typography variant="body2">{selectedFile ? selectedFile.name : 'No file selected'}</Typography>
              <Button variant="contained" onClick={handleFileUpload}>Upload</Button>
            </Box>
            <MuiLink href="#" onClick={downloadTemplate} underline="hover">
              Download Sample Template
            </MuiLink>
          </Paper>
        )}
        {isLoading && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <CircularProgress size={24} />
            <Typography>Processing data...</Typography>
          </Box>
        )}
        {uploadSuccess && (
          <Alert severity="success" sx={{ mb: 2, alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <span>✓ Data uploaded and processed successfully!</span>
              <Button size="small" variant="outlined" onClick={handleReset} sx={{ ml: 'auto' }}>
                Upload Another File
              </Button>
            </Box>
          </Alert>
        )}
        {chartData && (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Temperature (°C)</Typography>
                <LineChart
                  xAxis={[{ data: chartData.labels, label: 'Day' }]}
                  series={[{ data: chartData.datasets[0].data, label: chartData.datasets[0].label, color: chartData.datasets[0].borderColor }]}
                  width={400}
                  height={250}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Light Intensity (lux)</Typography>
                <LineChart
                  xAxis={[{ data: chartData.labels, label: 'Day' }]}
                  series={[{ data: chartData.datasets[1].data, label: chartData.datasets[1].label, color: chartData.datasets[1].borderColor }]}
                  width={400}
                  height={250}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">pH Level</Typography>
                <LineChart
                  xAxis={[{ data: chartData.labels, label: 'Day' }]}
                  series={[{ data: chartData.datasets[2].data, label: chartData.datasets[2].label, color: chartData.datasets[2].borderColor }]}
                  width={400}
                  height={250}
                />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6">Salinity (ppt)</Typography>
                <LineChart
                  xAxis={[{ data: chartData.labels, label: 'Day' }]}
                  series={[{ data: chartData.datasets[3].data, label: chartData.datasets[3].label, color: chartData.datasets[3].borderColor }]}
                  width={400}
                  height={250}
                />
              </Paper>
            </Grid>
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default Dashboard;

