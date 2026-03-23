import "./App.css";
import { Suspense, lazy } from "react"; // Remove useEffect import
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/layout/NavigationBar/NavigationBar";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import ProductsPage from "./pages/ProductsPage";
import ManageWarehousePage from "./pages/ManageWarehousePage";
import RefillNeededPage from "./pages/RefillNeededPage";
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
const HomeContainersPage = lazy(() => import("./pages/HomeContainersPage"));

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
                    <ProductsPage />
                    </PrivateRoute>
                }
              />
              <Route
                path="/warehouse/manage"
                element={
                  <PrivateRoute>
                    <ManageWarehousePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/warehouse/home-containers"
                element={
                  <PrivateRoute>
                    <HomeContainersPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/warehouse/refill-needed"
                element={
                  <PrivateRoute>
                    <RefillNeededPage />
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
