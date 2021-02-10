class VideoCTA {
  constructor(selector) {
    this.cta = document.querySelector(`[data-play-video="${selector}"]`);
    this.video = document.querySelector(selector);
    this.init();
  }
  init() {
    this.cta.addEventListener("click", () => this.initHeroVideo())
    this.cta.addEventListener("touch", () => this.initHeroVideo())
  }
  initHeroVideo({ video, cta } = this) {
    video.controls = true;
    cta.parentNode.remove();
    video.play()
  }
};
