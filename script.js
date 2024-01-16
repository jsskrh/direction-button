// Select the arrow-container and container elements
const arrowContainer = document.querySelector(".arrow-container");
const container = document.querySelector(".container");
const buttonContainer = document.querySelector(".button-container");
const button = document.querySelector(".button");
const arrow = document.querySelector(".arrow");
const dots = document.querySelectorAll(".dot");
const grid1 = document.querySelectorAll(".grid-1");
const grid2 = document.querySelectorAll(".grid-2");
const grid3 = document.querySelectorAll(".grid-3");
const grid4 = document.querySelectorAll(".grid-4");

gsap.set(arrowContainer, {
  width: calculateButtonWidth,
});

const tl = gsap.timeline({ paused: true });

function calculateButtonWidth() {
  const containerWidth = buttonContainer.getBoundingClientRect().width;
  const paddingLeft = parseFloat(window.getComputedStyle(button).paddingLeft);
  const paddingRight = parseFloat(window.getComputedStyle(button).paddingRight);
  return containerWidth - (paddingLeft + paddingRight) + "px";
}

// Define the animation
const fadeTl = gsap.timeline({ repeat: -1 });

const dotArrays = [grid1, grid2, grid3, grid4];

for (let i = 0; i < 6; i++) {
  const newArrow = arrow.cloneNode(true);
  arrowContainer.appendChild(newArrow);
  dotArrays.push(newArrow.querySelectorAll(".grid-1"));
  dotArrays.push(newArrow.querySelectorAll(".grid-2"));
  dotArrays.push(newArrow.querySelectorAll(".grid-3"));
  dotArrays.push(newArrow.querySelectorAll(".grid-4"));
}

dotArrays.forEach((grid, index) => {
  fadeTl
    .fromTo(grid, { opacity: 1 }, { opacity: 0, duration: 2 }, index * 0.1)
    .fromTo(grid, { opacity: 0 }, { opacity: 1, duration: 3 }, "<0.5");
});

const arrows = document.querySelectorAll(".arrow");

arrows.forEach((arrow, index) => {
  if (index !== 3) {
    arrow.classList.add("hidden");
  }
});

tl.add(() =>
  arrows.forEach((arrow, index) => {
    if (index !== 3) {
      arrow.classList.toggle("hidden");
    }
  })
);

tl.to(button, {
  width: calculateButtonWidth,
  duration: 0.5,
});

container.addEventListener("mouseenter", () => {
  tl.play();
});

container.addEventListener("mouseleave", () => {
  tl.reverse();
});
