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
// encrypt data on supabase
// use Tanstack Router
// use .env file in supabase.ts
// only fetch neccessary columns
// performance check, especially network requests (all hooks), Calendar days
// test evereything without holiday file
// console errors
// sort css props

// add holiday inputs in settings and use in calculateSalary
// PayrollCalculationTable
// useMemo in context in compound comp. (Modal.tsx -> https://codesandbox.io/s/compound-react-components-with-hooks-typescript-vpvdq?file=/src/Tabs/Tabs.tsx)
// prevent scrolling on open menu
// change language
// darkMode colors
// calendar should start on Monday
// if holiday.csv added after already added holiday job -> add csv -> delete job -> add job again
// indicate jun and sen role in table (mainly beacause of Calculation table to check results)
// PayrollCalculationTable dont show holiday day
// used 0,43 for both roles and dresscode on night holiday surcharge

// typescript
// useElementRef: https://www.youtube.com/watch?v=JuULWGuoI1A

// von Büro
// brauche exakte Stundensätze (nicht auf 2 Kommastellen gerundet)
// was ist Überzahlung und wie setzt sie sich zusammen
// wird bei der Urlaubsersatzleistung nicht zw. Anzug und Weste und Tag/Nacht unterschieden (wie laut Tabelle)
// konnte das nicht aus den Gehaltszetteln herauslesen

// ///////////////////
// get exact values for €/hour (aus Lohnverrechnung)
// exact calculation holidayCompensation (8,58%) -> eig sollte zwischne Anzug und Weste differenziert werden, in Lohnverrechnung alle h zusammengefasst?
// fix nightHours when check in before nightEnd
// refactor totalSalary logic
// add logic for cashier, ice skater, ...
