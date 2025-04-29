import AllRoutes from "./routes/AllRoutes";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";

function App() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <AllRoutes />
            <Footer />
        </>
    );
}

export default App;
