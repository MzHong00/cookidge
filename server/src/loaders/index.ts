import { type Express } from 'express';
import expressLoader from './express';
import mongooseLoader from './mongoose'

export default async ({ expressApp }: {
    expressApp: Express
}) => {
    expressLoader(expressApp);
    await mongooseLoader();
}