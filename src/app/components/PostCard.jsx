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
import { getDoc, doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";

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

  const [comments, setComments] = React.useState({});
  const [showAll, setShowAll] = React.useState(false);
  const userName = filterUserForUserName(state, user?.uid);

  if (!state || state.length === 0) return <Loader />;

  const hasUserLiked = (likesArray, postmassage, currUserId) =>
    likesArray?.some((c) => c?.checkMassage === postmassage && c?.userId === currUserId);

  const hasUserLikedLength = (likesArray, likeMassage) =>
    likesArray?.filter((f) => f.checkMassage === likeMassage);

  return (
    <>
      {state.map((D) =>
        D?.Post?.flat()?.map((post, index) => {
          const filteredComments = D?.comments?.filter(
            (c) => c?.checkMassage === post?.massage
          );

          return (
            <Card
              key={D.UserId + index}
              sx={{
                maxWidth: { xs: "95%", sm: 600 },
                margin: "20px auto",
                borderRadius: 3,
                boxShadow: 3,
                bgcolor: "#fff",
                transition: "0.3s",
                ":hover": { boxShadow: 6 },
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
                title={<Typography sx={{ fontWeight: "bold" }}>{D?.userDetails?.[0]?.name || "User"}</Typography>}
                subheader={<Typography variant="caption">October 30 at 7:45 PM</Typography>}
              />

              {/* MESSAGE */}
              <CardContent sx={{ pt: 0 }}>
                <Typography
                  variant="body1"
                  sx={{
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {post?.massage}
                </Typography>
              </CardContent>

              {/* IMAGE */}
              {post?.File && (
                <Box sx={{ px: 2 }}>
                  <PostImage src={post.File} alt={post.massage} />
                </Box>
              )}

              {/* LIKE / COMMENT */}
              <CardActions sx={{ justifyContent: "space-between", px: 2 }}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <IconButton
                    sx={{
                      color: hasUserLiked(D?.likes, post?.massage, user?.uid) ? "blue" : "gray",
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
                  <Typography variant="body2" sx={{ ml: 0.5 }}>
                    {hasUserLikedLength(D.likes, post.massage)?.length || 0} Likes
                  </Typography>
                </Box>
              </CardActions>

              <Divider />

              {/* COMMENTS */}
              <Box sx={{ px: 2, py: 1 }}>
                {filteredComments?.map((c, i) =>
                  showAll || i < 3 ? (
                    <Box
                      key={i}
                      sx={{
                        display: "flex",
                        mb: 1,
                        alignItems: "flex-start",
                      }}
                    >
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }} />
                      <Box
                        sx={{
                          bgcolor: "#f0f2f5",
                          borderRadius: 2,
                          p: 1,
                          width: "100%",
                        }}
                      >
                        <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                          {c?.userNameComment}
                        </Typography>
                        <Typography variant="body2">{c?.comment}</Typography>
                      </Box>
                    </Box>
                  ) : null
                )}

                {!showAll && filteredComments?.length > 3 && (
                  <Button
                    variant="text"
                    onClick={() => setShowAll(true)}
                    sx={{ mt: 1, color: "blue", textTransform: "none" }}
                  >
                    Read more...
                  </Button>
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
                      bgcolor: "#f0f2f5",
                      borderRadius: "20px",
                      px: 2,
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
          );
        })
      )}
    </>
  );
}
