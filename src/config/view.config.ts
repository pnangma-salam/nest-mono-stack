import { registerAs } from '@nestjs/config';
import { join } from 'path';

export default registerAs('view', () => ({
  engine: 'njk',
  viewsDir: join(__dirname, '..', '..', 'views'),
  publicDir: join(__dirname, '..', '..', 'public'),
  nunjucks: {
    autoescape: true,
    throwOnUndefined: false,
    trimBlocks: false,
    lstripBlocks: false,
    watch: process.env.NODE_ENV === 'development',
    noCache: process.env.NODE_ENV === 'development',
  },
}));
