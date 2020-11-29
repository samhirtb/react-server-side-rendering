import React from 'react';
import { renderRoutes } from 'react-router-config';

function App({ route }) {
  return (
    <div>
      {renderRoutes(route.routes)}
    </div>
  );
}

export default App;
