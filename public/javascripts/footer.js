document.addEventListener("DOMContentLoaded", () => {
  const detailsElements = document.querySelectorAll(".footer-accordion details");

  function setOpenState() {
    const isDesktop = window.matchMedia("(min-width: 640px)").matches;

    detailsElements.forEach((el, index) => {
      if (isDesktop) {
        el.open = true;
      } else {
        if (index === 0) {
          el.open = true;
        } else {
          el.open = false;
        }
      }
    });
  }

  setOpenState();
  window.addEventListener("resize", setOpenState);
});