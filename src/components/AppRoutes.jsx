import { Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));
const EventPage = lazy(() => import('../pages/EventPage/EventPage'));

export const AppRoute = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/events/:_id" element={<EventPage />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </Suspense>
  );
};
