document.addEventListener("DOMContentLoaded", () => {
  noScrollDocumentWithOpenedBurger();
  closeBurgerWithClickedItem();
  scrollDocument();
  addDotsBetweenCircles();
  window.addEventListener("resize", addDotsBetweenCircles);
  inputNameOnlyLetters();
  checkInputMail();
  customizeSelect();
  changeRange();
  showNameAndSizeFile();
  updateCopyrightYear();
  adjustFooterElements();
});

const body = document.body;
const CLASS_NO_SCROLL = "no-scroll";
const CLASS_STICKY = "sticky";
const CLASS_OPEN = "open";
const CLASS_SELECTED = "selected";

function toggleClass(action, className, ...elements) {
  elements.forEach((element) => element.classList[action](className));
}

function noScrollDocumentWithOpenedBurger() {
  const toggleScroll = () => {
    const fixBlocks = document.querySelectorAll(".fix");
    const paddingOffset = `${window.innerWidth - body.offsetWidth}px`;
    fixBlocks.forEach((block) => (block.style.paddingRight = paddingOffset));
    body.style.paddingRight = paddingOffset;
    toggleClass("toggle", CLASS_NO_SCROLL, body);
  };
  document.querySelector(".burger-btn")?.addEventListener("click", toggleScroll);
}

function closeBurgerWithClickedItem() {
  const burgerCheckbox = document.querySelector(".burger-checkbox");
  const links = document.querySelectorAll(".nav__list a");
  links.forEach((link) =>
    link.addEventListener("click", () => {
      if (burgerCheckbox?.checked) {
        toggleClass("remove", CLASS_NO_SCROLL, body);
        burgerCheckbox.checked = false;
      }
    })
  );
}

function scrollDocument() {
  window.onscroll = () => {
    const header = document.querySelector(".header");
    if (header) {
      window.scrollY > header.offsetTop
        ? toggleClass("add", CLASS_STICKY, header)
        : toggleClass("remove", CLASS_STICKY, header);
    }
  };
}

function addDotsBetweenCircles() {
  document.querySelectorAll(".separator").forEach((sep) => sep.remove());
  const circles = document.querySelectorAll(".circle");
  const gap = 20;

  circles.forEach((circle, i) => {
    if (i < circles.length - 1) {
      const nextCircle = circles[i + 1];
      const distance =
        nextCircle.getBoundingClientRect().left -
        circle.getBoundingClientRect().right -
        gap;
      const dotCount = Math.max(Math.floor(distance / gap), 0);
      if (dotCount > 0) {
        const separator = document.createElement("div");
        separator.className = "separator";
        for (let j = 0; j < dotCount; j++) {
          const dot = document.createElement("div");
          dot.className = "dot";
          separator.appendChild(dot);
        }
        circle.appendChild(separator);
      }
    }
  });
}

function inputNameOnlyLetters() {
  document.querySelectorAll("input[name='name']").forEach((input) => {
    input.addEventListener("input", function () {
      this.value = this.value.replace(/[^A-Za-zА-Яа-яЁё]+/g, "");
    });
  });
}

function checkInputMail() {
  document.querySelectorAll("input[type='email']").forEach((input) => {
    input.addEventListener("input", (e) => {
      const emailRegex = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
      e.target.setCustomValidity(
        emailRegex.test(e.target.value) ? "" : "Введите корректный email"
      );
    });
  });
}

function customizeSelect() {
  document.querySelectorAll(".select").forEach((select) => {
    const trigger = select.querySelector(".select__trigger");
    const wrapper = select.querySelector(".select__wrapper");
    const options = wrapper.querySelectorAll("li");
    trigger.addEventListener("click", () => toggleClass("toggle", CLASS_OPEN, select));
    options.forEach((option) =>
      option.addEventListener("click", function () {
        trigger.querySelector("span").textContent = this.textContent;
        trigger.setAttribute("data-value", this.getAttribute("data-value") || "");
        toggleClass("remove", CLASS_OPEN, select);
      })
    );
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) toggleClass("remove", CLASS_OPEN, select);
    });
  });
}

function changeRange() {
  document.querySelectorAll(".range").forEach((range) => {
    const input = range.querySelector("input[type=range]");
    const label = range.querySelector(".range__per");
    if (input && label) {
      label.textContent = `${input.value}%`;
      input.addEventListener("input", function () {
        label.textContent = `${this.value}%`;
      });
    }
  });
}

function showNameAndSizeFile() {
  const uploadButton = document.querySelector(".btn-uploadFile");
  if (!uploadButton) return;
  const label = uploadButton.querySelector("span");
  const input = uploadButton.querySelector("input[type=file]");
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file)
      label.textContent = `${file.name.slice(0, 15)}... / ${Math.round(
        file.size / 1000
      )} kB`;
  });
}

function updateCopyrightYear() {
  const yearSpan = document.getElementById("year");
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();
}

function adjustFooterElements() {
  const footerRow = document.querySelector(".footer__row");
  if (!footerRow) return;
  const elements = Array.from(footerRow.children);
  elements.forEach((el, i) => {
    if (i < elements.length - 1) {
      const next = elements[i + 1];
      if (
        Math.abs(el.getBoundingClientRect().top - next.getBoundingClientRect().top) <= 10
      ) {
        const divider = document.createElement("div");
        divider.textContent = "|";
        divider.classList.add("settler");
        el.parentNode.insertBefore(divider, el.nextSibling);
      }
    }
  });
}
