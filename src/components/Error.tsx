import React from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';

function ErrorPage() {
  const errorState = useAppSelector((state) => state.error);

  if (!errorState.statusCode) {
    return (
      <div className="alert alert-error bg-[#ff0033]">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-base-200">{errorState.code}</h1>
        <span className="text-base-200">{errorState.message || "Nous ne sommes pas sûr de ce qui s'est passé. Veuillez réessayer plus tard."}</span>
      </div>
    );
  }

  if (errorState.statusCode === 500) {
    return (
      <div className="alert alert-error bg-[#ff0033]">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-base-200">{errorState.code}</h1>
        <span className="text-base-200">{errorState.message || "Quelque chose s'est mal passé. Nous travaillons à résoudre le problème."}</span>
      </div>
    );
  }

  if (errorState.statusCode >= 400 && errorState.statusCode < 500) {
    return (
      <div className="alert alert-error bg-[#ff0033]">
        <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
        <h1 className="text-base-200">{errorState.code}</h1>
        <span className="text-base-200">{errorState.message || `Votre requête ne peut être traitée (Code: ${errorState.statusCode})`}</span>
      </div>
    );
  }

  return (
    <div className="alert alert-error bg-[#ff0033]">
      <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <h1 className="text-base-200">Une erreur est survenue</h1>
      <span className="text-base-200">{errorState.message || `Le serveur a renvoyé un statut: ${errorState.statusCode}`}</span>
    </div>
  );
}

export default ErrorPage;
