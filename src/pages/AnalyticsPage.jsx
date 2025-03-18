import React, { useState } from "react";
import OverviewCards from "../components/analytics/OverviewCards";
import RevenueChart from "../components/analytics/RevenueChart";
import ChannelPerformance from "../components/analytics/ChannelPerformance";
import ProductPerformance from "../components/analytics/ProductPerformance";
import UserRetention from "../components/analytics/UserRetention";
import CustomerSegmentation from "../components/analytics/CustomerSegmentation";
import AIPoweredInsights from "../components/analytics/AIPoweredInsights";
import MapContainer from "../components/common/MapView";
import StatCard from "../components/common/StatCard";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import {
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Checkbox,
  ListItemText,
} from "@mui/material";
import TwoValueRadialChart from "../components/overview/TwoValueRadialChart";

const Infractions = [
  { name: "Congestions", value: 4500 },
  { name: "Broken traffic lights", value: 3200 },
  { name: "Potholes", value: 2800 },
  { name: "Imporper Number Plates", value: 2100 },
  { name: "Parking Violations", value: 1900 },
];

const trafficCongested = [
  { name: "Congested Road", value: 82 },
  { name: "Non Congested Road", value: 108 },
];

const EChalan = [
  { name: "Paid", value: 20 },
  { name: "Pending", value: 14 },
];

const Potholes = [
  { name: "Pending", value: 20 },
  { name: "Reported", value: 128 },
];

const ParkingVaiolations = [
  { name: "Pending", value: 6 },
  { name: "Issued", value: 24 },
];

const _innerRadius = 20;
const _outerRadius = 35;

const truncateLabel = (label) => {
  return label.length > 10 ? `${label.substring(0, 10)}...` : label;
};

const locations = [
  { name: "Pimpri", value: generateRandomValue(750, 1870) },
  { name: "Chinchwad", value: generateRandomValue(750, 1870) },
  { name: "Nigdi", value: generateRandomValue(750, 1870) },
  { name: "Bhosari", value: generateRandomValue(750, 1870) },
  { name: "Hinjewadi", value: generateRandomValue(750, 1870) },
  { name: "Pimple Saudagar", value: generateRandomValue(750, 1870) },
  { name: "Ravet", value: generateRandomValue(750, 1870) },
  { name: "Talegaon", value: generateRandomValue(750, 1870) },
  { name: "Wakad", value: generateRandomValue(750, 1870) },
  { name: "Rahatani", value: generateRandomValue(750, 1870) },
  { name: "Dehu Road", value: generateRandomValue(750, 1870) },
  { name: "Sinhagad Road", value: generateRandomValue(750, 1870) },
  { name: "Balewadi", value: generateRandomValue(750, 1870) },
  { name: "Undri", value: generateRandomValue(750, 1870) },
];

const InfractionswithLocation = [
  { type: "Speeding", location: "Pimpri" },
  { type: "Parking Violation", location: "Chinchwad" },
  { type: "Signal Jumping", location: "Nigdi" },
  // Add more infractions as needed
];

const AnalyticsPage = () => {
  const [selectedLocations, setSelectedLocations] = useState(
    locations.map((location) => location.name)
  );

  const handleLocationChange = (event) => {
    setSelectedLocations(event.target.value);
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 bg-gray-900">
      <div className="flex items-center justify-between space-x-4 p-4">
        <h1 className="text-2xl font-bold text-tBase">Analytics Dashboard</h1>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <div className="flex space-x-4">
            <DateTimePicker
              label="From"
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            />
            <DateTimePicker
              label="To"
              sx={{
                "& .MuiInputBase-root": {
                  color: "white",
                },
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "white",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              }}
            />
          </div>
        </LocalizationProvider>
      </div>

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <div className="grid grid-cols-4 gap-5 mb-8">
          {/* Left Section */}
          <div className="col-span-1 space-y-5">
            <TwoValueRadialChart
              name={"Congestion"}
              categoryData={trafficCongested}
              innerRadius={_innerRadius}
              outerRadius={_outerRadius}
              height={100}
            />
            <TwoValueRadialChart
              name={"E-Chalan"}
              categoryData={EChalan}
              innerRadius={_innerRadius}
              outerRadius={_outerRadius}
              height={100}
            />
            <TwoValueRadialChart
              name={"Potholes"}
              categoryData={Potholes}
              innerRadius={_innerRadius}
              outerRadius={_outerRadius}
              height={100}
            />
          </div>

          {/* Middle Section */}
          <div className="col-span-2 space-y-5">
            <MapContainer />
			
            <TwoValueRadialChart
              name={"Parking"}
              categoryData={ParkingVaiolations}
              innerRadius={_innerRadius}
              outerRadius={_outerRadius}
              height={100}
            />
          </div>

          {/* Right Section */}
          <div className="col-span-1 space-y-5">
            <FormControl sx={{ m: 1, minWidth: 200 }}>
              <InputLabel sx={{ color: "white" }}>Locations</InputLabel>
              <Select
                multiple
                value={selectedLocations}
                onChange={handleLocationChange}
                renderValue={(selected) => truncateLabel(selected.join(", "))}
                sx={{
                  "& .MuiInputBase-root": {
                    color: "white",
                    backgroundColor: "white",
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white",
                    },
                    "&:hover fieldset": {
                      borderColor: "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white",
                    },
                  },
                  "& .MuiSvgIcon-root": {
                    color: "white",
                  },
                  root: {
                    color: "white",
                  },
                  ".MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    color: "white",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "white",
                    borderWidth: "0.15rem",
                    color: "white",
                  },
                }}
              >
                {locations.map((location) => (
                  <MenuItem key={location.name} value={location.name}>
                    <Checkbox
                      checked={selectedLocations.indexOf(location.name) > -1}
                    />
                    <ListItemText primary={location.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {InfractionswithLocation.map((infraction, index) => (
              <StatCard
                key={index}
                type={infraction.type}
                location={infraction.location}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

function generateRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default AnalyticsPage;
