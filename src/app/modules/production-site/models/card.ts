import { ProductionSite } from './production-site';
import { Item } from './item';

export class Card {
    id: number;
    productionSite: ProductionSite;
    status: string;
    date: Date;
    number: number;
    itens: Item[];
}
