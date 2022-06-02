import Header from "./Header";
import CompanyList from "./CompanyList";
import { Routes, Route } from "react-router-dom";
import styled from "styled-components";

import CompanyPage from "./CompanyPage";

const HeaderPadding = styled.div`
  height: 52px;
  width: 100%;
`;

const MainContainer = styled.div`
  max-width: 1280px;
  height: 1096px;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    padding: 0px 4px;
  }
`;
const HomePage = () => {
  return (
    <div>
      <Header />
      <HeaderPadding />
      <MainContainer>
        <Routes>
          <Route path="/" element={<CompanyList />} />
          <Route path="/company/:id/*" element={<CompanyPage />} />
        </Routes>
      </MainContainer>
    </div>
  );
};

export default HomePage;
