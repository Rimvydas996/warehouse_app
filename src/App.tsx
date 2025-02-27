import "./App.css";
import { Suspense, lazy, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "./context/ThemeContext";
import PrivateRoute from "./routes/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";
import PrductsPage from "./pages/ProductsPage";
import { useAuth } from "./context/AuthContext";
import { setTokenGetter } from "./services/auth-service";
const LoginPage = lazy(() => import("./pages/LoginPage"));
const HomePage = lazy(() => import("./pages/HomePage"));

function App() {
  const { getToken } = useAuth();

  useEffect(() => {
    setTokenGetter(getToken);
  }, [getToken]);

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
