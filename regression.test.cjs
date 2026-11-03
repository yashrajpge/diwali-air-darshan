const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(process.env.SITE_FILE || 'index.html', 'utf8');
const dateCode = html.match(/function isCurrentAQIDate\(value,now\)\{[\s\S]*?return day<=start&&day>=start-86400000\}/)?.[0];
const navCode = html.match(/function showTab\(hash\)\{[\s\S]*?window.scrollTo\(0,0\)\}/)?.[0];
test('AQI dates allow today and yesterday, reject future and stale dates in IST', () => {
  assert.ok(dateCode, 'date validator exists');
  const ctx = vm.createContext({Date});
  vm.runInContext(dateCode, ctx);
  const now = Date.parse('2026-11-03T19:45:00Z'); // 4 Nov in India
  for (const [date, expected] of [['2026-11-04',true],['2026-11-03',true],['2026-11-05',false],['2026-11-02',false],['',false],['2026-02-30',false]]) {
    assert.equal(ctx.isCurrentAQIDate(date, now), expected, date);
  }
});
test('all tab permalinks and legacy aliases select exactly one tab', () => {
  assert.ok(navCode, 'navigation function exists');
  const names = ['air','fest','temple','safe','about'];
  function el(name) { return {dataset:{t:name}, active:false, attrs:{}, classList:{remove(){this.owner.active=false},add(){this.owner.active=true}}, setAttribute(k,v){this.attrs[k]=v}, removeAttribute(k){delete this.attrs[k]}}; }
  const links=names.map(el), tabs=names.map(el);
  [...links,...tabs].forEach(e=>e.classList.owner=e);
  const document={querySelectorAll:s=>s==='nav a'?links:[...links,...tabs],getElementById:id=>tabs[names.indexOf(id.slice(2))]};
  const ctx=vm.createContext({document,window:{scrollTo(){}}});vm.runInContext(navCode,ctx);
  for(const [hash,name] of [...names.map(n=>['#t-'+n,n]),['#s','safe'],['#f','fest']]){
    ctx.showTab(hash);assert.equal(links.filter(e=>e.active).length,1);assert.equal(tabs.filter(e=>e.active).length,1);
    assert.equal(links.find(e=>e.active).dataset.t,name);assert.equal(links.find(e=>e.active).attrs['aria-current'],'page');
  }
  ctx.showTab('#invalid');assert.equal(tabs.filter(e=>e.active).length,1);
});
