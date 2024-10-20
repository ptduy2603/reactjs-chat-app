import React from "react";
import { Route, Routes } from "react-router-dom";
import { mainRoutes, authRoutes } from "../routes";
import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import AppLoading from "./AppLoading";
import DefaultPage from "../pages/Default";

const App: React.FC = () => {
  const { loading, user } = useContext(AuthContext) ?? { loading: false };

  return (
    <main className="app">
      {loading ? (
        <AppLoading />
      ) : (
        <Routes>
          {authRoutes.map((route) => (
            <Route
              key={route?.path}
              path={route?.path}
              element={
                <ProtectedRoute isSafe={!user} redirectPath="/">
                  <route.element />
                </ProtectedRoute>
              }
            />
          ))}
          {/* uss protected route for rendering main routes */}
          {mainRoutes.map((route) => (
            <Route
              key={route?.path}
              path={route?.path}
              element={
                <ProtectedRoute isSafe={Boolean(user)} redirectPath="/login">
                  <route.element />
                </ProtectedRoute>
              }
            />
          ))}
          {/* add default 404 page for website */}
          <Route path="*" element={<DefaultPage />} />
        </Routes>
      )}
    </main>
  );
};

export default App;
