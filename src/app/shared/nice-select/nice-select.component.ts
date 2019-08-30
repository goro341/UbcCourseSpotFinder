import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

/**
 * How to use?
 * You need to define a dropdown list which is a list of objects with the following structure:
 * 1. should include a property called: name which is the one that appears in the select and user can see
 * 2. (optional but recommended) a unique identifier that distinguishes different types.
 */

@Component({
    selector: 'app-nice-select',
    templateUrl: './nice-select.component.html',
    styleUrls: ['./nice-select.component.scss']
})
export class NiceSelectComponent implements OnInit, AfterViewInit {
    private static niceSelectId = 0;
    niceSelectName: string; // uniqueName
    @Output() changeEmitter = new EventEmitter();
    @Input() dropdownList: string[];
    @Input() currentSelected: string;
    @Input() cssClass: string;
    @Input() label: string;

    @ViewChild('spanElement')
    spanElement: any;

    @ViewChild('uListElement')
    uListElement: any;

    constructor() {
        NiceSelectComponent.niceSelectId++;
        this.niceSelectName = `nice-select${NiceSelectComponent.niceSelectId}`;
    }

    onValueChange(clinicId: number) {
        this.changeEmitter.emit(clinicId);
    }

    setCurrentSelected(curSelected: string) {
        $(`#${this.niceSelectName}`).ready(() => {
            const isCurrentSelectedFromDropdownList = (dropdownList, cs) => {
                return dropdownList.map(c => c.name).includes(cs);
            };
            if (isCurrentSelectedFromDropdownList(this.dropdownList, curSelected)) {
                this.currentSelected = curSelected;
                const ulChildrenHtmlCollection = this.uListElement.nativeElement.children;
                for (let i = 0; i < ulChildrenHtmlCollection.length; i++) {
                    const child = ulChildrenHtmlCollection[i];
                    if (child.innerHTML === curSelected) {
                        child.setAttribute('class', 'option selected focus');
                    }
                }
            }
        });
    }

    ngOnInit() {
        if (!this.currentSelected) { // || !isCurrentSelectedFromDropdownList()) {
            this.currentSelected = '';
            if (this.label) {
                this.currentSelected = this.label;
            }
        }
    }
    getNiceSelectCssClass() {
        if (this.cssClass) {
            return `nice-select ${this.cssClass}`;
        } else {
            return `nice-select`;
        }
    }

    isAnySelected() {
        const ulChildrenHtmlCollection = this.uListElement.nativeElement.children;
        console.log(ulChildrenHtmlCollection.length);
        for (let i = 1; i < ulChildrenHtmlCollection.length; i++) {
            const child = ulChildrenHtmlCollection[i];
            // console.log(child.getAttribute('class'));
            if (child.getAttribute('class').includes('selected')) {
                return true;
            }
        }
        return false;
    }

    ngAfterViewInit(): void {
        if (this.dropdownList && this.dropdownList.length === 1) {
            $(`#${this.niceSelectName} .current`).text(this.dropdownList[0].name);
        }
    }

    resetDropdown() {
        if (this.label) {
            this.spanElement.nativeElement.innerText = this.label;
        } else {
            this.spanElement.nativeElement.innerText = '';
        }
        const ulChildrenHtmlCollection = this.uListElement.nativeElement.children;
        ulChildrenHtmlCollection[0].setAttribute('class', 'option selected disabled focus');
        for (let i = 1; i < ulChildrenHtmlCollection.length; i++) {
            const child = ulChildrenHtmlCollection[i];
            child.setAttribute('class', 'option');
        }
    }
}
