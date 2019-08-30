import { Component, OnInit } from '@angular/core';
import {DoctorAuthService} from '../../doctors/doctor-auth/doctor-auth.service';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['../../homepage/homepage.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private authService: DoctorAuthService, private route: ActivatedRoute) {
    }

    ngOnInit() {
    }

    logout() {
        console.log('in header logout');
        this.authService.logout();
    }

    burgerMenuToggled() {
        $('.is-header').toggleClass('menu-opened');
    }

    burgerMenuLinksClicked() {
        $('.is-header').removeClass('menu-opened');
    }

    shouldLoadFilters() {
        return this.route.snapshot.firstChild.routeConfig.component.name.toLowerCase().includes('listing');
    }

    mobileFiltersClicked() {
        $('.search-filter').toggle();
    }
}
