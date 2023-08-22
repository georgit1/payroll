import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Dashboard from './pages/Dashboard';
import GlobalStyles from './styles/GlobalStyles';
import PageNotFound from './pages/PageNotFound';
import Login from './pages/Login';
import AppLayout from './ui/AppLayout';
import Jobs from './pages/Jobs';
import Settings from './pages/Settings';
import Payrolls from './pages/Payrolls';
import Payroll from './pages/Payroll';
import ProtectedRoute from './ui/ProtectedRoute';
import Account from './pages/Account';
import { DarkModeProvider } from './context/DarkModeContext';
import Calendar from './pages/Calendar';
import { CalendarProvider } from './context/CalenderContext';
import { YearProvider } from './context/YearContext';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

const App = () => {
  return (
    <DarkModeProvider>
      <CalendarProvider>
        <YearProvider>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <GlobalStyles />
            <BrowserRouter>
              <Routes>
                <Route
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to='dashboard' />} />
                  <Route path='dashboard' element={<Dashboard />} />
                  <Route path='calendar' element={<Calendar />} />
                  <Route path='payrolls' element={<Payrolls />} />
                  <Route path='payrolls/:identifier' element={<Payroll />} />
                  <Route path='jobs' element={<Jobs />} />
                  <Route path='settings' element={<Settings />} />
                  <Route path='account' element={<Account />} />
                </Route>

                <Route path='login' element={<Login />} />
                <Route path='*' element={<PageNotFound />} />
              </Routes>
            </BrowserRouter>

            <Toaster
              position='top-center'
              gutter={12}
              containerStyle={{ margin: '8px' }}
              toastOptions={{
                success: {
                  duration: 3000,
                },
                error: {
                  duration: 5000,
                },
                style: {
                  fontSize: '16px',
                  maxWidth: '500px',
                  padding: '16px 24px',
                  backgroundColor: 'var(--color-grey-0)',
                  color: 'var(--color-grey-700)',
                },
              }}
            />
          </QueryClientProvider>
        </YearProvider>
      </CalendarProvider>
    </DarkModeProvider>
  );
};

export default App;
