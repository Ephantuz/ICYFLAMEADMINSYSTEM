// import { SidebarProvider } from './context/sidebarContext.jsx';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.jsx';
import './index.css';
import { store } from './App/Store.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <SidebarProvider> */}
      <App />
      {/* </SidebarProvider> */}
    </Provider>
  </StrictMode>
);
