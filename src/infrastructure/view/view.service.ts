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
    });

    nunjucksEnv.addFilter('json', (str) => JSON.stringify(str, null, 2));

    app.useStaticAssets(viewConfig.publicDir);
    app.setBaseViewsDir(viewsDir);
    app.setViewEngine(viewConfig.engine);
  }
}
