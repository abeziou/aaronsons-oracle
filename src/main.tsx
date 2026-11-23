import { createRoot } from 'react-dom/client';
import './index.css';
import OracleView from './OracleView.tsx';

createRoot(document.getElementById('root')!).render(
    <div>
        <header>Aaronson's Oracle</header>
        <OracleView />
    </div>
    
);
