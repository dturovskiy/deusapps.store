document.addEventListener('DOMContentLoaded', function() {
  // Ініціалізація перемикання додатків
  function initAppSwitcher() {
    const appOptions = document.querySelectorAll('.app-option');
    
    // Функція для перемикання додатків
    function switchApp(appName) {
      // Оновлюємо активні кнопки
      appOptions.forEach(option => {
        option.classList.toggle('active', option.dataset.app === appName);
      });
      
      // Перемикаємо секції завантаження
      document.querySelectorAll('.app-download').forEach(section => {
        section.classList.toggle('hidden', section.id !== `${appName}-download`);
      });
      
      // Перемикаємо секції можливостей
      document.querySelectorAll('.features > div').forEach(section => {
        section.classList.toggle('hidden', section.id !== `${appName}-features`);
      });
    }
    
    // Обробник кліків
    appOptions.forEach(option => {
      option.addEventListener('click', function() {
        switchApp(this.dataset.app);
      });
    });
    
    // Активуємо перший додаток за замовчуванням
    switchApp('notes');
  }

  // Викликаємо ініціалізацію
  initAppSwitcher();

  // Інший ваш код (для теми, мови тощо)...
  // Функціонал для завантаження файлу
  document.querySelectorAll('.download-button').forEach(button => {
    button.addEventListener('click', function(event) {
      event.preventDefault();
      alert(translations[currentLang].downloadAlert);
      window.location.href = this.href;
    });
  });

  // Функціонал для переключення теми
  const themeToggle = document.getElementById('theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const body = document.body;

  if (themeToggle && themeIcon && body) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      body.setAttribute('data-theme', savedTheme);
      themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
    }

    themeToggle.addEventListener('click', () => {
      const isDark = body.getAttribute('data-theme') === 'dark';
      body.setAttribute('data-theme', isDark ? 'light' : 'dark');
      themeIcon.textContent = isDark ? '🌙' : '☀️';
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
    });
  }

  let currentLang = 'en';

  // Функція для визначення мови браузера
  function getBrowserLanguage() {
    const browserLang = navigator.language || navigator.userLanguage;
    const supportedLangs = Object.keys(translations);
    const shortLang = browserLang.split('-')[0];

    if (supportedLangs.includes(shortLang)) {
      return shortLang;
    }
    return 'en';
  }

  // Оновлена функція для зміни мови
  function changeLanguage(lang) {
    if (!translations[lang]) {
      console.error(`Translation for language '${lang}' not found`);
      return;
    }
  
    currentLang = lang;
    document.documentElement.lang = lang;
  
    // Оновлюємо текст на сторінці
    document.querySelectorAll('[data-lang]').forEach(element => {
      const key = element.getAttribute('data-lang');
      
      try {
        if (key.includes('[')) {
          const [arrayKey, index] = key.split(/\[|\]/g).filter(Boolean);
          if (translations[lang][arrayKey] && translations[lang][arrayKey][index]) {
            element.textContent = translations[lang][arrayKey][index];
          }
        } else if (key.includes('.')) {
          const [objKey, prop] = key.split('.');
          if (translations[lang][objKey]?.[prop]) {
            element.textContent = translations[lang][objKey][prop];
          }
        } else if (translations[lang][key]) {
          element.textContent = translations[lang][key];
        }
      } catch (e) {
        console.error(`Error updating text for key '${key}':`, e);
      }
    });
  
    localStorage.setItem('language', lang);
  }

  // Встановлюємо початкову мову
  const browserLang = getBrowserLanguage();
const savedLanguage = localStorage.getItem('language');
const defaultLang = translations[browserLang] ? browserLang : 'en';
changeLanguage(savedLanguage || defaultLang);

  // Функція для створення списку мов
  function renderLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (!menu) return;

    menu.innerHTML = Object.keys(translations)
      .map(lang => `
        <li data-lang-code="${lang}">
          ${translations[lang].languageName}
        </li>
      `)
      .join('');
  }

  // Функціонал для переключення мовного меню
  function toggleLanguageMenu() {
    const menu = document.getElementById('language-menu');
    if (!menu) return;
    menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
  }

  document.getElementById('language-menu')?.addEventListener('click', (event) => {
    const langCode = event.target.getAttribute('data-lang-code');
    if (langCode) {
      changeLanguage(langCode);
      toggleLanguageMenu();
    }
  });

  document.getElementById('language-toggle')?.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleLanguageMenu();
  });

  document.addEventListener('click', () => {
    const menu = document.getElementById('language-menu');
    if (menu && menu.style.display === 'block') {
      menu.style.display = 'none';
    }
  });

  // Ініціалізація
  renderLanguageMenu();
});