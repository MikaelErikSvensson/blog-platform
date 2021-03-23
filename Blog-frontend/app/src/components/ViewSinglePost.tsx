import React from 'react';
import { ArticleProps } from '../types/main';
import { formatDate } from '../utils/utils';
import ReactMarkdown from 'react-markdown';

const ViewSinglePost = ({ singlePost }: ArticleProps) => {
  return (
    <div className="text-container">
      <div className="text-child">
        <h1 className="article-title mt-5">{singlePost.title}</h1>
        <div className="date-text">{formatDate(singlePost.date)}</div>
        <div>
          {' '}
          <ReactMarkdown
            source={singlePost.body}
            allowedTypes={['paragraph', 'strong', 'emphasis', 'text', 'heading', 'list', 'listItem']}
          />
        </div>
        {/* <p>{singlePost.body}</p> */}
      </div>
    </div>
  );
};

export default ViewSinglePost;
