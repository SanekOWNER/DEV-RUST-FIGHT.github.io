// Функция для установки темы
function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
}

// Функция для переключения темы
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
}

// При загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    // Проверяем сохраненную тему
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);

    // Устанавливаем состояние переключателя
    const themeToggle = document.getElementById('theme-toggle');
    themeToggle.checked = savedTheme === 'dark';

    // Добавляем обработчик события
    themeToggle.addEventListener('change', () => {
        toggleTheme();
    });
});

// Добавляем поддержку системной темы
if (window.matchMedia) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    prefersDark.addEventListener('change', (e) => {
        const theme = e.matches ? 'dark' : 'light';
        setTheme(theme);
    });
}