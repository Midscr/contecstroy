const projectsList = require('./projects/data');
const fs = require('fs');
const sharp = require('sharp');
const glob = require('glob');

projectsList.forEach(element => {
  let initialImages = fs.readdirSync('./public/img/projects/' + element.seoUrl + '/initial/', (err, items) => {
    if (err) throw err;
    return items;
  });

  initialImages.forEach(img => {
    sharp('./public/img/projects/' + element.seoUrl + '/initial/' + img)
      .rotate()
      .resize(800, 800)
      .max()
      .withoutEnlargement()
      .toFile('./public/img/projects/' + element.seoUrl + '/' + img, function(err) {
        if (err) {
          console.log(err);
          throw err;
        }
      });
  });
  let images = glob('./public/img/projects/' + element.seoUrl + '/*.+(jpg|JPG)', (err, items) => {
    if (err) throw err;
    if (items.length > 0) {
      items = items.map(el => {
        return el.slice(8);
      });
      element.thumb = items[0];
      element.img = items;
    }
  });
});

module.exports = function(city) {
  let info = {
    title: {
      title: 'Проекты компании Контекстрой',
      subTitle: 'Строительная компания Контекстрой'
    },
    projectsList: projectsList
  };

  return info;
};
