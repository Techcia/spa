import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
import { ProductionSiteService } from 'app/modules/production-site/services/production-site.service';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { ModalSuccessReprintComponent } from 'app/modules/production-site/components/modal-success-reprint/modal-success-reprint.component';
@Component({
    selector: 'scrumboard-board-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardCardComponent implements OnInit {
    @Input() card;
    time = '00:00';
    confirmDialogRef: MatDialogRef<ModalSuccessReprintComponent>;
    constructor(private psService: ProductionSiteService, public _matDialog: MatDialog, ) { }

    ngOnInit(): void {


        this.timeCard();
        setInterval(() => {
            this.timeCard();
        }, 5000)

        // console.log(moment.utc(moment(now, "DD/MM/YYYY HH:mm:ss").diff(this.card.date)).format("HH:mm:ss"))

    }

    timeCard() {
        var duration = moment.duration(moment().diff(moment(this.card.date)));
        var hours = duration.asHours().toFixed(2);
        let str = hours.toString().split('.');
        let minutes = (60 * parseInt(str[1])) / 100;

        let minutesStr = '00';
        if (minutes < 10) {
            minutesStr = '0' + Math.round(minutes).toString();
        } else {
            minutesStr = Math.round(minutes).toString();
        }

        let hourStr = '00';
        if (parseInt(str[0]) < 10 && parseInt(str[0]) >= 0) {
            hourStr = '0' + Math.abs(parseInt(str[0])).toString();
        } else if (parseInt(str[0]) > -10 && parseInt(str[0]) < 0) {
            hourStr = '-0' + Math.abs(parseInt(str[0])).toString();
        } else if (parseInt(str[0]) <= -10) {
            hourStr = '-' + Math.abs(parseInt(str[0])).toString();
        } else {
            hourStr = Math.abs(parseInt(str[0])).toString();
        }

        this.time = hourStr + ":" + minutesStr;
    }

    reprintNote() {
  
        this.psService.reprintNote(this.card).subscribe(res => {
            this.openModal();
        });
    }

    openModal() {
        const dialogRef = this._matDialog.open(ModalSuccessReprintComponent);
    }

}
