import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import {BlogComponent} from './views/blog/blog.component';
import {PostComponent} from './views/post/post.component';
import {DashboardsComponent} from './views/dashboards/dashboards.component';
import {NewPostComponent} from './new-post/new-post.component';
import {FaqComponent} from './views/faq/faq.component';
import {NewFaqComponent} from './views/new-faq/new-faq.component';
import {CreateFaqComponent} from './views/create-faq/create-faq.component';
import { AuthGuard } from './auth.guard';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [

      {
        path: 'createFaq',
        component: CreateFaqComponent,
        data: {
          title: 'FAQ'
        }
      },
      {
        path: 'newFaq/:id',
        component: NewFaqComponent,
        data: {
          title: 'FAQ'
        }
      },

      {
        path: 'rules',
        component: FaqComponent,
        data: {
          title: 'FAQ'
        }
      },

      {
        path: 'blog',
        component: BlogComponent,
        data: {
          title: 'Blogs'
        }
      },
      {
        path: 'dashboard',
        component: DashboardsComponent,
        canActivate : [AuthGuard],
        data: {
          title: 'dashboard'
        }
      },
      {
        path: 'newPost',
        component: NewPostComponent,
        data: {
          title: 'newPost'
        }
      },
      {
        path: 'getPost/:id',
        component: PostComponent,
        data: {
          title: 'Blogs'
        }
      },
      {
        path: 'base',
        loadChildren: './views/base/base.module#BaseModule'
      },
      {
        path: 'buttons',
        loadChildren: './views/buttons/buttons.module#ButtonsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      },
      // {
      //   path: 'dashboard',
      //   loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      // },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'notifications',
        loadChildren: './views/notifications/notifications.module#NotificationsModule'
      },
      {
        path: 'theme',
        loadChildren: './views/theme/theme.module#ThemeModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      }
    ]
  },
  { path: '**', component: P404Component }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
