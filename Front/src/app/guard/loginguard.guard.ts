import { Injectable } from "@angular/core";
import {
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    UrlTree,
    Router,
} from "@angular/router";
import { Observable } from "rxjs";
import Swal from "sweetalert2";
@Injectable({
    providedIn: "root",
})
export class LoginguardGuard implements CanActivate {
    constructor(private router: Router) { }
    canActivate() {
        if (localStorage.getItem("token") != undefined) {
            return true;
        } else {
            Swal.fire("", "Please Login", "error").then(() => {
                this.router.navigate(["/"]);
            });
        }
    }
}
