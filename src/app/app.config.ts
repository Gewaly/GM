import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideEchartsCore } from 'ngx-echarts';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideHttpClient(), provideEchartsCore({
    echarts: () => import('echarts')
  })
  ]
};
