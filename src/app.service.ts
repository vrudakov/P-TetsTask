import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  greeting(): string {
    return 'Hello! This is vrudakov\'s test task';
  }
}
