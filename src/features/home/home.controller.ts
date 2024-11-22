import { Controller, Get, Render } from '@nestjs/common';
import { HomeService } from './home.service';

@Controller()
export class HomeController {
  constructor(private readonly homeService: HomeService) {}

  @Get()
  @Render('pages/home')
  home() {
    return this.homeService.getHomePageData();
  }

  @Get('api/time')
  getTime() {
    return { time: this.homeService.getCurrentTime() };
  }
}
