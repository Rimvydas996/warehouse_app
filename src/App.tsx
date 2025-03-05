import "./App.css";
import { Suspense, lazy } from "react"; // Remove useEffect import
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import PrductsPage from "./pages/ProductsPage";
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  return (
    <div className="rounded-2xl  ">
      <AuthProvider>
        <ThemeProvider>
          <Suspense fallback={<div className="text-lg">Kraunama...</div>}>
            <NavigationBar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
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
        </ThemeProvider>
      </AuthProvider>
    </div>
  );
}

export default App;
