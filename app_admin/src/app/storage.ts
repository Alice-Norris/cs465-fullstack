import { Inject, InjectionToken } from "@angular/core";
import { rootRenderNodes } from "@angular/core/src/view";

export const BROWSER_STORAGE = new InjectionToken<Storage>('Browser Storage', {
  providedIn: 'root',
  factory: () => localStorage
});