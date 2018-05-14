const projectsList = require('./projects/data');
const fs = require('fs');
const sharp = require('sharp');
const glob = require('glob');

// async function getProjectImages(list) {
//   for (let i = 0; i < list.length; i++) {
//     const element = list[i];
//     let projectDir = fs.existsSync('./public/img/projects/' + element.seoUrl);
//     let imageDir = fs.existsSync('./public/img/projects/' + element.seoUrl + '/initial/');

//     if (!projectDir) {
//       fs.mkdirSync('./public/img/projects/' + element.seoUrl);
//     }
//     if (!imageDir) {
//       fs.mkdirSync('./public/img/projects/' + element.seoUrl + '/initial');
//     }
//     let initialImages = fs.readdirSync('./public/img/projects/' + element.seoUrl + '/initial/', (err, items) => {
//       if (err) throw err;
//       return items;
//     });
//     for (let i = 0; i < initialImages.length; i++) {
//       const img = initialImages[i];
//       await sharp('./public/img/projects/' + element.seoUrl + '/initial/' + img)
//         .rotate()
//         .resize(800, 800)
//         .max()
//         .withoutEnlargement()
//         .toFile('./public/img/projects/' + element.seoUrl + '/' + img, function(err) {
//           if (err) {
//             throw err;
//           }
//         });
//     }
//     let images = await glob('./public/img/projects/' + element.seoUrl + '/*.+(jpg|JPG)', (err, items) => {
//       if (err) throw err;
//       if (items.length > 0) {
//         items = items.map(el => {
//           return el.slice(8);
//         });
//         element.thumb = items[0];
//         element.img = items;
//       }
//     });
//   }
//   return list;
// }

projectsList.forEach(element => {
  let projectDir = fs.lstatSync('./public/img/projects/' + element.seoUrl);
  let imageDir = fs.lstatSync('./public/img/projects/' + element.seoUrl + '/initial/');

  if (!projectDir.isDirectory()) {
    fs.mkdirSync('./public/img/projects/' + element.seoUrl);
  }
  if (!imageDir.isDirectory()) {
    fs.mkdirSync('./public/img/projects/' + element.seoUrl + '/initial/');
  }

  // let initialImages = fs.readdirSync('./public/img/projects/' + element.seoUrl + '/initial/', (err, items) => {
  //   if (err) throw err;
  //   return items;
  // });
  // initialImages.forEach(img => {
  //   sharp('./public/img/projects/' + element.seoUrl + '/initial/' + img)
  //     .rotate()
  //     .resize(800, 800)
  //     .max()
  //     .withoutEnlargement()
  //     .toFile('./public/img/projects/' + element.seoUrl + '/' + img, function(err) {
  //       if (err) {
  //         console.log(err);
  //         throw err;
  //       }
  //     });
  // });
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
