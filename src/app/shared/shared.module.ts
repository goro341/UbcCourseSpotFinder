import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import { NiceSelectComponent } from './nice-select/nice-select.component';
import {FooterComponent} from './footer/footer.component';
import {HeaderComponent} from './header/header.component';
import { PublicSpinnerComponent } from './public-spinner/public-spinner.component';

@NgModule({
    declarations: [FooterComponent, HeaderComponent, NiceSelectComponent, PublicSpinnerComponent],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule
    ],
    exports: [
        NiceSelectComponent, FooterComponent, HeaderComponent, PublicSpinnerComponent
    ]
})
export class SharedModule { }
