import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";

import Login from "./components/auth/Login";
import SignUp from "./components/auth/Signup";
import HomePage from "./components/publicpage/HomePage";
import DashboardLayout from "./components/admindashboard/DashboardLayout"; 
import UserDashboard from "./components/userdashboard/UserDashboardLayout"; 
import ExpenseDashboard from './components/userdashboard/Transaction'
import AddExpenseDashboard from "./components/userdashboard/AddTransaction";
import UsersList from "./components/admindashboard/UsersList";
import Profile from "./components/userdashboard/Profile"
import ProtectedRoute from "./components/ProtectedRoute"; 

function App() {
  const [user, setUser] = useState<{ email: string; role: "admin" | "user" } | null>(null);

  // Dummy login check (you can replace with API call)
  const handleLogin = (email: string, password: string) => {
    if (email === "admin123@gmail.com" && password === "admin123@") {
      setUser({ email, role: "admin" });
      return "admin";
    } else {
      // assume any other valid login is a normal user
      setUser({ email, role: "user" });
      return "user";
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Login and Signup */}
        <Route 
          path="/signin" 
          element={<Login onLogin={handleLogin} />} 
        />
        <Route path="/signup" element={<SignUp />} />

        {/* Admin Dashboard */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <DashboardLayout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute user={user} requiredRole="admin">
              <UsersList />
            </ProtectedRoute>
          }
        />

        {/* User Dashboard */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute user={user} requiredRole="user">
              <UserDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/transaction"
          element={
            <ProtectedRoute user={user} requiredRole="user">
              <ExpenseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/addtransaction"
          element={
            <ProtectedRoute user={user} requiredRole="user">
              <AddExpenseDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/user/profile"
          element={
            <ProtectedRoute user={user} requiredRole="user">
              <Profile />
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to homepage */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
