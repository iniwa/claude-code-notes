// marked.js configuration
marked.setOptions({
  breaks: true,
  gfm: true
});

// Section definitions: id -> file path
const SECTIONS = {
  'top':              'sections/top.html',
  'workflow':         'sections/workflow.html',
  'templates':        'sections/templates.html',
  'manual-setup':     'sections/manual-setup.html',
  'manual-mcp':       'sections/manual-mcp.html',
  'manual-statusbar': 'sections/manual-statusbar.html',
  'manual-serena':    'sections/manual-serena.html',
  'memory':           'sections/memory.html',
  'cost':             'sections/cost.html',
  'ide':              'sections/ide.html',
  'subagent':         'sections/subagent.html',
  'cicd':             'sections/cicd.html',
  'troubleshoot':     'sections/troubleshoot.html',
  'ctx':              'sections/ctx.html',
  'model':            'sections/model.html',
  'session':          'sections/session.html',
  'project':          'sections/project.html',
  'agent':            'sections/agent.html',
  'cli-auto':         'sections/cli-auto.html',
  'cli-model':        'sections/cli-model.html',
  'cli-prompt':       'sections/cli-prompt.html',
  'keyboard':         'sections/keyboard.html',
  'cfg-basic':        'sections/cfg-basic.html',
  'cfg-perm':         'sections/cfg-perm.html',
  'cfg-hooks':        'sections/cfg-hooks.html',
  'cfg-mcp':          'sections/cfg-mcp.html',
  'cfg-scope':        'sections/cfg-scope.html'
};

const loadedSections = new Set();
const navLinks = document.querySelectorAll('nav a');

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// Load a section's HTML content
async function loadSection(id) {
  if (loadedSections.has(id)) return;
  loadedSections.add(id);

  const section = document.getElementById(id);
  if (!section) return;

  const src = SECTIONS[id];
  if (!src) return;

  try {
    const resp = await fetch(src);
    if (!resp.ok) throw new Error(resp.status);
    const html = await resp.text();
    section.innerHTML = html;
    // After loading section HTML, process any template/md loaders within
    await loadDynamicContent(section);
  } catch (e) {
    section.innerHTML = '<p style="color:var(--red);">セクションの読み込みに失敗しました: ' + escapeHtml(src) + '</p>';
  }
}

// Process template-loader and md-loader elements within a section
async function loadDynamicContent(section) {
  // Handle template-loader elements (raw text in <pre>)
  const templateLoaders = section.querySelectorAll('.template-loader');
  for (const el of templateLoaders) {
    const src = el.dataset.src;
    const title = el.dataset.title;
    const filename = el.dataset.filename;

    const h3 = document.createElement('h3');
    if (el.previousElementSibling) h3.style.marginTop = '20px';
    h3.textContent = title;

    const wrapper = document.createElement('div');
    wrapper.className = 'template';
    wrapper.innerHTML = '<div class="template-header"><span class="filename">' +
      escapeHtml(filename) + '</span></div><pre class="loading-text">読み込み中...</pre>';

    el.appendChild(h3);
    el.appendChild(wrapper);

    try {
      const resp = await fetch(src);
      if (!resp.ok) throw new Error(resp.status);
      const text = await resp.text();
      wrapper.querySelector('pre').textContent = text;
      wrapper.querySelector('pre').classList.remove('loading-text');
    } catch (e) {
      wrapper.querySelector('pre').textContent = '読み込みに失敗しました: ' + src;
      wrapper.querySelector('pre').style.color = 'var(--red)';
    }
  }

  // Handle md-loader elements (rendered markdown)
  const mdLoaders = section.querySelectorAll('.md-loader');
  for (const el of mdLoaders) {
    const src = el.dataset.src;
    const label = el.dataset.label;

    if (label) {
      const labelEl = document.createElement('h3');
      labelEl.style.marginTop = '20px';
      labelEl.textContent = label;
      el.appendChild(labelEl);
    }

    const container = document.createElement('div');
    container.className = 'md-rendered';
    container.innerHTML = '<p class="loading-text">読み込み中...</p>';
    el.appendChild(container);

    try {
      const resp = await fetch(src);
      if (!resp.ok) throw new Error(resp.status);
      const text = await resp.text();
      container.innerHTML = marked.parse(text);
    } catch (e) {
      container.innerHTML = '<p style="color:var(--red);">読み込みに失敗しました: ' + escapeHtml(src) + '</p>';
    }
  }
}

// Show a section
async function show(id) {
  document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  const section = document.getElementById(id);
  if (section) {
    section.classList.add('active');
    await loadSection(id);
  }

  navLinks.forEach(a => {
    if (a.getAttribute('onclick') && a.getAttribute('onclick').includes("'" + id + "'")) {
      a.classList.add('active');
    }
  });
}

// Search
const searchInput = document.getElementById('search');
searchInput.addEventListener('input', async () => {
  const q = searchInput.value.trim().toLowerCase();

  if (!q) {
    // Reset: hide all sections except active, remove hidden from items
    document.querySelectorAll('.section').forEach(s => {
      if (!s.classList.contains('was-active')) s.classList.remove('active');
    });
    document.querySelectorAll('.card, .shortcut, .mode-card, .scope-item, .template, .md-rendered, .wf-step, .tip, .file-tree').forEach(el => {
      el.classList.remove('hidden');
    });
    // Restore the previously active section
    const activeNav = document.querySelector('nav a.active');
    if (activeNav) {
      const onclick = activeNav.getAttribute('onclick');
      if (onclick) {
        const match = onclick.match(/show\('([^']+)'\)/);
        if (match) {
          document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
          const sec = document.getElementById(match[1]);
          if (sec) sec.classList.add('active');
        }
      }
    }
    return;
  }

  // Load all sections first so we can search their content
  const loadPromises = Object.keys(SECTIONS).map(id => loadSection(id));
  await Promise.all(loadPromises);

  // Show all sections during search
  document.querySelectorAll('.section').forEach(s => s.classList.add('active'));
  navLinks.forEach(a => a.classList.remove('active'));

  // Filter searchable elements
  document.querySelectorAll('.card, .shortcut, .mode-card, .scope-item').forEach(el => {
    const text = el.textContent.toLowerCase();
    if (text.includes(q)) {
      el.classList.remove('hidden');
    } else {
      el.classList.add('hidden');
    }
  });
});

// Load the default section on page load
show('top');
