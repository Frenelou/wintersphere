class ShowMore {
  constructor(btn) {
    this.state = {
      btn: btn,
      productsContainer: document.querySelector("#products"),
      modal: document.querySelector("#show-more-modal"),
    }
    this.init();
  }
  init({ btn, modal, productsContainer } = this.state) {
    btn.addEventListener('click', e => this.handleClick(e));
    btn.addEventListener('touch', e => this.handleClick(e));
    $(modal).on("hidden.bs.modal", () => productsContainer.innerHtMl = "");
  }
  handleClick(event, { btn } = this.state) {
    event.preventDefault();
    this.setModal(btn);
    this.setProducts(btn.id.substr(6));
    $("#show-more-modal").modal("show");
  }
  setModal(btn) {
    let image = btn.querySelector("img"),
      img = image ? image.src : btn.querySelector("div").style.backgroundImage.match(/"((?:\\.|[^"\\])*)"/);

    this.state.modal.querySelector("#show-more-modal--cover").style.backgroundImage = `url(${img})`
  }
  setProducts(currentProduct) {
    document.querySelectorAll(`#related_products_box_${currentProduct} .article`).forEach(
      el => {
        let article = el.cloneNode(true);
        this.state.productsContainer.appendChild(article);
        article.addEventListener('mouseenter', () => article.classList.add("open", "active"));
        article.addEventListener('mouseleave', () => article.classList.remove("open", "active"));
      }
    );
  }
}
const setupShowMoreBtns = () => document.querySelectorAll('a.show-more').forEach(btn => new ShowMore(btn));