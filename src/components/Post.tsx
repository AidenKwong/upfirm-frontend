import { Typography } from "@mui/material";
import moment from "moment";
import React, { useState } from "react";
import SpaceBetween from "../styled-components/SpaceBetween";
import styled from "styled-components";
import { MdOutlineThumbDownAlt, MdOutlineThumbUpAlt } from "react-icons/md";
import theme from "../theme";

const Main = styled.div`
  padding: 8px;
  margin-bottom: 8px;
  background-color: white;
  border-radius: 8px;
`;

const LikeDislikes = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CommentButton = styled.p`
  cursor: pointer;

  :hover {
    text-decoration: underline;
  }
`;

const Comment = styled.div`
  padding: 8px;
  background-color: #ebf2fd;
  border-radius: 8px;
`;

const Post = ({ post }: any) => {
  const [commentList, setCommentList] = useState<Array<any>>([]);

  return (
    <Main>
      <SpaceBetween>
        <p>{post.author.username}</p>
        <p style={{ fontSize: "14px" }}>{moment(post.createdAt).fromNow()}</p>
      </SpaceBetween>
      <Typography variant="h6">{post.title}</Typography>
      <p>{post.content}</p>
      <SpaceBetween
        style={{
          padding: "8px 0",
        }}
      >
        <LikeDislikes>
          <MdOutlineThumbUpAlt
            size={18}
            style={{ verticalAlign: "text-bottom" }}
          />
          {`post.likes`}
          <MdOutlineThumbDownAlt
            size={18}
            style={{ verticalAlign: "text-bottom" }}
          />
          {`post.dislikes`}
        </LikeDislikes>

        <CommentButton
          onClick={() =>
            commentList.length === 0 &&
            setCommentList(post.comments.slice(0, 3))
          }
        >
          {post._count.comments} comments
        </CommentButton>
      </SpaceBetween>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "8px",
        }}
      >
        {commentList.length > 0 && (
          <div
            style={{ margin: "8px 0", borderTop: "2px solid lightgray" }}
          ></div>
        )}
        {commentList.map((comment: any) => {
          return (
            <Comment key={comment.id}>
              <p>{comment.author.username}</p>
              <p>{comment.content}</p>
            </Comment>
          );
        })}
        {commentList.length > 0 &&
          commentList.length < post.comments.length && (
            <CommentButton
              onClick={() =>
                setCommentList([
                  ...commentList,
                  ...post.comments.slice(
                    commentList.length,
                    commentList.length + 5
                  ),
                ])
              }
            >
              show more comments
            </CommentButton>
          )}
      </div>
    </Main>
  );
};

export default Post;
