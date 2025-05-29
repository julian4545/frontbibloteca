import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";
import { MapComponent } from "../../pages/map/map.component";
import { NotificationsComponent } from "../../pages/notifications/notifications.component";
import { UserComponent } from "../../pages/user/user.component";
import { TablesComponent } from "../../pages/tables/tables.component";
import { TypographyComponent } from "../../pages/typography/typography.component";

// Importar todos los componentes de los módulos nuevos
import { UsuarioComponent } from "src/app/pages/pagesdebio/usuario/usuario.component";
import { RolComponent } from "src/app/pages/pagesdebio/rol/rol.component";
import { UsuarioRolComponent } from "src/app/pages/pagesdebio/usuario-rol/usuario-rol.component";
import { AutorComponent } from "src/app/pages/pagesdebio/autor/autor.component";
import { CategoriaComponent } from "src/app/pages/pagesdebio/categoria/categoria.component";
import { EditorialComponent } from "src/app/pages/pagesdebio/editorial/editorial.component";
import { LibroComponent } from "src/app/pages/pagesdebio/libro/libro.component";
import { PrestamoComponent } from "src/app/pages/pagesdebio/prestamo/prestamo.component";
import { EntregaComponent } from "src/app/pages/pagesdebio/entrega/entrega.component";
import { TarifaComponent } from "src/app/pages/pagesdebio/tarifa/tarifa.component";
import { ReservaComponent } from "src/app/pages/pagesdebio/reserva/reserva.component";
import { MultaComponent } from "src/app/pages/pagesdebio/multa/multa.component";
import { NotificacionComponent } from "src/app/pages/pagesdebio/notificacion/notificacion.component";
import { ResenaComponent } from "src/app/pages/pagesdebio/resena/resena.component";

export const AdminLayoutRoutes: Routes = [
  { path: "dashboard", component: DashboardComponent },
  { path: "usuario", component: UsuarioComponent },
  { path: "rol", component: RolComponent },
  { path: "usuario-rol", component: UsuarioRolComponent },
  { path: "autor", component: AutorComponent },
  { path: "categoria", component: CategoriaComponent },
  { path: "editorial", component: EditorialComponent },
  { path: "libro", component: LibroComponent },
  { path: "prestamo", component: PrestamoComponent },
  { path: "entrega", component: EntregaComponent },
  { path: "tarifa", component: TarifaComponent },
  { path: "reserva", component: ReservaComponent },
  { path: "multa", component: MultaComponent },
  { path: "notificacion", component: NotificacionComponent },
];
