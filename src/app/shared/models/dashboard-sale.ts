export class DashboardSale {
    totalSales: number;
    totalSalesInReal: number;
    mediaSalesByHour: number;
    mediaSalesByParking: number;
    sales: Sale[];
}

class Sale {
    value: number;
    dataPay: Date;
}