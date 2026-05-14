'use strict';

class AigentiaApp {
  constructor() {
    this.thread      = document.getElementById('thread');
    this.threadInner = document.getElementById('thread-inner');
    this.inputField  = document.getElementById('input-field');
    this.sendBtn     = document.getElementById('send-btn');
    this.starters    = document.getElementById('starters');
    this.sidebar     = document.getElementById('sidebar');
    this.sidebarMark = document.getElementById('sidebar-mark');
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeLabel  = document.getElementById('theme-label');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');
    this.sidebarToggleBtn = document.getElementById('sidebar-toggle');

    this.isTyping      = false;
    this.typingTimer   = null;
    this.activeNavKey  = null;
    this.startersShown = true;

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupSidebar();
    this.setupInput();
    this.renderStarters();
    this.renderNavItems();

    setTimeout(() => this.triggerResponse('welcome'), 120);
  }

  /* ── Theme ─────────────────────────────────────────────── */

  setupTheme() {
    const saved = localStorage.getItem('ag-theme');
    const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const current = saved || 'system';
    this.applyTheme(current === 'system' ? prefers : current, current);
    this.themeToggle.addEventListener('click', () => this.cycleTheme());
  }

  applyTheme(effective, stored) {
    document.documentElement.setAttribute('data-theme', effective);
    this.updateThemeLabel(stored || effective);
    this.updateAgentMarkTheme(effective);
  }

  cycleTheme() {
    const current = localStorage.getItem('ag-theme') || 'system';
    const next = current === 'system' ? 'light' : current === 'light' ? 'dark' : 'system';
    localStorage.setItem('ag-theme', next);
    const effective = next === 'system'
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
      : next;
    this.applyTheme(effective, next);
  }

  updateThemeLabel(stored) {
    const labels = { system: 'System', light: 'Light', dark: 'Dark' };
    if (this.themeLabel) this.themeLabel.textContent = labels[stored] || 'Theme';

    const iconEl = this.themeToggle.querySelector('[data-lucide]');
    if (!iconEl) return;
    const icons = { system: 'monitor', light: 'sun', dark: 'moon' };
    iconEl.setAttribute('data-lucide', icons[stored] || 'monitor');
    if (window.lucide) lucide.createIcons({ nodes: [iconEl] });
  }

  updateAgentMarkTheme(effective) {
    document.querySelectorAll('.msg-agent-mark img').forEach(img => {
      img.src = effective === 'dark' ? 'aigentia-mark-cream.svg' : 'aigentia-mark-deep.svg';
    });
  }

  /* ── Sidebar ───────────────────────────────────────────── */

  setupSidebar() {
    if (this.sidebarToggleBtn) {
      this.sidebarToggleBtn.addEventListener('click', () => this.openSidebar());
    }
    if (this.sidebarOverlay) {
      this.sidebarOverlay.addEventListener('click', () => this.closeSidebar());
    }
    document.getElementById('sidebar-lockup')
      ?.addEventListener('click', () => {
        if (window.innerWidth <= 768) this.closeSidebar();
        this.triggerResponse('welcome');
      });
  }

  openSidebar() {
    this.sidebar.classList.add('open');
    this.sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    this.sidebar.classList.remove('open');
    this.sidebarOverlay.classList.remove('visible');
    document.body.style.overflow = '';
  }

  renderNavItems() {
    const nav = document.getElementById('sidebar-nav');
    if (!nav) return;
    NAV_ITEMS.forEach(item => {
      const el = document.createElement('div');
      el.className = 'nav-item';
      el.dataset.key = item.key;
      el.innerHTML = `
        <svg data-lucide="${item.icon}" class="nav-icon" stroke-width="1.5"></svg>
        <span class="nav-label">${item.label}</span>
      `;
      el.addEventListener('click', () => {
        if (window.innerWidth <= 768) this.closeSidebar();
        this.handleNavClick(item.key);
      });
      nav.appendChild(el);
    });
    if (window.lucide) lucide.createIcons({ nodes: nav.querySelectorAll('[data-lucide]') });
  }

  handleNavClick(key) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.key === key);
    });
    this.activeNavKey = key;
    this.triggerResponse(key);
  }

  setActiveNav(key) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.key === key);
    });
  }

  /* ── Input ─────────────────────────────────────────────── */

  setupInput() {
    this.inputField.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleSend();
      }
    });
    this.inputField.addEventListener('input', () => {
      this.inputField.style.height = 'auto';
      this.inputField.style.height = Math.min(this.inputField.scrollHeight, 120) + 'px';
    });
    this.sendBtn.addEventListener('click', () => this.handleSend());
  }

  handleSend() {
    const text = this.inputField.value.trim();
    if (!text || this.isTyping) return;
    this.inputField.value = '';
    this.inputField.style.height = 'auto';
    this.hideStarters();
    this.addUserMessage(text);
    const key = this.matchInput(text);
    this.triggerResponse(key || 'unknown', text);
  }

  matchInput(text) {
    const t = text.toLowerCase().trim().replace(/[?!.]/g, '');
    for (const [phrase, key] of Object.entries(TRIGGER_MAP)) {
      if (t.includes(phrase)) return key;
    }
    return null;
  }

  /* ── Starters ──────────────────────────────────────────── */

  renderStarters() {
    if (!this.starters) return;
    STARTERS.forEach(s => {
      const btn = document.createElement('button');
      btn.className = 'starter-btn';
      btn.textContent = s.label;
      btn.addEventListener('click', () => {
        this.hideStarters();
        this.addUserMessage(s.label);
        this.triggerResponse(s.key);
      });
      this.starters.appendChild(btn);
    });
  }

  hideStarters() {
    if (this.startersShown) {
      this.starters.classList.add('hidden');
      this.startersShown = false;
    }
  }

  /* ── Core response engine ──────────────────────────────── */

  triggerResponse(key) {
    if (this.isTyping) return;
    const content = CONTENT[key] || CONTENT.unknown;
    this.setActiveNav(key);

    const msgEl = this.createAgentMessage();
    this.threadInner.appendChild(msgEl);
    this.scrollToBottom();

    this.startLogoAnimation();
    this.isTyping = true;
    this.setSendDisabled(true);

    const thinkingEl = msgEl.querySelector('.msg-thinking');
    const bodyEl     = msgEl.querySelector('.msg-agent-body');

    setTimeout(() => {
      thinkingEl.remove();
      const cursor = document.createElement('span');
      cursor.className = 'typing-cursor';
      bodyEl.appendChild(cursor);
      this.scrollToBottom();

      this.typeText(bodyEl, content.text, cursor, () => {
        cursor.remove();
        this.stopLogoAnimation();
        this.isTyping = false;
        this.setSendDisabled(false);

        if (content.hasAssessment && content.assessmentKey) {
          this.renderAssessment(content.assessmentKey, msgEl);
        }

        if (content.followups && content.followups.length) {
          this.renderFollowups(content.followups, msgEl);
        }

        const rule = document.createElement('div');
        rule.className = 'msg-rule';
        msgEl.appendChild(rule);

        this.scrollToBottom();
      });
    }, 600);
  }

  createAgentMessage() {
    const effective = document.documentElement.getAttribute('data-theme') || 'light';
    const markSrc = effective === 'dark' ? 'aigentia-mark-cream.svg' : 'aigentia-mark-deep.svg';

    const msg = document.createElement('div');
    msg.className = 'msg msg-agent';
    msg.innerHTML = `
      <div class="msg-agent-header">
        <div class="msg-agent-mark">
          <img src="${markSrc}" alt="AiGENTiA">
        </div>
        <span class="msg-agent-label">AiGENTiA</span>
      </div>
      <div class="msg-agent-body">
        <div class="msg-thinking">
          <div class="thinking-dot"></div>
          <div class="thinking-dot"></div>
          <div class="thinking-dot"></div>
        </div>
      </div>
    `;
    return msg;
  }

  addUserMessage(text) {
    const msg = document.createElement('div');
    msg.className = 'msg msg-user';
    msg.innerHTML = `<div class="msg-user-bubble">${this.escapeHtml(text)}</div>`;
    this.threadInner.appendChild(msg);
    this.scrollToBottom();
  }

  /* ── Typing engine ─────────────────────────────────────── */

  typeText(container, rawText, cursor, onComplete) {
    const html = this.markdownToHtml(rawText);
    let charIndex = 0;
    let plainText = '';
    let currentParagraph = null;

    const segments = this.parseSegments(rawText);
    let segIndex = 0;
    let segCharIndex = 0;
    let domBuilt = false;
    const domSegments = [];

    const buildDomStructure = () => {
      const frag = document.createDocumentFragment();
      let lastBlock = null;

      segments.forEach((seg, i) => {
        if (seg.type === 'para_break') {
          lastBlock = null;
        } else if (seg.type === 'list_item') {
          let ul = (lastBlock && lastBlock.tagName === 'UL') ? lastBlock : null;
          if (!ul) {
            ul = document.createElement('ul');
            frag.appendChild(ul);
            lastBlock = ul;
          }
          const li = document.createElement('li');
          ul.appendChild(li);
          domSegments.push({ el: li, text: seg.text, inline: true });
          lastBlock = ul;
        } else {
          if (!lastBlock || lastBlock.tagName !== 'P') {
            lastBlock = document.createElement('p');
            frag.appendChild(lastBlock);
          }
          domSegments.push({ el: lastBlock, text: seg.text, inline: true });
        }
      });

      container.insertBefore(frag, cursor);
      domBuilt = true;
    };

    buildDomStructure();

    let dsIndex = 0;
    let dsChar = 0;

    const tick = () => {
      if (dsIndex >= domSegments.length) {
        onComplete && onComplete();
        return;
      }

      const ds = domSegments[dsIndex];
      const targetText = ds.text;

      const charsPerTick = Math.random() < 0.15 ? 1 : (Math.random() < 0.6 ? 2 : 3);
      const end = Math.min(dsChar + charsPerTick, targetText.length);

      const rendered = this.renderInlineMarkdown(targetText.slice(0, end));

      if (ds.el.tagName === 'LI') {
        ds.el.innerHTML = rendered;
      } else {
        const existingSegCount = domSegments.slice(0, dsIndex).filter(s => s.el === ds.el).length;
        const allSegsForEl = domSegments.filter(s => s.el === ds.el);
        const mySegIdx = allSegsForEl.indexOf(ds);
        let combinedHtml = '';
        allSegsForEl.slice(0, mySegIdx).forEach(s => {
          combinedHtml += this.renderInlineMarkdown(s.text);
        });
        combinedHtml += rendered;
        ds.el.innerHTML = combinedHtml + (cursor.parentNode === ds.el ? '' : '');
      }

      if (cursor.parentNode !== ds.el) {
        ds.el.appendChild(cursor);
      }

      dsChar = end;

      if (dsChar >= targetText.length) {
        dsIndex++;
        dsChar = 0;
      }

      this.scrollToBottom();
      const delay = 8 + Math.random() * 8;
      this.typingTimer = setTimeout(tick, delay);
    };

    tick();
  }

  parseSegments(text) {
    const segments = [];
    const lines = text.split('\n');
    let buffer = '';

    const flushBuffer = () => {
      if (buffer.trim()) {
        segments.push({ type: 'text', text: buffer.trim() });
      }
      buffer = '';
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line.startsWith('· ') || line.startsWith('- ')) {
        flushBuffer();
        segments.push({ type: 'list_item', text: line.slice(2) });
      } else if (line === '') {
        flushBuffer();
        if (segments.length && segments[segments.length - 1].type !== 'para_break') {
          segments.push({ type: 'para_break' });
        }
      } else {
        if (buffer) buffer += ' ';
        buffer += line;
      }
    }
    flushBuffer();

    return segments.filter((s, i) => {
      if (s.type === 'para_break' && i === segments.length - 1) return false;
      return true;
    });
  }

  renderInlineMarkdown(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>');
  }

  markdownToHtml(text) {
    const segments = this.parseSegments(text);
    let html = '';
    let inList = false;

    segments.forEach(seg => {
      if (seg.type === 'para_break') {
        if (inList) { html += '</ul>'; inList = false; }
      } else if (seg.type === 'list_item') {
        if (!inList) { html += '<ul>'; inList = true; }
        html += `<li>${this.renderInlineMarkdown(seg.text)}</li>`;
      } else {
        if (inList) { html += '</ul>'; inList = false; }
        html += `<p>${this.renderInlineMarkdown(seg.text)}</p>`;
      }
    });

    if (inList) html += '</ul>';
    return html;
  }

  /* ── Follow-up chips ───────────────────────────────────── */

  renderFollowups(keys, msgEl) {
    const container = document.createElement('div');
    container.className = 'msg-followups';

    keys.forEach(key => {
      const content = CONTENT[key];
      if (!content) return;
      const chip = document.createElement('button');
      chip.className = 'followup-chip';
      chip.innerHTML = `<svg data-lucide="corner-down-right" stroke-width="1.5"></svg> ${content.title}`;
      chip.addEventListener('click', () => {
        this.hideStarters();
        this.addUserMessage(content.title);
        this.triggerResponse(key);
      });
      container.appendChild(chip);
    });

    msgEl.appendChild(container);
    if (window.lucide) lucide.createIcons({ nodes: container.querySelectorAll('[data-lucide]') });
  }

  /* ── Assessments ───────────────────────────────────────── */

  renderAssessment(assessmentKey, msgEl) {
    const assessment = ASSESSMENTS[assessmentKey];
    if (!assessment) return;

    const card = document.createElement('div');
    card.className = 'assessment-card';

    const total = assessment.questions.length;
    let currentQ = 0;
    let scores = [];

    const render = () => {
      card.innerHTML = '';

      const header = document.createElement('div');
      header.className = 'assessment-header';
      header.innerHTML = `
        <div class="assessment-title">${assessment.title}</div>
        <div class="assessment-subtitle">${assessment.subtitle}</div>
      `;
      card.appendChild(header);

      if (currentQ >= total) {
        this.renderAssessmentResult(card, assessment, scores);
        return;
      }

      const q = assessment.questions[currentQ];
      const pct = Math.round((currentQ / total) * 100);

      const progressEl = document.createElement('div');
      progressEl.className = 'assessment-progress';
      progressEl.innerHTML = `
        <div class="progress-bar-track">
          <div class="progress-bar-fill" style="width:${pct}%"></div>
        </div>
        <span class="progress-label">Question ${currentQ + 1} of ${total}</span>
      `;
      card.appendChild(progressEl);

      const dimEl = document.createElement('div');
      dimEl.className = 'assessment-dimension';
      dimEl.textContent = q.dimension;
      card.appendChild(dimEl);

      const qEl = document.createElement('div');
      qEl.className = 'assessment-question';
      qEl.textContent = q.text;
      card.appendChild(qEl);

      const optionsEl = document.createElement('div');
      optionsEl.className = 'assessment-options';

      q.options.forEach((opt, i) => {
        const btn = document.createElement('button');
        btn.className = 'assessment-option';
        btn.innerHTML = `
          <div class="option-indicator">
            <div class="option-indicator-inner"></div>
          </div>
          <span>${opt.label}</span>
        `;
        btn.addEventListener('click', () => {
          scores.push(opt.score);
          currentQ++;
          render();
          this.scrollToBottom();
        });
        optionsEl.appendChild(btn);
      });

      card.appendChild(optionsEl);
    };

    render();
    msgEl.appendChild(card);
    this.scrollToBottom();
  }

  renderAssessmentResult(card, assessment, scores) {
    const total = scores.reduce((a, b) => a + b, 0);
    const max = assessment.questions.length * 4;
    const result = assessment.score(total);

    const resultEl = document.createElement('div');
    resultEl.className = 'assessment-result';
    resultEl.innerHTML = `
      <div class="result-band">${result.band}</div>
      <div class="result-score-row">
        <span class="result-score-num">${total}</span>
        <span class="result-score-max">/ ${max}</span>
      </div>
      <div class="result-summary">${result.summary}</div>
      <div class="result-detail">${result.detail}</div>
      <button class="result-cta" data-cta="${result.cta}">
        <svg data-lucide="arrow-right" stroke-width="1.5"></svg>
        Explore next steps
      </button>
    `;

    card.appendChild(resultEl);

    const ctaBtn = resultEl.querySelector('.result-cta');
    ctaBtn.addEventListener('click', () => {
      const key = ctaBtn.dataset.cta;
      const c = CONTENT[key];
      if (c) {
        this.addUserMessage(c.title);
        this.triggerResponse(key);
      }
    });

    if (window.lucide) lucide.createIcons({ nodes: card.querySelectorAll('[data-lucide]') });
  }

  /* ── Logo animation ────────────────────────────────────── */

  startLogoAnimation() {
    if (this.sidebarMark) this.sidebarMark.classList.add('ag-animated');
  }

  stopLogoAnimation() {
    if (this.sidebarMark) this.sidebarMark.classList.remove('ag-animated');
  }

  /* ── Utilities ─────────────────────────────────────────── */

  scrollToBottom() {
    requestAnimationFrame(() => {
      this.thread.scrollTop = this.thread.scrollHeight;
    });
  }

  setSendDisabled(disabled) {
    this.sendBtn.disabled = disabled;
  }

  escapeHtml(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }
}

/* ── Boot ──────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AigentiaApp();
});
