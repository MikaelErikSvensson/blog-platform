import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createNewPost } from '../api/backend';
import { CreatePostProps } from '../types/main';

const CreatePost = ({ user, onCreate }: CreatePostProps) => {
  let history = useHistory();

  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createNewPost(title, body, user.displayName).then((response) => {
        const newPost = response.data;
        console.log(newPost);
        onCreate(newPost);
        console.log('New post was created.');
        history.push('/dashboard');
      });
    } catch (e) {
      console.log('There was a problem.');
    }
  };

  return (
    <div className="text-container">
      <div className="text-child">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-title" className="text-muted mb-1">
              <small>Title</small>
            </label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              name="title"
              id="post-title"
              className="form-control form-control-lg form-control-title"
              type="text"
              placeholder=""
              autoComplete="off"
            />
          </div>
          <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block">
              <small>Content</small>
            </label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              name="body"
              id="post-body"
              className="body-content tall-textarea form-control"
              rows={25}
              cols={10}
            ></textarea>
          </div>

          <button className="btn btn-primary">Save New Post</button>
        </form>
        <button
          className="btn btn-danger mt-3"
          onClick={() => {
            history.push('/dashboard');
          }}
        >
          Go back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
