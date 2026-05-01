import { useState } from 'react';
import LandingScreen from './screens/LandingScreen';
import SetupScreen from './screens/SetupScreen';
import HomeScreen from './screens/HomeScreen';
import SOSTimerScreen from './screens/SOSTimerScreen';
import AlertSentScreen from './screens/AlertSentScreen';
import AlertHistoryScreen from './screens/AlertHistoryScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [alertData, setAlertData] = useState(null);

  const renderScreen = () => {
    switch (currentScreen) {
      case 'landing':
        return <LandingScreen onNext={() => setCurrentScreen('setup')} />;
      case 'setup':
        return <SetupScreen onComplete={() => setCurrentScreen('home')} />;
      case 'home':
        return <HomeScreen 
                 onTriggerSOS={() => setCurrentScreen('sostimer')} 
                 onViewHistory={() => setCurrentScreen('history')} 
               />;
      case 'sostimer':
        return <SOSTimerScreen 
                 onCancel={() => setCurrentScreen('home')} 
                 onAlertSent={(data) => {
                   setAlertData(data);
                   setCurrentScreen('alertsent');
                 }} 
               />;
      case 'alertsent':
        return <AlertSentScreen 
                 alertData={alertData} 
                 onHome={() => setCurrentScreen('home')} 
               />;
      case 'history':
        return <AlertHistoryScreen onBack={() => setCurrentScreen('home')} />;
      default:
        return <LandingScreen onNext={() => setCurrentScreen('setup')} />;
    }
  };

  return (
    <div className="app-container">
      {renderScreen()}
    </div>
  );
}

export default App;
