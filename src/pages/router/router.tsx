import { Route, Routes } from 'react-router-dom';

import { Home } from '../Home';
import { Pair } from '../Pair';
import { PairDetails } from '../PairDetails';

export const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/:pair" element={<Pair />} />
      <Route path="/:pair/details" element={<PairDetails />} />
    </Routes>
  );
};
