import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout.tsx";
import Home from "./pages/Home.tsx";
import Launches from "./pages/Launches.tsx";
import LaunchDetail from "./pages/LaunchDetail.tsx";
import Ships from "./pages/Ships.tsx";
import ShipDetail from "./pages/ShipDetail.tsx";
import NotFound from "./pages/NotFound.tsx";

function App() {
    return (
        <Layout>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/launches" element={<Launches />}></Route>
                <Route path="/launches/:id" element={<LaunchDetail />}></Route>
                <Route path="/ships" element={<Ships />}></Route>
                <Route path="/ships/:id" element={<ShipDetail />}></Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Layout>
    );
}

export default App;
