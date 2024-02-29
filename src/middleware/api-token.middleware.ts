import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

const X_API_KEY = 'x-api-key';
const X_API_TOKEN = 'x-api-token';
@Injectable()
export class ApiTokenMiddleware implements NestMiddleware {
  use(request: Request, response: Response, next: NextFunction) {
    const providedApiKey =
      request.header(X_API_KEY) ?? request.query[X_API_KEY] ?? undefined;
    const providedApiToken =
      request.header(X_API_TOKEN) ?? request.query[X_API_TOKEN] ?? undefined;

    if (!providedApiKey) {
      console.error('No API Key provided');
      return response.status(403).json({ message: 'No API Key provided' });
    }
    if (!providedApiToken) {
      console.error('No API token provided');
      return response
        .status(403)
        .json({ message: 'No API token provided', providedApiKey });
    }
    // If the API token is provided, you can perform any additional checks or logic here if needed.
    // If everything is fine, call next() to pass control to the next middleware or the route handler.
    const apiKey = process.env.API_KEY;
    const apiToken = process.env.API_TOKEN;

    if (providedApiKey !== apiKey) {
      console.error('Invalid API key provided');
      return response.status(403).json({ message: 'Invalid API key provided' });
    }

    if (providedApiToken !== apiToken) {
      console.error('Invalid API token provided');
      return response
        .status(403)
        .json({ message: 'Invalid API token provided' });
    }

    next();
  }
}
