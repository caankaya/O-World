'use client';

import React from 'react';
import { useAppSelector } from '@/GlobalRedux/hooks';

import Alert from './Alert';

const Toast = () => {
  const alertUser = useAppSelector((state) => state.user.alert);
  const alertStats = useAppSelector((state) => state.stats.alert);
  const alertFlags = useAppSelector((state) => state.flags.alert);
  const alertPlanet = useAppSelector((state) => state.planet.alert);
  const alertCountry = useAppSelector((state) => state.country.alert);
  const alertGrah = useAppSelector((state) => state.graph.alert);
  const alertInfos = useAppSelector((state) => state.infos.alert);

  return (
    <>
      {alertUser && <Alert type={alertUser.type} message={alertUser.message} />}
      {alertStats && (
        <Alert type={alertStats.type} message={alertStats.message} />
      )}
      {alertPlanet && (
        <Alert type={alertPlanet.type} message={alertPlanet.message} />
      )}
      {alertFlags && (
        <Alert type={alertFlags.type} message={alertFlags.message} />
      )}
      {alertCountry && (
        <Alert type={alertCountry.type} message={alertCountry.message} />
      )}
      {alertGrah && <Alert type={alertGrah.type} message={alertGrah.message} />}
      {alertInfos && (
        <Alert type={alertInfos.type} message={alertInfos.message} />
      )}
    </>
  );
};

export default Toast;
