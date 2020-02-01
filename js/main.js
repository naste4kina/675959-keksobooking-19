'use strict';

//  константы
var AD_QUANTITY = 8;

var AVATARS = ['img/avatars/user01.png', 'img/avatars/user02.png', 'img/avatars/user03.png', 'img/avatars/user04.png', 'img/avatars/user05.png', 'img/avatars/user06.png', 'img/avatars/user07.png', 'img/avatars/user08.png'];
var TITLES = ['большой дворец', 'маленький дворец', 'большая квартира', 'маленькая квартира', 'большой дом', 'маленький дом', 'большое бунгало', 'маленькое бунгало'];
var PRICE_MIN = 100;
var PRICE_MAX = 100000;
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS_MIN = 1;
var ROOMS_MAX = 8;
var GUESTS_MIN = 1;
var GUESTS_MAX = 10;
var CHECKIN_TIME = ['12:00', '13:00', '14:00'];
var CHECKOUT_TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];

var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var LOCATION_X_MIN = 0;
var LOCATION_X_MAX = 1200;

//  массив из исходного
var shuffleArray = function (array) {
  var newArray = [];
  var tempArray = array.slice();
  // var arrayCount = length ? length - 1 : tempArray.length - 1;
  array.forEach(function () {
     // for (var i = 0; i <= arrayCount; i++) {
    var randomId = getRandomIntInclusive(0, tempArray.length - 1);
    newArray.push(tempArray[randomId]); //  записываем
    tempArray.splice(randomId, 1); // удаляем временный
  });
  return newArray;
};

//  случайное число min-max
var getRandomIntInclusive = function (min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

//  случайное положение
var getRandomLocation = function () {
  var location = {};
  location.x = getRandomIntInclusive(LOCATION_X_MIN, LOCATION_X_MAX);
  location.y = getRandomIntInclusive(LOCATION_Y_MIN, LOCATION_Y_MAX);
  return location;
};

//  случайный элемент
var getRandomArrayElement = function (array) {
  var id = Math.floor(Math.random() * array.length);
  var element = array[id];
  return element;
};

//  создаем массив
var generateAdArray = function () {
  var array = [];
  array.forEach(function () {
    // for (var i = 0; i < amount; i++) {
    var advert = generateRandomAd();
    array.push(advert);
  });
  return array;
};

// cоздаем объявление
var generateRandomAd = function () {
  var advert = {};

  advert.avatar = getRandomArrayElement(AVATARS);

  advert.offer = {};

  advert.offer.title = getRandomArrayElement(TITLES);
  advert.offer.address = '{{' + advert.location.x + '}}, {{' + advert.location.y + '}}';
  advert.offer.price = getRandomIntInclusive(PRICE_MIN, PRICE_MAX);
  advert.offer.type = getRandomArrayElement(TYPES);
  advert.offer.rooms = getRandomIntInclusive(ROOMS_MIN, ROOMS_MAX);
  advert.offer.guests = getRandomIntInclusive(GUESTS_MIN, GUESTS_MAX);
  advert.offer.checkin = getRandomArrayElement(CHECKIN_TIME);
  advert.offer.checkout = getRandomArrayElement(CHECKOUT_TIME);
  advert.offer.features = shuffleArray(FEATURES, getRandomIntInclusive(0, FEATURES.length));
  advert.offer.description = '';
  advert.offer.photos = shuffleArray(PHOTOS);

  advert.location = getRandomLocation();

  return advert;
};

//  клонируем пин
var renderAdPin = function (data, template) {
  var element = template.cloneNode(true);
  element.style.left = data.location.x + 'px';
  element.style.top = data.location.y + 'px';
  element.querySelector('img').src = data.avatar;
  return element;
};

//  список точек
var renderAdPins = function (array) {
  var template = document.querySelector('#pin').content;
  var fragment = document.createDocumentFragment();
  array.forEach(function () {
    // for (var i = 0; i < array.length; i++) {
    var element = renderAdPin(array, template);
    fragment.appendChild(element);
  });
  document.querySelector('.map__pins').appendChild(fragment);
};

//  создаем массив объявлений
var adverts = generateAdArray(AD_QUANTITY);

//  показываем карту
document.querySelector('.map').classList.remove('map--faded');

//  наносим точки
renderAdPins(adverts);
