import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './services/app.service';
import { GptPrompt } from './dtos/GptPrompt';
import { PromptDto } from './dtos/PromptDto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): any {
    return this.appService.getHello();
  }

  @Post()
  create(@Body() prompt: PromptDto): any {
    const gptPrompt = new GptPrompt(prompt.prompt);
    return this.appService.getThreatLevel(gptPrompt);
  }
}
