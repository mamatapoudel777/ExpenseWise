import { BrowserRouter as Router, Routes, Route,} from "react-router-dom";
import Login from "./components/Login";
import DashboardLayout from "./components/DashboardLayout";
import UsersList from "./components/UsersList";
import ProtectedRoute from "./components/ProtectedRoute"; 
import SignUp from "./components/Signup";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<Login />} />
        <Route path="/" element={< SignUp />} />

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