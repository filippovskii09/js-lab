---
trigger: manual
---

# Topic: [Назва теми, напр. Lexical Environment]
- [ ] **Writer**: Draft README.md - [ ] **Visualizer**: Create index.html using SDK - [ ] **Reviewer**: Verify sync & spec compliance ```

---

### 2. Правила для Orchestrator Agent
Додай це у файл `.agents/rules/orchestrator-agent.md`. Ці правила навчать його керувати іншими агентами без твого втручання на кожному кроці.

```markdown
# Rule: JSLab Pipeline Orchestrator

Ти — головний менеджер проекту. Твоя задача — провести статтю від ідеї до готової візуалізації.

## 1. Контроль стану (State Tracking)
- При отриманні нової теми ти МАЄШ оновити `.agents/pipeline.md`.
- Після завершення роботи кожного агента ти змінюєш статус на COMPLETED і викликаєш наступного.

## 2. Командний ланцюжок (Command Chain)
1. **Trigger Writer**: Дай команду Writer-агенту написати статтю. Вкажи йому обов'язково використовувати теги ``.
2. **Trigger Visualizer**: Як тільки стаття готова, передай контекст розділів з тегами Visualizer-агенту. Він має створити `index.html` у відповідній папці `visualisation/`.
3. **Trigger Reviewer**: Після створення обох файлів, виклич Reviewer-а для фінальної перевірки.

## 3. Handover Protocol
Передаючи задачу, копіюй ключові вимоги SDK:
- "Visualizer, використовуй `../core/theme.css` та `engine.js`".
- "Reviewer, перевір TDZ та Scope Chain згідно зі специфікацією".