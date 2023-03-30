import { Injectable } from '@nestjs/common';

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
}
