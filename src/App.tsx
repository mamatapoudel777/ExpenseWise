import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/admindashboard/DashboardLayout";
import UsersList from "./components/admindashboard/UsersList";
import ProtectedRoute from "./components/ProtectedRoute"; 
import SignUp from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Navigate to="/signin" />} />

        <Route path="/signin" element={<Login />} />

        <Route path="/signup" element={<SignUp />} />

        <Route 
          path="/dashboard" 
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          } 
        />
        
        <Route 
          path="/users" 
          element={
            <ProtectedRoute>
              <UsersList />
            </ProtectedRoute>
          } 
        />

      </Routes>
    </Router>
  );
}

export default App;
