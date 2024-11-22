import { Injectable } from '@nestjs/common';

export interface HomePageData {
  title: string;
  message: string;
  features: string[];
  currentTime: string;
}

@Injectable()
export class HomeService {
  getHomePageData(): HomePageData {
    return {
      title: 'Welcome',
      message: 'A modern, full-featured starter template',
      features: [
        'NestJS with TypeScript',
        'Nunjucks templating',
        'HTMX for dynamic updates',
        'Alpine.js for interactivity',
        'Tailwind CSS (with prefix)',
      ],
      currentTime: new Date().toLocaleTimeString(),
    };
  }

  getCurrentTime(): string {
    return new Date().toLocaleTimeString();
  }
}
