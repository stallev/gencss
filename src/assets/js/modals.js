//конвертируем коллекцию в массив
function convertToArray(collection) {
  let newArray = Array.prototype.slice.call(collection);
  return newArray;
 }

let closeFormBtns = convertToArray(document.querySelectorAll('.closeFormBtn'));
let forms = document.querySelectorAll('form');
if(closeFormBtns){
  closeFormBtns.forEach(
    btn => {
      btn.addEventListener('click', function(e){
        e.preventDefault();
        document.body.removeAttribute("class");
        forms.forEach (
          form => form.reset()
        )
      }); 
    }
  )
}

//клик по месту вне формы
let orderFormOverlay = document.querySelector('.modal__overlay');

if(orderFormOverlay){
  orderFormOverlay.addEventListener('click', function(){
    document.body.removeAttribute("class");
    forms.forEach (
      form => form.reset()
    )
  });
}

function showMessage (status, messageText) {
  let messageSpan = document.createElement("span");
  let messageClass = status === 'ok' ? 'message--ok' : 'message--error';

  messageSpan.textContent = messageText;
  messageSpan.classList.add(messageClass);
  
  document.body.appendChild(messageSpan);

  let messageBg = status === 'ok' ? '#4CAF50' : '#F30505';
  
  messageSpan.style.position = "fixed";
  messageSpan.style.display = "block";
  messageSpan.style.bottom = "0";
  messageSpan.style.left = "0";
  messageSpan.style.backgroundColor = messageBg;
  messageSpan.style.color = "white";
  messageSpan.style.fontSize = "18px";
  messageSpan.style.padding = "20px";
  messageSpan.style.opacity = "0";
  messageSpan.style.transition = "opacity 0.3s";
  
  messageSpan.style.opacity = "1";
  
  setTimeout(function() {
      messageSpan.style.opacity = "0";
      setTimeout(function() {
          document.body.removeChild(messageSpan);
      }, 300);
  }, 3000);
}


function sendMsg(data) {
    let url = 'https://api.telegram.org/bot' + TOKEN + '/sendMessage'; // токен бота
    let body = JSON.stringify({
        chat_id: CHAT_ID,
        parse_mode: 'Markdown',
        text: data
    });
    let xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);

    // уведомление-модалка
    xhr.onload = function(oEvent) {
      if (xhr.status === 200) {
        document.body.classList.add('modal-view');
        document.body.classList.add('success-send');
      }
      if (xhr.status !== 200) {
        document.body.classList.add('modal-view');
        document.body.classList.add('error-send');
      }
    }
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.send(body);

    document.body.removeAttribute("class");
    document.body.classList.remove('call-form');
    document.body.classList.remove('order-online');
}

document.addEventListener('DOMContentLoaded', function () {
  const tgForms = document.querySelectorAll('.tg-form');

  tgForms.forEach(form => {
    form.addEventListener('submit', function (event) {
      console.log(event);
      event.preventDefault();

      const formData = new FormData(form);
      const xhr = new XMLHttpRequest();

      xhr.open('POST', form.action, true);
      xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      xhr.onload = function () {
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);

          if (response.success) {
            form.reset();
            showMessage ('ok', 'Сообщение отправлено');
          } else {
            showMessage ('ok', 'Ошибка отправки сообщения. Пожалуйста, позвоните нам.');
          }
        } else {
          showMessage ('ok', 'Ошибка отправки сообщения. Пожалуйста, позвоните нам.');
        }
      };
      
      xhr.send(new URLSearchParams(formData).toString());

      document.body.removeAttribute("class");
      document.body.classList.remove('call-form');
      document.body.classList.remove('order-online');
    });
    console.log(form.addEventListener)
  });
});
