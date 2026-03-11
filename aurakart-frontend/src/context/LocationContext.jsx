import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LocationContext = createContext();

export const useLocation = () => useContext(LocationContext);

export const LocationProvider = ({ children }) => {
  const { user, syncUserChanges } = useAuth();
  const [location, setLocation] = useState('Select Location');
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // RESTORE LOCATION ON LOGIN
  useEffect(() => {
    if (user) {
      setLocation(user.location || 'Select Location');
    } else {
      setLocation('Select Location');
    }
  }, [user]);

  const updateLocation = (newLocation) => {
    setLocation(newLocation);
    setIsLocationModalOpen(false);
    if (user) {
      syncUserChanges({ location: newLocation });
    }
  };

  const triggerLocationSelection = (action) => {
    setPendingAction(action);
    setIsLocationModalOpen(true);
  };

  return (
    <LocationContext.Provider value={{ 
      location, 
      updateLocation, 
      isLocationModalOpen, 
      setIsLocationModalOpen,
      pendingAction,
      setPendingAction,
      triggerLocationSelection
    }}>
      {children}
    </LocationContext.Provider>
  );
};
