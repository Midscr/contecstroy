const pages = require('./pages.data');
const db = require('./../modules/db');
const mail = require('.././modules/mail');
const nav = require('../components/nav');
const infoMain = require('../components/main');
const infoContact = require('../components/contact');
const infoMaterials = require('../components/materials');
const infoAbout = require('../components/aboutcompany');
const infoProjects = require('../components/projectList');
const projects = require('../components/projects/data');
const floors = require('../components/dataFloors');
const floorsList = require('../components/floorsList');
const panels = require('../components/dataPanels');
const panelsList = require('../components/panelsList');
const roofs = require('../components/dataRoofs');
const roofsList = require('../components/RoofsList');

let emptyCity = {
  population: 1000000,
  city: '',
  prepositionalCity: '',
  dativeCity: '',
  state: '',
  dativeState: '',
  accusativeState: '',
  cityEn: '',
  postAddress: '',
  emblem: ''
};

function initPagesRoutes(app) {
  Promise.all([db.getCities(), db.getDeliveryAddresses()]).then(data => {
    const cities = data[0];
    const deliveryAddresses = data[1];
    // const domain = 'localhost:4400';
    const domain = 'contecstroy.ru';
    const fromEmail = 'rb@ray-bit.ru';
    const toEmail = 'rb@ray-bit.ru';

    pages.forEach(page => {
      app.get(page.route, routeHandler(page));
    });
    projects.forEach(project => {
      app.get('/proects/' + project.seoUrl, projectPage(project));
    });
    floorsList.forEach(floor => {
      app.get(floor.links, infoPage(floor, floors));
    });
    roofsList.forEach(roof => {
      app.get(roof.links, infoPage(roof, roofs));
    });
    panelsList.forEach(panel => {
      app.get(panel.links, infoPage(panel, panels));
    });

    //POST
    app.post('/callback', function(req, res) {
      if (!req.body) {
        return res.sendStatus(400);
      } else {
        let cityDomainName = req.hostname.replace(/\..*/, '');
        let city = cities.filter(item => item.cityEn.toLowerCase() === cityDomainName)[0];
        let cityEmail = '';

        let element = {
          Имя: req.body.name,
          Телефон: req.body.phone,
          Дополнительно: {
            'Опция 1': req.body.context || '',
            'Опция 2': req.body.logo || '',
            'Опция 3': req.body.seo || '',
            'Опция 4': req.body.style || ''
          },
          Описание: req.body.description || '',
          'Раздел сайта': req.body.nameButton || ''
        };
        let message = '';
        function attachElHandler(k, v) {
          return (
            '<tr style="background-color: #f8f8f8;">' +
            '<td style="padding: 10px; border: #e9e9e9 1px solid;">' +
            '<b>' +
            k +
            '</b>' +
            '</td>' +
            '<td style="padding: 10px; border: #e9e9e9 1px solid;">' +
            v +
            '</td>' +
            '</tr>'
          );
        }
        console.log(element);
        for (let key in element) {
          if (key == 'Дополнительно') {
            for (let i in element[key]) {
              if (element[key][i]) {
                message = message + attachElHandler(i, element[key][i]);
              }
            }
          } else if (element[key] && key != 'Дополнительно') {
            message = message + attachElHandler(key, element[key]);
          }
        }
        if (!city) {
          city = emptyCity;
          cityEmail = 'Основной домен, ';
        } else {
          cityEmail = city.city + ', ';
        }
        console.log(message);
        mail.sendMail(
          {
            from: fromEmail,
            to: toEmail,
            subject: cityEmail + req.headers.referer,
            html: '<table style="width: 100%;">' + message + '</table>'
          },
          (error, info) => {
            if (error) {
              return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
          }
        );
        res.sendStatus(200);
      }
    });

    // catch 404 and forward to error handler
    app.use(function handle404(req, res, next) {
      let err = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    // error handler
    app.use(function errorHandler(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
      res.locals.city = cities.filter(item => item.cityEn.toLowerCase() === 'stavropol')[0];
      res.locals.domain = domain;

      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });

    function routeHandler(opts) {
      return (req, res, next) => {
        let cityDomainName = req.hostname.replace(/\..*/, '');
        let city = cities.filter(item => item.cityEn.toLowerCase() === cityDomainName)[0];
        let noCity = cities.filter(item => item.cityEn.toLowerCase() === 'stavropol')[0];
        emptyCity.postAddress = noCity.postAddress;

        if (!city && req.headers.host != domain) {
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else if (city) {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === city.city.toLowerCase());
          res.render(opts.indexLink, {
            title: 'Home',
            city: city || noCity,
            cities: cities,
            domain: cityDomainName + '.' + domain,
            address: address,
            route: opts.route,
            pageName: opts.pageName,
            pName: opts.pName,
            pRating: opts.pRating,
            pVotes: opts.pVotes,
            pPrice: opts.pPrice,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            navList: nav.navAnchor,
            infoMain: infoMain(city || noCity),
            contactInfo: infoContact(city || noCity),
            materialsInfo: infoMaterials(city || noCity),
            aboutInfo: infoAbout(city || noCity),
            projectsInfo: infoProjects(city || noCity)
          });
        } else {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === noCity.city.toLowerCase());
          res.render(opts.indexLink, {
            title: 'Home',
            city: noCity,
            cities: cities,
            address: address,
            domain: domain,
            route: opts.route,
            pageName: opts.pageName,
            pName: opts.pName,
            pRating: opts.pRating,
            pVotes: opts.pVotes,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            pPrice: opts.pPrice,
            navList: nav.navAnchor,
            infoMain: infoMain(noCity),
            contactInfo: infoContact(noCity),
            materialsInfo: infoMaterials(noCity),
            aboutInfo: infoAbout(noCity),
            projectsInfo: infoProjects(noCity)
          });
        }
      };
    }
    function projectPage(project) {
      return (req, res, next) => {
        let cityDomainName = req.hostname.replace(/\..*/, '');
        let city = cities.filter(item => item.cityEn.toLowerCase() === cityDomainName)[0];
        let noCity = cities.filter(item => item.cityEn.toLowerCase() === 'stavropol')[0];
        emptyCity.postAddress = noCity.postAddress;

        if (!city && req.headers.host != domain) {
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else if (city) {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === city.city.toLowerCase());
          res.render('portfolio.pug', {
            city: city || noCity,
            cities: cities,
            domain: cityDomainName + '.' + domain,
            title: project.name,
            date: project.date,
            address: project.address,
            material: project.material,
            sqare: project.sqare,
            text: project.text,
            thumb: project.thumb,
            img: project.img,
            seoUrl: project.seoUrl,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            navList: nav.navAnchor,
            infoMain: infoMain(city || noCity),
            contactInfo: infoContact(city || noCity),
            materialsInfo: infoMaterials(city || noCity),
            aboutInfo: infoAbout(city || noCity),
            projectsInfo: infoProjects(city || noCity)
          });
        } else {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === noCity.city.toLowerCase());
          res.render('portfolio.pug', {
            title: 'Home',
            city: noCity,
            cities: cities,
            address: address,
            domain: domain,
            title: project.name,
            date: project.date,
            address: project.address,
            material: project.material,
            sqare: project.sqare,
            text: project.text,
            thumb: project.thumb,
            img: project.img,
            seoUrl: project.seoUrl,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            navList: nav.navAnchor,
            infoMain: infoMain(noCity),
            contactInfo: infoContact(noCity),
            materialsInfo: infoMaterials(noCity),
            aboutInfo: infoAbout(noCity),
            projectsInfo: infoProjects(noCity)
          });
        }
      };
    }
    function infoPage(page, pageList) {
      return (req, res, next) => {
        let cityDomainName = req.hostname.replace(/\..*/, '');
        let city = cities.filter(item => item.cityEn.toLowerCase() === cityDomainName)[0];
        let noCity = cities.filter(item => item.cityEn.toLowerCase() === 'stavropol')[0];
        emptyCity.postAddress = noCity.postAddress;

        if (!city && req.headers.host != domain) {
          let err = new Error('Not Found');
          err.status = 404;
          next(err);
        } else if (city) {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === city.city.toLowerCase());
          let pageItem = pageList(city).find(item => item.name === page.name);
          res.render('industrial.pug', {
            city: city,
            cities: cities,
            domain: cityDomainName + '.' + domain,
            title: pageItem.title,
            name: pageItem.name,
            imagePath: pageItem.imagePath,
            content: pageItem.content,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            navList: nav.navAnchor,
            infoMain: infoMain(city),
            contactInfo: infoContact(city),
            materialsInfo: infoMaterials(city),
            aboutInfo: infoAbout(city)
          });
        } else {
          address = deliveryAddresses.filter(item => item.city.toLowerCase() === noCity.city.toLowerCase());
          let pageItem = pageList(noCity).find(item => item.name === page.name);
          res.render('industrial.pug', {
            title: 'Home',
            city: noCity,
            cities: cities,
            address: address,
            domain: domain,
            title: pageItem.title,
            name: pageItem.name,
            imagePath: pageItem.imagePath,
            content: pageItem.content,
            navTop: nav.navTop,
            navBottom: nav.navBottom,
            navList: nav.navAnchor,
            infoMain: infoMain(noCity),
            contactInfo: infoContact(noCity),
            materialsInfo: infoMaterials(noCity),
            aboutInfo: infoAbout(noCity)
          });
        }
      };
    }
  });
}

module.exports = initPagesRoutes;
