import React, { useEffect, useState } from 'react';
import { DashboardProps, Post, User } from '../types/main';
import { formatDate } from '../utils/utils';
import { Link, useHistory } from 'react-router-dom';
import { deletePost, getPostsByAuthor } from '../api/backend';
import { FaTrash, FaEdit } from 'react-icons/fa';
import ReactMarkdown from 'react-markdown';
import Loading from './Loading';

const Dashboard = ({ user, onChangeSinglePost }: DashboardProps) => {
  const [posts, setPosts] = useState<Array<Post>>();

  let history = useHistory();

  useEffect(() => {
    console.log(user);
    getPostsByAuthor(user.displayName).then((response) => {
      setPosts(response.data);
    });
  }, []);

  const handleEdit = () => {
    history.push('/edit_post');
  };

  const handleDelete = (id: number) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this post?');
    if (confirmDelete) {
      try {
        deletePost(id).then(() => {
          const newPosts = posts.filter((x: any) => x.id !== id);
          setPosts(newPosts);
        });
        console.log('Post was successfully deleted.');
      } catch (e) {
        console.log('A problem occurred.');
      }
    }
  };

  if (posts !== undefined)
    return (
      <div className="text-container">
        <div className="text-child">
          <nav className="navbar">
            <form className="form-inline">
              <div className="col-xs-4">
                <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button className="btn btn-success my-2 my-sm-0" type="submit">
                  Search
                </button>
              </div>
            </form>
            <button
              className="btn btn-success my-2 my-sm-0"
              type="submit"
              onClick={() => {
                history.push('/create_post');
              }}
            >
              Create New Post
            </button>
          </nav>
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <div>
                  <div>
                    <Link
                      to={`/${post.urlSlug}`}
                      onClick={() => {
                        onChangeSinglePost(post);
                      }}
                    >
                      <div className="dashboard-title mt-5">{post.title}</div>
                    </Link>
                    <span className="date-text">
                      {formatDate(post.date)}{' '}
                      <Link
                        to="/edit_post"
                        title="Edit Post"
                        className="mr-2 ml-2"
                        type="submit"
                        onClick={() => {
                          handleEdit();
                          onChangeSinglePost(post);
                        }}
                      >
                        <FaEdit size={20} color="#0275d8" />
                      </Link>
                      <Link
                        to="#"
                        title="Remove Post"
                        className=""
                        type="submit"
                        onClick={() => {
                          handleDelete(post.id);
                        }}
                      >
                        <FaTrash size={20} color="#d9534f" />
                      </Link>
                    </span>
                    <Link
                      to={`/${post.urlSlug}`}
                      onClick={() => {
                        onChangeSinglePost(post);
                      }}
                    >
                      <div>
                        <ReactMarkdown
                          source={post.summary + '...'}
                          allowedTypes={['paragraph', 'strong', 'emphasis', 'text', 'heading', 'list', 'listItem']}
                        />
                      </div>
                    </Link>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  else return <Loading />;
};

export default Dashboard;
