import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { findPosts } from "../api/backend";
import Post from "./Post";

const Lists = styled.div`
  display: flex;
  flex-direction: column;
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
            comments: {
              include: {
                author: true,
              },
            },
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
          return <Post key={post.id} post={post} />;
        })}
    </Lists>
  );
};

export default Posts;
