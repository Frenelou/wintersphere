class BackToTopButton {
  constructor(btn) {
    this.state = {
      btn: btn,
      offset: 300, //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
      offset_opacity: 1200, //duration of the top scrolling animation (in ms)
      scroll_top_duration: 700,
    }
    this.init();
  }
  init = () => {
    this.handleScroll();
    this.handleClick();
  }
  handleScroll = ({ btn, offset, offset_opacity } = this.state) => {
    window.addEventListener('scroll', e => {
      let scrollTop = $(e.target).scrollTop();
      scrollTop > offset
        ? btn.classList.add("cd-is-visible")
        : btn.classList.remove("cd-is-visible", "cd-fade-out");
      if (scrollTop > offset_opacity) btn.classList.add("cd-fade-out");
    });
  }
  handleClick = ({ btn, scroll_top_duration } = this.state) => {
    btn.addEventListener('click', event => {
      event.preventDefault();
      $("body,html").animate({ scrollTop: 0 }, scroll_top_duration);
    });
  }
}