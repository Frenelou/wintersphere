
var maropostForm = {
  setup: function () {
    this.visited = document.cookie.match('(^|;)\\s*visited_wintersphere\\s*=\\s*([^;]+)')?.pop() || null;
    this.setCurrLang();
    this.modalActions();
    this.checkPolicy();
    this.modalSet();
  },
  setCurrLang: () => {
    let e = window.location.pathname;
    currLang = e.split("/")[1] || "en";
    currCountry = e.split("/")[0] || "gb"
  },
  modalActions: () => {
    $("#newsletter_modal").on("show.bs.modal hidden.bs.modal", e => {
      clearTimeout(this.modalCountdown);
      $("#newsletter-box").detach().appendTo(e.type !== "show.bs.modal" ? "#newsletter_modal_content" : "#newsletter-box--wrapper");
      if (!!this.visited) $.cookie('visited_wintersphere', 'yes', { expires: 1, path: '/' });
    })
  },
  checkPolicy: () => {
    $('#custom_fields_privacy').on('click touch', () =>
      $('#newsletter_form_submit').attr('disabled', function (_, attr) { return !attr })
    )
  },
  modalPopUp: () => {
    console.log("modalPopUp");
    $("#newsletter_modal").modal("show");
    clearTimeout(this.modalCountdown);
  },
  modalSet: () => { if (!!this.visited) this.modalCountdown = setTimeout(this.modalPopUp, 30) }
};

