document.addEventListener("DOMContentLoaded", function () {
  const linksInput = document.getElementById("linksInput");
  const openBtn = document.getElementById("openBtn");
  const clearBtn = document.getElementById("clearBtn");
  const exampleBtn = document.getElementById("exampleBtn");
  const stopBtn = document.getElementById("stopBtn");
  const linksList = document.getElementById("linksList");
  const validCount = document.getElementById("validCount");
  const totalCount = document.getElementById("totalCount");
  const delaySlider = document.getElementById("delaySlider");
  const delayValue = document.getElementById("delayValue");
  const sequentialBtn = document.getElementById("sequentialBtn");
  const allAtOnceBtn = document.getElementById("allAtOnceBtn");
  const progressContainer = document.getElementById("progressContainer");
  const progressFill = document.getElementById("progressFill");
  const progressText = document.getElementById("progressText");
  const currentOpening = document.getElementById("currentOpening");
  const currentLinkText = document.getElementById("currentLinkText");

  let links = [];
  let validLinks = [];
  let isOpening = false;
  let stopOpening = false;
  let openingMode = "sequential"; // 'sequential' or 'all'

  // Function to validate a URL
  function isValidURL(string) {
    try {
      const url = new URL(string);
      return url.protocol === "http:" || url.protocol === "https:";
    } catch (_) {
      return false;
    }
  }

  // Function to extract links from text
  function extractLinks(text) {
    // Split by newlines and filter out empty lines
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
    return lines;
  }

  // Function to update the links list display
  function updateLinksDisplay() {
    const text = linksInput.value;
    const extractedLinks = extractLinks(text);

    linksList.innerHTML = "";
    let validLinksCount = 0;

    if (extractedLinks.length === 0) {
      linksList.innerHTML =
        '<div class="empty-state">No links detected yet. Start typing or paste your links above.</div>';
      openBtn.disabled = true;
      openBtn.innerHTML =
        '<i class="fas fa-external-link-alt"></i> Open Links One By One';
    } else {
      openBtn.disabled = false;

      extractedLinks.forEach((link, index) => {
        const isValid = isValidURL(link);
        if (isValid) validLinksCount++;

        const linkItem = document.createElement("div");
        linkItem.className = "link-item";
        linkItem.id = `link-item-${index}`;

        const linkInfo = document.createElement("div");
        linkInfo.className = "link-info";

        const linkUrl = document.createElement("div");
        linkUrl.className = "link-url";
        linkUrl.textContent = link;

        const linkStatus = document.createElement("div");
        linkStatus.className = "link-status";

        const statusIcon = document.createElement("i");
        statusIcon.className = isValid
          ? "fas fa-check-circle status-valid"
          : "fas fa-times-circle status-invalid";

        const statusText = document.createElement("span");
        statusText.textContent = isValid ? "Valid URL" : "Invalid URL";
        statusText.className = isValid ? "status-valid" : "status-invalid";

        linkStatus.appendChild(statusIcon);
        linkStatus.appendChild(statusText);

        linkInfo.appendChild(linkUrl);
        linkInfo.appendChild(linkStatus);

        const linkActions = document.createElement("div");
        linkActions.className = "link-actions";

        if (isValid) {
          const openIndividualBtn = document.createElement("button");
          openIndividualBtn.className = "action-btn open-individual";
          openIndividualBtn.innerHTML =
            '<i class="fas fa-external-link-alt"></i>';
          openIndividualBtn.title = "Open this link";
          openIndividualBtn.addEventListener("click", () => {
            window.open(link, "_blank");
          });

          linkActions.appendChild(openIndividualBtn);
        }

        const copyBtn = document.createElement("button");
        copyBtn.className = "action-btn copy-link";
        copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
        copyBtn.title = "Copy link to clipboard";
        copyBtn.addEventListener("click", () => {
          navigator.clipboard.writeText(link).then(() => {
            // Show copied feedback
            const originalHTML = copyBtn.innerHTML;
            copyBtn.innerHTML = '<i class="fas fa-check"></i>';
            copyBtn.style.background = "rgba(46, 213, 115, 0.3)";

            setTimeout(() => {
              copyBtn.innerHTML = originalHTML;
              copyBtn.style.background = "";
            }, 1000);
          });
        });

        linkActions.appendChild(copyBtn);

        linkItem.appendChild(linkInfo);
        linkItem.appendChild(linkActions);

        linksList.appendChild(linkItem);
      });
    }

    // Update counters
    validCount.textContent = validLinksCount;
    totalCount.textContent = extractedLinks.length;

    // Update the links arrays
    links = extractedLinks;
    validLinks = extractedLinks.filter((link) => isValidURL(link));
  }

  // Function to open links sequentially
  async function openLinksSequentially() {
    if (validLinks.length === 0) return;

    isOpening = true;
    stopOpening = false;

    // Show progress container
    progressContainer.style.display = "block";
    stopBtn.style.display = "block";

    // Disable input and buttons
    openBtn.disabled = true;
    openBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening...';
    linksInput.disabled = true;

    // Get delay value
    const delay = parseInt(delaySlider.value);

    // Update progress
    let openedCount = 0;
    const totalLinks = validLinks.length;

    // Reset link items
    validLinks.forEach((link, index) => {
      const linkItem = document.getElementById(
        `link-item-${links.indexOf(link)}`,
      );
      if (linkItem) {
        linkItem.classList.remove("opening", "opened");
      }
    });

    // Open each link with delay
    for (let i = 0; i < validLinks.length; i++) {
      if (stopOpening) break;

      const link = validLinks[i];
      const linkIndex = links.indexOf(link);

      // Update current opening display
      currentOpening.style.display = "flex";
      currentLinkText.textContent = `Opening: ${link.substring(0, 60)}${link.length > 60 ? "..." : ""}`;

      // Highlight the link being opened
      const linkItem = document.getElementById(`link-item-${linkIndex}`);
      if (linkItem) {
        // Remove opened class from all links
        document.querySelectorAll(".link-item").forEach((item) => {
          item.classList.remove("opening");
        });

        linkItem.classList.add("opening");
      }

      // Open the link in a new tab
      window.open(link, "_blank");

      // Update progress
      openedCount++;
      const progressPercent = (openedCount / totalLinks) * 100;
      progressFill.style.width = `${progressPercent}%`;
      progressText.textContent = `${openedCount} of ${totalLinks} links opened`;

      // Mark as opened
      if (linkItem) {
        linkItem.classList.remove("opening");
        linkItem.classList.add("opened");
      }

      // If not the last link, wait for the delay
      if (i < validLinks.length - 1 && !stopOpening) {
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }

    // Reset UI
    isOpening = false;
    openBtn.disabled = false;
    openBtn.innerHTML =
      openingMode === "sequential"
        ? '<i class="fas fa-external-link-alt"></i> Open Links One By One'
        : '<i class="fas fa-bolt"></i> Open All Links';
    linksInput.disabled = false;
    stopBtn.style.display = "none";
    currentOpening.style.display = "none";

    if (stopOpening) {
      progressText.textContent = `Stopped. ${openedCount} of ${totalLinks} links opened`;
    } else {
      progressText.textContent = `Completed! All ${totalLinks} links opened`;
      openBtn.innerHTML = '<i class="fas fa-check"></i> All Links Opened!';
      openBtn.style.background = "linear-gradient(90deg, #2ed573, #1e90ff)";

      setTimeout(() => {
        openBtn.innerHTML =
          openingMode === "sequential"
            ? '<i class="fas fa-external-link-alt"></i> Open Links One By One'
            : '<i class="fas fa-bolt"></i> Open All Links';
        openBtn.style.background = "";
      }, 3000);
    }
  }

  // Function to open all links at once
  function openAllLinksAtOnce() {
    if (validLinks.length === 0) return;

    // Disable button while opening
    openBtn.disabled = true;
    const originalText = openBtn.innerHTML;
    openBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Opening All...';

    // Open all links at once
    validLinks.forEach((link, index) => {
      window.open(link, "_blank");

      // Mark as opened
      const linkIndex = links.indexOf(link);
      const linkItem = document.getElementById(`link-item-${linkIndex}`);
      if (linkItem) {
        linkItem.classList.add("opened");
      }
    });

    // Update progress display
    progressContainer.style.display = "block";
    progressFill.style.width = "100%";
    progressText.textContent = `All ${validLinks.length} links opened at once`;

    // Reset button
    setTimeout(() => {
      openBtn.disabled = false;
      openBtn.innerHTML = '<i class="fas fa-check"></i> All Links Opened!';
      openBtn.style.background = "linear-gradient(90deg, #2ed573, #1e90ff)";

      setTimeout(() => {
        openBtn.innerHTML = originalText;
        openBtn.style.background = "";
      }, 3000);
    }, 1000);
  }

  // Event listeners
  linksInput.addEventListener("input", updateLinksDisplay);

  openBtn.addEventListener("click", function () {
    if (openingMode === "sequential") {
      openLinksSequentially();
    } else {
      openAllLinksAtOnce();
    }
  });

  clearBtn.addEventListener("click", () => {
    linksInput.value = "";
    updateLinksDisplay();
    progressContainer.style.display = "none";

    // Add visual feedback
    clearBtn.innerHTML = '<i class="fas fa-check"></i> Cleared!';
    clearBtn.style.background = "#2ed573";

    setTimeout(() => {
      clearBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Clear All';
      clearBtn.style.background = "";
    }, 1000);
  });

  exampleBtn.addEventListener("click", () => {
    linksInput.value = `
                        https://www.munthasir.com
                        https://www.facebook.com/munthasir.devs
                        https://github.com/munthasirdevs
                        https://www.instagram.com/munthasir.devs
                        https://www.linkedin.com/in/munthasir-devs/
                        `;
    updateLinksDisplay();

    // Add visual feedback
    exampleBtn.innerHTML = '<i class="fas fa-check"></i> Loaded!';
    exampleBtn.style.background = "#2ed573";

    setTimeout(() => {
      exampleBtn.innerHTML = '<i class="fas fa-list-alt"></i> Load Example';
      exampleBtn.style.background = "";
    }, 1000);
  });

  stopBtn.addEventListener("click", () => {
    stopOpening = true;
    stopBtn.innerHTML = '<i class="fas fa-check"></i> Stopped!';
    stopBtn.style.background = "#2ed573";

    setTimeout(() => {
      stopBtn.style.display = "none";
      stopBtn.innerHTML = '<i class="fas fa-stop-circle"></i> Stop';
      stopBtn.style.background = "";
    }, 1500);
  });

  delaySlider.addEventListener("input", function () {
    delayValue.textContent = this.value;
  });

  sequentialBtn.addEventListener("click", function () {
    openingMode = "sequential";
    sequentialBtn.style.background = "#00dbde";
    allAtOnceBtn.style.background = "#2a2a4a";
    openBtn.innerHTML =
      '<i class="fas fa-external-link-alt"></i> Open Links One By One';
  });

  allAtOnceBtn.addEventListener("click", function () {
    openingMode = "all";
    allAtOnceBtn.style.background = "#00dbde";
    sequentialBtn.style.background = "#2a2a4a";
    openBtn.innerHTML = '<i class="fas fa-bolt"></i> Open All Links';
  });

  // Add some example links on first load
  if (!localStorage.getItem("multiLinkOpenerUsed")) {
    exampleBtn.click();
    localStorage.setItem("multiLinkOpenerUsed", "true");
  }

  // Initialize the display
  updateLinksDisplay();
});
