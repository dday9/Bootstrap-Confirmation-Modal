var confirmationDOM = function (configuration) {
    // optionally setup the default configuration
    configuration = configuration || {};
    configuration.title = configuration.title || "";
    configuration.closeIcon = configuration.closeIcon || false;
    configuration.message = configuration.message || "";
    configuration.no = configuration.no || {};
    configuration.no.class = (configuration.no.class || "btn btn-secondary").trim() + " confirmation-no";
    configuration.no.text = configuration.no.text || "Cancel";
    configuration.yes = configuration.yes || {};
    configuration.yes.class = (configuration.yes.class || "btn btn-primary").trim() + " confirmation-yes";
    configuration.yes.text = configuration.yes.text || "Ok";

    // build the required DOM
    var modal = $("<div />", { class: "modal", id: "confirmation-modal-" + new Date().getTime() });
    modal.attr("tabindex", "-1");
    var modalDialog = $("<div />", { class: "modal-dialog" });
    var modalContent = $("<div />", { class: "modal-content" });
    var modalBody = $("<div />", { class: "modal-body" });
    var modalBodyText = $("<p />", { text: configuration.message });
    modalBody.append(modalBodyText);
    var modalFooter = $("<div />", { class: "modal-footer" });
    var modalFooterNoButton = $("<button />", { class: configuration.no.class, text: configuration.no.text });
    var modalFooterYesButton = $("<button />", { class: configuration.yes.class, text: configuration.yes.text });
    modalFooter.append(modalFooterNoButton, modalFooterYesButton);
    modalContent.append(modalBody);
    modalContent.append(modalFooter);

    // optionally build the header DOM
    if (configuration.title || configuration.closeIcon) {
        var modalHeader = $("<div />", { class: "modal-header" });
        var modalTitle = $("<h5 />", { class: "modal-title", text: configuration.title });
        modalHeader.append(modalTitle);

        // optionally build the close icon button
        if (configuration.closeIcon) {
            var closeText = $("<span />", { html: "&times;" });
            closeText.attr("aria-hidden", "true");
            var closeButton = $("<button />", { type: "button", class: "close confirmation-no" });
            closeButton.append(closeText);
            modalHeader.append(closeButton);
        }
        modalContent.prepend(modalHeader);
    }

    // finish building the DOM and return the modal
    modalDialog.append(modalContent);
    modal.append(modalDialog);
    return modal;
};
var bootstrapConfirmation = function (params) {
    // optionally setup the default parameters
    params = params || {};
    params.yesCallBack = params.yesCallBack || function () {};
    params.noCallBack = params.noCallBack || function () {};

    // build the modal DOM passing the configuration
    var modal = confirmationDOM(params.config);

    // append the modal DOM to the body
    var id = "#" + modal.prop("id");
    $("body").append(modal);

    // handle: modal hidden, yes click, and no click
    $("body").on("hidden.bs.modal", id, function (e) {
        if (!$(id).attr("data-action")) {
            // if the user clicks outside of the modal, causing it to close, assume "no"
            params.noCallBack();
        }
        $(id).modal("dispose");
        $(id).remove();
    });
    $("body").on("click", id + " .confirmation-yes", function (e) {
        params.yesCallBack();
        $(id).attr("data-action", 1);
        $(id).modal("hide");
    });
    $("body").on("click", id + " .confirmation-no", function (e) {
        params.noCallBack();
        $(id).attr("data-action", 1);
        $(id).modal("hide");
    });

    // show the modal
    $(id).modal("show");
};
