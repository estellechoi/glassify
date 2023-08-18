import mixpanel, { type Persistence } from 'mixpanel-browser';
import { Analytics } from '../types';
import { EventCategory } from '../constants';

export default class Mixpanel extends Analytics {
  public initialize(
    token: string,
    options?: {
      debug?: boolean;
      track_pageview?: boolean;
      persistence?: Persistence;
      verbose?: boolean;
    }
  ): void {
    mixpanel.init(token, options);
  }

  public sendEvent(category: EventCategory, action: string, options?: Record<string, string>): void {
    mixpanel.track(action, { category, ...(options ?? {}) });
  }

  public identify(userId: string): void {
    mixpanel.identify(userId);
    this.sendEvent(EventCategory.WALLET_CONNECTION, 'connect');
  }

  public setChainId(chainId: number): void {
    mixpanel.register({ chainId });
  }
}
