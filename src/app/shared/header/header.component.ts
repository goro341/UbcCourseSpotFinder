import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import * as $ from 'jquery';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['../../homepage/homepage.component.scss']
})
export class HeaderComponent implements OnInit {

    constructor(private route: ActivatedRoute) {
    }

    ngOnInit() {
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
