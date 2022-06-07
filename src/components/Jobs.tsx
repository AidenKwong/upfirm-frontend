import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { findJobs } from "../api/backend";

const List = styled.div`
  display: flex;
  flex-direction: column;
`;

const Job = styled.div`
  background-color: white;
  margin-bottom: 8px;
  padding: 8px;
`;

const Jobs = () => {
  const { id } = useParams()!;
  const [jobs, setJobs] = useState<any>();

  useEffect(() => {
    (async () => {
      const params = {
        params: {
          take: 10,
          skip: 0,
          where: {
            companyId: id,
          },
          select: {
            id: true,
            title: true,
            description: true,
            salary: true,
            startDate: true,
            endDate: true,
          },
        },
      };
      const data = await findJobs(params);
      setJobs(data);
    })();
  }, [id]);

  return (
    <List>
      {jobs &&
        jobs.map((job: any) => {
          return (
            <Job key={job.id}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "16px",
                }}
              >
                <Typography variant="h6">{job.title}</Typography>
              </div>
              <p>${job.salary}</p>
              <p>
                {new Date(job.startDate).toLocaleDateString()}
                {` --- `}
                {new Date(job.endDate).toLocaleDateString()}
              </p>
              <p>{`job.rating`}</p>
              <p>{job.description}</p>
            </Job>
          );
        })}
    </List>
  );
};

export default Jobs;
