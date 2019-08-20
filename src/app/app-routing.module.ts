import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomePageModule',
    canActivate: [AuthGuard],
  },
  {
    path: 'list',
    loadChildren: './list/list.module#ListPageModule',
    canActivate: [AuthGuard],
  },
  { 
    path: 'addadresse', 
    loadChildren: './addadresse/addadresse.module#AddadressePageModule',
    canActivate: [AuthGuard],
  },
  { 
    path: 'addreference', 
    loadChildren: './addreference/addreference.module#AddreferencePageModule',
    canActivate: [AuthGuard],
  },
  { path: 'login', 
  loadChildren: './login/login.module#LoginPageModule'
 },
  { path: 'addref', loadChildren: './addref/addref.module#AddrefPageModule' },
  { path: 'addreference', loadChildren: './addreference/addreference.module#AddreferencePageModule' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
