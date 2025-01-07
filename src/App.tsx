import React, { Fragment } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { publicRoutes } from './routes';

const App: React.FC = () => {
    return (
        <Router>
            <Routes>
                {publicRoutes.map((route) => {
                    const Page = route.element;
                    const Layout = route.layout || Fragment;
                    return (
                        <Route
                            key={route.path}
                            path={route.path}
                            element={
                                <Layout>
                                    <Page />
                                </Layout>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
};

export default App;
