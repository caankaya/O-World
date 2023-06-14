import React from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';

function ErrorPage() {
  const errorState = useAppSelector((state) => state.error);

  return (
    <div>
      {errorState.statusCode === 500 ? (
        <div>
          <h1>Erreur interne du serveur</h1>
          <p>{errorState.message || "Quelque chose s'est mal passé. Nous travaillons à résoudre le problème."}</p>
        </div>
      ) : (
        <div>
          <h1>Une erreur est survenue</h1>
          <p>{errorState.message || `Le serveur a renvoyé un statut: ${errorState.statusCode}`}</p>
        </div>
      )}
    </div>
  );
}

export default ErrorPage;
