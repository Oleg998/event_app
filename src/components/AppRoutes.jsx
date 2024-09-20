import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';


const SharedLayout = lazy(() =>
  import('../components/SharedLayout/SharedLayout')
);

const HomePage = lazy(() => import('../pages/HomePage/HomePage'));


export const AppRoute = () => {
  return (
    <div>
      <Routes>
        {' '}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<HomePage/>} />
                         
        </Route>
      </Routes>
    </div>
  );
};
