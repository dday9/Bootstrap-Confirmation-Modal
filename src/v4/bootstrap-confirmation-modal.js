const confirmationModal = {};

confirmationModal.buildDom = configuration => {
	configuration = confirmationModal.setDefaultConfiguration(configuration);

	const modal = confirmationModal.buildModalDom(configuration);
	return modal;
};

confirmationModal.setDefaultConfiguration = configuration => {
	configuration = configuration || {};
	configuration.title = configuration.title || '';
	configuration.closeIcon = configuration.closeIcon || false;
	configuration.message = configuration.message || '';
	configuration.no = configuration.no || {};
	configuration.no.class = (configuration.no.class || 'btn btn-secondary').trim() + ' confirmation-no';
	configuration.no.text = configuration.no.text || 'Cancel';
	configuration.yes = configuration.yes || {};
	configuration.yes.class = (configuration.yes.class || 'btn btn-primary').trim() + ' confirmation-yes';
	configuration.yes.text = configuration.yes.text || 'Ok';

	return configuration;
};

confirmationModal.buildModalDom = configuration => {
	const modal = document.createElement('div');
	modal.classList.add('modal');
	modal.setAttribute('tabindex', '-1');

	const modalDialog = confirmationModal.buildModalDialogDom(configuration);
	modal.appendChild(modalDialog);

	return modal;
};

confirmationModal.buildModalDialogDom = configuration => {
	const modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog');

	const modalContent = confirmationModal.buildModalContentDom(configuration);
	modalDialog.appendChild(modalContent);

	return modalDialog;
};

confirmationModal.buildModalContentDom = configuration => {
	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');

	if (configuration.title || configuration.closeIcon) {
		const modalHeader = confirmationModal.buildModalHeaderDom(configuration);
		modalContent.appendChild(modalHeader);
	}

	const modalBody = confirmationModal.buildModalBodyDom(configuration);
	modalContent.appendChild(modalBody);

	const modalFooter = confirmationModal.buildModalFooterDom(configuration);
	modalContent.appendChild(modalFooter);

	return modalContent;
};

confirmationModal.buildModalBodyDom = configuration => {
	const modalBody = document.createElement('div');
	modalBody.classList.add('modal-body');

	const modalBodyText = confirmationModal.buildModalBodyTextDom(configuration);
	modalBody.appendChild(modalBodyText);
	
	return modalBody;
};

confirmationModal.buildModalBodyTextDom = configuration => {
	const modalBodyText = document.createElement('p');
	modalBodyText.textContent = configuration.message;

	return modalBodyText;
};

confirmationModal.buildModalFooterDom = configuration => {
	const modalFooter = document.createElement('div');
	modalFooter.classList.add('modal-footer');

	const modalFooterNoButton = confirmationModal.buildModalFooterNoButtonDom(configuration);
	modalFooter.appendChild(modalFooterNoButton);

	const modalFooterYesButton = confirmationModal.buildModalFooterYesButtonDom(configuration);
	modalFooter.appendChild(modalFooterYesButton);

	return modalFooter;
};

confirmationModal.buildModalFooterNoButtonDom = configuration => {
	const modalFooterNoButton = document.createElement('button');
	modalFooterNoButton.setAttribute('class', configuration.no.class);
	modalFooterNoButton.textContent = configuration.no.text;
	modalFooterNoButton.dataset.dismiss = 'modal';
	
	return modalFooterNoButton;
};

confirmationModal.buildModalFooterYesButtonDom = configuration => {
	const modalFooterYesButton = document.createElement('button');
	modalFooterYesButton.setAttribute('class', configuration.yes.class);
	modalFooterYesButton.textContent = configuration.yes.text;
	
	return modalFooterYesButton;
};

confirmationModal.buildModalHeaderDom = configuration => {
	const modalHeader = document.createElement('div');
	modalHeader.classList.add('modal-header');

	const modalTitle = confirmationModal.buildModalTitleDom(configuration);
	modalHeader.appendChild(modalTitle);

	if (configuration.closeIcon) {
		const closeButton = confirmationModal.buildModalCloseDom();
		modalHeader.appendChild(closeButton);
	}

	return modalHeader;
};

confirmationModal.buildModalTitleDom = configuration => {
	const modalTitle = document.createElement('h5');
	modalTitle.classList.add('modal-title');
	modalTitle.textContent = configuration.title;
	
	return modalTitle;
};

confirmationModal.buildModalCloseDom = () => {
	const closeButton = document.createElement('button');
	closeButton.classList.add('close');
	closeButton.dataset.dismiss = 'modal';

	const closeText = confirmationModal.buildModalCloseTextDom();
	closeButton.appendChild(closeText);

	return closeButton;
};

confirmationModal.buildModalCloseTextDom = () => {
	const closeText = document.createElement('span');
	closeText.setAttribute('aria-hidden', 'true');
	closeText.innerHTML = '&times;';

	return closeText;
};

confirmationModal.show = params => {
	// optionally setup the default parameters
	params = params || {};

	// build the modal DOM passing the configuration and get a reference to the buttons
	const modalDom = confirmationModal.buildDom(params);
	const buttonConfirmationYes = modalDom.querySelector('.confirmation-yes');

	// append the modal DOM to the body
	document.body.appendChild(modalDom);
	const modalPromise = new Promise((resolve, reject) => {
		// show the modal
		$(modalDom).modal('show');

		// handle the yes click event
		buttonConfirmationYes.addEventListener('click', () => {
			resolve();
			$(modalDom).modal('hide');
		});

		// handle the dismiss events
		$(modalDom).on('hidden.bs.modal', () => {
            reject();
        });
	});

	return modalPromise;
};
