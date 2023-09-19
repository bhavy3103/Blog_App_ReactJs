import Header from './Header';
import Nav from './Nav';
import Footer from './Footer';
import Home from './Home';
import NewPost from './NewPost';
import PostPage from './PostPage';
import EditPost from './EditPost';
import About from './About';
import Missing from './Missing';
import { Route, Switch, useHistory } from 'react-router-dom';
import { useStoreActions } from 'easy-peasy';
// this will remain if we don't use DataContext
import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from './api/posts';
import useWindowSize from './hooks/useWindowSize';
import useAxiosFetch from './hooks/useAxiosFetch';
// till here
// import { DataProvider } from './context/DataContext';


function App() {

  const setPosts = useStoreActions((actions) => actions.setPosts);
  const { data, fetchError, isLoading } = useAxiosFetch('http://localhost:3500/posts');

  useEffect(() => {
    setPosts(data);
  }, [data])

  return (
    <div className="App">
      <Header title="React JS Blog" />
      {/* <DataProvider> */}
      <Nav />
      <Switch>
        <Route exact path="/" >
          <Home
            isLoading={isLoading}
            fetchError={fetchError}
          />
        </Route>
        <Route exact path="/post" component={NewPost} />
        <Route path="/edit/:id" component={EditPost} />
        <Route path="/post/:id" component={PostPage} />
        <Route path="/about" component={About} />
        <Route path="*" component={Missing} />
      </Switch>
      {/* </DataProvider> */}
      <Footer />
    </div>
  );
}

export default App;