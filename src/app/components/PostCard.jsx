"use client";
import * as React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

import { useAddFriendFuc } from "../context/addFriend";
import { db } from "../firebase/firebse";
import { getAuth } from "firebase/auth";
import { getDoc, doc, updateDoc, arrayUnion } from "firebase/firestore";

import Loader from "./Loader";
import { filterUserForUserName } from "../../../utils";

const PostImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxHeight: 500,
  objectFit: "cover",
  borderRadius: theme.shape.borderRadius,
  marginTop: theme.spacing(1),
}));

export default function FacebookPost() {
  const { state } = useAddFriendFuc();
  const auth = getAuth();
  const user = auth.currentUser;

  // 🔹 COMMENTS STATE (ONE INPUT PER POST)
  const [comments, setComments] = React.useState({});

  const userName = filterUserForUserName(state, user?.uid);

  // --------------------------- LIKE ----------------------------
  const handleLikeToggle = async (name, userId, postId, check, userName) => {
    const postRef = doc(db, "SignupUsers", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const likeObj = {
      userId,
      user_Name: name,
      read: false,
      checkMassage: check,
      userNameLike: userName,
    };

    await updateDoc(postRef, {
      likes: arrayUnion(likeObj),
    });
  };

  // --------------------------- COMMENT SEND ----------------------------
  const handleComment = async (D, post) => {
    const text = comments[post.massage];
    if (!text?.trim()) return;

    const postRef = doc(db, "SignupUsers", D.UserId);

    const commentObj = {
      userId: user?.uid ?? "",
      userName: D?.userDetails?.[0]?.name ?? "User",
      comment: text,
      checkMassage: post.massage,
      read: false,
      userNameComment: userName,
    };

    await updateDoc(postRef, {
      comments: arrayUnion(commentObj),
    });

    // clear only this post input
    setComments((prev) => ({
      ...prev,
      [post.massage]: "",
    }));
  };

  const hasUserLiked = (likesArray, postmassage, currUserId) =>
    likesArray?.some(
      (c) => c?.checkMassage === postmassage && c?.userId === currUserId
    );

  const hasUserLikedLength = (likesArray, likeMassage) =>
    likesArray?.filter((f) => f.checkMassage === likeMassage);

  // --------------------------- LOADING ----------------------------
  if (!state || state.length === 0) {
    return <Loader />;
  }

  // --------------------------- RENDER ----------------------------
  return (
    <>
      {state.map((D) =>
        D?.Post?.flat()?.map((post, index) => (
          <Card
            key={D.UserId + index}
            sx={{
              maxWidth: 600,
              margin: "20px auto",
              borderRadius: 3,
              boxShadow: 2,
              backgroundColor: "#fff",
            }}
          >
            {/* HEADER */}
            <CardHeader
              avatar={<Avatar />}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography sx={{ fontWeight: "bold" }}>
                  {D?.userDetails?.[0]?.name || "User"}
                </Typography>
              }
              subheader="October 30 at 7:45 PM"
            />

            {/* MESSAGE */}
            <CardContent sx={{ pt: 0 }}>
              <Typography variant="body1">{post?.massage}</Typography>
            </CardContent>

            {/* IMAGE */}
            {post?.File && (
              <Box sx={{ px: 2 }}>
                <PostImage src={post.File} alt={post.massage} />
              </Box>
            )}

            {/* LIKE / COMMENT / SHARE */}
            <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  sx={{
                    color: hasUserLiked(D?.likes, post?.massage, user?.uid)
                      ? "blue"
                      : "gray",
                  }}
                  onClick={() =>
                    handleLikeToggle(
                      D?.userDetails?.[0]?.name,
                      user?.uid,
                      D?.UserId,
                      post?.massage,
                      userName
                    )
                  }
                >
                  <ThumbUpIcon />
                </IconButton>

                <Typography variant="body2">
                  Like {hasUserLikedLength(D.likes, post.massage)?.length || 0}
                </Typography>
              </Box>
            </CardActions>

            <Divider />

            {/* COMMENTS LIST */}
            <Box sx={{ px: 2, py: 1 }}>
              {D?.comments?.map((c, i) =>
                c?.checkMassage === post?.massage ? (
                  <Box key={i} sx={{ display: "flex", mb: 1 }}>
                    <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                    <Box
                      sx={{ backgroundColor: "#f0f2f5", borderRadius: 2, p: 1 }}
                    >
                      <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                        {c?.userNameComment}
                      </Typography>
                      <Typography variant="body2">{c?.comment}</Typography>
                    </Box>
                  </Box>
                ) : null
              )}

              {/* COMMENT INPUT */}
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar sx={{ width: 32, height: 32, mr: 1 }} />

                <TextField
                  size="small"
                  fullWidth
                  placeholder="Write a comment..."
                  value={comments[post.massage] || ""}
                  onChange={(e) =>
                    setComments((prev) => ({
                      ...prev,
                      [post.massage]: e.target.value,
                    }))
                  }
                  sx={{
                    backgroundColor: "#f0f2f5",
                    borderRadius: "20px",
                  }}
                />

                <Button
                  onClick={() => handleComment(D, post)}
                  variant="contained"
                  size="small"
                  sx={{ ml: 1, textTransform: "none" }}
                >
                  Post
                </Button>
              </Box>
            </Box>

            <Divider />
          </Card>
        ))
      )}
    </>
  );
}
