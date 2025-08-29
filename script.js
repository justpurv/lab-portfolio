// Theme toggle and preferences
(function(){
  const root = document.documentElement;
  const toggle = document.getElementById('themeToggle');
  const stored = localStorage.getItem('theme');
  if(stored === 'light'){
    root.classList.add('light');
  }
  function updateIcon(){
    if(!toggle) return;
    toggle.textContent = root.classList.contains('light') ? '🌞' : '🌙';
  }
  updateIcon();
  if(toggle){
    toggle.addEventListener('click', ()=>{
      root.classList.toggle('light');
      localStorage.setItem('theme', root.classList.contains('light') ? 'light' : 'dark');
      updateIcon();
    });
  }
})();

// Smooth scrolling active nav state
(function(){
  const links = Array.from(document.querySelectorAll('.nav-link'));
  const sections = links
    .map(a => document.querySelector(a.getAttribute('href'))) 
    .filter(Boolean);
  const observer = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      const idx = sections.indexOf(entry.target);
      if(idx === -1) return;
      const link = links[idx];
      if(entry.isIntersecting){
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
      }
    });
  }, {rootMargin:'-40% 0px -55% 0px', threshold:[0, 0.25, 0.6, 1]});
  sections.forEach(s => observer.observe(s));
})();

// Backfill year
(function(){
  const y = document.getElementById('year');
  if(y){ y.textContent = new Date().getFullYear(); }
})();

// Optional: populate projects dynamically (sample placeholder)
(function(){
  const grid = document.getElementById('projectsGrid');
  if(!grid) return;
  const projects = [
    {
      title:'Java CLI Task Manager',
      blurb:'A simple task tracker built with Java and file storage.',
      links:[{href:'#', label:'Code'}]
    },
    {
      title:'Python Data Notes',
      blurb:'Small scripts exploring CSV parsing and basic analysis.',
      links:[{href:'#', label:'Code'}]
    }
  ];
  projects.forEach(p=>{
    const card = document.createElement('article');
    card.className = 'card project-card';
    const h = document.createElement('h3'); h.textContent = p.title; card.appendChild(h);
    const d = document.createElement('p'); d.textContent = p.blurb; card.appendChild(d);
    const links = document.createElement('div'); links.className = 'project-links';
    p.links.forEach(k=>{
      const a = document.createElement('a'); a.href = k.href; a.textContent = k.label; a.className='link'; a.setAttribute('aria-disabled','true');
      links.appendChild(a);
    });
    card.appendChild(links);
    grid.appendChild(card);
  });
})();


