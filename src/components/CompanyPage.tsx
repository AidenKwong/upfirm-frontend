import { Typography } from "@mui/material";
import React, { useEffect, useState, CSSProperties } from "react";
import { useParams } from "react-router-dom";
import { findCompanyById } from "../api/backend";
import styled from "styled-components";
import SpaceBetween from "../styled-components/SpaceBetween";
import { NavLink, Routes, Route } from "react-router-dom";
import theme from "../theme";
import Posts from "./Posts";
import Jobs from "./Jobs";

const CompanyInfo = styled.div`
  background-color: white;
  margin-bottom: 16px;
  padding: 8px;
`;

const Description = styled.p`
  font-size: 14px;
`;

const WebsiteUrl = styled.a`
  color: gray;
`;

const MainContainer = styled.div`
  display: flex;
  gap: 8px;
`;

const RelatedCompanies = styled.div`
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const isActiveStyle: CSSProperties = {
  color: theme.colors.primary,
  borderBottom: `2px solid ${theme.colors.primary}`,
};

const CompanyPage = () => {
  const { id } = useParams()!;
  const [company, setCompany] = useState<any>();

  useEffect(() => {
    (async () => {
      const data = await findCompanyById(id!);
      setCompany(data);
    })();
  }, [id]);

  return (
    <div>
      {company && (
        <>
          <CompanyInfo>
            <SpaceBetween>
              <Typography variant="h4">{company.name}</Typography>
              <p>
                {company.city} ---- {company.country}
              </p>
            </SpaceBetween>

            <p>{company.industry.name}</p>
            <Description>{company.description}</Description>
            <p>
              {` jobs: `}
              {company._count.jobs}
              {` --- employees: `}
              {company._count.employees}
              {` --- posts: `}
              {company._count.posts}
            </p>
            <WebsiteUrl href={company.websiteUrl}>
              {company.websiteUrl}
            </WebsiteUrl>
            <div style={{ display: "flex", gap: "8px" }}>
              <NavLink
                to="discussion"
                style={({ isActive }) =>
                  isActive
                    ? isActiveStyle
                    : {
                        color: "darkgray",
                      }
                }
              >
                Discussion
              </NavLink>
              <NavLink
                to="jobs"
                style={({ isActive }) =>
                  isActive
                    ? isActiveStyle
                    : {
                        color: "darkgray",
                      }
                }
              >
                Jobs
              </NavLink>
            </div>
          </CompanyInfo>
          <MainContainer>
            <Routes>
              <Route path="discussion" element={<Posts />} />
              <Route path="jobs" element={<Jobs />} />
            </Routes>

            <RelatedCompanies>123</RelatedCompanies>
          </MainContainer>
        </>
      )}
    </div>
  );
};

export default CompanyPage;
