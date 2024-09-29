import express from 'express';
import config from 'config'

import loaders from 'loaders';

async function server() {
    const app = express();

    await loaders({
        expressApp: app
    });

    app.listen(config.port, () => {
        console.log(`http://localhost:${config.port}`);
    });
}

server();