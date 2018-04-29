const projectsList = require('./projects/data');

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
