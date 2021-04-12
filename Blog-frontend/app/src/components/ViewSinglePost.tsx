import React from 'react';
import { ArticleProps } from '../types/main';
import { formatDate } from '../utils/utils';
import ReactMarkdown from 'react-markdown';
import CommentForm from './CommentForm';

const ViewSinglePost = ({ singlePost }: ArticleProps) => {
  return (
    <div className="text-container">
      <div className="text-child">
        <h1 className="article-title mt-5">{singlePost.title}</h1>
        <div className="date-text">{formatDate(singlePost.date)}</div>
        <div>
          {' '}
          <ReactMarkdown source={singlePost.body} />
        </div>
        <CommentForm />
        {singlePost.comments ? (
          <ul className="comment-section">
            {singlePost.comments.map((comment) => (
              <li key={comment.commentId}>
                <div className="font-weight-bold">{comment.author}</div>
                <div>{formatDate(comment.date)}</div>
                <div>{comment.body}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="mt-5">no comments</div>
        )}
      </div>
    </div>
  );
};

export default ViewSinglePost;
