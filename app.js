'use strict';

class AigentiaApp {
  constructor() {
    this.thread      = document.getElementById('thread');
    this.threadInner = document.getElementById('thread-inner');
    this.inputField  = document.getElementById('input-field');
    this.sendBtn     = document.getElementById('send-btn');
    this.sidebar     = document.getElementById('sidebar');
    this.sidebarMark = document.getElementById('sidebar-mark');
    this.themeToggle = document.getElementById('theme-toggle');
    this.themeLabel  = document.getElementById('theme-label');
    this.sidebarOverlay = document.getElementById('sidebar-overlay');

    this.isTyping    = false;
    this.typingTimer = null;

    this.init();
  }

  init() {
    this.setupTheme();
    this.setupSidebar();
    this.setupInput();
    this.setupCopyToClipboard();
    this.renderStarters();
    this.renderNavItems();
  }

  /* ── Theme ─────────────────────────────────────────────── */

  setupTheme() {
    const saved    = localStorage.getItem('ag-theme');
    const prefDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const stored   = saved || 'system';
    const effective = stored === 'system' ? (prefDark ? 'dark' : 'light') : stored;
    this.applyTheme(effective, stored);
    this.themeToggle.addEventListener('click', () => this.cycleTheme());
    document.getElementById('theme-btn')?.addEventListener('click', () => this.cycleTheme());
    document.getElementById('theme-btn')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.cycleTheme(); }
    });
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
    const icons  = { system: 'monitor', light: 'sun', dark: 'moon' };
    if (this.themeLabel) this.themeLabel.textContent = labels[stored] || 'Theme';
    const iconEl = this.themeToggle.querySelector('[data-lucide]');
    if (iconEl) {
      iconEl.setAttribute('data-lucide', icons[stored] || 'monitor');
      if (window.lucide) lucide.createIcons({ nodes: [iconEl] });
    }
    const btnLabel = document.getElementById('theme-btn-label');
    if (btnLabel) btnLabel.textContent = labels[stored] || 'Theme';
    const btnIcon = document.getElementById('theme-btn')?.querySelector('[data-lucide]');
    if (btnIcon) {
      btnIcon.setAttribute('data-lucide', icons[stored] || 'sun');
      if (window.lucide) lucide.createIcons({ nodes: [btnIcon] });
    }
  }

  updateAgentMarkTheme(effective) {
    const staticSrc = effective === 'dark' ? 'aigentia-mark-cream.svg' : 'aigentia-mark-deep.svg';
    const animSrc   = effective === 'dark' ? 'aigentia-mark-animated-cream.svg' : 'aigentia-mark-animated-deep.svg';

    const sidebarImg = document.getElementById('sidebar-mark-img');
    if (sidebarImg) sidebarImg.src = this._sidebarAnimating ? animSrc : staticSrc;

    const heroImg = document.getElementById('hero-mark-img');
    if (heroImg) heroImg.src = staticSrc;

    const chatMarkImg = document.getElementById('chat-mark-img');
    if (chatMarkImg && chatMarkImg !== this._currentMarkImg) chatMarkImg.src = staticSrc;
    if (this._currentMarkImg) {
      this._currentMarkImg.src = animSrc;
      this._currentMarkStatic = staticSrc;
    }
  }

  /* ── Sidebar ───────────────────────────────────────────── */

  setupSidebar() {
    // On mobile, tapping anywhere on the collapsed strip opens the sidebar
    this.sidebar.addEventListener('click', () => {
      if (window.innerWidth <= 768 && !this.sidebar.classList.contains('expanded')) {
        this.openSidebar();
      }
    });

    document.getElementById('sidebar-lockup')?.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation(); // prevent sidebar-level listener also firing
        if (this.sidebar.classList.contains('expanded')) {
          this.closeSidebar();
          this.goHome();
        } else {
          this.openSidebar();
        }
      } else {
        this.goHome();
      }
    });

    this.sidebarOverlay?.addEventListener('click', () => this.closeSidebar());

    // Canvas header name → welcome
    document.getElementById('canvas-header-name')?.addEventListener('click', () => {
      this.triggerResponse('welcome');
    });

    // Desktop collapse toggle
    document.getElementById('sidebar-collapse')?.addEventListener('click', () => {
      this.toggleSidebarCollapse();
    });
    document.getElementById('sidebar-collapse')?.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); this.toggleSidebarCollapse(); }
    });
  }

  toggleSidebarCollapse() {
    const collapsed = this.sidebar.classList.toggle('collapsed');
    const icon = document.querySelector('#sidebar-collapse [data-lucide]');
    if (icon) {
      icon.setAttribute('data-lucide', collapsed ? 'panel-left-open' : 'panel-left-close');
      if (window.lucide) lucide.createIcons({ nodes: [icon] });
    }
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

  goHome() {
    this.cancelTyping();
    this.stopLogoAnimation();
    document.getElementById('canvas').classList.remove('active');
    this.threadInner.innerHTML = '<div id="thread-spacer"></div>';
    document.querySelectorAll('.nav-item').forEach(el => el.classList.remove('active'));
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
    if (window.innerWidth <= 768 && !this.sidebar.classList.contains('expanded')) {
      this.openSidebar();
      return;
    }
    document.querySelectorAll('.nav-item').forEach(el => {
      el.classList.toggle('active', el.dataset.key === key);
    });
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
    // Hero starters — 2×2 grid in the empty-state canvas
    const heroGrid = document.getElementById('hero-starters');
    if (heroGrid) {
      STARTERS.forEach(s => {
        const btn = document.createElement('button');
        btn.className = 'hero-starter';
        btn.textContent = s.label;
        btn.addEventListener('click', () => {
          this.addUserMessage(s.label);
          this.triggerResponse(s.key);
        });
        heroGrid.appendChild(btn);
      });
    }
  }

  renderExploreItems() {
    const container = document.getElementById('sidebar-explore');
    if (!container) return;
    EXPLORE_ITEMS.forEach(item => {
      const el = document.createElement('div');
      el.className = 'sidebar-starter-item';
      el.setAttribute('role', 'button');
      el.setAttribute('tabindex', '0');
      el.innerHTML = `
        <svg data-lucide="message-square" stroke-width="1.5"></svg>
        <span class="sidebar-starter-text">${item.label}</span>
      `;
      const activate = () => {
        this.handleNavClick(item.key);
      };
      el.addEventListener('click', activate);
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); activate(); }
      });
      container.appendChild(el);
    });
    if (window.lucide) lucide.createIcons({ nodes: container.querySelectorAll('[data-lucide]') });
  }

  /* ── Core response engine ──────────────────────────────── */

  triggerResponse(key) {
    document.getElementById('canvas').classList.add('active');
    this.cancelTyping();
    const content = CONTENT[key] || CONTENT.unknown;
    this.setActiveNav(key);

    // Clear previous response — single-response view
    this.threadInner.innerHTML = '';

    // Assessment type — render directly, no typewriter
    if (content.type === 'assessment') {
      const msgEl = document.createElement('div');
      msgEl.className = 'msg msg-agent';
      const bodyEl = document.createElement('div');
      bodyEl.className = 'msg-agent-body';
      msgEl.appendChild(bodyEl);
      this.threadInner.appendChild(msgEl);
      if (typeof renderAssessment === 'function') {
        renderAssessment(content.assessmentId, bodyEl);
      }
      this.scrollToBottom();
      return;
    }

    // Contact type — render form HTML directly, no typewriter
    if (content.type === 'contact') {
      const msgEl = document.createElement('div');
      msgEl.className = 'msg msg-agent';
      const bodyEl = document.createElement('div');
      bodyEl.className = 'msg-agent-body';
      bodyEl.innerHTML = CONTACT_HTML;
      msgEl.appendChild(bodyEl);
      this.threadInner.appendChild(msgEl);
      this.scrollToBottom();
      return;
    }

    // Default: typewriter response
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
    const msg = document.createElement('div');
    msg.className = 'msg msg-agent';
    msg.innerHTML = `
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
        this.addUserMessage(label);
        this.triggerResponse(key);
      });
      container.appendChild(chip);
    });

    msgEl.appendChild(container);
    if (window.lucide) lucide.createIcons({ nodes: container.querySelectorAll('[data-lucide]') });
  }

  /* ── Logo animation ────────────────────────────────────── */

  startLogoAnimation(msgEl) {
    const effective = document.documentElement.getAttribute('data-theme') || 'light';
    const animSrc   = effective === 'dark' ? 'aigentia-mark-animated-cream.svg' : 'aigentia-mark-animated-deep.svg';
    const staticSrc = effective === 'dark' ? 'aigentia-mark-cream.svg'          : 'aigentia-mark-deep.svg';

    const sidebarImg = document.getElementById('sidebar-mark-img');
    if (sidebarImg) { sidebarImg.src = animSrc; this._sidebarAnimating = true; }

    const chatMarkImg = document.getElementById('chat-mark-img');
    if (chatMarkImg) {
      chatMarkImg.src = animSrc;
      this._currentMarkImg    = chatMarkImg;
      this._currentMarkStatic = staticSrc;
    }
  }

  stopLogoAnimation() {
    const sidebarImg = document.getElementById('sidebar-mark-img');
    if (sidebarImg && this._sidebarAnimating) {
      const effective = document.documentElement.getAttribute('data-theme') || 'light';
      sidebarImg.src = effective === 'dark' ? 'aigentia-mark-cream.svg' : 'aigentia-mark-deep.svg';
      this._sidebarAnimating = false;
    }
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

  cancelTyping() {
    if (this.typingTimer) { clearTimeout(this.typingTimer); this.typingTimer = null; }
    this.isTyping = false;
    this.setSendDisabled(false);
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

/* ── Contact helpers (global — called by inline contact form handlers) ── */
window.agCopy = function(btn, text) {
  const doConfirm = () => {
    btn.textContent = 'Copied';
    setTimeout(() => { btn.textContent = 'Copy'; }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(doConfirm).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta); ta.focus(); ta.select();
      try { document.execCommand('copy'); doConfirm(); } catch(_) {}
      document.body.removeChild(ta);
    });
  } else {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0';
    document.body.appendChild(ta); ta.focus(); ta.select();
    try { document.execCommand('copy'); doConfirm(); } catch(_) {}
    document.body.removeChild(ta);
  }
};

window.agFormSubmit = function(e) {
  e.preventDefault();
  const form = e.target;
  const btn  = form.querySelector('.ag-form-submit');
  btn.disabled = true;
  btn.textContent = 'Sending…';
  fetch('https://formspree.io/f/placeholder', {
    method: 'POST',
    headers: { 'Accept': 'application/json' },
    body: new FormData(form),
  })
    .then(r => {
      if (r.ok) {
        form.innerHTML = '<div class="ag-form-success">Message sent. We will respond within one business day.</div>';
      } else {
        btn.disabled = false;
        btn.textContent = 'Send Message';
        alert('Something went wrong. Please email hello@aigentia.com directly.');
      }
    })
    .catch(() => {
      btn.disabled = false;
      btn.textContent = 'Send Message';
      alert('Something went wrong. Please email hello@aigentia.com directly.');
    });
};
