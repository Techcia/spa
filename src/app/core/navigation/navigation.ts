import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'home',
        title: 'Home',
        translate: 'NAV.HOME',
        type: 'item',
        icon: 'home',
        url: '/home',
    },
    {
        id: 'parking',
        title: 'Estacionamento',
        translate: 'NAV.PARKING',
        type: 'item',
        icon: 'local_parking',
        url: '/parking',
    },

    {
        id: 'dashboards',
        title: 'Dashboards',
        translate: 'NAV.DASHBOARDS',
        type: 'item',
        icon: 'dashboard',
        url  : '/apps/dashboards/project',
    },
];
