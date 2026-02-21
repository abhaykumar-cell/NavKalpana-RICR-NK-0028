import { useState } from "react";
import {
  Grid,
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack
} from "@mui/material";
import MainLayout from "../layout/MainLayout";
import BatchHeader from "./componets/BatchHeader";
import BatchCard from "./componets/BatchCard";
import BatchSummary from "./componets/BatchSummary";
import { dummyBatches } from "./data/dummydata";

const BatchPage = () => {
  const [filter, setFilter] = useState(0);
  const [batches, setBatches] = useState(dummyBatches);
  const [search, setSearch] = useState("");

  const filterTypes = ["All", "Ongoing", "Completed", "Upcoming"];

  const filteredBatches = batches
    .filter((batch) =>
      filterTypes[filter] === "All"
        ? true
        : batch.status === filterTypes[filter]
    )
    .filter((batch) =>
      batch.name.toLowerCase().includes(search.toLowerCase())
    );

  const handleEndBatch = (id) => {
    const updated = batches.map((batch) =>
      batch.id === id
        ? { ...batch, status: "Completed", progress: 100 }
        : batch
    );
    setBatches(updated);
  };

  return (
    <MainLayout>
      <BatchHeader />

      <BatchSummary batches={batches} />

      <Stack
        direction={{ xs: "column", md: "row" }}
        spacing={2}
        justifyContent="space-between"
        mb={3}
      >
        <TextField
          label="Search Batch"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Button variant="contained">
          + Create Batch
        </Button>
      </Stack>

      <Tabs
        value={filter}
        onChange={(e, newValue) => setFilter(newValue)}
        sx={{ mb: 3 }}
      >
        <Tab label="All" />
        <Tab label="Ongoing" />
        <Tab label="Completed" />
        <Tab label="Upcoming" />
      </Tabs>

      <Grid container spacing={3}>
        {filteredBatches.map((batch) => (
          <Grid item xs={12} sm={6} md={4} key={batch.id}>
            <BatchCard batch={batch} onEnd={handleEndBatch} />
          </Grid>
        ))}
      </Grid>
    </MainLayout>
  );
};

export default BatchPage;