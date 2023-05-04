const confirmationDOM = function (configuration) {
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
    modal.id = 'confirmation-modal-' + new Date().getTime();
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
    modalFooterNoButton.classList.add(...configuration.no.class.split(' '));
    modalFooterNoButton.textContent = configuration.no.text;
    modalFooterNoButton.setAttribute('data-bs-dismiss', 'modal');

    const modalFooterYesButton = document.createElement('button');
    modalFooterYesButton.classList.add(...configuration.yes.class.split(' '));
    modalFooterYesButton.textContent = configuration.yes.text;
    modalFooterYesButton.setAttribute('data-bs-dismiss', 'modal');

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
            const closeButton = document.createElement('button');
            closeButton.classList.add('btn-close');
            closeButton.setAttribute('data-bs-dismiss', 'modal');
            closeButton.setAttribute('aria-label', 'close');
            modalHeader.appendChild(closeButton);
        }
        modalContent.prepend(modalHeader);
    }

    // finish building the DOM and return the modal
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
    return modal;
};

const bootstrapConfirmation = function (params) {
    // optionally setup the default parameters
    params = params || {};
    params.yesCallBack = params.yesCallBack || function () {};
    params.noCallBack = params.noCallBack || function () {};

    // build the modal DOM passing the configuration
    const modalDOM = confirmationDOM(params.config);

    // append the modal DOM to the body
    document.body.appendChild(modalDOM);

    // handle: modal hidden, yes click, and no click
    const buttonConfirmationNo = modalDOM.querySelector('.confirmation-no');
    const buttonConfirmationYes = modalDOM.querySelector('.confirmation-yes');
    document.querySelector('body').addEventListener('click', function (event) {
        if (event.target === buttonConfirmationNo) {
            params.noCallBack();
            modal.hide();
        } else if (event.target === buttonConfirmationYes) {
            params.yesCallBack();
            modal.hide();
        }
    });

    // show the modal
    const modal = new bootstrap.Modal(document.getElementById(modalDOM.id));
    modal.show();
};
