import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Dashboard from "./pages/Dashboard.tsx";
import NotFound from "./pages/NotFound.tsx";

//import Alerts from "./pages/Alerts";
//import Live from "./pages/Live";
//import History from "./pages/History";
//import Settings from "./pages/Settings";
//import CameraSetup from "./pages/CameraSetup";
//import Analytics from "./pages/Analytics";

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />   
        <Route path="/alerts" element={<Alerts />} />
        <Route path="/live" element={<Live />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/camera-setup" element={<CameraSetup />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;