import React, { FC, useState, useEffect } from "react";
import { Pagination, Stack, Typography } from "@mui/material";
import Header from "./Header";
import axios from "axios";
import styled from "styled-components";
import theme from "../theme";

const ListItem = styled.div`
  padding: 0.75rem 0;
  height: 96px;
  border-bottom: 1px solid ${theme.colors.secondary};
`;
const ListItemDescription = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const HomePage: FC = () => {
  const [companies, setCompanies] = useState([]);
  const [companiesCount, setCompaniesCount] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8080/company/count");
      setCompaniesCount(data);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("http://localhost:8080/company", {
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
      });
      console.log(data);
      setCompanies(data);
    })();
  }, [page]);

  return (
    <div>
      <Header />
      <div
        style={{
          maxWidth: 1280,
          height: 1096,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          paddingTop: "64px",
          margin: "0 auto",
        }}
      >
        <div>
          {companies.map((company: any) => {
            return (
              <ListItem key={company.id}>
                <Typography variant="h5">{company.name}</Typography>
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
            padding: "1em",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Stack spacing={2}>
            <Pagination
              count={Math.ceil(companiesCount / itemsPerPage)}
              color="primary"
              onChange={(e, page) => {
                setPage(page);
              }}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
