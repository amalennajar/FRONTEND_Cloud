import { DOCUMENT } from "@angular/common";
import {
  Component,
  Inject,
  ElementRef,
  OnInit,
  Renderer2,
  AfterViewInit,
} from "@angular/core";
import { Router } from "@angular/router";
import { ConfigService } from "src/app/config/config.service";
import { AuthService } from "src/app/core/service/auth.service";
import { RightSidebarService } from "src/app/core/service/rightsidebar.service";
import { LanguageService } from "src/app/core/service/language.service";
import { UnsubscribeOnDestroyAdapter } from "src/app/shared/UnsubscribeOnDestroyAdapter";
const document: any = window.document;
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';



@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit
{
  public config: any = {};
  userName:string;
  userImg: string;
  homePage: string;
  isNavbarCollapsed = true;
  flagvalue;
  countryName;
  langStoreValue: string;
  defaultFlag: string;
  userFullName: string;
  isOpenSidebar: boolean;
  firstname: string = "";
  lastname: string = "";
  imageUrl: any;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private rightSidebarService: RightSidebarService,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    public languageService: LanguageService
  ) {
    super();

  }
  listLang = [
    { text: "English", flag: "assets/images/flags/us.svg", lang: "en" },
    { text: "Spanish", flag: "assets/images/flags/spain.svg", lang: "es" },
    { text: "German", flag: "assets/images/flags/germany.svg", lang: "de" },
  ];

  notifications: Observable<any[]>

  ngOnInit() {
    this.config = this.configService.configData;
    const userRole = this.authService.currentUserValue.role;
    this.userImg = this.authService.currentUserValue.img;
    this.userName=this.authService.currentUserValue.firstName+" "+this.authService.currentUserValue.lastName
    this.userFullName =    this.authService.currentUserValue.firstName + " " + this.authService.currentUserValue.lastName;
    if (userRole === "admin") {
      this.homePage = "admin/dashboard/main";
    } else if (userRole === "patient") {
      this.homePage = "patient/dashboard";
    } else if (userRole === "doctor") {
      this.homePage = "doctor/dashboard";
    } else {
      this.homePage = "admin/dashboard/main";
    }

    this.langStoreValue = localStorage.getItem("lang");
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = "assets/images/flags/us.svg";
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
    this.loadavatar();
  }
  loadavatar(){
    this.firstname = this.authService.currentUserValue.firstName;
    console.log(this.firstname)
   this.lastname = this.authService.currentUserValue.lastName;
  this.imageUrl = `https://ui-avatars.com/api/?background=random&name=${this.firstname}+${this.lastname}?background=random`;
  }
  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }
  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }
  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }
  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }
  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(["/authentication/signin"]);
      }
    });
  }
}
