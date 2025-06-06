import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "../pages/login/login.component";
import { SignUpComponent } from "../pages/sign-up/sign-up.component";
import { HomeComponent } from "../pages/home/home.component";
import { AccountComponent } from "../pages/account/account.component";
import { DepositComponent } from "../pages/deposit/deposit.component";
import { ExtractComponent } from "../pages/extract/extract.component";
import { WithdrawComponent } from "../pages/withdraw/withdraw.component";
import { TransferComponent } from "../pages/transfer/transfer.component";

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "sign-up", component: SignUpComponent },
  { path: "home", component: HomeComponent },
  { path: "", component: HomeComponent },
  { path: "account", component: AccountComponent },
  { path: "deposit", component: DepositComponent },
  { path: "withdraw", component: WithdrawComponent },
  { path: "extract", component: ExtractComponent },
  { path: "transfer", component: TransferComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
