const edit = document.querySelector('.profile__edit');
const popUp = document.querySelector('.pop-up');
const name = document.querySelector('.profile__name');
const activity = document.querySelector('.profile__activity');
const editName = document.querySelector('.form__input_type_name');
const editActivity = document.querySelector('.form__input_type_activity');
const save = document.querySelector('.form__input_type_save');
const page = document.querySelector('.page');
const close = document.querySelector('.pop-up__close');


edit.addEventListener('click', function() {
  popUp.classList.add('pop-up_type_show');
  page.classList.add('page_type_hidden');
  editName.value = name.textContent;
  editActivity.value = activity.textContent;
});

window.addEventListener('click', function(event) {
  if (event.target === popUp) {
    popUp.classList.remove('pop-up_type_show');
    page.classList.remove('page_type_hidden');
  }
});

save.addEventListener('click', function(event) {
  event.preventDefault();
  name.textContent = editName.value;
  activity.textContent = editActivity.value;
  popUp.classList.remove('pop-up_type_show');
  page.classList.remove('page_type_hidden');
});

close.addEventListener('click', function() {
  popUp.classList.remove('pop-up_type_show');
  page.classList.remove('page_type_hidden');
});
