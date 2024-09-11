import React from "react";
import { Route, Routes } from "react-router-dom";
import routes from "../routes";

const App: React.FC = () => {
  return (
    <main className="app">
      <Routes>
        {routes.map((item: RouteType, index: number) => (
          <Route key={index} path={item?.path} element={<item.element />} />
        ))}
      </Routes>
    </main>
  );
};

export default App;
