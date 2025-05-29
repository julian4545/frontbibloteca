import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from "./app.component";
import { AdminLayoutComponent } from "./layouts/admin-layout/admin-layout.component";
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { AppRoutingModule } from "./app-routing.module";
import { ComponentsModule } from "./components/components.module";
import { UsuarioComponent } from './pages/pagesdebio/usuario/usuario.component';
import { RolComponent } from './pages/pagesdebio/rol/rol.component';
import { UsuarioRolComponent } from './pages/pagesdebio/usuario-rol/usuario-rol.component';
import { AutorComponent } from './pages/pagesdebio/autor/autor.component';
import { CategoriaComponent } from './pages/pagesdebio/categoria/categoria.component';
import { EditorialComponent } from './pages/pagesdebio/editorial/editorial.component';
import { LibroComponent } from './pages/pagesdebio/libro/libro.component';
import { PrestamoComponent } from './pages/pagesdebio/prestamo/prestamo.component';
import { EntregaComponent } from './pages/pagesdebio/entrega/entrega.component';
import { TarifaComponent } from './pages/pagesdebio/tarifa/tarifa.component';
import { ReservaComponent } from './pages/pagesdebio/reserva/reserva.component';
import { ResenaComponent } from './pages/pagesdebio/resena/resena.component';
import { MultaComponent } from './pages/pagesdebio/multa/multa.component';
import { NotificacionComponent } from './pages/pagesdebio/notificacion/notificacion.component';
import { LoginComponent } from './pages/login/login.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    AppRoutingModule,
    ToastrModule.forRoot()
  ],
  declarations: [AppComponent, AdminLayoutComponent, AuthLayoutComponent, UsuarioComponent, RolComponent, UsuarioRolComponent, AutorComponent, CategoriaComponent, EditorialComponent, LibroComponent, PrestamoComponent, EntregaComponent, TarifaComponent, ReservaComponent, ResenaComponent, MultaComponent, NotificacionComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
