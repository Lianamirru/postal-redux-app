import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { UsersList } from "./components/users/UsersList";
import { UserProfile } from "./components/users/UserProfile";
import { PostsList } from "./components/posts/PostsList";
import { PostPage } from "./components/posts/SinglePostPage";
import EditPostForm from "./components/posts/EditPostForm";
import { AddPostForm } from "./components/posts/AddPostForm";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Layout />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=":userId" element={<UserProfile />} />
          </Route>

          <Route path="posts">
            <Route index element={<PostsList />} />
            <Route path=":postId" element={<PostPage />} />
            <Route path="new" element={<AddPostForm />} />
            <Route path="edit">
              <Route path=":postId" element={<EditPostForm />} />
            </Route>
          </Route>
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
