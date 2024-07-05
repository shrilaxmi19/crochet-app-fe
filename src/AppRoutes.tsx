import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./layouts/layout";
import HomePage from "./pages/HomePage";
import AuthCallbackPage from "./pages/AuthCallbackPage";
import UserProfilePage from "./pages/UserProfilePage";
import ProtectedRoute from "./auth/ProtectedRoute";
import ManageStorePage from "./pages/ManageStorePage";
import SearchPage from "./pages/SearchPage";
import DetailPage from "./pages/DetailPage";
import OrderStatusPage from "./pages/OrderStatusPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout 
          showHero
          >
            <HomePage/>
          </Layout>
        }
      />
      <Route path="/auth-callback" element={
      <AuthCallbackPage />
      } />
      <Route
        path="/search/:city"
        element={
      
          // <span>Home3</span>
            
          <Layout showHero={false}>
            <SearchPage />
          </Layout>
        }
      />
      <Route
        path="/detail/:restaurantId"
        element={
       
          // <span>Home3</span>
          <Layout showHero={false}>
            <DetailPage />
          </Layout>
        }
      />
       <Route element={<ProtectedRoute />}>
        <Route
          path="/order-status"
          element={
      //  <span>Home4</span>

            <Layout>
              <OrderStatusPage />
            </Layout>
          }
        />
        <Route
          path="/user-profile"
          element={
            <Layout>
              <UserProfilePage />
            </Layout>
          }
        />
        <Route
          path="/manage-store"
          element={
     
            <Layout>
              <ManageStorePage />
            </Layout>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;
