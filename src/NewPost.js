import { useHistory } from 'react-router-dom';
import { format } from 'date-fns';
import { useStoreState, useStoreActions } from 'easy-peasy';
import { useState } from 'react';

const NewPost = () => {
  const history = useHistory();

  const posts = useStoreState((state) => state.posts);
  const postTitle = useStoreState((state) => state.postTitle);
  const postBody = useStoreState((state) => state.postBody);

  const savePost = useStoreActions((actions) => actions.savePost);
  const setPostTitle = useStoreActions((actions) => actions.setPostTitle);
  const setPostBody = useStoreActions((actions) => actions.setPostBody);


  const handleSubmit = (e) => {
    e.preventDefault();
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;
    const datetime = format(new Date(), 'MMMM dd, yyyy pp');
    const newPost = { id, title: postTitle, datetime, body: postBody };

    // const updatedPost = [...localPost, newPost];
    // setLocalPost(updatedPost);
    // localStorage.setItem('postDemo', JSON.stringify(updatedPost));
    savePost(newPost);
    history.push('/');
    setPostTitle('');
    setPostBody('');


    if (localStorage.getItem('posts') == null) {
      const postArray = [];
      postArray.push(newPost);
      localStorage.setItem('posts', JSON.stringify(postArray));
    }
    else {
      const postArray = JSON.parse(localStorage.getItem('posts'));
      postArray.push(newPost);
      localStorage.setItem('posts', JSON.stringify(postArray));
    }
  };

  return (
    <main className="NewPost">
      <h2>New Post</h2>
      <form className="newPostForm" onSubmit={handleSubmit}>
        <label htmlFor="postTitle">Title:</label>
        <input
          id="postTitle"
          type="text"
          required
          value={postTitle}
          onChange={(e) => setPostTitle(e.target.value)}
        />
        <label htmlFor="postBody">Post:</label>
        <textarea
          id="postBody"
          required
          value={postBody}
          onChange={(e) => setPostBody(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </main>
  );
};

export default NewPost;