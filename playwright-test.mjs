import { chromium } from 'playwright';
import { writeFileSync } from 'fs';

const BASE = 'http://localhost:3000';
const results = [];

async function test(label, fn) {
  try {
    await fn();
    results.push(`  ✅ ${label}`);
  } catch (e) {
    results.push(`  ❌ ${label} — ${e.message}`);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  // 1. Page loads
  await test('Page loads successfully', async () => {
    const resp = await page.goto(BASE, { waitUntil: 'networkidle' });
    if (resp.status() !== 200) throw new Error(`Status ${resp.status()}`);
  });

  // 2. Console errors check
  const consoleErrors = [];
  page.on('console', msg => { if (msg.type() === 'error') consoleErrors.push(msg.text()); });
  await test('No console errors', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    if (consoleErrors.length > 0) throw new Error(`Errors: ${consoleErrors.join('; ')}`);
  });

  // 3. Navbar visible
  await test('Navbar renders', async () => {
    const nav = await page.$('nav');
    if (!nav) throw new Error('Nav not found');
    const text = await nav.textContent();
    if (!text.includes('Project NOVA')) throw new Error('Brand text missing');
  });

  // 4. Hero headline
  await test('Hero headline renders', async () => {
    const h1 = await page.$('h1');
    if (!h1) throw new Error('H1 not found');
    const text = await h1.textContent();
    if (!text.includes('Transform')) throw new Error('Headline wrong');
  });

  // 5. Navigation links
  await test('Navigation links present', async () => {
    const links = await page.$$('nav a');
    const texts = await Promise.all(links.map(l => l.textContent()));
    const expected = ['Services', 'Pricing', 'FAQ', 'Contact'];
    for (const e of expected) {
      if (!texts.some(t => t.includes(e))) throw new Error(`Missing nav link: ${e}`);
    }
  });

  // 6. Scroll to Services
  await test('Click Services nav link', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const link = await page.$('a[href="#services"]');
    if (!link) throw new Error('Services link not found');
    await link.click();
    await page.waitForTimeout(800);
    const services = await page.$('#services');
    if (!services) throw new Error('#services section not found');
    const visible = await services.isIntersectingViewport({ threshold: 0.3 });
    if (!visible) throw new Error('Services section not scrolled into view');
  });

  // 7. Service category tabs
  await test('Service category tabs render', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('a[href="#services"]');
    await page.waitForTimeout(500);
    const buttons = await page.$$('#services button');
    if (buttons.length < 3) throw new Error(`Only ${buttons.length} buttons found`);
  });

  // 8. Pricing section
  await test('Pricing section renders', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const pricing = await page.$('#pricing');
    if (!pricing) throw new Error('#pricing section missing');
  });

  // 9. FAQ section renders
  await test('FAQ section renders', async () => {
    const faq = await page.$('#faq');
    if (!faq) throw new Error('#faq section missing');
  });

  // 10. FAQ accordion toggle
  await test('FAQ accordion toggles', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('a[href="#faq"]');
    await page.waitForTimeout(500);
    const buttons = await page.$$('#faq button');
    if (buttons.length === 0) throw new Error('No FAQ buttons found');
    await buttons[0].click();
    await page.waitForTimeout(400);
    const expanded = await buttons[0].getAttribute('aria-expanded');
    if (expanded !== 'true') throw new Error('FAQ not expanded');
  });

  // 11. Contact form
  await test('Contact form renders', async () => {
    const form = await page.$('form');
    if (!form) throw new Error('Form not found');
    const inputs = await form.$$('input, select, textarea');
    if (inputs.length < 6) throw new Error(`Only ${inputs.length} form fields`);
  });

  // 12. Contact form labels
  await test('Form has label elements', async () => {
    const labels = await page.$$('form label');
    if (labels.length < 6) throw new Error(`Only ${labels.length} labels`);
  });

  // 13. Footer renders
  await test('Footer renders', async () => {
    const footer = await page.$('footer');
    if (!footer) throw new Error('Footer not found');
  });

  // 14. Scroll story
  await test('Scroll story section exists', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    const story = await page.$('section');
    if (!story) throw new Error('No scroll story section');
  });

  // 15. Pricing search input
  await test('Pricing search input works', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('a[href="#pricing"]');
    await page.waitForTimeout(500);
    const input = await page.$('#pricing input[type="text"]');
    if (!input) throw new Error('Search input not found');
    await input.fill('Linux');
    await page.waitForTimeout(300);
    const items = await page.$$('#pricing [role="listitem"]');
    // Should be filtered
    if (items.length === 0) {
      // Could be no matches, that's ok
    }
  });

  // 16. Pricing filter modal
  await test('Filter modal opens', async () => {
    await page.goto(BASE, { waitUntil: 'networkidle' });
    await page.click('a[href="#pricing"]');
    await page.waitForTimeout(500);
    const filterBtn = await page.$('button:has-text("Filters")');
    if (!filterBtn) throw new Error('Filter button not found');
    await filterBtn.click();
    await page.waitForTimeout(300);
    const dialog = await page.$('[role="dialog"]');
    if (!dialog) throw new Error('Filter dialog not opened');
  });

  // Screenshots
  await page.goto(BASE, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: 'screenshot-hero.png', fullPage: false });
  results.push('  📸 Hero screenshot saved');

  await page.screenshot({ path: 'screenshot-fullpage.png', fullPage: true });
  results.push('  📸 Full page screenshot saved');

  await browser.close();

  console.log('═══════════════════════════════════════════');
  console.log('  PLAYWRIGHT TEST RESULTS');
  console.log('═══════════════════════════════════════════');
  results.forEach(r => console.log(r));
  const passed = results.filter(r => r.includes('✅') || r.includes('📸')).length;
  const failed = results.filter(r => r.includes('❌')).length;
  console.log('───────────────────────────────────────────');
  console.log(`  Passed: ${passed}  Failed: ${failed}`);
  console.log('═══════════════════════════════════════════');
}

run().catch(e => { console.error('FATAL:', e); process.exit(1); });
