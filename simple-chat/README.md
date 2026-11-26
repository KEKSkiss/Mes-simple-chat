# Simple Chat (React)

Простая локальная чат-комната, переведённая с vanilla JS + Webpack на React + Vite.

## Функциональность

- Ввод имени автора и сообщения
- Сохранение имени и истории сообщений в `localStorage`
- Отображение времени сообщения
- Автопрокрутка к новым сообщениям
- Отправка по кнопке или клавише Enter

## Запуск

```bash
cd simple-chat-react
npm install
npm run dev
```

Откройте http://localhost:5173 в браузере.

## Сборка

```bash
npm run build
```

Готовые файлы будут в папке `dist/`.

## Структура

- `src/App.jsx` — основной компонент чата (хуки `useState`, `useEffect`, `useRef`)
- `src/App.css` — стили (сохранены из оригинала)
- `index.html` — HTML с подключением Material Icons
