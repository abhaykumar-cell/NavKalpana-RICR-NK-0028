import { Box, Typography, Card, CardContent, Avatar } from "@mui/material";

const Profile = () => {
  return (
    <Box sx={{ p: 4 }}>
      <Card sx={{ maxWidth: 600, borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Avatar sx={{ width: 80, height: 80, bgcolor: "#6C63FF" }}>
              T
            </Avatar>

            <Box>
              <Typography variant="h5" fontWeight="700">
                Teacher Name
              </Typography>
              <Typography color="text.secondary">
                Senior Faculty
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;