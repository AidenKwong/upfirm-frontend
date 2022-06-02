import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { findPosts } from "../api/backend";
import SpaceBetween from "../styled-components/SpaceBetween";
import moment from "moment";

const Lists = styled.div`
  display: flex;
  flex-direction: column;
`;

const Post = styled.div`
  padding: 8px 0 16px 0px;
  background-color: white;
  margin-bottom: 8px;
  padding: 8px;
`;
const Posts = () => {
  const { id } = useParams()!;
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    (async () => {
      const params = {
        params: {
          take: 10,
          skip: 0,
          where: {
            companyId: id,
          },
          orderBy: {
            createdAt: "desc",
          },
          include: {
            author: true,
            _count: true,
          },
        },
      };
      const data = await findPosts(params);
      setPosts(data);
    })();
  }, [id]);

  return (
    <Lists>
      {posts &&
        posts.map((post: any) => {
          return (
            <Post key={post.id}>
              <SpaceBetween>
                <p>{post.author.username}</p>
                <p style={{ fontSize: "14px" }}>
                  {moment(post.createdAt).fromNow()}
                </p>
              </SpaceBetween>
              <Typography variant="h6">{post.title}</Typography>

              <p>{post.content}</p>
              <SpaceBetween>
                <div>Like</div> <p>{post._count.comments} comments</p>
              </SpaceBetween>
            </Post>
          );
        })}
    </Lists>
  );
};

export default Posts;
