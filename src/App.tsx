import "./App.css";
import { Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout.tsx";
import Home from "pages/Home/Home.tsx";
import Launches from "pages/Launches/Launches.tsx";
import LaunchDetail from "pages/LaunchDetail/LaunchDetail.tsx";
import Ships from "pages/Ships/Ships";
import ShipDetail from "pages/ShipDetail/ShipDetail";
import NotFound from "pages/NotFound/NotFound";
import ThemeProvider from "context/ThemeContext";

function App() {
    return (
        <ThemeProvider>
            <Layout>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/launches" element={<Launches />}></Route>
                    <Route
                        path="/launches/:id"
                        element={<LaunchDetail />}
                    ></Route>
                    <Route path="/ships" element={<Ships />}></Route>
                    <Route path="/ships/:id" element={<ShipDetail />}></Route>
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </Layout>
        </ThemeProvider>
    );
}

export default App;
