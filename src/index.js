import React from 'react';
import ReactDOM from 'react-dom';
import { renderRoutes } from "react-router-config"
import { BrowserRouter } from 'react-router-dom'
import { routes } from './routeconfigs/config'
import { DataContextProvider } from './contexts/DataContext'

let __SERVER_RENDERED_DATA__ = window.__SERVER_RENDERED_DATA__

ReactDOM.hydrate(
  <DataContextProvider renderData={__SERVER_RENDERED_DATA__}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </DataContextProvider>,
  document.getElementById('root')
); 

// renderData={{title: "ABC", date: "20-12-2020", postContent: "THIS IS TEST CONTENT"}}
