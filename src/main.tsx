import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './ui/ErrorFallback';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={ErrorFallback}
      onReset={() => window.location.replace('/')}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

// in .eslint.cjs on -> off
// '@typescript-eslint/no-non-null-assertion': 'on',

// performance
// performance check, especially network requests (all hooks), Calendar days
// lightHouse opimizitaion

// to check before upload
// iPad Mini Querformat
// delete se2 specific data
// isLoading1, isLoading2
// check .env before upload

// fix later
// select year in dashboard in sync with fetched data when year higher than current year exists on render
// fix nightHours when check in before nightEnd
// add logic for cashier, ice skater, ...
// prevent scrolling on open menu
// change language
// calendar should start on Monday
// delete user
// only fetch neccessary columns
// encrypt data on supabase
// add modal "really want to add year, action can't be undone" in Settingsgit
// console errors
// useMemo in context in compound comp. (Modal.tsx -> https://codesandbox.io/s/compound-react-components-with-hooks-typescript-vpvdq?file=/src/Tabs/Tabs.tsx)
