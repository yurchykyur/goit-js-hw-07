import { galleryItems } from './gallery-items.js';
// Change code below this line
// console.log(galleryItems);



// Завдання 1 - галерея зображень
// Створи галерею з можливістю кліку по її елементах 
// і перегляду повнорозмірного зображення у модальному вікні. 
// Подивися демо відео роботи галереї.

// Виконуй це завдання у файлах 01-gallery.html і 01-gallery.js. Розбий його на декілька підзавдань:

// 1. ++ Створення і рендер розмітки на підставі масиву даних galleryItems і наданого шаблону елемента галереї.
// 2. ++ Реалізація делегування на ul.gallery і отримання url великого зображення.
// 3. ++ Підключення скрипту і стилів бібліотеки модального вікна basicLightbox. Використовуй CDN сервіс jsdelivr  https://www.jsdelivr.com/package/npm/basiclightbox
//       і додай у проект посилання на мініфіковані (.min) файли бібліотеки.
// 4. ++ Відкриття модального вікна по кліку на елементі галереї. Для цього ознайомся з документацією і прикладами.
// 5. ++ Заміна значення атрибута src елемента <img> в модальному вікні перед відкриттям. 
// 6. ++ Використовуй готову розмітку модального вікна із зображенням з прикладів бібліотеки basicLightbox.


// Розмітка елемента галереї
// Посилання на оригінальне зображення повинно зберігатися в data-атрибуті source на елементі <img>, 
// і вказуватися в href посилання. Не додавай інші HTML теги або CSS класи, крім тих, що містяться в цьому шаблоні.

// <li class="gallery__item">
//   <a class="gallery__link" href="large-image.jpg">
//     <img
//       class="gallery__image"
//       src="small-image.jpg"
//       data-source="large-image.jpg"
//       alt="Image description"
//     />
//   </a>
// </li>

// ++ Зверни увагу на те, що зображення обгорнуте посиланням, отже по кліку за замовчуванням користувач буде перенаправлений на іншу сторінку. 
// ++ Заборони цю поведінку за замовчуванням.


// Закриття з клавіатури
// УВАГА
// Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.

// Додай закриття модального вікна після натискання клавіші Escape. 
// ++ Зроби так, щоб прослуховування клавіатури було тільки доти, доки відкрите модальне вікно. 
// Бібліотека basicLightbox містить метод для програмного закриття модального вікна.

const refs = {
    gallery: document.querySelector('.gallery'),
};

const galleryItemsMarksup = createGalleryItemsMarksup(galleryItems);

refs.gallery.insertAdjacentHTML('beforeend', galleryItemsMarksup);

refs.gallery.addEventListener('click', onGalleryItemClick)

/**
 * tracks a click on a gallery image and triggers the Window Keydown tracking function, 
 * the vendor launch function whose parameter is href
 * @param {Click} event 
 * @returns stops execution of the function if the condition is not met
 */
function onGalleryItemClick(event){
    event.preventDefault();
     const isGalleryItemElemImage = event.target.classList.contains('gallery__image');

    if (!isGalleryItemElemImage) {
    return
    }

    addtListenWindowKeydown()

    openImageInBasicLightbox(event.target.closest('.gallery__link').href)
}

/**
 * creation of html markup of gallery elements, in the form of a string
 * @param {Object} galleryItems 
 * @returns html markup of gallery elements, in the form of a string
 */
function createGalleryItemsMarksup(galleryItems) {
return galleryItems.map(({preview, original, description}) => {
return `
<li class="gallery__item">
  <a class="gallery__link" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
}).join('');

}

/**
 * opens a large image from the gallery
 * @param {String} src link to large image
 */
function openImageInBasicLightbox(src) {

  basicLightbox.create(`
		<img width="1280"  src="${src}">
	`).show()
}

/**
 * add EventListener on window by keydown
 */
function addtListenWindowKeydown() {
    window.addEventListener('keydown', onEscKeyDown)
}

/**
 * tracks whether a button is pressed 'Escape' 
 * and runs functions to delete the block, which was created by basiclightbox, 
 * stop tracking the keydown event
 * @param {keydown} e 
 */
function onEscKeyDown(e) {
    console.log(e)
 if (e.code === 'Escape') {
    removeListenWindowKeydown();
    basicLightbox.create(`
		<img width="1280"  src="${src}">
	`).close();

 };
};

/**
 * remove EventListener on window by keydown
 */
function removeListenWindowKeydown(){
 window.removeEventListener('keydown', onEscKeyDown)
};


