import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment';
@Component({
    selector: 'scrumboard-board-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ScrumboardBoardCardComponent implements OnInit {
    @Input() card;
    time = '00:00';
    constructor() { }

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
        this.time = str[0] + ":" + Math.round(minutes).toString();
    }
}
