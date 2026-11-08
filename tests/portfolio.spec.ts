import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('Visuels des projets : moodboards, logos et mockups chargés', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const covers = page.locator('.project-visual img');
  await expect(covers).toHaveCount(3);
  for (const cover of await covers.all()) {
    await cover.scrollIntoViewIfNeeded();
    await expect(cover).toHaveAttribute('src', /moodboard|\/_image/);
    await expect
      .poll(() => cover.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
  }
  for (const project of ['olyvia', 'nunc', 'lumimix']) {
    await page.goto(`/projets/${project}`);
    const logo = page.locator('.case-brand-logo img:visible');
    await expect(logo).toHaveCount(1);
    await expect
      .poll(() => logo.evaluate((img: HTMLImageElement) => img.naturalWidth))
      .toBeGreaterThan(0);
    await page.locator('.case-previews').scrollIntoViewIfNeeded();
    const previews = page.locator('.case-previews img');
    await expect(previews).toHaveCount(project === 'lumimix' ? 1 : 2);
    for (const image of await previews.all()) {
      await image.scrollIntoViewIfNeeded();
      await expect
        .poll(() => image.evaluate((img: HTMLImageElement) => img.naturalWidth))
        .toBeGreaterThan(0);
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `test-results/${project}-visuels.png`, fullPage: true });
  }
});

test('Atelier : les dessins s’ouvrent en grand sans changer de page', async ({ page }) => {
  await page.goto('/atelier');
  await expect(page.locator('.art-card')).toHaveCount(11);
  const drawing = page.getByRole('button', { name: 'Agrandir Alice', exact: true });
  await drawing.click();
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole('heading', { name: 'Alice', exact: true })).toBeVisible();
  await expect(dialog.locator('.art-modal-image img')).toHaveAttribute(
    'src',
    '/images/atelier/alice.jpeg',
  );
  await expect(dialog.locator('.art-modal-materials')).toBeVisible();
  await expect(dialog.locator('.art-modal-materials li')).toHaveText([
    'Crayons de couleur',
    'Stylo noir fin',
  ]);
  await expect(dialog.locator('#art-modal-description')).toContainText('John Everett Millais');
  await expect(page).toHaveURL(/\/atelier\/?$/);
  await page.keyboard.press('Escape');
  await expect(dialog).not.toBeVisible();
  await expect(drawing).toBeFocused();
});

test('NŨNC : le U accentué utilise bien la police manuscrite', async ({ page }) => {
  await page.goto('/');
  await page.evaluate(() => document.fonts.ready);
  const session = await page.context().newCDPSession(page);
  await session.send('DOM.enable');
  await session.send('CSS.enable');
  const { root } = await session.send('DOM.getDocument');
  const { nodeId } = await session.send('DOM.querySelector', {
    nodeId: root.nodeId,
    selector: '.project.nunc h3',
  });
  const { fonts } = await session.send('CSS.getPlatformFontsForNode', { nodeId });
  expect(fonts.length).toBeGreaterThan(0);
  expect(
    fonts.every((font) => font.isCustomFont && font.familyName === 'Just Me Again Down Here'),
  ).toBe(true);
  await session.detach();
});

test('Étoiles et paillettes : palette plus sombre en mode clair', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  await expect(page.locator('.fairy-star').first()).toHaveCSS(
    'background-color',
    'rgb(235, 167, 191)',
  );
  await page.getByRole('switch', { name: 'Mode clair', exact: true }).click();
  await expect(page.locator('.fairy-star').first()).toHaveCSS(
    'background-color',
    'rgb(152, 67, 99)',
  );
  await page.locator('[data-fairy]').first().click();
  const colors = await page
    .locator('.fairy-burst-star')
    .evaluateAll((stars) => [...new Set(stars.map((star) => getComputedStyle(star).color))]);
  expect(colors).toEqual(['rgb(152, 67, 99)', 'rgb(39, 100, 137)', 'rgb(119, 80, 159)']);
});

test('Fées : étoiles au clic et au clavier, arrêt des animations', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await page.goto('/');
  const fairy = page.locator('[data-fairy]').first();
  await expect(fairy).toBeEnabled();
  await fairy.click();
  await expect.poll(() => page.locator('.fairy-burst-star').count()).toBeGreaterThan(0);
  await expect(page.locator('.fairy-burst-star')).toHaveCount(0);
  await fairy.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.locator('.fairy-burst-star').count()).toBeGreaterThan(0);
  await page.getByRole('switch', { name: 'Animations', exact: true }).click();
  await expect(page.locator('.fairy-burst-star')).toHaveCount(0);
  await expect(fairy).toBeDisabled();
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.reload();
  await expect(fairy).toBeDisabled();
});

const pages = [
  '/',
  '/projets',
  '/a-propos',
  '/contact',
  '/atelier',
  '/projets/olyvia',
  '/projets/nunc',
  '/projets/lumimix',
  '/projets/bordeaux-surchauffe',
  '/mentions-legales',
];

for (const viewport of [
  { width: 1440, height: 1000, light: false },
  { width: 390, height: 844, light: false },
  { width: 320, height: 740, light: false },
  { width: 390, height: 844, light: true },
]) {
  test(`Pages lisibles et accessibles à ${viewport.width}px — ${viewport.light ? 'clair' : 'sombre'}`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    if (viewport.light)
      await page.addInitScript(() => {
        localStorage.setItem('portfolio-theme', 'light');
      });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    for (const url of pages) {
      await page.goto(url);
      await expect(page.locator('h1')).toHaveCount(1);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      await page.locator('.portfolio-footer').scrollIntoViewIfNeeded();
      const gap = await page.evaluate(
        () =>
          document.documentElement.scrollHeight -
          (document.querySelector('.portfolio-footer')!.getBoundingClientRect().bottom +
            window.scrollY),
      );
      expect(gap, `espace après footer sur ${url}`).toBeLessThanOrEqual(1);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(
        result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) })),
        url,
      ).toEqual([]);
      if (url === '/' && !viewport.light && viewport.width !== 320) {
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
        await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
        await page.screenshot({
          path: `test-results/accueil-${viewport.width}.png`,
          fullPage: true,
        });
      }
    }
    expect(errors).toEqual([]);
  });
}

test('Préférences, filtres et liens de projets', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.project.bordeaux')).toHaveCount(0);
  await page.getByRole('switch', { name: 'Mode clair', exact: true }).click();
  await page.getByRole('switch', { name: 'Animations', exact: true }).click();
  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await expect(page.locator('html')).toHaveAttribute('data-motion', 'off');
  const result = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
    .analyze();
  expect(result.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
  await page.goto('/projets');
  await expect(page.locator('.gallery-item')).toHaveCount(4);
  await expect(
    page.getByRole('link', {
      name: 'Découvrir le projet Bordeaux Surchauffe',
      exact: true,
    }),
  ).toHaveAttribute('href', '/projets/bordeaux-surchauffe');
  await page
    .getByRole('link', { name: 'Découvrir le projet Bordeaux Surchauffe', exact: true })
    .click();
  const mockup = page.getByRole('link', {
    name: 'Découvrir le site Bordeaux Surchauffe (nouvel onglet)',
    exact: true,
  });
  await expect(mockup).toHaveAttribute('href', 'https://bordeaux-surchauffe.netlify.app/');
  await mockup.scrollIntoViewIfNeeded();
  await expect
    .poll(() => mockup.locator('img').evaluate((img: HTMLImageElement) => img.naturalWidth))
    .toBeGreaterThan(0);
  await page.screenshot({ path: 'test-results/bordeaux-surchauffe.png', fullPage: true });
  await page.goto('/projets');
  await page.getByRole('button', { name: 'Web design', exact: true }).click();
  await expect(page.locator('.gallery-item:visible')).toHaveCount(2);
  await page.getByRole('link', { name: 'Découvrir le projet LUMIMIX', exact: true }).click();
  await expect(page).toHaveURL(/projets\/lumimix/);
  await expect(page.getByRole('link', { name: /aperçu mobile/ })).toHaveAttribute(
    'href',
    'https://lumimix.estelle-coulon.fr/',
  );
});

test('Menu, carrousel tactile et clavier', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  const menu = page.getByRole('button', { name: 'Menu' });
  await menu.click();
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(menu).toHaveAttribute('aria-expanded', 'false');
  await page.getByRole('button', { name: 'Afficher le projet LUMIMIX' }).click();
  await expect(page.getByRole('button', { name: 'Afficher le projet LUMIMIX' })).toHaveAttribute(
    'aria-current',
    'true',
  );
  await page.getByRole('link', { name: 'Découvrir le projet LUMIMIX', exact: true }).click();
  await expect(page).toHaveURL(/projets\/lumimix/);
});

test('Contact : validation et configuration Netlify, aucun envoi réel', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.locator('form[name=contact]')).toHaveAttribute('method', 'POST');
  await expect(page.locator('form[name=contact]')).toHaveAttribute('data-netlify', 'true');
  await expect(page.locator('input[name=form-name]')).toHaveValue('contact');
  await page.getByRole('button', { name: 'Envoyer mon message' }).click();
  expect(
    await page
      .locator('#contact-name')
      .evaluate((input: HTMLInputElement) => input.validity.valueMissing),
  ).toBe(true);
  await page.getByLabel('Votre nom').fill('Test local');
  await page.getByLabel('Votre e-mail').fill('test@example.com');
  await page.getByLabel('Votre message').fill('Vérification locale du formulaire, sans envoi.');
  let received = '';
  await page.route('**/merci', async (route) => {
    received = route.request().postData() || '';
    await route.fulfill({
      status: 200,
      contentType: 'text/html; charset=utf-8',
      body: '<h1>Réception simulée</h1>',
    });
  });
  await page.getByRole('button', { name: 'Envoyer mon message' }).click();
  await expect(page.getByRole('heading', { name: 'Réception simulée' })).toBeVisible();
  expect(received).toContain('form-name=contact');
  expect(received).toContain('name=Test+local');
});

test('Navigation utilisable sans JavaScript', async ({ browser }) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto('/');
  await page
    .getByRole('navigation', { name: 'Navigation principale' })
    .getByRole('link', { name: 'Projets', exact: true })
    .click();
  await expect(page).toHaveURL(/projets/);
  await expect(page.locator('.gallery-item')).toHaveCount(3);
  await context.close();
});
