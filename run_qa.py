from pathlib import Path
import base64, re
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[1]
CSS = (ROOT / 'css/style.css').read_text()
JS = (ROOT / 'js/script.js').read_text()
BASE = ROOT.as_uri() + '/'
LOGO_DATA = 'data:image/svg+xml;base64,' + base64.b64encode((ROOT / 'assets/logo.svg').read_bytes()).decode()
FOOD_DATA = 'data:image/svg+xml;base64,' + base64.b64encode((ROOT / 'assets/food-placeholder.svg').read_bytes()).decode()


def packed(name, screenshot_assets=False):
    html = (ROOT / name).read_text()
    html = html.replace('<head>', f'<head>\n  <base href="{BASE}">', 1)
    html = html.replace('<link rel="stylesheet" href="css/style.css">', f'<style>{CSS}</style>')
    html = html.replace('<script src="js/script.js" defer></script>', f'<script>{JS}</script>')
    if screenshot_assets:
        html = html.replace('assets/logo.svg', LOGO_DATA)
        html = re.sub(r'https://commons\.wikimedia\.org/wiki/Special:FilePath/[^"\']+', FOOD_DATA, html)
    return html

results=[]
with sync_playwright() as p:
    browser = p.chromium.launch(headless=True, executable_path='/usr/bin/chromium', args=['--no-sandbox', '--allow-file-access-from-files'])

    # Contact form validation
    page = browser.new_page(viewport={'width': 1100, 'height': 900})
    errors=[]; page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(packed('contact.html'), wait_until='domcontentloaded')
    page.locator('button[type=submit]').click()
    results.append(('contact_required_validation', page.locator('#contact-name').get_attribute('aria-invalid') == 'true' and 'required' in page.locator('#contact-name').locator('xpath=..').locator('.error').text_content().lower()))
    page.fill('#contact-name','Vuyelwa')
    page.fill('#contact-email','bad')
    page.fill('#contact-subject','Menu')
    page.fill('#contact-message','Please send the menu.')
    page.locator('button[type=submit]').click()
    results.append(('contact_email_validation', page.locator('#contact-email').get_attribute('aria-invalid') == 'true'))
    results.append(('contact_no_js_errors', not errors))
    page.close()

    # Menu filtering, cart, mobile nav
    page = browser.new_page(viewport={'width': 390, 'height': 844})
    errors=[]; page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(packed('menu.html'), wait_until='domcontentloaded')
    initial = page.locator('.menu-item:visible').count()
    page.fill('#menu-search','bunny')
    filtered = page.locator('.menu-item:visible').count()
    page.locator('.menu-item:visible .add-to-cart').click()
    count = page.locator('#cart-count').text_content().strip()
    total = page.locator('#cart-total').text_content().strip()
    page.locator('.menu-toggle').click()
    nav_open = 'open' in (page.locator('.site-nav').get_attribute('class') or '').split()
    results += [('menu_initial_six', initial == 6), ('menu_search_one', filtered == 1), ('cart_count_one', count == '1'), ('cart_total_45', total == 'R45.00'), ('mobile_nav_opens', nav_open), ('menu_no_js_errors', not errors)]
    page.close()

    # Gallery lightbox
    page = browser.new_page(viewport={'width': 1000, 'height': 850})
    errors=[]; page.on('pageerror', lambda e: errors.append(str(e)))
    page.set_content(packed('gallery.html'), wait_until='domcontentloaded')
    page.locator('.gallery-item').first.click()
    open_state = 'open' in (page.locator('#lightbox').get_attribute('class') or '').split()
    page.keyboard.press('Escape')
    closed_state = 'open' not in (page.locator('#lightbox').get_attribute('class') or '').split()
    results += [('lightbox_opens', open_state), ('lightbox_escape_closes', closed_state), ('gallery_no_js_errors', not errors)]
    page.close()

    # Responsive screenshots / overflow checks
    shots=[('index.html',1440,1000,'desktop-home.png'),('menu.html',768,1024,'tablet-menu.png'),('contact.html',390,844,'mobile-contact.png')]
    for name,w,h,out in shots:
        page=browser.new_page(viewport={'width':w,'height':h})
        page.set_content(packed(name, screenshot_assets=True), wait_until='domcontentloaded')
        # Allow image failures to switch to local fallback.
        page.wait_for_timeout(1500)
        overflow=page.evaluate('document.documentElement.scrollWidth > document.documentElement.clientWidth')
        results.append((f'{out}_no_horizontal_overflow', not overflow))
        page.screenshot(path=str(ROOT/'docs/screenshots'/out), full_page=True)
        page.close()

    browser.close()

for name, ok in results:
    print(f'{"PASS" if ok else "FAIL"}: {name}')
if not all(ok for _,ok in results):
    raise SystemExit(1)
