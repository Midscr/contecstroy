module.exports = function(city) {
  let info = {
    title: {
      title: 'Промышленные полы ' + city.city,
      subTitle: 'Профессионально выполним устройство промышленных полов ' + city.prepositionalCity
    },
    company: {
      name: 'ООО КонтекСтрой',
      logo: '/img/logo.jpg',
      workTime: 'Пн-Сб: 07:00-21:00',
      weekend: 'Вс',
      tel: '8(804) 333-70-60',
      fax: '8(495) 300-00-00',
      email: 'manager@adres.ru',
      messengers: [
        {
          name: 'Viber',
          img: '/img/viber-logo.png',
          link: '/'
        },
        {
          name: 'Whatsapp',
          img: '/img/whatsapp-logo.png',
          link: '/'
        },
        {
          name: 'Telegram',
          img: '/img/telegram-logo.png',
          link: '/'
        }
      ],
      socials: [
        {
          name: 'Vkontakte',
          img: '/img/vk-logo.png',
          link: '/'
        },
        {
          name: 'Instagram',
          img: '/img/instagram-logo.png',
          link: '/'
        }
      ],
      legal: [
        ['Наименование', 'ИП Хализов Александр Сергеевич'],
        ['ИНН', '260806481409'],
        ['ОГРН', '315265100027855'],
        ['Расчетный счет', '40802810200000153158'],
        ['Банк', 'АО "Тинькофф Банк"'],
        ['БИК Банка', '044525974']
      ]
    },
    text: {
      title: 'О нас',
      text:
        '<p>Блок описания материаллов</p><p>Эпоксидные полимерные полы представляют собой одну из разновидностей полимерных покрытий, предназначенных для защиты бетонного напольного покрытия.</p><p>Может наносится только на ровное и заранее подготовленной основание. При соблюдении всех правил монтажа и ухода, такое покрытие может прослужить длительный срок.</p>'
    },
    leaders: [
      {
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор1',
        edu: 'Инженер строитель высшей категории',
        exp: '5 лет по 3-5 запросам',
        thumb: '/img/gray-foto-circle.png'
      },
      {
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор2',
        edu: 'Инженер строитель высшей категории',
        exp: '5 лет по 3-5 запросам',
        thumb: '/img/gray-foto-circle.png'
      },
      {
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор3',
        edu: 'Инженер строитель высшей категории',
        exp: '5 лет по 3-5 запросам',
        thumb: '/img/gray-foto-circle.png'
      },
      {
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор4',
        edu: 'Инженер строитель высшей категории',
        exp: '5 лет по 3-5 запросам',
        thumb: '/img/gray-foto-circle.png'
      },
      {
        name: 'Иванов Иван Иванович',
        position: 'Генеральный директор5',
        edu: 'Инженер строитель высшей категории',
        exp: '5 лет по 3-5 запросам',
        thumb: '/img/gray-foto-circle.png'
      }
    ]
  };

  return info;
};
