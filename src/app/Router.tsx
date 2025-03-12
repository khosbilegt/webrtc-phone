import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./MainLayout";
import CallView from "../pages/CallView";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<MainLayout children={<CallView />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
