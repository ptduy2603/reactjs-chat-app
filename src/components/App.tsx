import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const App: React.FC = () => {
  return (
    <main className="app">
      <Routes>
        {routes.map((route: RouteType, index: number) => (
          <Route key={index} path={route?.path} element={<route.element />} />
        ))}
      </Routes>
    </main>
  );
};

export default App;
