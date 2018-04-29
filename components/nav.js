const subMenuFloors = require('./floorsList');
const subMenuRoofs = require('./roofsList');
const subMenuPanels = require('./panelsList');

const navTop = [
  { link: '/nashi-klienty', title: 'Наши клиенты', icon: '/img/users.png' },
  { link: '/aboutcompany', title: 'О компании', icon: '/img/diamond.png' },
  { link: '/cert', title: 'Сертификаты', icon: '/img/list.png' },
  { link: '/geography', title: 'География работы', icon: '/img/placeholder.png' },
  { link: '/equipment', title: 'Оборудование', icon: '/img/forklift.png' },
  { link: '/materials', title: 'Материалы', icon: '/img/warehouse.png' }
];
let navBottom = [
  { link: '/', title: 'Главная' },
  {
    link: '/materials',
    title: 'Промышленные полы',
    subMenu: ''
  },
  {
    link: '/panels',
    title: 'Сендвич панели',
    subMenu: ''
  },
  {
    link: '/roofs',
    title: 'Мягкая кровля',
    subMenu: ''
  },
  { link: '/proects', title: 'Проекты' },
  { link: '/contacts', title: 'Контакты' }
];
const navAnchor = [
  { link: '#', text: 'Услуги и цены' },
  { link: '#', text: 'Оборудование' },
  { link: '#', text: 'Наши проекты' },
  { link: '#', text: 'Наши проекты' }
];

if (subMenuFloors.length > 1) {
  navBottom.find(item => item.link === '/materials').subMenu = subMenuFloors;
} else {
  navBottom.find(item => item.link === '/materials').link = subMenuFloors[0].links;
}
if (subMenuRoofs.length > 1) {
  navBottom.find(item => item.link === '/roofs').subMenu = subMenuRoofs;
} else {
  navBottom.find(item => item.link === '/roofs').link = subMenuRoofs[0].links;
}
if (subMenuPanels.length > 1) {
  navBottom.find(item => item.link === '/panels').subMenu = subMenuPanels;
} else {
  navBottom.find(item => item.link === '/panels').link = subMenuPanels[0].links;
}

module.exports = { navTop: navTop, navBottom: navBottom, navAnchor: navAnchor };
