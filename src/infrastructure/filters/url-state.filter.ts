import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { UrlUtils } from '../../shared/utils/url.utils';

@Catch(HttpException)
export class UrlStateFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest();
    const status = exception.getStatus();

    // Préserver les paramètres de l'URL lors des redirections
    if (status === 302 || status === 301) {
      const currentQuery = UrlUtils.parseQueryString(
        request.url.split('?')[1] || '',
      );
      const redirectUrl = response.get('Location');

      if (redirectUrl) {
        const [basePath, queryString] = redirectUrl.split('?');
        const redirectQuery = UrlUtils.parseQueryString(queryString || '');
        const mergedQuery = UrlUtils.mergeQueryParams(
          currentQuery,
          redirectQuery,
        );
        const newQueryString = UrlUtils.buildQueryString(mergedQuery);

        response.location(`${basePath}${newQueryString}`);
      }
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
