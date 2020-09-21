import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { SecurityDataService } from './services/security-data.service';
import { InterceptorService } from './services/interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [],
  providers: [
    StorageService,
    AuthorizatedGuard,
    SecurityDataService,
    { provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },
  ],
  bootstrap: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}
