import { ReactNode, createContext, useContext, useState } from 'react';

const initialValue: {
  year: string;
  setYear: (year: string) => void;
} = {
  year: '',
  setYear: () => {},
};

const YearContext = createContext(initialValue);

const YearProvider = ({ children }: { children: ReactNode }) => {
  const [year, setYear] = useState<string>('');

  return (
    <YearContext.Provider
      value={{
        year,
        setYear,
      }}
    >
      {children}
    </YearContext.Provider>
  );
};

const useYear = () => {
  const context = useContext(YearContext);
  if (context === undefined)
    throw new Error('YearContext was used outside of YearProvider');
  return context;
};

export { YearProvider, useYear };
