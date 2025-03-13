import { BrowserRouter, Route, Routes } from "react-router";
import MainLayout from "./MainLayout";
import CallView from "../pages/CallView";
import SettingsView from "../pages/SettingsView";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/settings"
          element={
            <MainLayout children={<MainLayout children={<SettingsView />} />} />
          }
        />
        <Route path="*" element={<MainLayout children={<CallView />} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
