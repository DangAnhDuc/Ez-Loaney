import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", loadChildren: "./home/home.module#HomePageModule" },
  {
    path: "newfeed/:uid",
    loadChildren: "./newfeed/newfeed.module#NewfeedPageModule"
  },
  { path: "chats/:uid", loadChildren: "./chats/chats.module#ChatsPageModule" },
  {
    path: "searchusers/:uid",
    loadChildren: "./searchusers/searchusers.module#SearchusersPageModule"
  },
  {
    path: "contactchat/:uid",
    loadChildren: "./contactchat/contactchat.module#ContactchatPageModule"
  },
  {
    path: "profile/:uid",
    loadChildren: "./profile/profile.module#ProfilePageModule"
  },
  { path: 'userlisting/:uid', loadChildren: './userlisting/userlisting.module#UserlistingPageModule' },
  { path: 'userrented/:uid', loadChildren: './userrented/userrented.module#UserrentedPageModule' },
  { path: 'itemdetail/:id', loadChildren: './itemdetail/itemdetail.module#ItemdetailPageModule' }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
