// HOROLOGY — Main Application Entry Point (ES Module Hub)
import { Router } from './core/router.js';
import { renderHeader, initHeader } from './components/header.js';
import { renderFooter } from './components/footer.js';
import { initToast } from './components/toast.js';

// Route Modules
import { homePage } from './pages/home.js';
import { collectionPage } from './pages/collection.js';
import { brandsPage } from './pages/brands.js';
import { brandDetailPage } from './pages/brandDetail.js';
import { watchDetailPage } from './pages/watchDetail.js';
import { dossierPage } from './pages/dossier.js';
import { comparePage } from './pages/compare.js';
import { wishlistPage } from './pages/wishlist.js';
import { finderPage } from './pages/finder.js';
import { movementLabPage } from './pages/movementLab.js';
import { authenticityPage } from './pages/authenticity.js';
import { journalPage } from './pages/journal.js';
import { journalArticlePage } from './pages/journalArticle.js';
import { sellPage } from './pages/sell.js';
import { contactPage } from './pages/contact.js';
import { aboutPage } from './pages/about.js';
import { legalPage } from './pages/legal.js';
import { requestPage } from './pages/request.js';
import { smokePage } from './pages/smoke.js';
import { notFoundPage } from './pages/notFound.js';

const routes = [
  homePage,
  collectionPage,
  brandsPage,
  {
    path: '/brand/:brand/:family',
    title: brandDetailPage.title,
    render: (ctx) => brandDetailPage.render(ctx),
    mount: (ctx) => brandDetailPage.mount(ctx),
    unmount: () => brandDetailPage.unmount()
  },
  brandDetailPage,
  dossierPage,
  watchDetailPage,
  comparePage,
  wishlistPage,
  finderPage,
  {
    path: '/movement-lab/timegrapher',
    title: movementLabPage.title,
    render: (ctx) => movementLabPage.render(ctx),
    mount: (ctx) => movementLabPage.mount(ctx),
    unmount: () => movementLabPage.unmount()
  },
  movementLabPage,
  authenticityPage,
  {
    path: '/journal/category/:cat',
    title: journalPage.title,
    render: (ctx) => journalPage.render(ctx),
    mount: (ctx) => journalPage.mount?.(ctx),
    unmount: () => journalPage.unmount?.()
  },
  journalArticlePage,
  journalPage,
  sellPage,
  contactPage,
  aboutPage,
  legalPage,
  requestPage,
  smokePage,
  notFoundPage
];

document.addEventListener('DOMContentLoaded', () => {
  // Mount Global Shell (Header and Footer)
  const headerContainer = document.getElementById('headerWrapper');
  const footerContainer = document.getElementById('footerWrapper');

  if (headerContainer) {
    headerContainer.innerHTML = renderHeader();
    initHeader();
  }

  if (footerContainer) {
    footerContainer.innerHTML = renderFooter();
  }

  initToast();

  // Initialize Router
  const router = new Router(routes, {
    container: document.getElementById('app')
  });

  router.start();
});
