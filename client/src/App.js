import {Routes,Route, Navigate} from "react-router-dom"
import './App.css';
import ResetPassword from "./Components/ResetPassword";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Register from "./pages/Register";


function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<ProtectedRoutes><HomePage/></ProtectedRoutes>} />
        <Route exact path="/register" element={<Register/>} />
        <Route exact path="/login" element={<Login/>} />
        <Route exact path="/reset" element={<ResetPassword/>} />
      </Routes>
    </>
  );
}

export function ProtectedRoutes(props){
  if(localStorage.getItem("user")){
    return props.children
  }
  else{
    return <Navigate to="/login" />
  }
}

export default App;
