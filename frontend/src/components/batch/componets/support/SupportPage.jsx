import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  InputAdornment,
  Chip,
  Button,
  CircularProgress,
  Stack,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CloseIcon from "@mui/icons-material/Close";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import MainLayout from "../../../layout/MainLayout";
import {
  getSupports,
  deleteSupport,
} from "../../../../api/supportService";
import SupportReplyDialog from "./components/SupportReplyDialog";

const SupportPage = () => {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSupport, setSelectedSupport] = useState(null);
  const [deleteId, setDeleteId] = useState(null);

  /* ===============================
     FETCH SUPPORTS
  =============================== */
  const fetchSupports = async () => {
    try {
      setLoading(true);
      const data = await getSupports();
      setSupports(data || []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load supports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  /* ===============================
     HANDLE DELETE
  =============================== */
  const handleDelete = async () => {
    try {
      await deleteSupport(deleteId);
      toast.success("Support deleted successfully");
      setDeleteId(null);
      fetchSupports();
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const filteredSupports = supports.filter((item) =>
    item.topic?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <Box
        sx={{
          minHeight: "calc(100vh - 64px)",
          background:
            "linear-gradient(120deg,#eef2ff 0%,#f8fafc 40%,#ecfeff 100%)",
          pt: 4,
        }}
      >
        <Container maxWidth="lg">

          {/* HEADER */}
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            mb={4}
          >
            <Typography variant="h4" fontWeight={800}>
              Support Requests
            </Typography>

            <TextField
              size="small"
              placeholder="Search by topic..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              sx={{ width: 280, bgcolor: "#fff", borderRadius: 2 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* LOADING */}
          {loading ? (
            <Box display="flex" justifyContent="center" mt={6}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredSupports.map((item) => (
                <Grid item xs={12} md={6} key={item.id}>
                  <motion.div whileHover={{ scale: 1.02 }}>
                    <Card sx={{ borderRadius: 3 }}>
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                        >
                          <Typography variant="h6" fontWeight={700}>
                            {item.topic}
                          </Typography>

                          {/* SMALL CROSS ICON */}
                          <IconButton
                            size="small"
                            color="primary"
                            onClick={() => setDeleteId(item.id)}
                          >
                            <CloseIcon fontSize="small" />
                          </IconButton>
                        </Box>

                        <Chip
                          label={item.status}
                          color={
                            item.status === "PENDING"
                              ? "warning"
                              : item.status === "IN_PROGRESS"
                              ? "info"
                              : "success"
                          }
                          sx={{ mt: 1 }}
                        />

                        <Typography mt={2}>
                          <b>Student:</b> {item.studentName}
                        </Typography>

                        <Typography>
                          <b>Course:</b> {item.courseName}
                        </Typography>

                        <Typography mt={1}>
                          {item.description}
                        </Typography>

                        <Stack direction="row" spacing={2} mt={3}>
                          <Button
                            size="small"
                            variant="contained"
                            startIcon={<SupportAgentIcon />}
                            onClick={() => setSelectedSupport(item)}
                          >
                            View & Reply
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        {/* REPLY DIALOG */}
        {selectedSupport && (
          <SupportReplyDialog
            support={selectedSupport}
            onClose={() => {
              setSelectedSupport(null);
              fetchSupports();
            }}
          />
        )}

        {/* DELETE CONFIRMATION DIALOG */}
        <Dialog open={Boolean(deleteId)} onClose={() => setDeleteId(null)}>
          <DialogTitle>Delete Support?</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this support request?
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteId(null)}>Cancel</Button>
            <Button
              variant="contained"
              color="error"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </MainLayout>
  );
};

export default SupportPage;