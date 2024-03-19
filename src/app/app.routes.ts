import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import {
  AuthGuard,
  redirectLoggedInTo,
  redirectUnauthorizedTo,
} from '@angular/fire/auth-guard';
import { LogoutComponent } from './auth/components/logout/logout.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { HomeComponent } from './fernanpop/pages/home/home.component';
import { ChatComponent } from './chat/components/chat/chat.component';
import { ErrorComponent } from './fernanpop/pages/error/error.component';
import { FavoritesComponent } from './fernanpop/pages/favorites/favorites.component';
import { SigninComponent } from './auth/components/signin/signin.component';
import { SearchProductsComponent } from './fernanpop/pages/search-products/search-products.component';
import { UploadProductComponent } from './fernanpop/pages/upload-product/upload-product.component';
import { DetailProductComponent } from './fernanpop/pages/detail-product/detail-product.component';
import { PerfilComponent } from './fernanpop/pages/perfil/perfil.component';
import { UpdateProductComponent } from './fernanpop/pages/update-product/update-product.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['home']),
    },
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['home']),
    },
  },

  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectLoggedInTo(['home']),
    },
  },
  {
    path: 'perfil',
    component: PerfilComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },

  {
    path: 'chat',
    component: ChatComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'search',
    component: SearchProductsComponent,
  },
  {
    path: 'upload',
    component: UploadProductComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },
  {
    path: 'update-product/:id',
    component: UpdateProductComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },
  {
    path: 'product/:id',
    component: DetailProductComponent,
  },

  {
    path: 'logout',
    component: LogoutComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
    data: {
      authGuardPipe: () => redirectUnauthorizedTo(['login']),
    },
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: '**',
    redirectTo: 'error',
  },
];
