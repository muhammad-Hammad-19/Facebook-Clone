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
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { styled } from "@mui/material/styles";

import { useAddFriendFuc } from "../context/addFriend";
import { db } from "../firebase/firebse";
import { getAuth } from "firebase/auth";
import {
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";

import Loader from "./Loader";
import { filterUserForUserName } from "../../../utils";

/* 🔹 IMAGE STYLE (UI ONLY) */
const PostImage = styled("img")({
  width: "100%",
  maxHeight: 500,
  objectFit: "cover",
  borderRadius: 12,
  marginTop: 8,
});

export default function FacebookPost() {
  const { state } = useAddFriendFuc();
  const auth = getAuth();
  const user = auth.currentUser;

  /* 🔹 STATES (UNCHANGED) */
  const [comments, setComments] = React.useState({});
  const [showAll, setShowAll] = React.useState(false);
  const userName = filterUserForUserName(state, user?.uid);

  /* 🔹 FUNCTIONS (UNCHANGED) */
  const handleUnLikeToggle = async (unLikeUserData, postId) => {
    const postRef = doc(db, "SignupUsers", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;
    await updateDoc(postRef, { likes: arrayRemove(unLikeUserData) });
  };

  const handleLikeToggle = async (name, userId, postId, check, userName) => {
    const postRef = doc(db, "SignupUsers", postId);
    const postSnap = await getDoc(postRef);
    if (!postSnap.exists()) return;

    const likes = postSnap.data().likes || [];
    const alreadyLiked = likes.find((like) => like.userId === userId);

    if (alreadyLiked) {
      return handleUnLikeToggle(alreadyLiked, postId);
    }

    await updateDoc(postRef, {
      likes: arrayUnion({
        userId,
        user_Name: name,
        read: false,
        checkMassage: check,
        userNameLike: userName,
      }),
    });
  };

  const handleComment = async (D, post) => {
    const text = comments[post.massage];
    if (!text?.trim()) return;

    const postRef = doc(db, "SignupUsers", D.UserId);
    await updateDoc(postRef, {
      comments: arrayUnion({
        userId: user?.uid ?? "",
        userName: D?.userDetails?.[0]?.name ?? "User",
        comment: text,
        checkMassage: post.massage,
        read: false,
        userNameComment: userName,
      }),
    });

    setComments((prev) => ({ ...prev, [post.massage]: "" }));
  };

  const hasUserLiked = (likesArray, postmassage, currUserId) =>
    likesArray?.some(
      (c) => c?.checkMassage === postmassage && c?.userId === currUserId
    );

  const hasUserLikedLength = (likesArray, likeMassage) =>
    likesArray?.filter((f) => f.checkMassage === likeMassage);

  if (!state || state.length === 0) return <Loader />;

  /* 🔹 RENDER (UI POLISHED ONLY) */
  return (
    <>
      {state.map((D) =>
        D?.Post?.flat()?.map((post, index) => (
          <Card
            key={D.UserId + index}
            sx={{
              maxWidth: { xs: "100%", sm: 600 },
              mx: "auto",
              my: 2,
              borderRadius: 4,
              boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 6px 18px rgba(0,0,0,0.2)",
              },
            }}
          >
            <CardHeader
              avatar={<Avatar />}
              action={
                <IconButton>
                  <MoreVertIcon />
                </IconButton>
              }
              title={
                <Typography fontWeight={600}>
                  {D?.userDetails?.[0]?.name}
                </Typography>
              }
              subheader="October 30 · 🌍"
            />

            <CardContent sx={{ pt: 0 }}>
              <Typography sx={{ whiteSpace: "pre-wrap" }}>
                {post?.massage}
              </Typography>
            </CardContent>

            {post?.File && (
              <Box px={2}>
                <PostImage src={post.File} alt="post" />
              </Box>
            )}

            <CardActions sx={{ px: 2 }}>
              <IconButton
                sx={{
                  color: hasUserLiked(D?.likes, post?.massage, user?.uid)
                    ? "#1877F2"
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
                {hasUserLikedLength(D.likes, post.massage)?.length || 0} Likes
              </Typography>
            </CardActions>

            <Divider />

            <Box px={2} py={1}>
              {D?.comments
                .filter((c) => c?.checkMassage === post?.massage)
                .map((c, i) =>
                  showAll || i < 3 ? (
                    <Box key={i} sx={{ display: "flex", mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box sx={{ bgcolor: "#f0f2f5", borderRadius: 3, p: 1 }}>
                        <Typography fontSize={13} fontWeight={600}>
                          {c?.userNameComment}
                        </Typography>
                        <Typography fontSize={13}>{c?.comment}</Typography>
                      </Box>
                    </Box>
                  ) : null
                )}

              {!showAll &&
                D?.comments.filter((c) => c?.checkMassage === post?.massage)
                  .length > 3 && (
                  <Button
                    size="small"
                    onClick={() => setShowAll(true)}
                    sx={{ color: "#1877F2", textTransform: "none" }}
                  >
                    Read more
                  </Button>
                )}

              <Box sx={{ display: "flex", mt: 2, gap: 1 }}>
                <Avatar sx={{ width: 32, height: 32 }} />
                <TextField
                  size="small"
                  fullWidth
                  placeholder="Write a comment..."
                  value={comments[post.massage] || ""}
                  onChange={(e) =>
                    setComments((p) => ({
                      ...p,
                      [post.massage]: e.target.value,
                    }))
                  }
                  sx={{ bgcolor: "#f0f2f5", borderRadius: 5 }}
                />
                <Button
                  onClick={() => handleComment(D, post)}
                  variant="contained"
                  size="small"
                  sx={{ borderRadius: 5, textTransform: "none" }}
                >
                  Post
                </Button>
              </Box>
            </Box>
          </Card>
        ))
      )}
    </>
  );
}
