import "./App.css";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider, useAuth } from "./context/AuthContext";
import PrductsPage from "./pages/ProductsPage";
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
  // const { isAuthenticated } = useAuth();

  return (
    <div className="bg-amber-50">
      <ThemeProvider>
        <AuthProvider>
          <Suspense fallback={<div className="text-lg">Kraunama...</div>}>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/products"
                element={
                  <PrivateRoute>
                    <PrductsPage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Suspense>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
