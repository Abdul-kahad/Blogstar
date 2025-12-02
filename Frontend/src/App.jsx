import Layout from "./HOC/Layout/Layout"
import { Routes, Route } from "react-router-dom"
import Homepage from './Pages/Homepage/Homepage.jsx'
import LoginPage from "./Pages/LoginPage/LoginPage.jsx"
import RegisterPage from "./Pages/RegisterPage/RegisterPage.jsx"
import Profile from "./Pages/ProfilePage/Profile.jsx"
import Admin from "./Pages/AdminPage/Admin.jsx"
import CreateBlogPage from "./Pages/CreateBlogPage/CreateBlogPage.jsx"
import UpdateBlogPage from "./Pages/UpdateBlogPage/UpdateBlogPage.jsx"

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/blogstar" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin/dashboard" element={<Admin />} />
        <Route path="/me/createblog" element={<CreateBlogPage />} />
        <Route path="/me/updateblog/:blogId" element={<UpdateBlogPage />} />

      </Routes>
    </Layout>
  );
}

export default App;
