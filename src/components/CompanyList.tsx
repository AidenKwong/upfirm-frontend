import React, { useState, useEffect } from "react";
import { Pagination, Typography } from "@mui/material";
import styled from "styled-components";
import theme from "../theme";
import { companyCount, companyList } from "../api/backend";

const List = styled.div`
  max-width: 1280px;
  height: 1096px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-top: 64px;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    padding: 64px 8px;
  }
`;

const ListItem = styled.div`
  padding: 8px 0 16px 0;
  height: 96px;
  border-bottom: 1px solid ${theme.colors.secondary};
`;
const ListItemDescription = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-size: 14px;
`;

const CompanyList = () => {
  const [companies, setCompanies] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    (async () => {
      setCompaniesCount(await companyCount());
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const params = {
        params: {
          take: itemsPerPage,
          skip: (page - 1) * itemsPerPage,
          orderBy: {
            posts: {
              _count: "desc",
            },
          },
          include: {
            _count: "employees",
          },
        },
      };
      setCompanies(await companyList(params));
      window.scrollTo(0, 0);
    })();
  }, [page]);

  return (
    <List>
      <div>
        {companies.map((company: any) => {
          return (
            <ListItem key={company.id}>
              <Typography variant="h6" sx={{ fontWeight: "500" }}>
                {company.name}
              </Typography>
              <p>
                {company.city}
                {` - `}
                {company.country}
                {` --- employees: `}
                {company._count.employees}
                {` --- posts: `}
                {company._count.posts}
              </p>
              <ListItemDescription>{company.description}</ListItemDescription>
            </ListItem>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <Pagination
          count={Math.ceil(companiesCount / itemsPerPage)}
          color="primary"
          onChange={(e, page) => {
            setPage(page);
          }}
        />
      </div>
    </List>
  );
};

export default CompanyList;
