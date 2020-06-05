/* Imports */
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
am4core.useTheme(am4themes_animated);

export class ChartBar {
    chart: any;
    series: any;
    dateAxis: any;
    constructor(chartDiv: string) {
        let chart: any = this.chart = am4core.create(chartDiv, am4charts.XYChart);

        // Set input format for the dates
        chart.dateFormatter.inputDateFormat = "yyyy-MM-dd";

        // Create axes
        let dateAxis = this.dateAxis = chart.xAxes.push(new am4charts.DateAxis());
        let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
        this.createSeries();
        this.createBullet();
        this.createCursor();
        this.createScrollbar();
    }

    createSeries() {
        // Create series
        let series = this.series = this.chart.series.push(new am4charts.ColumnSeries());
        series.dataFields.valueY = "value";
        series.dataFields.dateX = "date";
        series.tooltipText = "{value}"
        series.strokeWidth = 2;
        series.minBulletDistance = 15;

        // Drop-shaped tooltips
        series.tooltip.background.cornerRadius = 20;
        series.tooltip.background.strokeOpacity = 0;
        series.tooltip.pointerOrientation = "vertical";
        series.tooltip.label.minWidth = 40;
        series.tooltip.label.minHeight = 40;
        series.tooltip.label.textAlign = "middle";
        series.tooltip.label.textValign = "middle";
    }

    createBullet() {
        // Make bullets grow on hover
        let bullet = this.series.bullets.push(new am4charts.CircleBullet());
        bullet.circle.strokeWidth = 2;
        bullet.circle.radius = 4;
        bullet.circle.fill = am4core.color("#fff");

        let bullethover = bullet.states.create("hover");
        bullethover.properties.scale = 1.3;
    }

    createCursor() {
        let chart = this.chart;
        // Make a panning cursor
        chart.cursor = new am4charts.XYCursor();
        chart.cursor.behavior = "panXY";
        chart.cursor.xAxis = this.dateAxis;
        chart.cursor.snapToSeries = this.series;
    }

    createScrollbar() {
        let chart = this.chart;
        // Create vertical scrollbar and place it before the value axis
        chart.scrollbarY = new am4core.Scrollbar();
        chart.scrollbarY.parent = chart.leftAxesContainer;
        chart.scrollbarY.toBack();

        // Create a horizontal scrollbar with previe and place it underneath the date axis
        chart.scrollbarX = new am4charts.XYChartScrollbar();
        chart.scrollbarX.series.push(this.series);
        chart.scrollbarX.parent = chart.bottomAxesContainer;
    }
}
