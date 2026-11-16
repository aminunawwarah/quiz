function createNotiticationDialog() {
    const pageBody = document.querySelector('body');
    const boxOverlay = document.createElement('div');
    const dialogContainer = document.createElement('div');
    const openInfo = document.createElement('span');
    const iconSide = document.createElement('div');
    const contentSide = document.createElement('div');
    const dialogTitle = document.createElement('p');
    const dialogBody = document.createElement('p');
    const closeDialogButton = document.createElement('button');

    closeDialogButton.innerText = 'Close';
    openInfo.innerText = 'Additional information';
    closeDialogButton.addEventListener('click', closeNotificationDialog);

    dialogContainer.setAttribute('class', 'notification-dialog-container');
    iconSide.setAttribute('class', 'icon-side');
    contentSide.setAttribute('class', 'dialog-content');
    dialogTitle.setAttribute('class', 'notification-dialog-title');
    dialogBody.setAttribute('class', 'notification-dialog-body');
    closeDialogButton.setAttribute('class', 'notification-dialog-close-button');
    openInfo.setAttribute('class', 'additional-information');

    contentSide.appendChild(dialogTitle);
    contentSide.appendChild(dialogBody);
    contentSide.appendChild(openInfo);
    contentSide.appendChild(closeDialogButton);

    dialogContainer.appendChild(iconSide);
    dialogContainer.appendChild(contentSide);

    boxOverlay.setAttribute('class', 'notification-dialog-overlay');
    boxOverlay.appendChild(dialogContainer);
    pageBody.appendChild(boxOverlay);
}

function createAdditonalInformationDialog() {
    const additionalInformationContainer = document.createElement('div');
    const additionalInformationText = document.createElement('p');
    const closeAdditionalInformationButton = document.createElement('button');
    const informationOverlay = document.createElement('div');
    const pageBody = document.querySelector('body');

    informationOverlay.setAttribute('class', 'information-overlay');
    additionalInformationContainer.setAttribute('class', 'additional-information-container');
    additionalInformationText.setAttribute('class', 'additional-information-body');
    closeAdditionalInformationButton.setAttribute('class', 'close-additional-information');

    closeAdditionalInformationButton.innerText = 'Close';
    closeAdditionalInformationButton.addEventListener('click', closeAdditionalInformation);

    additionalInformationContainer.appendChild(additionalInformationText);
    additionalInformationContainer.appendChild(closeAdditionalInformationButton);
    informationOverlay.appendChild(additionalInformationContainer);
    pageBody.appendChild(informationOverlay);
}

function createConfirmationDialog() {
    const body = document.querySelector('body');
    const dialogOverlay = document.createElement('div');
    const dialogContainer = document.createElement('div');
    const dialogTitle = document.createElement('p');
    const dialogBody = document.createElement('p');
    const iconSide = document.createElement('div');
    const contentSide = document.createElement('div');

    iconSide.innerHTML = '<i class="fas fa-question confirmation-icon"></i>';
    iconSide.setAttribute('class', 'icon-side');
    contentSide.setAttribute('class', 'confirmation-content-side');
    dialogOverlay.setAttribute('class', 'confirmation-dialog-overlay');
    dialogContainer.setAttribute('class', 'cofirmation-dialog-container');
    dialogTitle.setAttribute('class', 'confirmation-dialog-title');
    dialogBody.setAttribute('class', 'confirmation-dialog-body');
    
    contentSide.appendChild(dialogTitle);
    contentSide.appendChild(dialogBody);

    dialogContainer.appendChild(iconSide);
    dialogContainer.appendChild(contentSide);

    dialogOverlay.appendChild(dialogContainer);
    body.appendChild(dialogOverlay);
}

function showNotificationDialog(title, body, info, type) {
    const infoText = document.querySelector('.additional-information');
    const iconSide = document.querySelector('.icon-side');

    document.querySelector('.notification-dialog-title').innerText = title || 'Dialog';
    document.querySelector('.notification-dialog-body').innerText = body || '';
    document.querySelector('.notification-dialog-overlay').style.opacity = 1;
    document.querySelector('.notification-dialog-overlay').style.zIndex = 1;

    if (type === 'success') {
        iconSide.innerHTML = '<i class="fas fa-check dialog-icon"></i>';
        document.querySelector('.dialog-icon').style = 'color: #007700; border: 1px solid #007700';
    } else if (type === 'error') {
        iconSide.innerHTML = '<i class="fas fa-times dialog-icon"></i>';
        document.querySelector('.dialog-icon').style = 'color: #E70000; border: 1px solid #E70000';
    } else if (type === 'warn') {
        iconSide.innerHTML = '<i class="fas fa-exclamation dialog-icon"></i>';
        document.querySelector('.dialog-icon').style = 'color: #C8D600; border: 1px solid #C8D600';
    } else {
        iconSide.innerHTML = '<i class="fas fa-info dialog-icon"></i>';
        document.querySelector('.dialog-icon').style = 'color: #22009C; border: 1px solid #22009C';
    }

    if (info) {
        infoText.style.display = 'inline';
        infoText.addEventListener('click', () => showAdditionalInformation(info));
    } else {
        infoText.style.display = 'none';
    }
}

function closeNotificationDialog() {
    document.querySelector('.notification-dialog-overlay').style.opacity = 0
    document.querySelector('.notification-dialog-overlay').style.zIndex = -1;
}

function showAdditionalInformation(text) {
    document.querySelector('.additional-information-body').innerText = text;
    document.querySelector('.information-overlay').style.opacity = 1;
    document.querySelector('.information-overlay').style.zIndex = 1;
}

function closeAdditionalInformation() {
    document.querySelector('.information-overlay').style.opacity = 0;
    document.querySelector('.information-overlay').style.zIndex = -1;
}

function showConfirmationDialog(title, body, func){
    const dialogButtons = document.createElement('div');
    const yesButton = document.createElement('button');
    const noButton = document.createElement('button');
    const contentSide = document.querySelector('.confirmation-content-side');

    dialogButtons.setAttribute('class', 'dialog-buttons');
    yesButton.setAttribute('class', 'yes-button');
    noButton.setAttribute('class', 'no-button');

    yesButton.innerText = 'Yes';
    noButton.innerText = 'No';

    dialogButtons.appendChild(yesButton);
    dialogButtons.appendChild(noButton);
    contentSide.appendChild(dialogButtons);
    
    document.querySelector('.confirmation-dialog-title').innerText = title || 'Continue?';
    document.querySelector('.confirmation-dialog-body').innerText = body || 'Perform the operation?';
    document.querySelector('.confirmation-dialog-overlay').style.zIndex = 1;
    document.querySelector('.confirmation-dialog-overlay').style.opacity = 1;
    document.querySelector('.no-button').addEventListener('click', closeConfirmationDialog);
    
    if ((typeof func) === 'function') {
        document.querySelector('.yes-button').addEventListener('click', () => {
            closeConfirmationDialog();
            func();
        });
    }
}

function closeConfirmationDialog() {
    const contentSide = document.querySelector('.confirmation-content-side');
    const dialogButtons = document.querySelector('.dialog-buttons');

    document.querySelector('.confirmation-dialog-overlay').style.opacity = 0;
    document.querySelector('.confirmation-dialog-overlay').style.zIndex = -1;
    contentSide.removeChild(dialogButtons);
}

createNotiticationDialog();
createAdditonalInformationDialog();
createConfirmationDialog();