import { Outlet } from "react-router-dom";
import { Layout } from "./app/layout/Layout.tsx";

const App = () => {
    return (
        <Layout>
            <Outlet />
        </Layout>
    );
};

export { App };
