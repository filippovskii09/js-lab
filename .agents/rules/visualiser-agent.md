---
trigger: manual
---

## 🏗️ JSLab SDK Integration Rules

Ти працюєш всередині екосистеми **JS-Lab SDK**. Твоє завдання — генерувати лише контентну частину візуалізації, покладаючись на спільне ядро (Core).

### 1. Екосистема та Шляхи (Paths)
- Всі візуалізації МАЮТЬ використовувати спільні ресурси з `/visualisation/core/`.
- Завжди підключай ядро через відносні шляхи:
  - `<link rel="stylesheet" href="../core/theme.css">`
  - `<script src="../core/engine.js" defer></script>`
- ЗАБОРОНЕНО дублювати стилі кнопок, шрифтів або базову логіку перемикання кроків у локальному файлі.

### 2. Структура вихідного файлу (Output Architecture)
Згенерований `index.html` має бути максимально легким і містити лише:
1. Контейнер для монтування: `<div id="js-lab-visualizer"></div>`.
2. Об'єкт конфігурації `const config = { ... }`.
3. Ініціалізацію двигуна: `new JSLabEngine(config);`.

### 3. Стандарт даних (The Step Object)
Кожен крок у масиві `steps` має суворо відповідати специфікації твого SDK:
- **`codeLine`**: Число або масив чисел для підсвітки активного рядка.
- **`state`**: Об'єкт, що описує стан пам'яті:
    - **`stack`**: Список фреймів (Lexical Environments). Для кожного вказуй `type` (Global, Function, Block) та `records` (змінні).
    - **`heap`**: Об'єкти, що існують поза стеком, з обов'язковими адресами (напр. `0xAD42`).
- **`narration`**: Контекстний супровід:
    - **`title`**: Технічна назва етапу.
    - **`body`**: Глибокий аналіз (What + Why) з використанням термінології: *Environment Record*, *Outer Reference*, *TDZ*.
    - **`insight`**: Практична порада (Pro Tip).

### 4. Технічна точність (Engine Logic)
- **TDZ & Uninitialized:** Для `let/const` на фазі створення середовища стан МАЄ бути позначений як `<uninitialized>`.
- **Scope Chain:** При візуалізації пошуку (Resolution) крок має наочно показувати рекурсивний перехід до `[[OuterEnv]]`.
- **Reference Logic:** Якщо в Стеку лежить об'єкт, там має бути лише фіолетова адреса-посилання, а сам контент — у Купі (Heap).

### 5. Оформлення коду (Syntax Highlighting)
Весь JavaScript код у конфігурації має бути вручну розмічений тегами `<span>` для підсвітки (згідно з `theme.css`):
- `.kw` — ключові слова (`let`, `function`).
- `.fn` — назви функцій.
- `.str` — рядкові літерали.
- `.op` — оператори.
- Жодного "стиснутого" коду. Використовуй відступи у 2 пробіли.

# 🚀 Advanced Visualizer Rules: Senior Edition

## 1. Deep Dive Into V8 & Spec
- **Spec Reference:** При візуалізації Lexical Environment завжди розрізняй Declarative ER та Object ER (для глобального об'єкта).
- **Memory Lifecycle:** Якщо крок показує завершення функції, акцентуй увагу на тому, чи видаляється Lexical Environment зі стеку, чи він "виживає" в Heap через замикання (Closure).
- **Hidden Transitions:** Візуалізуй перехід від TDZ до ініціалізованого стану як критичну зміну в Environment Record.

## 2. The "Contextual Narrator" Logic
Твій `narration` об'єкт має бути структурований як міні-лекція:
- **`what`**: Опиши фізичну дію (напр. "Реєстрація зміної в Declarative Record").
- **`why`**: Поясни механіку (напр. "Бо let не має підйому значення, лише декларації").
- **`insight`**: Надай контекст для Senior-ів. Як цей механізм запобігає багам або як V8 оптимізує цей пошук за допомогою "Static Scope Mapping".

## 3. Visual Debugger Standards
- **Shadowing Awareness:** Якщо відбувається затінення змінної, візуально покажи, що зовнішній ідентифікатор стає недоступним у поточному ланцюжку пошуку.
- **This Context:** Завжди відображай `this` як частину Function Environment Record, а не просто як змінну.
- **Reference Pointers:** Кожне посилання в `[[OuterEnv]]` має бути чіткою лінією до "батьківського" середовища.

## 4. Educational Scenarios (Training Data)
Ти маєш бути готовим візуалізувати такі "Edge Cases":
- **Temporal Dead Zone:** Спроба доступу до `let` до її ініціалізації.
- **Closure Persistence:** Коли функція-батько зникла зі стеку, а її LexEnv — ні.
- **Scope Chain Resolution:** Рівень за рівнем підйому вгору до Global Env (null).
- **Lexical vs Variable Env:** Чому `var` ігнорує блоки `if/for`.