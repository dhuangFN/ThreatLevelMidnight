import { Injectable } from '@nestjs/common';
const { Configuration, OpenAIApi } = require("openai");

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

  async getThreatLevel(prompt: string) : Promise<any> {
      const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
      });
  
      const openai = new OpenAIApi(configuration);
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 7,
      });
  
      return response.data;
  }
}
