export class JSLabEngine {
  /**
   * @param {Object} config
   * @param {Array} config.steps - Масив об'єктів кроків 
   * (codeLine, action, narration: {title, what, why, insight})
   */
  constructor(config) {
    this.steps = config.steps || [];
    this.currentStep = 0;
    
    // Bind UI elements
    this.btnPrev = document.getElementById('btnPrev');
    this.btnNext = document.getElementById('btnNext');
    this.stepInfo = document.getElementById('stepInfo');
    
    this.analysisTitle = document.getElementById('analysis-title');
    this.logWhat = document.getElementById('log-what');
    this.logWhy = document.getElementById('log-why');
    this.logInsight = document.getElementById('log-insight');
    this.analysisBody = document.getElementById('analysis-body');
  }

  init() {
    if (this.btnNext) {
      this.btnNext.addEventListener('click', () => this.next());
    }
    if (this.btnPrev) {
      this.btnPrev.addEventListener('click', () => this.prev());
    }
    this.renderStep();
  }

  next() {
    if (this.currentStep < this.steps.length - 1) {
      this.currentStep++;
      this.renderStep();
    }
  }

  prev() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep();
    }
  }

  renderStep() {
    const step = this.steps[this.currentStep];

    // 1. Highlight code
    document.querySelectorAll('.js-lab-line').forEach(el => el.classList.remove('active-line'));
    if (step.codeLine) {
      const lineEl = document.getElementById(step.codeLine);
      if (lineEl) lineEl.classList.add('active-line');
    }

    // 2. Execute custom state update (Memory/Stack UI actions)
    if (typeof step.action === 'function') {
      step.action();
    }

    // 3. Update controls indicator
    if (this.stepInfo) {
      this.stepInfo.innerText = `Крок ${this.currentStep + 1} / ${this.steps.length}`;
      this.stepInfo.title = step.narration?.title || '';
    }
    if (this.btnPrev) this.btnPrev.disabled = this.currentStep === 0;
    if (this.btnNext) this.btnNext.disabled = this.currentStep === this.steps.length - 1;

    // 4. Update Analysis Panel with transitions
    if (this.analysisBody) {
      this.analysisBody.classList.remove('fade-in');
      this.analysisBody.classList.add('fade-out');

      setTimeout(() => {
        if (this.analysisTitle) this.analysisTitle.innerText = step.narration?.title || '';
        if (this.logWhat) this.logWhat.innerText = step.narration?.what || '';
        if (this.logWhy) this.logWhy.innerText = step.narration?.why || '';
        if (this.logInsight) this.logInsight.innerText = step.narration?.insight || '';
        
        this.analysisBody.classList.remove('fade-out');
        this.analysisBody.classList.add('fade-in');
      }, 300); // Wait for CSS transition (0.3s)
    }
  }
}
