import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import { AppModule } from "./app/app.modules";
import { registerLocaleData } from "@angular/common";
import ptBr from "@angular/common/locales/pt";

registerLocaleData(ptBr);

if (false) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
