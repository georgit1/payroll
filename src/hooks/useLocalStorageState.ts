import { useState, useEffect, Dispatch, SetStateAction } from 'react';

type LocalStorageValue = string | number | boolean | object;
type SetLocalStorageValue = Dispatch<SetStateAction<LocalStorageValue>>;

export const useLocalStorageState = <T extends LocalStorageValue>(
  initialState: T,
  key: string
): [T, SetLocalStorageValue] => {
  const [value, setValue] = useState<T>(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? (JSON.parse(storedValue) as T) : initialState;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value, key]);

  return [value, setValue as SetLocalStorageValue];
};
