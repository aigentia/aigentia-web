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

    this.isTyping      = false;
    this.typingTimer   = null;
    this.startersShown = true;

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupSidebar();
    this.setupInput();
    this.setupCopyToClipboard();
    this.renderStarters();
    this.renderNavItems();

    setTimeout(() => this.triggerResponse('welcome'), 120);
  }

  /* ── Theme ─────────────────────────────────────────────── */

  setupTheme() {
    const saved    = localStorage.getItem('ag-theme');
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored   = saved || 'system';
    const effective = stored === 'system' ? (prefDark ? 'dark' : 'light') : stored;
    this.applyTheme(effective, stored);
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
    const staticSrc = effective === 'dark' ? 'aigentia-mark-on-deep.svg' : 'aigentia-mark-on-cream.svg';
    document.querySelectorAll('.msg-agent-mark img').forEach(img => {
      if (img === this._currentMarkImg) return; // leave animating mark alone
      img.src = staticSrc;
    });
    // If a mark is mid-animation, update it to the correct animated variant
    if (this._currentMarkImg) {
      this._currentMarkImg.src = effective === 'dark'
        ? 'aigentia-mark-animated-on-deep.svg'
        : 'aigentia-mark-animated-on-cream.svg';
      this._currentMarkStatic = staticSrc;
    }
  }

  /* ── Sidebar ───────────────────────────────────────────── */

  setupSidebar() {
    // Desktop: brand lockup tap returns to welcome
    // Mobile: brand lockup tap expands/collapses the icon strip
    document.getElementById('sidebar-lockup')?.addEventListener('click', () => {
      if (window.innerWidth <= 768) {
        this.sidebar.classList.contains('expanded')
          ? this.closeSidebar()
          : this.openSidebar();
      } else {
        this.triggerResponse('welcome');
      }
    });

    // Overlay tap closes sidebar
    this.sidebarOverlay?.addEventListener('click', () => this.closeSidebar());
  }

  openSidebar() {
    this.sidebar.classList.add('expanded');
    this.sidebarOverlay.classList.add('visible');
    document.body.style.overflow = 'hidden';
  }

  closeSidebar() {
    this.sidebar.classList.remove('expanded');
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
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.innerHTML = `
        <svg data-lucide="${item.icon}" class="nav-icon" stroke-width="1.5"></svg>
        <span class="nav-label">${item.label}</span>
      `;
      el.addEventListener('click', () => this.handleNavClick(item.key));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.handleNavClick(item.key);
        }
      });
      nav.appendChild(el);
    });
    if (window.lucide) lucide.createIcons({ nodes: nav.querySelectorAll('[data-lucide]') });
  }

  handleNavClick(key) {
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.key === key);
    });
    // On mobile, always collapse after selection
    if (window.innerWidth <= 768) this.closeSidebar();
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
    this.triggerResponse(key || 'unknown');
  }

  matchInput(text) {
    const t = text.toLowerCase().trim().replace(/[?!.]/g, '');
    for (const [phrase, key] of Object.entries(TRIGGER_MAP)) {
      if (t.includes(phrase)) return key;
    }
    return null;
  }

  /* ── Copy to clipboard ─────────────────────────────────── */

  setupCopyToClipboard() {
    this.thread.addEventListener('click', e => {
      const copyable = e.target.closest('.copyable');
      if (!copyable) return;
      const text = copyable.dataset.copy;

      const doConfirm = () => {
        const confirm = copyable.querySelector('.copy-confirm');
        confirm.classList.add('visible');
        setTimeout(() => confirm.classList.remove('visible'), 1800);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(doConfirm).catch(() => this.fallbackCopy(text, doConfirm));
      } else {
        this.fallbackCopy(text, doConfirm);
      }
    });
  }

  fallbackCopy(text, cb) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;opacity:0;top:0;left:0';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try { document.execCommand('copy'); cb(); } catch (_) {}
    document.body.removeChild(ta);
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

    this.startLogoAnimation(msgEl);
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
    const markSrc   = effective === 'dark' ? 'aigentia-mark-on-deep.svg' : 'aigentia-mark-on-cream.svg';

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

  /* ── Typing engine — 22ms/char, deliberate ────────────── */

  typeText(container, rawText, cursor, onComplete) {
    const segments    = this.parseSegments(rawText);
    const domSegments = [];

    // Build the full DOM structure up front
    const frag      = document.createDocumentFragment();
    let lastBlock   = null;

    segments.forEach(seg => {
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
        domSegments.push({ el: li, text: seg.text, isLi: true });
      } else {
        if (!lastBlock || lastBlock.tagName !== 'P') {
          lastBlock = document.createElement('p');
          frag.appendChild(lastBlock);
        }
        domSegments.push({ el: lastBlock, text: seg.text, isLi: false });
        lastBlock = lastBlock; // keep same <p> for next text seg without break
      }
    });

    container.insertBefore(frag, cursor);

    let dsIndex = 0;
    let dsChar  = 0;

    const tick = () => {
      if (dsIndex >= domSegments.length) {
        onComplete && onComplete();
        return;
      }

      const ds         = domSegments[dsIndex];
      const targetText = ds.text;
      // 22ms average: range 20–24ms
      const delay      = 20 + Math.floor(Math.random() * 5);
      const chunkSize  = Math.random() < 0.2 ? 1 : Math.random() < 0.6 ? 2 : 3;
      const end        = Math.min(dsChar + chunkSize, targetText.length);
      const partial    = targetText.slice(0, end);

      if (ds.isLi) {
        ds.el.innerHTML = this.renderInlineMarkdown(partial);
      } else {
        // All segments sharing this <p> — render completed ones + current partial
        const allForEl    = domSegments.filter(s => s.el === ds.el);
        const myIdx       = allForEl.indexOf(ds);
        let combined      = '';
        allForEl.slice(0, myIdx).forEach(s => { combined += this.renderInlineMarkdown(s.text); });
        combined += this.renderInlineMarkdown(partial);
        ds.el.innerHTML = combined;
      }

      // Keep cursor at end of current element
      if (cursor.parentNode !== ds.el) ds.el.appendChild(cursor);

      dsChar = end;
      if (dsChar >= targetText.length) {
        dsIndex++;
        dsChar = 0;
      }

      this.scrollToBottom();
      this.typingTimer = setTimeout(tick, delay);
    };

    tick();
  }

  parseSegments(text) {
    const segments = [];
    const lines    = text.split('\n');
    let buffer     = '';

    const flushBuffer = () => {
      if (buffer.trim()) segments.push({ type: 'text', text: buffer.trim() });
      buffer = '';
    };

    for (const line of lines) {
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

    // Strip trailing para_break
    while (segments.length && segments[segments.length - 1].type === 'para_break') {
      segments.pop();
    }

    return segments;
  }

  renderInlineMarkdown(text) {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/\[copy:([^\]]+)\]/g,
        '<span class="copyable" tabindex="0" role="button" aria-label="Tap to copy $1" data-copy="$1">$1<span class="copy-confirm" aria-hidden="true">Copied</span></span>'
      );
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
      const label = content.chipLabel || content.title;
      chip.innerHTML = `<svg data-lucide="corner-down-right" stroke-width="1.5"></svg> ${label}`;
      chip.addEventListener('click', () => {
        this.hideStarters();
        this.addUserMessage(label);
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

    const card    = document.createElement('div');
    card.className = 'assessment-card';

    const total  = assessment.questions.length;
    let currentQ = 0;
    let scores   = [];

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

      const q   = assessment.questions[currentQ];
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

      q.options.forEach(opt => {
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
    const total  = scores.reduce((a, b) => a + b, 0);
    const max    = assessment.questions.length * 4;
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

    resultEl.querySelector('.result-cta').addEventListener('click', e => {
      const key = e.currentTarget.dataset.cta;
      const c   = CONTENT[key];
      if (c) {
        const label = c.chipLabel || c.title;
        this.addUserMessage(label);
        this.triggerResponse(key);
      }
    });

    if (window.lucide) lucide.createIcons({ nodes: card.querySelectorAll('[data-lucide]') });
  }

  /* ── Logo animation ────────────────────────────────────── */

  startLogoAnimation(msgEl) {
    // Sidebar inline SVG
    this.sidebarMark?.classList.add('ag-animated');
    // Chat window mark — swap to animated SVG
    const effective = document.documentElement.getAttribute('data-theme') || 'light';
    const animSrc   = effective === 'dark'
      ? 'aigentia-mark-animated-on-deep.svg'
      : 'aigentia-mark-animated-on-cream.svg';
    const staticSrc = effective === 'dark'
      ? 'aigentia-mark-on-deep.svg'
      : 'aigentia-mark-on-cream.svg';
    const markImg = msgEl?.querySelector('.msg-agent-mark img');
    if (markImg) {
      markImg.src = animSrc;
      this._currentMarkImg    = markImg;
      this._currentMarkStatic = staticSrc;
    }
  }

  stopLogoAnimation() {
    // Sidebar
    this.sidebarMark?.classList.remove('ag-animated');
    // Chat window mark — restore static SVG
    if (this._currentMarkImg) {
      this._currentMarkImg.src = this._currentMarkStatic;
      this._currentMarkImg     = null;
      this._currentMarkStatic  = null;
    }
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
