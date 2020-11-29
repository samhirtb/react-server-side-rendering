import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter as Router } from 'react-router-dom'
import { renderRoutes, matchRoutes } from "react-router-config"
import { routes } from '../../src/routeconfigs/config'
import { DataContextProvider } from '../../src/contexts/DataContext'
import serialize from 'serialize-javascript'
import fetch from 'node-fetch'

const path = require("path");
const fs = require("fs");

export default async (req, res) => {
    let renderData = null	
	const filePath = path.resolve(__dirname, '..', '..', 'build', 'index.html');
    const index = fs.readFileSync(filePath, 'utf8')

    //implement graceful error handling
    const match = matchRoutes(routes, req.originalUrl).find(x => x.match.isExact === true && x.route.loadData)
    
    await match.route.loadData(fetch, match.match.params)
        .then(data => renderData = data)
    
    const html = ReactDOMServer.renderToString(
        <DataContextProvider renderData={renderData}>
            <Router location={req.originalUrl}>
                {renderRoutes(routes, { data : undefined })}
            </Router>
        </DataContextProvider>
    );

    return res.send(
        index.replace(
            '<div id="root"></div>',
            `<div id="root">${html}</div><script>window.__SERVER_RENDERED_DATA__ = ${JSON.stringify(renderData)}</script>`
        )
    )
};