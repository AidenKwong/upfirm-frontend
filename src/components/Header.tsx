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
      }}
    >
      <Box
        sx={{
          padding: "0.5em 1em",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5em",
          maxWidth: 1280,
          margin: "0 auto",
          backgroundColor: "white",
        }}
      >
        <Typography sx={{ color: "primary.main", fontSize: 32 }}>
          upfirm
        </Typography>
        <Button color="primary" variant="contained">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
