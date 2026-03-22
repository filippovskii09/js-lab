# Functions & OOP: Mental Model

Цей модуль присвячений **лексичним середовищам**, механізму замикань та внутрішній архітектурі об'єктно-орієнтованого програмування у JavaScript.

Він розбирає, як функції "пакують" у себе пам'ять при створенні та як оператор `.prototype` дозволяє економити оперативну пам'ять (Heap).

---

## 🎯 Що ви вивчите в цьому модулі?

1. **Замикання (Closures) на рівні байткоду:** Як працюють невидимі посилання `[[Environment]]` та як вони подовжують життя Лексичним Середовищам у `Heap`.
2. **Делегування Прототипів:** Внутрішню рекурсивну операцію `[[Get]]` та чому вона іноді буває повільною.
3. **Internal Operation `[[Construct]]`:** Що саме робить ключове слово `new` за 4 покрокові етапи (Allocation, Linking, Bind 'this', Return).
4. **Специфіка `class` (Sugar):** Різницю між синтаксичним класом і класичним `Object.create`.

---

## 📂 Розділи модуля

### 1. [`[[Environment]]` Reference & Closures](./01-environment-reference/README.md)
*   **Про що:** Створення замикань у пам'яті рушія V8.
*   **Ключові концепції:** `Context Allocation` (перенос Stack Frame у Heap), приховане поле `[[Environment]]`, Scope Chain реставрація.
*   **Візуалізація:** Інтерактивний покроковий симулятор народження замикання.

### 2. [Prototype Chain Lookup: How `[[Get]]` Works](./02-prototype-chain/README.md)
*   **Про що:** Алгоритм рекурсивного пошуку властивостей по ланцюжку.
*   **Ключові концепції:** `GetOwnProperty`, `Accessor Descriptor`, Property Shadowing (затінення), `Dictionary Mode`.
*   **Візуалізація:** Симулятор ітерацій алгоритму `[[Get]]` до рівня `null`.

### 3. [Syntactic Sugar (`class` vs Constructor)](./03-class-syntactic-sugar/README.md)
*   **Про що:** Операція `[[Construct]]` та що відбувається під капотом `new`.
*   **Ключові концепції:** `this` bind callback isolation (проблеми втрати контексту), non-hoisting (відсутність спливання класів), `.prototype` memory aggregation.
*   **Візуалізація:** Покрокова симуляція alloc \ link \ bind нового екземпляра класу.

---

## 🚀 Навіщо це Senior / Middle розробнику?

*   **Безпека (Prototype Pollution):** Вміння писати чисті `Object.create(null)` словники, захищені від ін'єкцій.
*   **Захист від Memory Leaks (Витоків пам'яті):** Розуміння, які змінні `hugeData` застрягають у Event Listeners через замикання.
*   **Продуктивність Node.js:** Знання того, коли `Object.setPrototypeOf()` ламає весь кеш (Inline Caches) вашого додатка назавжди.
