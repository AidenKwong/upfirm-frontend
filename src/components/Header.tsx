import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";

const Header: FC = () => {
  return (
    <Box
      sx={{
        boxShadow: 1,
        position: "fixed",
        top: 0,
        width: "100%",
        zIndex: 100,
        backgroundColor: "primary.main",
      }}
    >
      <Box
        sx={{
          padding: "2px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5em",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Typography sx={{ color: "secondary.main", fontSize: 32 }}>
          upfirm
        </Typography>
        <Button
          color="secondary"
          variant="contained"
          // sx={{ backgroundColor: "white" }}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
