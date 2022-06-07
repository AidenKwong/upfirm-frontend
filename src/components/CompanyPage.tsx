import { Typography } from "@mui/material";
import React, { useEffect, useState, CSSProperties } from "react";
import { Link, useParams } from "react-router-dom";
import { companyList, findCompanyById } from "../api/backend";
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
  padding: 8px;
  height: min-content;
  background-color: white;
  flex-shrink: 2;
  width: 380px;
  @media screen and (max-width: 600px) {
    display: none;
  }
`;

const RelatedCompany = styled.div`
  padding: 8px 0 16px 8px;
  height: 96px;
  color: black;
  border-bottom: 2px solid ${theme.colors.secondary};
  :hover {
    background-color: rgb(240, 240, 240);
  }
`;

const RelatedCompaniesDescription = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const isActiveStyle: CSSProperties = {
  color: theme.colors.primary,
  borderBottom: `2px solid ${theme.colors.primary}`,
};

function shuffle(array: Array<any>) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
}

const CompanyPage = () => {
  const { id } = useParams()!;
  const [company, setCompany] = useState<any>();
  const [relatedCompanies, setRelatedCompanies] = useState<Array<any>>([]);

  useEffect(() => {
    (async () => {
      const data = await findCompanyById(id!);
      setCompany(data);
    })();
  }, [id]);

  useEffect(() => {
    company &&
      (async () => {
        const params = {
          params: {
            take: 5,
            skip: 0,
            where: {
              industryId: company.industryId,
            },
          },
        };
        const data = await companyList(params);
        setRelatedCompanies(
          shuffle(data.filter((c: any) => c.id !== company.id))
        );
      })();
  }, [company]);

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
            <div style={{ width: 900 }}>
              <Routes>
                <Route path="discussion" element={<Posts />} />
                <Route path="jobs" element={<Jobs />} />
              </Routes>
            </div>

            <RelatedCompanies>
              <Typography variant="h6">Related companies</Typography>
              {relatedCompanies.map((company: any) => {
                return (
                  <Link
                    to={`/company/${company.id}/discussion`}
                    key={company.id}
                  >
                    <RelatedCompany>
                      <Typography variant="h6" key={company.id}>
                        {company.name}
                      </Typography>
                      <p>
                        {company.city}
                        {` - `}
                        {company.country}
                      </p>
                      <RelatedCompaniesDescription>
                        {company.description}
                      </RelatedCompaniesDescription>
                    </RelatedCompany>
                  </Link>
                );
              })}
            </RelatedCompanies>
          </MainContainer>
        </>
      )}
    </div>
  );
};

export default CompanyPage;
