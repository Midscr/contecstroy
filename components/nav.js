const navTop = [
  { link: '/nashi-klienty', title: 'Наши клиенты', icon: '/img/users.png' },
  { link: '/aboutcompany', title: 'О компании', icon: '/img/diamond.png' },
  { link: '/cert', title: 'Сертификаты', icon: '/img/list.png' },
  { link: '/geography', title: 'География работы', icon: '/img/placeholder.png' },
  { link: '/equipment', title: 'Оборудование', icon: '/img/forklift.png' },
  { link: '/materials', title: 'Материалы', icon: '/img/warehouse.png' }
];
const navBottom = [
  { link: '/', title: 'Главная' },
  {
    link: '/materials',
    title: 'Промышленные полы',
    subMenu: [{ links: '#', text: 'Полимерные полы' }, { links: 'industrial.html', text: 'Бетонные полы' }, { links: '#', text: 'Топпинговые полы' }]
  },
  { link: '/panels', title: 'Сендвич панели' },
  { link: '/materials', title: 'Мягкая кровля' },
  { link: '/proects', title: 'Проекты' },
  { link: '/contacts', title: 'Контакты' }
];
const navAnchor = [
  { link: '#', text: 'Услуги и цены' },
  { link: '#', text: 'Оборудование' },
  { link: '#', text: 'Наши проекты' },
  { link: '#', text: 'Наши проекты' }
];

module.exports = { navTop: navTop, navBottom: navBottom, navAnchor: navAnchor };
