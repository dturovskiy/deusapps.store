document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-icon");
  const languageToggle = document.getElementById("language-toggle");
  const languageMenu = document.getElementById("language-menu");
  const appTabs = document.querySelectorAll(".app-tab");
  const selectedIcon = document.getElementById("selected-app-icon");
  const selectedTitle = document.getElementById("selected-app-title");
  const selectedDescription = document.getElementById("selected-app-description");
  const selectedFeatures = document.getElementById("selected-app-features");
  const selectedDownload = document.getElementById("selected-app-download");

  const supportedLanguages = Object.keys(window.translations || {});
  let currentLanguage = localStorage.getItem("language") || getBrowserLanguage();
  let currentApp = "notes";

  const appAssets = {
    notes: {
      icon: "images/NotesApp.svg",
      download: "downloads/NotesApp.apk",
      filename: "NotesApp.apk"
    },
    calculator: {
      icon: "images/CalculatorApp.svg",
      download: "downloads/CalculatorApp.apk",
      filename: "CalculatorApp.apk"
    }
  };

  function getBrowserLanguage() {
    const browserLanguage = navigator.language || navigator.userLanguage || "en";
    const shortCode = browserLanguage.split("-")[0];

    if (supportedLanguages.includes(shortCode)) {
      return shortCode;
    }

    return "en";
  }

  function resolveTranslation(source, key) {
    return key.split(".").reduce((value, part) => {
      if (value && Object.prototype.hasOwnProperty.call(value, part)) {
        return value[part];
      }

      return undefined;
    }, source);
  }

  function t(key) {
    return resolveTranslation(window.translations?.[currentLanguage], key) ||
      resolveTranslation(window.translations?.en, key);
  }

  function setLanguage(language) {
    if (!window.translations || !window.translations[language]) {
      language = "en";
    }

    currentLanguage = language;
    localStorage.setItem("language", language);
    document.documentElement.lang = language;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      const value = resolveTranslation(window.translations[language], key) ||
        resolveTranslation(window.translations.en, key);

      if (typeof value === "string") {
        element.textContent = value;
      }
    });

    renderLanguageMenu();
    renderSelectedApp();
  }

  function renderLanguageMenu() {
    if (!languageMenu || !window.translations) {
      return;
    }

    languageMenu.innerHTML = "";

    supportedLanguages.forEach((language) => {
      const item = document.createElement("li");
      item.textContent = window.translations[language].languageName || language;
      item.classList.toggle("active", language === currentLanguage);
      item.setAttribute("role", "button");
      item.tabIndex = 0;

      const activate = () => {
        setLanguage(language);
        languageMenu.classList.remove("visible");
      };

      item.addEventListener("click", activate);
      item.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          activate();
        }
      });

      languageMenu.appendChild(item);
    });
  }

  function renderSelectedApp() {
    const app = appAssets[currentApp];
    const name = t(`apps.${currentApp}.name`) || currentApp;
    const description = t(`apps.${currentApp}.description`) || "";
    const features = t(`apps.${currentApp}.features`) || [];
    const button = t("downloads.downloadButton") || "Download APK";

    appTabs.forEach((tab) => {
      const isActive = tab.dataset.app === currentApp;
      tab.classList.toggle("active", isActive);
      tab.setAttribute("aria-selected", String(isActive));
    });

    if (selectedIcon) {
      selectedIcon.src = app.icon;
      selectedIcon.alt = `${name} icon`;
    }

    if (selectedTitle) {
      selectedTitle.textContent = name;
    }

    if (selectedDescription) {
      selectedDescription.textContent = description;
    }

    if (selectedFeatures) {
      selectedFeatures.innerHTML = "";
      features.forEach((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        selectedFeatures.appendChild(item);
      });
    }

    if (selectedDownload) {
      selectedDownload.href = app.download;
      selectedDownload.download = app.filename;
      selectedDownload.textContent = `${button} ${app.filename}`;
    }
  }

  function setTheme(theme) {
    body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    if (themeIcon) {
      themeIcon.textContent = theme === "dark" ? "☀️" : "🌙";
    }
  }

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(savedTheme || (prefersDark ? "dark" : "light"));

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.getAttribute("data-theme") === "dark";
      setTheme(isDark ? "light" : "dark");
    });
  }

  if (languageToggle && languageMenu) {
    languageToggle.addEventListener("click", (event) => {
      event.stopPropagation();
      languageMenu.classList.toggle("visible");
    });

    document.addEventListener("click", (event) => {
      if (!event.target.closest(".language-selector")) {
        languageMenu.classList.remove("visible");
      }
    });
  }

  appTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      currentApp = tab.dataset.app || "notes";
      renderSelectedApp();
    });
  });

  setLanguage(currentLanguage);
});
