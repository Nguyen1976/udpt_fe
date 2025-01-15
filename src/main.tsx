import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { store } from '~/redux/store';
import { Provider } from 'react-redux';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Providers from './components/Providers/Providers.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Provider store={store}>
            <Providers>
                <App />
            </Providers>
        </Provider>
    </StrictMode>
);
