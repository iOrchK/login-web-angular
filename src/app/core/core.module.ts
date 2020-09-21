import { NgModule, Optional, SkipSelf } from '@angular/core';
import { StorageService } from './services/storage.service';
import { AuthorizatedGuard } from './guards/authorizated.guard';
import { SecurityDataService } from './services/security-data.service';

@NgModule({
  declarations: [],
  imports: [],
  providers: [StorageService, AuthorizatedGuard, SecurityDataService],
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
