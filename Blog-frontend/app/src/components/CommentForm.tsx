import React, { useState } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { login } from '../api/backend';
import { useHistory } from 'react-router-dom';

const CommentForm = () => {
  let history = useHistory();

  const [name, setName] = useState<string>();
  const [body, setBody] = useState<string>();

  const handleSubmit = (e) => {
    e.preventDefault();
    //   try {
    //     //createNewComment(name, body).then((response) => {
    //       console.log('New post was created.');
    //       history.push('/dashboard');
    //     });
    //   } catch (e) {
    //     console.log('There was a problem.');
    //   }
    // };
  };
  return (
    <div className="text-container">
      <div className="text-child">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="post-title" className="text-muted mb-1">
              <small>Name</small>
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
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
              <small>Body</small>
            </label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              name="body"
              id="post-body"
              className="body-content tall-textarea form-control"
              rows={3}
              cols={5}
            ></textarea>
          </div>

          <button className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  );
};
export default CommentForm;
