import mixpanel, { type Mixpanel as LoadedMixpanel, type Persistence } from 'mixpanel-browser';
import { EventCategory } from '../constants';
import { Analytics } from '../types';

export default class Mixpanel extends Analytics {
  private loadedMixpanel: LoadedMixpanel | null = null;

  public initialize(
    token: string,
    options?: {
      debug?: boolean;
      track_pageview?: boolean;
      persistence?: Persistence;
      verbose?: boolean;
    }
  ): Promise<void> {
    return new Promise((resolve) => {
      mixpanel.init(token, {
        ...options,
        loaded: (loadedMixpanel) => {
          this.loadedMixpanel = loadedMixpanel;
          resolve();
        },
      });
    });
  }

  public sendEvent(category: EventCategory, action: string, options?: Record<string, string>): void {
    this.loadedMixpanel?.track(action, { category, ...(options ?? {}) });
  }

  public identify(userId: string): void {
    this.loadedMixpanel?.identify(userId);
    this.sendEvent(EventCategory.WALLET_CONNECTION, 'connect');
  }

  public setChainId(chainId: number): void {
    this.loadedMixpanel?.register({ chainId });
  }
}
