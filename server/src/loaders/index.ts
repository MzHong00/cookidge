import { type Express } from 'express';
import expressLoader from 'loaders/express';

export default async ({ expressApp }: {
    expressApp: Express
}) => {
    await expressLoader(expressApp);
}