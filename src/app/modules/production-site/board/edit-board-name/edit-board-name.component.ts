import { Component, EventEmitter, Input, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
    selector: 'scrumboard-edit-board-name',
    templateUrl: './edit-board-name.component.html',
    styleUrls: ['./edit-board-name.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardEditBoardNameComponent {
    @Input() name;
    constructor() { }
}
