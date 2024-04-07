import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // health check stuff here?
  getHello(): string {
    return 'Hello World!';
  }
}
