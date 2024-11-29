import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as nunjucks from 'nunjucks';

@Injectable()
export class ViewService {
  constructor(private configService: ConfigService) {}

  setupViewEngine(app: NestExpressApplication) {
    const viewConfig = this.configService.get('view');

    const viewsDir = viewConfig.viewsDir;
    const nunjucksEnv = nunjucks.configure(viewsDir, {
      ...viewConfig.nunjucks,
      express: app.getHttpAdapter().getInstance(),
      watch: true,
    });

    nunjucksEnv.addFilter('json', (str) => JSON.stringify(str, null, 2));
    nunjucksEnv.addFilter('removeParamFromQuery', (filters, paramToRemove) => {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([key, value]) => {
        if (key !== paramToRemove && value) {
          params.set(key, value as unknown as string);
        }
      });
      return params.toString();
    });
    app.useStaticAssets(viewConfig.publicDir);
    app.setBaseViewsDir(viewsDir);
    app.setViewEngine(viewConfig.engine);
  }
}
