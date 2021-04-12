import React, { useEffect, useState } from 'react';
import './App.css';
import { Post, User } from './types/main';
import { BrowserRouter as Router, Link, Switch, Route, useHistory, Redirect } from 'react-router-dom';
import About from './components/About';
import TopPost from './components/TopPost';
import Login from './components/Login';
import { formatDate, formatTag } from './utils/utils';
import ViewSinglePost from './components/ViewSinglePost';
import Loading from './components/Loading';
import Dashboard from './components/Dashboard';
import Archive from './components/Archive';
import { deletePost, getPosts } from './api/backend';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';
import ReactMarkdown from 'react-markdown';
import HeaderLoggedOut from './components/HeaderLoggedOut';
import HeaderLoggedIn from './components/HeaderLoggedIn';
import Footer from './components/Footer';

function App() {
  const [posts, setPosts] = useState<Array<Post>>();
  const [singlePost, setSinglePost] = useState<Post>();
  const [titleUrl, setTitleUrl] = useState<string>();
  const [user, setUser] = useState<User>();
  const [loggedIn, setLoggedIn] = useState(false);

  let history = useHistory();

  useEffect(() => {
    getPosts().then((response) => {
      console.log(response.data);
      setPosts(response.data);
    });
  }, []);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('jwt');
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      setUser(foundUser);
      setLoggedIn(true);
    }
  }, []);

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

  const handleCreate = (newPost: Post) => {
    console.log(newPost);
    try {
      const newPosts = [newPost, ...posts];
      console.log(newPosts);
      setPosts(newPosts);
      console.log('Post was successfully added.');
    } catch (e) {
      console.log('A problem occurred.');
    }
  };

  const handleEdit = (newPost: Post) => {
    console.log(newPost);
    try {
      const newPosts = [newPost, ...posts];
      console.log(newPosts);
      setPosts(newPosts);
      console.log('Post was successfully added.');
    } catch (e) {
      console.log('A problem occurred.');
    }
  };

  const handleLogin = (newUser: User) => {
    console.log(newUser);
    setUser(newUser);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    console.log('Log out attempt');
    localStorage.removeItem('jwt');
    setUser(undefined);
    setLoggedIn(false);
  };

  if (posts !== undefined)
    return (
      <Router>
        {user == undefined ? <HeaderLoggedOut /> : <HeaderLoggedIn onLogout={handleLogout} />}
        <Switch>
          <Route exact path="/">
            <div className="text-container">
              <div className="text-child">
                <ul>
                  {posts.map((post) => (
                    <li key={post.id}>
                      <div className="homepage-title mt-5">
                        <Link
                          to={`/${post.urlSlug}`}
                          onClick={() => {
                            setSinglePost(post);
                            setTitleUrl(post.urlSlug);
                          }}
                        >
                          {post.title}
                        </Link>
                      </div>
                      <div className="date-text">
                        by {post.author} on {formatDate(post.date)}
                      </div>
                      <Link
                        to={`/${post.urlSlug}`}
                        onClick={() => {
                          setSinglePost(post);
                          setTitleUrl(post.urlSlug);
                        }}
                      >
                        <div>
                          <ReactMarkdown source={post.summary + '...'} />
                        </div>
                      </Link>
                      <div>
                        {post.tags.map((tag) => (
                          <span className="tag">{formatTag(tag.tagName)} </span>
                        ))}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Route>
          <Route exact path="/top_posts" component={TopPost} />
          <Route exact path="/about" component={About} />
          <Route exact path="/archive" component={Archive} />

          <Route exact path="/login" component={Login}>
            <Login onLogin={handleLogin} />
          </Route>
          <Route exact path="/dashboard">
            {loggedIn ? (
              <Dashboard
                user={user}
                onChangeSinglePost={(onChangeSinglePost: any) => {
                  setSinglePost(onChangeSinglePost);
                  setTitleUrl(onChangeSinglePost.urlSlug);
                }}
              />
            ) : (
              <Redirect to="/" />
            )}
          </Route>
          <Route exact path="/create_post">
            {loggedIn ? <CreatePost user={user} onCreate={handleCreate} /> : <Redirect to="/" />}
          </Route>
          <Route exact path="/edit_post">
            {loggedIn ? <EditPost singlePost={singlePost} onEdit={handleEdit} /> : <Redirect to="/" />}
          </Route>
          <Route exact path={`/${titleUrl}`}>
            <ViewSinglePost singlePost={singlePost} />
          </Route>
        </Switch>
        <Footer />
      </Router>
    );
  else return <Loading />;
}

export default App;
