import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createNewPost, editPost } from '../api/backend';
import { EditPostProps } from '../types/main';
import Loading from './Loading';

const EditPost = ({ user, singlePost, onEdit }: EditPostProps) => {
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState<string>();

  let history = useHistory();

  useEffect(() => {
    try {
      setTitle(singlePost.title);
      setBody(singlePost.body);
    } catch (error) {
      console.log('no post was selected. Redirecting to home.');
      history.push('/');
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      editPost(title, body, user.displayName, singlePost.id).then((response) => {
        const newPost = response.data;
        console.log(newPost);
        onEdit(newPost);
        history.push('/dashboard');
      });
      console.log('New post was created.');
    } catch (e) {
      console.log('There was a problem.');
    }
  };

  if (title !== undefined && body !== undefined)
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
                defaultValue={title}
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
                defaultValue={body}
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
  else return <Loading />;
};

export default EditPost;
