export const initialCards = [{
  name: 'Порт Баркиз',
  link: 'https://images.unsplash.com/photo-1657030871212-95d863306bed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1889&q=80'
},
{
  name: 'Восход в горах',
  link: 'https://images.unsplash.com/photo-1657018982784-d7d573fe2745?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1887&q=80',
},
{
  name: 'Ночной самолет в синем небе',
  link: 'https://images.unsplash.com/photo-1657014826033-bbd8140711db?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=754&q=80'
},
{
  name: 'Антарктида в цвете',
  link: 'https://images.unsplash.com/photo-1657010896979-c47163861598?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
  name: 'Мадридские кусты',
  link: 'https://images.unsplash.com/photo-1657005649208-d1b11532e23f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
},
{
  name: 'Пальма?',
  link: 'https://images.unsplash.com/photo-1656143308904-47e95da8009e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1964&q=80'
}
];

export const validationConfig = {
  inputSelector: '.form__input',
  submitButtonSelector: '.button_type_submit',
  submitButtonDisabledClass: 'button_disabled',
  formErrorMessageSelector: '.form__error-message',
  formErrorClass: 'form__error-message_active',
  inputErrorClass: 'input_error',
};

export const pageElement = document.querySelector('.page');
export const popUpImg = document.querySelector('.pop-up_img');
export const popUpPicture = popUpImg.querySelector('.pop-up__picture');
export const popUpText = popUpImg.querySelector('.pop-up__text');
export const popUpProfile = document.querySelector('.pop-up_profile');
export const popUpProfileForm = popUpProfile.querySelector('.form_type_profile');
export const popUpCard = document.querySelector('.pop-up_card');
export const popUpCardForm = popUpCard.querySelector('.form_type_card');
export const elementsList = document.querySelector('.elements__list');
export const profileName = document.querySelector('.profile__name');
export const profileActivity = document.querySelector('.profile__activity');
export const profileEditButton = document.querySelector('.profile__edit');
export const nameInput = popUpProfileForm.querySelector('.form__input_type_name');
export const activityInput = popUpProfileForm.querySelector('.form__input_type_activity');
export const cardAddButton = document.querySelector('.profile__add');
export const allPopUps = document.querySelectorAll('.pop-up');

export const initialProfileInputsValue = {
  name: profileName,
  activity: profileActivity
}

export const popUpAvatar = document.querySelector('.pop-up_avatar');
export const popUpAvatarForm = popUpAvatar.querySelector('.form_type_avatar');
export const avatarEditButton = document.querySelector('.button_type_avatar');
export const profileImg = document.querySelector('.profile__img');
export const popUpDelete = document.querySelector('.pop-up_delete');
export const popUpDeleteForm = popUpDelete.querySelector('.form_type_delete');

export const carDel = document.querySelector('.card__delete');
