import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: string | undefined;
}

const config: Config = {
    port: process.env.PORT,
}

export default config