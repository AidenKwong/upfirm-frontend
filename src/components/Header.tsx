import { Box, Button, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

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
        height: [44, 52],
      }}
    >
      <Box
        sx={{
          padding: ["0px 16px", "2px 16px"],
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5em",
          maxWidth: 1280,
          margin: "0 auto",
        }}
      >
        <Link to="/">
          <Typography sx={{ color: "white", fontSize: [30, 32] }}>
            upfirm
          </Typography>
        </Link>

        <Button color="secondary" variant="contained" size="small">
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
