const confirmationModal = {};

confirmationModal.buildDom = configuration => {
	// optionally setup the default configuration
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

	// build the required DOM
	const modal = document.createElement('div');
	modal.classList.add('modal');
	modal.setAttribute('tabindex', '-1');

	const modalDialog = document.createElement('div');
	modalDialog.classList.add('modal-dialog');

	const modalContent = document.createElement('div');
	modalContent.classList.add('modal-content');

	const modalBody = document.createElement('div');
	modalBody.classList.add('modal-body');

	const modalBodyText = document.createElement('p');
	modalBodyText.textContent = configuration.message;
	modalBody.appendChild(modalBodyText);

	const modalFooter = document.createElement('div');
	modalFooter.classList.add('modal-footer');

	const modalFooterNoButton = document.createElement('button');
	modalFooterNoButton.setAttribute('class', configuration.no.class);
	modalFooterNoButton.textContent = configuration.no.text;
	modalFooterNoButton.dataset.dismiss = 'modal';

	const modalFooterYesButton = document.createElement('button');
	modalFooterYesButton.setAttribute('class', configuration.yes.class);
	modalFooterYesButton.textContent = configuration.yes.text;

	modalFooter.appendChild(modalFooterNoButton);
	modalFooter.appendChild(modalFooterYesButton);
	modalContent.appendChild(modalBody);
	modalContent.appendChild(modalFooter);

	// optionally build the header DOM
	if (configuration.title || configuration.closeIcon) {
		const modalHeader = document.createElement('div');
		modalHeader.classList.add('modal-header');

		const modalTitle = document.createElement('h5');
		modalTitle.classList.add('modal-title');
		modalTitle.textContent = configuration.title;
		modalHeader.appendChild(modalTitle);

		// optionally build the close icon button
		if (configuration.closeIcon) {
			const closeText = document.createElement('span');
			closeText.setAttribute('aria-hidden', 'true');
			closeText.innerHTML = '&times;';

			const closeButton = document.createElement('button');
			closeButton.classList.add('close');
			closeButton.dataset.dismiss = 'modal';
			closeButton.appendChild(closeText);
			modalHeader.appendChild(closeButton);
		}
		modalContent.prepend(modalHeader);
	}

	// finish building the DOM and return the modal
	modalDialog.appendChild(modalContent);
	modal.appendChild(modalDialog);
	return modal;
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
