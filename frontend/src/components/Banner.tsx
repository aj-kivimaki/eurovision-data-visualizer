import { Box } from "@mui/material";

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "url(https://images.unsplash.com/photo-1542732351-fa2c82b0c746?q=80&w=3432&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
        width: "100%",
        height: "500px",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center bottom"
      }}
    >
      Banner
    </Box>
  );
};

export default Banner;
