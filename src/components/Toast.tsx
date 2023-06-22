import { useState, useEffect } from 'react';
import { useAppSelector } from '../GlobalRedux/hooks';
import Alert from './Alert';
import { AlertType } from '../@types/alert';

function Toast() {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [alertData, setAlertData] = useState(null as AlertType | null);
  console.log('AlertData :', alertData);

  const alertUser = useAppSelector((state) => state.user.alert);
  const alertStats = useAppSelector((state) => state.stats.alert);
  const alertFlags = useAppSelector((state) => state.flags.alert);
  const alertPlanet = useAppSelector((state) => state.planet.alert);
  const alertCountry = useAppSelector((state) => state.country.alert);
  const alertGrah = useAppSelector((state) => state.graph.alert);
  const alertInfos = useAppSelector((state) => state.infos.alert);

  useEffect(() => {
    const showAlertWithDelay = () => {
      if (alertData) {
        setShowAlert(true);
        setTimeout(() => {
          setShowAlert(false);
          setAlertData(null);
        }, 8000);
      }
    };

    showAlertWithDelay();
  }, [alertData]);

  useEffect(() => {
    if (alertUser) {
      setAlertData(alertUser);
    }
  }, [alertUser]);

  useEffect(() => {
    if (alertStats) {
      setAlertData(alertStats);
    }
  }, [alertStats]);

  useEffect(() => {
    if (alertPlanet) {
      setAlertData(alertPlanet);
    }
  }, [alertPlanet]);

  useEffect(() => {
    if (alertFlags) {
      setAlertData(alertFlags);
    }
  }, [alertFlags]);

  useEffect(() => {
    if (alertCountry) {
      setAlertData(alertCountry);
    }
  }, [alertCountry]);

  useEffect(() => {
    if (alertGrah) {
      setAlertData(alertGrah);
    }
  }, [alertGrah]);

  useEffect(() => {
    if (alertInfos) {
      setAlertData(alertInfos);
    }
  }, [alertInfos]);

  return (
    <>
      {showAlert && alertData && (
        <Alert type={alertData.type} message={alertData.message} />
      )}
    </>
  );
}

export default Toast;
