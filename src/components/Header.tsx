import { Button, Modal, Typography, TextField } from "@mui/material";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import theme from "../theme";
import Login from "./auth/Login";
import Register from "./auth/Register";

const Main = styled.div`
  position: fixed;
  width: 100%;
  top: 0;
  z-index: 100;
  background-color: ${theme.palette.primary.main};
  height: 52px;

  @media screen and (max-width: 600px) {
    height: 44px;
  }
`;

const MainContent = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  flex-grow: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (max-width: 600px) {
    padding: 0px 4px;
  }
`;

const ModalBox = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 300px;
  border: 1px solid ${theme.palette.primary.light};
  @media screen and (max-width: 600px) {
    width: 80%;
  }
`;

const RegisterLink = styled.p`
  color: ${theme.palette.primary.main};
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  &:hover {
    color: ${theme.palette.primary.dark};
  }
`;

const Header: FC = () => {
  const [modal, setModal] = useState(false);
  const handleOpen = () => setModal(true);
  const handleClose = () => setModal(false);
  const [isLogin, setIsLogin] = useState<Boolean>(true);

  return (
    <Main>
      <MainContent>
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
      </MainContent>

      <Modal open={modal} onClose={handleClose}>
        {isLogin ? (
          <ModalBox>
            <Login />
            <RegisterLink onClick={() => setIsLogin(false)}>
              Don't have account? Click here to register.
            </RegisterLink>
          </ModalBox>
        ) : (
          <ModalBox>
            <Register />
            <RegisterLink onClick={() => setIsLogin(true)}>
              Already have account? Click here to log in.
            </RegisterLink>
          </ModalBox>
        )}
      </Modal>
    </Main>
  );
};

export default Header;
