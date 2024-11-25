import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class HtmxInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const isHtmx = request.headers['hx-request'] === 'true';

    if (!isHtmx) {
      return next.handle();
    }

    return next.handle().pipe(
      map((data) => {
        // If it's an HTMX request, we make sure the response is correctly formatted
        if (typeof data === 'string') {
          return data;
        }

        return {
          ...data,
          layout: false, // Let's disable the layout for HTMX requests
        };
      }),
    );
  }
}
