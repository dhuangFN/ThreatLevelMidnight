import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class PromptDto {
  prompt: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() prompt: PromptDto): any {
    return this.appService.getThreatLevel(prompt.prompt);
  }
}
