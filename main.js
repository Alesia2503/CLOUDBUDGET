const hamb = document.querySelector("#hamb");
const popup = document.querySelector("#popup");
const body = document.body;
const menu = document.querySelector("#menu").cloneNode(1);
hamb.addEventListener("click", hambHandler);
function hambHandler(e) {
  e.preventDefault();
  popup.classList.toggle("open");
  hamb.classList.toggle("active");
  body.classList.toggle("noscroll");
  renderPopup();
}
function renderPopup() {
  popup.appendChild(menu);
}
const links = Array.from(menu.children);
links.forEach((link) => {
  link.addEventListener("click", closeOnClick);
});
function closeOnClick() {
  popup.classList.remove("open");
  hamb.classList.remove("active");
  body.classList.remove("noscroll");
}




(function()
{
  'use strict';
  //Создаём полупрозрачный серый фон на заднем плане под увеличенным изображением.
  //Он будет перекрывать все элементы экрана.
  if (window.matchMedia('(max-width: 525px)').matches) {return false;};
  const imgBg = document.createElement('div');
  document.getElementsByTagName('body')[0].appendChild(imgBg);
  imgBg.style = 'background-color: rgba(48, 48, 48, 0.6); position: fixed; top: 0px; left: 0px; width: 100%; z-index: 1';
  imgBg.hidden = true;
  fillBg(); //Функция, которая растягивает серый фон по высоте на весь экран.
  //Перерисовываем высоту серого фона при изменении размеров окна браузера.
  window.addEventListener('resize', fillBg);
  function fillBg()
  {
    imgBg.style.height = (document.documentElement.clientHeight + 100) + 'px';
  }
  
  //Определяем долю от размера экрана, которую будет занимать увеличенное изображение
  let bigImgageScreenFraction;
  if (window.matchMedia('(max-width: 1080px)').matches) //Зашли с мобильного.
  {
    bigImgageScreenFraction = 0.8;
  }
  else //Зашли с компьютера.
  {
    bigImgageScreenFraction = 0.7;
  }
  //Заглушка для картинки. Появляется вместо неё на том месте откуда она увеличилась.
  let placeholder = document.createElement('img');
  document.querySelectorAll('img[scalable]').forEach((img) =>
  {
    const smallSize = img.getAttribute('scalable');
    let defaultStyle = `max-width: ${smallSize}; max-height: ${smallSize}`;
    img.style = defaultStyle;
    let isGoingToSmall = false;
    img.addEventListener('click', () => 
    {  if (window.matchMedia('(max-width: 770px)').matches) {return false;};
      if (img.getAttribute('is-big') === 'true') //Картинка большая - уменьшаем
      {
        //Смотрим по каким координатам надо вернуть картинку на место.
        let coords = placeholder.getBoundingClientRect();
        //Устанавливаем для изображения уменьшенный размер.
        //Но position остаётся fixed, т.к. нужно, чтобы при анимации уменьшения не смещались остальные элементы страницы.
        img.style = `${defaultStyle}; position: fixed; left: ${coords.left}px; top: ${coords.top}px`;
        img.setAttribute('is-big', false);
        imgBg.hidden = true;
        //Указываем, что мы собираемся уменьшить картинку.
        //Эта переменная опять станет false, когда завершится анимация уменьшения.
        isGoingToSmall = true;
      }
      else //Картинка маленькая - увеличиваем.
      {
        imgBg.hidden = false;
        img.setAttribute('is-big', true);
        //Перед тем как увеличить картинку вставляем вместо неё заглушку.
        placeholder.hidden = false;
        //Увеличиваем картинку.
        doImageBig(img);
      }
    });
    img.addEventListener('transitionend', () =>
    {
      if (isGoingToSmall) //Отследили завершение анимации уменьшения.
      {
        //Вставляем картинку обратно в поток.
        img.style = defaultStyle;
        isGoingToSmall = false;
        //Убираем заглушку.
        placeholder.hidden = true;
      }
    }); 
    //Сохраняем центровку увеличенной картинки при изменении размеров окна браузера.
    window.addEventListener('resize', () => 
    {
      if (img.getAttribute('is-big') === 'true') doImageBig(img);
    });
  });
  
  //Эта функция расчитывает размеры увеличенного изображения и центрирует его.
  function doImageBig(img)
  {
    let screenHeight = document.documentElement.clientHeight;
    let screenWidth = document.documentElement.clientWidth;
    let imgWidth = img.width;
    let imgHeight = img.height;
    let bigImgHeight = Math.round(screenHeight * bigImgageScreenFraction);
    let bigImgWidth = Math.round(screenWidth * bigImgageScreenFraction);
    let ratio = imgWidth / imgHeight
    let newWidth = Math.round(bigImgHeight * ratio);
    if (newWidth < bigImgWidth)
    {
      bigImgWidth = newWidth;
    }
    else
    {
      bigImgHeight = Math.round(bigImgWidth / ratio);
    }
    let left = Math.round(0.5 * (screenWidth - bigImgWidth));
    let top = Math.round(0.5 * (screenHeight - bigImgHeight));
    img.style = `max-width: ${bigImgWidth}px; max-height: ${bigImgHeight}px; left: ${left}px; top: ${top}px; position: fixed; z-index: 2`;
  }
})();



document.querySelector('.header_content-btn').onclick = function() {
  document.querySelector('.header_p').hidden = !document.querySelector('.header_p').hidden
}



let tooltipElem;
    document.onmouseover = function(e) {
        let target = e.target
        let tooltipHtml = target.dataset.tooltip
        if(!tooltipHtml) return
        tooltipElem = document.createElement('div')
        tooltipElem.className = "tooltip"
        tooltipElem.innerHTML = tooltipHtml
        document.querySelector('.contact_form').append(tooltipElem)
        let coords = target.getBoundingClientRect()
        let left = coords.left + (target.offsetWidth - tooltipElem.offsetWidth) / 2
        if(left < 0) left = 5 

        let top = coords.top - tooltipElem.offsetHeight - 5
        if(top < 0) top = coords.top + target.offsetHeight + 5

        tooltipElem.style.left = left + 'px'
        tooltipElem.style.top = top + 'px'
    }
    document.onmouseout = function(e) {
        if(tooltipElem) {
        tooltipElem.remove()
        tooltipElem = null
        }
    }




    
    
    // function addText() {
    //     alert("Start Trial?")
    // }
    // document.querySelector('.contact_input-name').onclick = addText