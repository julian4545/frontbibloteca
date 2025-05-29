import { Component, OnInit } from "@angular/core";

declare interface RouteInfo {
  path: string;
  title: string;
  rtlTitle: string;
  icon: string;
  class: string;
}
export const ROUTES: RouteInfo[] = [

  {
    path: "/usuario",
    title: "Usuario",
    rtlTitle: "المستخدم",
    icon: "icon-single-02",
    class: ""
  },
  {
    path: "/rol",
    title: "Rol",
    rtlTitle: "الدور",
    icon: "icon-badge",
    class: ""
  },
  {
    path: "/usuario-rol",
    title: "UsuarioRol",
    rtlTitle: "دور المستخدم",
    icon: "icon-lock-circle",
    class: ""
  },
  {
    path: "/autor",
    title: "Autor",
    rtlTitle: "المؤلف",
    icon: "icon-pencil",
    class: ""
  },
  {
    path: "/categoria",
    title: "Categoria",
    rtlTitle: "الفئة",
    icon: "icon-tag",
    class: ""
  },
  {
    path: "/editorial",
    title: "Editorial",
    rtlTitle: "دار النشر",
    icon: "icon-book-bookmark",
    class: ""
  },
  {
    path: "/libro",
    title: "Libro",
    rtlTitle: "الكتاب",
       icon: "icon-lock-circle",
    class: ""
  },
  {
    path: "/prestamo",
    title: "Prestamo",
    rtlTitle: "الإعارة",
    icon: "icon-time-alarm",
    class: ""
  },
  {
    path: "/entrega",
    title: "Entrega",
    rtlTitle: "التسليم",
    icon: "icon-upload",
    class: ""
  },
  {
    path: "/tarifa",
    title: "Tarifa",
    rtlTitle: "الرسوم",
    icon: "icon-money-coins",
    class: ""
  },
  {
    path: "/reserva",
    title: "Reserva",
    rtlTitle: "الحجز",
     icon: "icon-chat-33",
    class: ""
  },
  
  {
    path: "/multa",
    title: "Multa",
    rtlTitle: "الغرامة",
    icon: "icon-alert-circle-exc",
    class: ""
  },
  {
    path: "/notificacion",
    title: "Notificacion",
    rtlTitle: "الإشعار",
    icon: "icon-bell-55",
    class: ""
  },
  {
    path: "/notificacion",
    title: "Notificacion",
    rtlTitle: "الإشعار",
    icon: "icon-bell-55",
    class: ""
  }
];


@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"]
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() {}

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
    if (window.innerWidth > 991) {
      return false;
    }
    return true;
  }
}
