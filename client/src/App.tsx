import "./App.css";
import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
// import { isAuth } from "./services/LoginService";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  //   const navigate = useNavigate();

  //   useEffect(() => {
  //     try {
  //       isAuth() ? navigate("/") : navigate("/login");
  //     } catch (error) {
  //       console.error("Error retrieving token:", error);
  //       // navigate("/login"); i errorPage
  //     }
  //   }, []);
  return (
    <div className="bg-amber-50">
      <ThemeProvider>
        <Suspense fallback={<div className="text-lg">Kraunama...</div>}>
          <NavigationBar />
          <Routes>
            {/* <Route path="/" element={<HomePage />} /> */}
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </ThemeProvider>
    </div>
  );
}

export default App;
