import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { createNewPost, createNewTag, getTagsBySearch } from '../api/backend';
import { CreatePostProps, Tag } from '../types/main';
import NewTagModal from './NewTagModal';

const CreatePost = ({ user, onCreate }: CreatePostProps) => {
  const [tagWindowShow, setTagWindowShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const [title, setTitle] = useState<string>();
  const [body, setBody] = useState(``);
  const [tags, setTags] = useState<Tag[]>([]);
  const [searchResults, setSearchResults] = useState<Tag[]>();

  let history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      createNewPost(title, body, user.displayName, tags).then((response) => {
        const newPost = response.data;
        onCreate(newPost);
        console.log('New post was created.');
        history.push('/dashboard');
        setTagWindowShow(false);
        setTags([]);
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
            <label htmlFor="post-title" className="text-muted mb-1"></label>
            <input
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              name="title"
              id="post-title"
              className="form-control form-control-lg form-control-title"
              type="text"
              placeholder="Title here..."
              autoComplete="off"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              tagWindowShow ? setTagWindowShow(false) : setTagWindowShow(true);
            }}
            className="btn btn-success mb-2"
          >
            Add Tags
          </button>
          {tagWindowShow ? (
            <div>
              <input
                onChange={(e) => {
                  e.preventDefault();
                  getTagsBySearch(e.target.value).then((response) => {
                    setSearchResults(response.data);
                  });
                }}
                id="search"
                className="form-control form-control-lg form-control-title"
                type="search"
                placeholder="Search for a tag..."
                autoComplete="off"
              />
              {tags ? (
                <ul className="mt-3">
                  {tags.map((tag) => (
                    <li className="item-chosen" key={tag.tagId}>
                      <button
                        type="button"
                        className="tag-chosen"
                        onClick={() => {
                          const newTagList = tags.filter((item) => item.tagId !== tag.tagId);
                          setTags(newTagList);
                        }}
                      >
                        {tag.tagName}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div></div>
              )}
              {searchResults ? (
                <ul className="mt-3 mb-5">
                  {searchResults.map((tag) => (
                    <li key={tag.tagId}>
                      <button
                        type="button"
                        className="tag-item"
                        onClick={() => {
                          if (!tags.find((item) => item.tagId == tag.tagId)) setTags([...tags, tag]);
                        }}
                      >
                        {tag.tagName}
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                <div></div>
              )}
              <button
                className="btn btn-success mb-2"
                type="button"
                onClick={() => {
                  setModalShow(true);
                }}
              >
                Create new tag
              </button>
              <NewTagModal show={modalShow} onHide={() => setModalShow(false)} />
            </div>
          ) : (
            <div></div>
          )}
          <div className="form-group">
            <label htmlFor="post-body" className="text-muted mb-1 d-block"></label>
            <textarea
              onChange={(e) => setBody(e.target.value)}
              name="body"
              id="post-body"
              className="body-content tall-textarea form-control"
              placeholder="Post here..."
              rows={25}
              cols={10}
            ></textarea>
          </div>
          <button className="btn btn-primary">Save Post</button>
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
