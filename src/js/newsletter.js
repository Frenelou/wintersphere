var currLang,
  currCountry,
  countries,
  languages,
  messages = {
    en: {
      success: "<h3>Success</h3><p>Thank you for your subscription</p>",
      double:
        "<h3>Double opt-in</h3><p>Please confirm your subscription in the email we sent you.</p>",
      confirmed:
        "<h3>Thank you!</h3><p>Your email has been confirmed. You are taking part to our contest.</p>",
      fail:
        "<p>There was a problem with this form. Please review your information.</p>"
    },
    de: {
      success: "<h3>Success</h3><p>Vielen Dank für Deine Anmeldung.</p>",
      double:
        "<h3>Double Opt-in</h3><p>Wir haben dir eine E-Mail geschickt. Bitte bestätige darin Deine Anmeldung.</p>",
      confirmed:
        "<h3>Danke!</h3><p>Hiermit hast Du deine Email erfolgreich bestätigt</p>",
      fail:
        "<p>Bei Deiner Anmeldung ist ein Problem aufgetreten. Bitte prüfe deine Informationen nochmals.</p>"
    },
    fr: {
      success: "<h3>Succès</h3><p>Merci pour votre inscription.</p>",
      double:
        "<h3>Double Opt-in</h3><p>Merci de confirmer votre inscription grâce à l'e-mail que nous vous avons envoyé.</p>",
      confirmed:
        "<h3>Merci</h3><p>Votre participation a bien été confirmée.</p>",
      fail:
        "<p>Il y a eu un problème avec l'envoi du formulaire. Merci de bien contrôler vos informations.</p>"
    },
    pt: {
      success: "<h3>Success</h3><p>Obrigado pela sua subscrição.</p>",
      double:
        "<h3>Double opt-in</h3><p>Por favor, confirme a sua subscrição no email que lhe enviamos.</p>",
      confirmed:
        "<h3>Thank you!</h3><p>Your email has been confirmed. You successfully subscribed to our newsletter.</p>",
      fail:
        "<p>There was a problem with this form. Please review your information.</p>"
    },
    es: {
      success: "<h3>Success</h3><p>Gracias por suscribirte.</p>",
      double:
        "<h3>Double opt-in</h3><p>Por favor, confirma tu suscripción en el correo que te hemos enviado</p>",
      confirmed:
        "<h3>Thank you!</h3><p>Your email has been confirmed. You successfully subscribed to our newsletter.</p>",
      fail:
        "<p>There was a problem with this form. Please review your information.</p>"
    }
  };
var maropostForm = {
  setup: function() {
    maropostForm.setCurrLang(),
      maropostForm.pickContent(),
      maropostForm.modalActions();
      maropostForm.checkPolicy();
      maropostForm.modalSet();
  },
  checkPolicy : function() {
    $('#custom_fields_privacy').on('click touch', function(event) {
      $('#newsletter_form_submit').attr('disabled', function(_, attr){ return !attr});
    });
  },
  modalPopUp: function() {
    var visited = $.cookie("visited_wintersphere");
    // visited = null;
    if (!$('.modal').hasClass('in') && visited == null && window.location.href.indexOf("contact_fields") < 0) {
      $("#newsletter_modal").modal("show");
      clearTimeout(this.modalCountdown);
    } else {
      clearTimeout(this.modalCountdown);
      maropostForm.modalSet();
    }
  },
  modalSet: function() {
    this.modalCountdown = setTimeout(this.modalPopUp, 30000);
    // this.modalCountdown = setTimeout(this.modalPopUp, 300);
  },
  modalActions: function() {
    $("#newsletter_modal").on("show.bs.modal", function() {
      $("#newsletter-box")
        .detach()
        .appendTo("#newsletter_modal_content");
        $.cookie('visited_wintersphere', 'yes', { expires: 1, path: '/' });
    });
    $("#newsletter_modal").on("hidden.bs.modal", function() {
      $("#newsletter-box")
        .detach()
        .appendTo("#newsletter-box--wrapper");
    });
  },
  setCurrLang: function() {
    let e = window.location.href.split(".com/")[1] || window.location.href.split("3000/")[1];
    if (
      ((currLang = e.split("/")[1] || "en"),
      (currCountry = e.split("/")[0] || "gb"),
      null !== document.getElementById("custom_fields_country"))
    ) {
      var o = document.createElement("script");
      (o.src = "https://assets.scott-sports.com/ressources/country-list.json"),
        document.body.appendChild(o);
    }
    if (null !== document.getElementById("custom_fields_language_preferred")) {
      var t = document.createElement("script");
      (t.src = "https://assets.scott-sports.com/ressources/language-list.json"),
        document.body.appendChild(t);
    }
    $('#custom_fields_country_isocode_alpha2').val(e.split("/")[0].toString());
  },
  showMessage: function(e, o) {
    !o && $(".maropost-form").fadeOut(),
      (o = o || ".maropost-form_message"),
      $(o)
        .html(messages[currLang][e])
        .fadeIn();
    let t = $("html,body");
    t.animate(
      {
        scrollTop: $(o).offset().top - t.offset().top + t.scrollTop(),
        scrollLeft: 0
      },
      300
    );
  },
  setCountriesList: function() {
    let e = countries[currLang] || countries.en;
    $("<option/>", {
      value: "key"
    })
      .text("--")
      .appendTo("#custom_fields_country"),
      Object.keys(e).map(function(o) {
        $("<option/>", {
          value: o
        })
          .text(e[o])
          .appendTo("#custom_fields_country"),
          o.toLowerCase() === currCountry &&
            $('option[value="' + o + '"]').attr("selected", "true"),
          "uk" === o.toLowerCase() &&
            "gb" === currCountry &&
            $('option[value="' + o + '"]').attr("selected", "true");
      }),
      (currCountry = $("#custom_fields_country")
        .val()
        .toLowerCase());
  },
  setLanguagesList: function() {

    let e = languages[currLang] || languages.en;
    Object.keys(e).map(function(o) {
      $("<option/>", {
        value: o
      })
        .text(e[o])
        .appendTo("#custom_fields_language_preferred"),
        o.toLowerCase() === currLang &&
          $('option[value="' + o + '"]').attr("selected", "true");
    });
  },
  pickContent: function() {
    if (window.location.href.indexOf("fail") >= 0)
      maropostForm.showMessage("fail", ".maropost-form_message-fail");
    else {
      if (!(window.location.href.indexOf("dbl-opt") >= 0))
        return window.location.href.indexOf("contact_fields") >= 0
          ? ["de", "at"].indexOf(currLang) >= 0
            ? maropostForm.showMessage("double")
            : maropostForm.showMessage("success")
          : void $(".maropost-form").show();
      maropostForm.showMessage("confirmed", ".maropost-form_message-dbl-opt");
    }
  }
};

function clData(e) {
  (countries = e), maropostForm.setCountriesList();
}

function llData(e) {
  (languages = e), maropostForm.setLanguagesList();
}
