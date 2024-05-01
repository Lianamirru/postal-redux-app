import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

import { Layout } from "./components/Layout";
import { UsersList } from "./features/users/UsersList";
import { UserProfile } from "./features/users/UserProfile";
import { PostsList } from "./features/posts/PostsList";
// import { SinglePostPage } from "./features/posts/SinglePostPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/">
          <Route index element={<Layout />} />

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path="/users/:userId" element={<UserProfile />} />
          </Route>

          <Route path="posts">
            <Route index element={<PostsList />} />
            {/* <Route path=":postId" element={<SinglePostPage />} /> */}
          </Route>
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
