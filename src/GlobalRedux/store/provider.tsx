'use client';

import { ReactNode } from 'react';
import store from './store';
import { Provider } from 'react-redux';

interface ProviderProps {
  children: ReactNode;
}

export default function Providers({ children }: ProviderProps) {
  return <Provider store={store}>{children}</Provider>;
}
