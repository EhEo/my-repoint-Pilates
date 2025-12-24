import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Navigate, Route, Routes } from 'react-router-dom';
import { LoginPage } from '../views/auth/LoginPage';
import { DashboardPage } from '../views/dashboard/DashboardPage';
import { MembersPage } from '../views/members/MembersPage';
import { MembershipsPage } from '../views/memberships/MembershipsPage';
import { ClassesPage } from '../views/classes/ClassesPage';
import { SchedulesPage } from '../views/schedules/SchedulesPage';
import { ReservationsPage } from '../views/reservations/ReservationsPage';
import { InstructorsPage } from '../views/instructors/InstructorsPage';
import { AssessmentsPage } from '../views/assessments/AssessmentsPage';
import { PrescriptionsPage } from '../views/prescriptions/PrescriptionsPage';
import { RequireAuth } from './RequireAuth';
import { Layout } from './Layout';
export function App() {
    return (_jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(Navigate, { to: "/dashboard", replace: true }) }), _jsx(Route, { path: "/login", element: _jsx(LoginPage, {}) }), _jsx(Route, { path: "/dashboard", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(DashboardPage, {}) }) }) }), _jsx(Route, { path: "/members", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(MembersPage, {}) }) }) }), _jsx(Route, { path: "/memberships", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(MembershipsPage, {}) }) }) }), _jsx(Route, { path: "/classes", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(ClassesPage, {}) }) }) }), _jsx(Route, { path: "/schedules", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(SchedulesPage, {}) }) }) }), _jsx(Route, { path: "/reservations", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(ReservationsPage, {}) }) }) }), _jsx(Route, { path: "/instructors", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(InstructorsPage, {}) }) }) }), _jsx(Route, { path: "/assessments", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(AssessmentsPage, {}) }) }) }), _jsx(Route, { path: "/prescriptions", element: _jsx(RequireAuth, { children: _jsx(Layout, { children: _jsx(PrescriptionsPage, {}) }) }) })] }));
}
