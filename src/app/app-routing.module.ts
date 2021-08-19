import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GoPageComponent } from './views/go-page/go-page.component';
import { RecentlyAddedPageComponent } from './views/recently-added-page/recently-added-page.component';
import { SettingsPageComponent } from './views/settings-page/settings-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/add', pathMatch: 'full' },
  { path: 'add', component: RecentlyAddedPageComponent },
  {
    path: 'go',
    component: GoPageComponent,
  },
  { path: 'settings', component: SettingsPageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
