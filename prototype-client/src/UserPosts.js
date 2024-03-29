import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";

//Component
import PostCp from "./Posting";

//Atom
import stateUpdateAtom from "./store/stateUpdateAtom";

const UserPosts = () => {
  const [posts, setPosts] = useState([]);

  const contentUpdate = useRecoilValue(stateUpdateAtom("contentUpdate"));

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/page/render-posts/");

        setPosts((prev) => [...response.data]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, [contentUpdate]);

  if (posts) {
    return (
      <>
        {posts.map((post) => {
          return <PostCp post={post} key={post.id} />;
        })}
      </>
    );
  }
};

export default UserPosts;
