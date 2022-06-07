import { Box, Button, Modal, Typography } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Header: FC = () => {
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);

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

        <Button
          color="secondary"
          variant="contained"
          size="small"
          onClick={handleOpen}
        >
          Login
        </Button>
        <Modal open={modal} onClose={handleClose}>
          <Box sx={style}>123</Box>
        </Modal>
      </Box>
    </Box>
  );
};

export default Header;
