import { useEffect, useState, useMemo } from "react";
import {
  Grid,
  Tabs,
  Tab,
  TextField,
  Button,
  Stack,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";

import { toast } from "react-toastify";

import MainLayout from "../layout/MainLayout";
import BatchCard from "../batch/componets/BatchCard";
import BatchSummary from "../batch/componets/BatchSummary";
import CreateBatchDialog from "../batch/componets/CreateBatchDialog";
import EditBatchDialog from "../batch/componets/EditBatchDialog";

import {
  getAllBatches,
  deleteBatch,
} from "../../api/BatchService";

const BatchPage = () => {

  const [batches, setBatches] = useState([]);
  const [filter, setFilter] = useState(0);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const [openCreate, setOpenCreate] = useState(false);
  const [editBatch, setEditBatch] = useState(null);

  // IMPORTANT: Must match backend enum values
  const filterTypes = ["All", "ONGOING", "COMPLETED", "UPCOMING"];

  // ===========================
  // FETCH BATCHES
  // ===========================
  const fetchBatches = async () => {
    try {
      setLoading(true);

      const res = await getAllBatches();

      // Service already returns array safely
      setBatches(Array.isArray(res) ? res : []);

    } catch (err) {
      toast.error("Failed to fetch batches ❌");
      setBatches([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBatches();
  }, []);

  // ===========================
  // DELETE BATCH
  // ===========================
  const handleDelete = async (id) => {
    try {
      await deleteBatch(id);
      toast.success("Batch deleted successfully 🗑");
      fetchBatches();
    } catch {
      toast.error("Delete failed ❌");
    }
  };

  // ===========================
  // FILTER + SEARCH (FIXED VERSION)
  // ===========================
  const filteredBatches = useMemo(() => {

    if (!Array.isArray(batches)) return [];

    const selectedFilter = filterTypes[filter];

    return batches
      .filter((batch) => {
        if (selectedFilter === "All") return true;

        return (batch.status || "")
          .toUpperCase()
          .trim() === selectedFilter;
      })
      .filter((batch) =>
        (batch.name || "")
          .toLowerCase()
          .includes(search.toLowerCase())
      );

  }, [batches, filter, search]);

  return (
    <MainLayout>

      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Box>
          <Typography variant="h4" fontWeight={700}>
            Batch Management
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Manage, monitor and control all academic batches
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          sx={{ borderRadius: 3 }}
          onClick={() => setOpenCreate(true)}
        >
          + Create Batch
        </Button>
      </Stack>

      {/* SUMMARY */}
      <BatchSummary batches={Array.isArray(batches) ? batches : []} />

      {/* SEARCH */}
      <Stack spacing={2} mb={3}>
        <TextField
          label="Search Batch"
          size="small"
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Stack>

      {/* TABS */}
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

      {/* CONTENT */}
      {loading ? (
        <Stack alignItems="center" mt={5}>
          <CircularProgress />
        </Stack>
      ) : (
        <Grid container spacing={3}>
          {filteredBatches.map((batch) => (
            <Grid item xs={12} sm={6} md={4} key={batch.id}>
              <BatchCard
                batch={batch}
                onDelete={handleDelete}
                onEdit={(batch) => setEditBatch(batch)}
              />
            </Grid>
          ))}
        </Grid>
      )}

      {/* CREATE */}
      <CreateBatchDialog
        open={openCreate}
        onClose={() => setOpenCreate(false)}
        onSuccess={() => {
          fetchBatches();
          toast.success("Batch created successfully 🎉");
        }}
      />

      {/* EDIT */}
      <EditBatchDialog
        batch={editBatch}
        onClose={() => setEditBatch(null)}
        onSuccess={() => {
          fetchBatches();
          toast.success("Batch updated successfully ✏");
        }}
      />

    </MainLayout>
  );
};

export default BatchPage;