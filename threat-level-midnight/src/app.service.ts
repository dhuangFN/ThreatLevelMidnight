import { Injectable } from '@nestjs/common';
import { GptPrompt, ThreatDto } from './app.controller';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class AppService {
  getHello(): any {
    return {
      user: {
        name: 'sambo shambo',
        age: 33,
        rating: 21
      },
      summary: {
        threat: 8,
        'threat-reason': 'something was detected',
        sentiment: 'aggressive',
        'sentiment-reason': 'well.  there was a lot of aggressive stuff in there.'
      }
    };
  }

  async getThreatLevel(prompt: GptPrompt) : Promise<ThreatDto> {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
  
      const openai = new OpenAIApi(configuration);
      try {
        const response = await openai.createChatCompletion({
          model: "gpt-4",
          messages: [
            {role: "system", content: `You are an analysis tool to detect threats and sentiment from email. 
            You analyze text and return results on a scale of 1-10, where 1 is no threat, and 10 is threat of bodily harm to a person.`},
            {role: "user", content: prompt.getGptPrompt()}
          ]
        });

        const choices = response.data.choices;
        const message = choices[0].message;

        const json : ThreatDto = JSON.parse(message.content);
        return json;

      } catch (error) {
        console.log(error);
      }
  }
}
