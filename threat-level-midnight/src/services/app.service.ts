import { Injectable } from '@nestjs/common';
import { GptPrompt } from '../dtos/GptPrompt';
import { Configuration, OpenAIApi } from 'openai';
import { ThreatDto } from '../dtos/ThreatDto';

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
            {role: "system", content: `you are an analysis tool that scans text and assesses physical threat levels as well as general sentiment
            that provides a rating on a scale of 1-10 and provides a one sentence reasoning as well as a one word general sentiment returned in json format with threat-rating, reason, sentiment, and detected-language. Always reply in english. Format the detected-language using ("language code ISO 639"-"region code ISO 3166")`},
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
