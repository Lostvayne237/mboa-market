import { useEffect } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { AuthProvider } from "./lib/auth";
import { I18nProvider } from "./lib/i18n";
import { Dashboard } from "./pages/Dashboard";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { ProductDetail } from "./pages/ProductDetail";
import { Register } from "./pages/Register";
import { Search } from "./pages/Search";
import { VendorStore } from "./pages/VendorStore";

/** Keyed by pathname so every navigation gets a fresh entrance animation. */
function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  return (
    <div key={location.pathname} className="page-enter min-h-[50vh]">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/stores/:id" element={<VendorStore />} />
        <Route path="/shops/:id" element={<VendorStore />} />
        <Route path="/vendors/:id" element={<VendorStore />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <I18nProvider>
      <AuthProvider>
        <BrowserRouter>
          <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-1">
              <AnimatedRoutes />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </AuthProvider>
    </I18nProvider>
  );
}
