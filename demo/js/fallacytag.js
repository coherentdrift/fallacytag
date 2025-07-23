const explanations = {
  "appeal-to-hypocrisy": {
    name: "Possible Tu Quoque / Appeal to Hypocrisy",
    text: "This rhetorical turn reframes current global labor issues as morally moot by pointing to historical U.S. hypocrisy (e.g., CIA). The structure diverts attention from the core argument about tariffs and global supply chains.",
  },
  "appeal-to-popular-belief": {
    name: "Possible Appeal to Popular Belief",
    text: "Presented in support of a serious ethical indictment (sweatshop use), the statement substitutes belief for evidence—amplifying an unverified claim in a central argument.",
  },
  "hasty-generalization": {
    name: "Possible Hasty Generalization",
    text: "This sweeping claim forecloses hope for behavioral change by asserting universal cynicism. It undermines the moral appeal of preceding statistics and anchors the policy rationale in resignation rather than possibility.",
  },
};

const explanationBox = document.getElementById("explanation-box");
const nameBox = document.getElementById("fallacy-name");
const textBox = document.getElementById("fallacy-description");
let hoverTimeout = null;

function isTouchDevice() {
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.msMaxTouchPoints > 0
  );
}

function showExplanation(key, anchorElement) {
  const exp = explanations[key];
  nameBox.innerText = exp.name;
  textBox.innerText = exp.text;

  // Move explanation box directly after anchor element
  anchorElement.insertAdjacentElement("afterend", explanationBox);
  explanationBox.classList.add("active");
}

function hideExplanation(reason) {
  explanationBox.classList.remove("active");
  console.log("Dismissed with reason:", reason);
}

document.querySelectorAll(".fallacy").forEach((el) => {
  const key = el.dataset.fallacy;

  if (isTouchDevice()) {
    el.addEventListener("click", () => {
      showExplanation(key, el);
    });
  } else {
    el.addEventListener("mouseenter", () => {
      clearTimeout(hoverTimeout);
      showExplanation(key, el);
    });

    el.addEventListener("mouseleave", () => {
      hoverTimeout = setTimeout(() => {
        hideExplanation("ignore");
      }, 500);
    });
  }
});

explanationBox.addEventListener("mouseenter", () => {
  clearTimeout(hoverTimeout);
});

explanationBox.addEventListener("mouseleave", () => {
  hoverTimeout = setTimeout(() => {
    hideExplanation("ignore");
  }, 500);
});

document.getElementById("btn-thanks").addEventListener("click", () => {
  hideExplanation("thanks");
});
document.getElementById("btn-incorrect").addEventListener("click", () => {
  hideExplanation("incorrect");
});

// Handle ?highlight=f1 URL param
const highlightId = new URLSearchParams(window.location.search).get(
  "highlight"
);
if (highlightId) {
  const target = document.querySelector(`.fallacy[data-id="${highlightId}"]`);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.classList.add("pulse");

    const key = target.dataset.fallacy;
    showExplanation(key, target);
  }
}

// Apply theme from URL if present
const theme = new URLSearchParams(window.location.search).get("theme");
if (theme) {
  document.body.setAttribute("data-theme", theme);
}

// Suppress context for embed mode
const isEmbed = new URLSearchParams(window.location.search).get("embed") === "true";
if (isEmbed) {
  const context = document.getElementById("demo-context");
  if (context) {
    context.style.display = "none";
  }
}
