import { Injectable } from '@angular/core';
import { VillainNameChanged } from './villain-name-changed';

@Injectable()
export class MessageService {
  messages: string[] = [];
  subscribers: any[] = [];

  add(message: string) {
    this.messages.push(message);
  }

  publishNameChange(message: VillainNameChanged) {
    this.subscribers.forEach(function(handler) {
        handler(message);
    });
  }

  subscribeToNameChange(fun: any) {
    this.subscribers.push(fun);
  }

  clear() {
    this.messages = [];
  }
}
