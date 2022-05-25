import React, { FC } from "react";
import {
  alpha,
  Box,
  Button,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
  border: `1px solid ${alpha(theme.palette.primary.main, 0.4)}`,
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const HomePage: FC = () => {
  return (
    <Box>
      <Box
        sx={{
          padding: "0.5em 1em",
          boxShadow: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "0.5em",
        }}
      >
        <Typography sx={{ color: "primary.main", fontSize: 32 }}>
          upfirm
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
        <Button color="primary" variant="contained">
          Login
        </Button>
      </Box>
      <div></div>
    </Box>
  );
};

export default HomePage;
