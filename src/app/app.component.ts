import { Component } from '@angular/core';
import {swalError} from '../common/utils';
import {NgForm} from '@angular/forms';
import {SwalError} from '../common/interfaces';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    title = 'UbcSpotFinder';

    onSubmit(form: NgForm) {
        const formData = {
            email: form.value.courseName,
            password: form.value.email
        };
        console.log(formData);
    }
}
