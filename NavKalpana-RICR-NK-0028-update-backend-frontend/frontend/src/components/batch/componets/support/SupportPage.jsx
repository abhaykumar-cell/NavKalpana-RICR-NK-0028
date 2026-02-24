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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import MainLayout from "../../../layout/MainLayout";
import { getSupports } from "../../../../api/supportService";
import SupportReplyDialog from "./components/SupportReplyDialog";

const SupportPage = () => {
  const [supports, setSupports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedSupport, setSelectedSupport] = useState(null);

  /* ===============================
     FETCH SUPPORTS FROM BACKEND
  =============================== */
  const fetchSupports = async () => {
    try {
      setLoading(true);

      const data = await getSupports(); // ✅ backend returns array
        console.log(data);
        
      setSupports(data || []);

    } catch (err) {
      console.error("Error fetching supports:", err);
      setSupports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSupports();
  }, []);

  /* ===============================
     LOCAL SEARCH FILTER
  =============================== */
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
            alignItems={{ xs: "flex-start", md: "center" }}
            flexDirection={{ xs: "column", md: "row" }}
            gap={2}
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
              sx={{
                width: { xs: "100%", md: 280 },
                bgcolor: "#fff",
                borderRadius: 2,
              }}
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
                  <motion.div whileHover={{ scale: 1.03 }}>
                    <Card
                      sx={{
                        borderRadius: 3,
                        boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
                      }}
                    >
                      <CardContent>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          alignItems="center"
                          mb={1}
                        >
                          <Typography variant="h6" fontWeight={700}>
                            {item.topic}
                          </Typography>

                          <Chip
                            label={item.status}
                            color={
                              item.status === "PENDING"
                                ? "warning"
                                : item.status === "IN_PROGRESS"
                                ? "info"
                                : "success"
                            }
                          />
                        </Box>

                        <Typography variant="body2">
                          <b>Student:</b> {item.studentName}
                        </Typography>

                        <Typography variant="body2">
                          <b>Course:</b> {item.courseName}
                        </Typography>

                        <Typography mt={1}>
                          {item.description}
                        </Typography>

                        <Box mt={2}>
                          <Button
                            variant="contained"
                            startIcon={<SupportAgentIcon />}
                            onClick={() => setSelectedSupport(item)}
                          >
                            View & Reply
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>

        {/* DIALOG */}
        {selectedSupport && (
          <SupportReplyDialog
            support={selectedSupport}
            onClose={() => {
              setSelectedSupport(null);
              fetchSupports(); // 🔥 refresh after reply/resolve
            }}
          />
        )}
      </Box>
    </MainLayout>
  );
};

export default SupportPage;