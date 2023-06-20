'use client'

import Error404 from '@/components/404';
import { useEffect } from 'react';

export default function Custom404Page() {

  useEffect(() => {
    const handleBeforeUnload = (event : any) => {
      event.preventDefault();
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
  }, []);
    return <Error404 />;
}