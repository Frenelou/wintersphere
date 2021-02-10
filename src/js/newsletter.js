
var newsletterCTA = {
  setup: () => {
    let visited = document.cookie.match('(^|;)\\s*visited_wintersphere\\s*=\\s*([^;]+)')?.pop() || null;
    if (!!visited) this.modalCountdown = setTimeout(this.modalPopUp, 300);
    newsletterCTA.handleModalShow();
    newsletterCTA.checkPolicy();
  },
  handleModalShow: () => {
    $("#newsletter_modal").on("show.bs.modal hidden.bs.modal", e => {
      clearTimeout(this.modalCountdown);
      $("#newsletter-box").detach().appendTo(e.type !== "show.bs.modal" ? "#newsletter_modal_content" : "#newsletter-box--wrapper");
      $.cookie('visited_wintersphere', 'yes', { expires: 1, path: '/' });
    })
  },
  checkPolicy: () => {
    $('#custom_fields_privacy').on('click touch', () =>
      $('#newsletter_form_submit').attr('disabled', function (_, attr) { return !attr })
    )
  },
  modalPopUp: () => $("#newsletter_modal").modal("show"),


};

