import React from "react";

import IgPost from "../igpost/igpost";

export function renderMultiplePosts(posts, searchValue) {
  let listOfIgPosts = [];
  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const preString = post.author.substring(0, searchValue.length);
    const stringMatched = preString === searchValue;
    if (stringMatched) {
      listOfIgPosts.push(
        <IgPost
          author={post.author}
          description={post.description}
          update_date={post.update_date}
          img_path={post.img_path}
          key={i}
        />
      );
    }
  }
  return listOfIgPosts;
}
