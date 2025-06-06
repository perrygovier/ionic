import { NgZone } from '@angular/core';
import type { Config, IonicWindow } from '@ionic/angular/common';
import { raf } from '@ionic/angular/common';
import { setupConfig } from '@ionic/core';
import { defineCustomElements } from '@ionic/core/loader';

// TODO(FW-2827): types

export const appInitialize = (config: Config, doc: Document, zone: NgZone) => {
  return (): any => {
    const win: IonicWindow | undefined = doc.defaultView as any;
    if (win && typeof (window as any) !== 'undefined') {
      setupConfig({
        ...config,
        _zoneGate: (h: any) => zone.run(h),
      });

      const aelFn =
        '__zone_symbol__addEventListener' in (doc.body as any) ? '__zone_symbol__addEventListener' : 'addEventListener';

      return defineCustomElements(win, {
        exclude: ['ion-tabs'],
        syncQueue: true,
        raf,
        jmp: (h: any) => zone.runOutsideAngular(h),
        ael(elm, eventName, cb, opts) {
          (elm as any)[aelFn](eventName, cb, opts);
        },
        rel(elm, eventName, cb, opts) {
          elm.removeEventListener(eventName, cb, opts);
        },
      });
    }
  };
};
