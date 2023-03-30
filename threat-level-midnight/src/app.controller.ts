import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

export class PromptDto {
  constructor(prmpt) {
    this.prompt = prmpt;
  }

  prompt: string;
}

export class ThreatDto {
  threat: Number;
  reason: string;
  sentiment: string;
}

export class GptPrompt extends PromptDto {
  
  constructor(prmpt) {
    super(prmpt);
    this.defaultPrompt = ` 
    Please analyze the following prompt and do the following. 
    
    Put that result into a property called "threat".
    Put the reason why into a property called "reason".
    Put the sentiment into a property called "sentiment".

    Return it in a json format.`;
  }

  defaultPrompt: string;

  getGptPrompt(): string {
    return `${this.defaultPrompt} ${this.prompt}`;
  }
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
    const gptPrompt = new GptPrompt(prompt.prompt);
    return this.appService.getThreatLevel(gptPrompt);
  }
}
