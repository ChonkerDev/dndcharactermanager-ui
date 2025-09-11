import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from "./login/Login";
import Main from "./main/Main";
import LoggedInReRoute from './reroute/LoggedInReroute';
import LoggedOutReRoute from './reroute/LoggedOutReroute';
function RouteContainer() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<LoggedInReRoute />}>
                    <Route path="/login" element={<Login />} />
                </Route>
                <Route element={<LoggedOutReRoute />}>
                    <Route path="/" element={<Main />} />
                </Route>
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    )
}

export default RouteContainer;