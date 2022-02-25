import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { Page1Component } from './pages/page1/page1.component';


const routes: Routes = [
  {
    path:'login', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path:'page1', loadChildren: () => import('./pages/page1/page1.module').then(m => m.Page1Module),
    canActivate: [AuthGuard]

  },
  {
    path:'page2', loadChildren: () => import('./pages/page2/page2.module').then(m => m.Page2Module),
    canActivate: [AuthGuard]
  },
  {
    path:'page3', loadChildren: () => import('./pages/page3/page3.module').then(m => m.Page3Module),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
