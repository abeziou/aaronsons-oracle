import { createRoot } from 'react-dom/client';
import './index.css';
import OracleView from './OracleView.tsx';

createRoot(document.getElementById('root')!).render(
    <OracleView />
);
