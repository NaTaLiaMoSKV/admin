import { useDispatch } from "react-redux";
import "./components/TextExample";
import LoginPage from "pages/LoginPage";
import HomePage from "pages/HomePage/HomePage";
import NotFoundPage from "pages/NotFoundPage";
import CoursePage from "pages/CoursePage";
import CoursesPage from "pages/CoursesPage";
import ThemePage from "pages/ThemePage";
import GroupsPage from "pages/GroupsPage";
import GroupPage from "pages/GroupPage";
import LessonPage from "pages/LessonPage";
import Layout from "pages/Layout";
import ProtectedRoute from "components/ProtectedRoute";

import { useEffect } from "react";
import { fetchUser } from "./redux/authSlice";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import TeacherPage from "pages/TeacherPage";
import TeachersPage from "pages/TeachersPage";
import StudentsPage from "pages/StudentsPage";
import StudentPage from "pages/StudentPage";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(fetchUser());
    navigate(location);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route
            path="courses"
            element={
              <ProtectedRoute>
                <CoursesPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="courses/:id"
            element={
              <ProtectedRoute>
                <CoursePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="themes/:id"
            element={
              <ProtectedRoute>
                <ThemePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="teachers"
            element={
              <ProtectedRoute>
                <TeachersPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="teachers/:id"
            element={
              <ProtectedRoute>
                <TeacherPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students"
            element={
              <ProtectedRoute>
                <StudentsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="students/:id"
            element={
              <ProtectedRoute>
                <StudentPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups"
            element={
              <ProtectedRoute>
                <GroupsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="groups/:id"
            element={
              <ProtectedRoute>
                <GroupPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="lessons/:id"
            element={
              <ProtectedRoute>
                <LessonPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
