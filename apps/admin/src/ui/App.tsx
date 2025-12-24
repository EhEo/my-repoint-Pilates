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
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <Layout>
              <DashboardPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/members"
        element={
          <RequireAuth>
            <Layout>
              <MembersPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/memberships"
        element={
          <RequireAuth>
            <Layout>
              <MembershipsPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/classes"
        element={
          <RequireAuth>
            <Layout>
              <ClassesPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/schedules"
        element={
          <RequireAuth>
            <Layout>
              <SchedulesPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/reservations"
        element={
          <RequireAuth>
            <Layout>
              <ReservationsPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/instructors"
        element={
          <RequireAuth>
            <Layout>
              <InstructorsPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/assessments"
        element={
          <RequireAuth>
            <Layout>
              <AssessmentsPage />
            </Layout>
          </RequireAuth>
        }
      />
      <Route
        path="/prescriptions"
        element={
          <RequireAuth>
            <Layout>
              <PrescriptionsPage />
            </Layout>
          </RequireAuth>
        }
      />
    </Routes>
  );
}
