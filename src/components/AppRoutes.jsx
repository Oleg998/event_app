import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));

export const AppRoute = () => {
  return (
    <div>
      <Routes>
        
        <Route path="/" element={<HomePage />} />
        
        
        <Route path="/events" element={<EventPage />} />
        
        
        <Route path="*" element={<HomePage />} />
      </Routes>
    </div>
  );
};
