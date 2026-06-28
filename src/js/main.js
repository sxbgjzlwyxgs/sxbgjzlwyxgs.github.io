/* ========================================
   山西宝国建筑劳务有限公司 - 公共JS
   ======================================== */

// ---------- Mobile Nav Toggle ----------
function initNav() {
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      toggle.classList.toggle('active');
      nav.classList.toggle('open');
    });
    // Close nav on link click
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        toggle.classList.remove('active');
        nav.classList.remove('open');
      });
    });
  }
}

// ---------- Header Scroll Effect ----------
function initHeaderScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  });
}

// ---------- Hero Slider ----------
function initHeroSlider() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.hero-dot');
  if (slides.length === 0) return;
  let current = 0;
  function show(index) {
    slides.forEach((s, i) => s.classList.toggle('active', i === index));
    dots.forEach((d, i) => d.classList.toggle('active', i === index));
    current = index;
  }
  dots.forEach(dot => {
    dot.addEventListener('click', () => show(parseInt(dot.dataset.index)));
  });
  setInterval(() => show((current + 1) % slides.length), 5000);
}

// ---------- Case Filter ----------
function initCaseFilter() {
  const tags = document.querySelectorAll('.filter-tag');
  const cards = document.querySelectorAll('.case-card');
  if (tags.length === 0) return;
  tags.forEach(tag => {
    tag.addEventListener('click', () => {
      tags.forEach(t => t.classList.remove('active'));
      tag.classList.add('active');
      const cat = tag.dataset.filter;
      cards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ---------- Accordion ----------
function initAccordion() {
  document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.accordion').forEach(a => a.classList.remove('active'));
      // Open clicked
      if (!isActive) item.classList.add('active');
    });
  });
}

// ---------- Chat Widget ----------
function initChat() {
  const toggle = document.querySelector('.chat-toggle');
  const panel = document.querySelector('.chat-panel');
  if (!toggle || !panel) return;
  toggle.addEventListener('click', () => {
    panel.classList.toggle('open');
  });
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.chat-widget')) {
      panel.classList.remove('open');
    }
  });
}

// ---------- Smooth Scroll ----------
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

// ---------- Active Nav Link ----------
function setActiveNav() {
  const path = window.location.pathname;
  document.querySelectorAll('.main-nav a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === './' || href === '/') {
      if (path === '/' || path.endsWith('index.html') || path === '') {
        link.classList.add('active');
      }
    } else if (href && path.includes(href.replace('./', '').replace('../', ''))) {
      link.classList.add('active');
    }
  });
}

// ---------- Form Handling ----------
// 配置说明：前往 https://formspree.io 注册免费账号，将下方 FORMSPREE_ID 替换为你的 Form ID
// Formspree 免费版每月 50 次提交，足以满足中小企业需求
var FORMSPREE_ID = 'your-form-id';

function initForms() {
  document.querySelectorAll('form[data-form-type]').forEach(form => {
    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      var submitBtn = form.querySelector('.form-submit');
      var successMsg = form.querySelector('.form-success');
      var originalText = submitBtn.textContent;
      submitBtn.textContent = '提交中...';
      submitBtn.disabled = true;

      var formType = form.getAttribute('data-form-type');
      var formData = new FormData(form);

      // 如果 Formspree 未配置，使用演示模式（数据记录到控制台）
      if (FORMSPREE_ID === 'your-form-id') {
        console.warn('[宝国劳务] Formspree 尚未配置，数据仅记录到控制台。请前往 https://formspree.io 注册并替换 FORMSPREE_ID。');
        var data = {};
        formData.forEach(function(v, k) { data[k] = v; });
        console.log('[表单数据 ' + formType + ']', JSON.stringify(data, null, 2));
        // 模拟网络延迟
        await new Promise(function(r) { setTimeout(r, 800); });
        form.reset();
        if (successMsg) successMsg.style.display = 'block';
        setTimeout(function() { if (successMsg) successMsg.style.display = 'none'; }, 5000);
      } else {
        try {
          var endpoint = 'https://formspree.io/f/' + FORMSPREE_ID;
          var resp = await fetch(endpoint, {
            method: 'POST',
            body: formData,
            headers: { 'Accept': 'application/json' },
          });
          if (!resp.ok) throw new Error('HTTP ' + resp.status);
          form.reset();
          if (successMsg) successMsg.style.display = 'block';
          setTimeout(function() { if (successMsg) successMsg.style.display = 'none'; }, 5000);
        } catch (err) {
          console.error('Form submission error:', err);
          alert('提交失败，请稍后重试或直接拨打联系电话：400-XXX-XXXX');
        }
      }
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    });
  });
}

// ---------- Baidu Analytics (placeholder) ----------
// 替换 'YOUR_BAIDU_ID' 为你的百度统计 ID，然后取消 initBaiduAnalytics() 的注释即可启用
function initBaiduAnalytics() {
  var _hmt = window._hmt || [];
  window._hmt = _hmt;
  (function() {
    var hm = document.createElement('script');
    hm.src = 'https://hm.baidu.com/hm.js?YOUR_BAIDU_ID';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(hm, s);
  })();
}

// ---------- Back to Top ----------
function initBackToTop() {
  const btn = document.querySelector('.back-to-top');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.style.display = window.scrollY > 400 ? 'flex' : 'none';
  });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ---------- Init All ----------
document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initHeaderScroll();
  initHeroSlider();
  initCaseFilter();
  initAccordion();
  initChat();
  initSmoothScroll();
  setActiveNav();
  initForms();
  initBackToTop();
  // initBaiduAnalytics(); // Uncomment when Baidu ID is configured
  initBaiduAutoPush();
});

// ---------- 百度站长自动推送 ----------
// 上线后取消注释即可启用，无需额外配置
function initBaiduAutoPush() {
  (function(){
    var bp = document.createElement('script');
    var curProtocol = window.location.protocol.split(':')[0];
    if (curProtocol === 'https') {
      bp.src = 'https://zz.bdstatic.com/linksubmit/push.js';
    } else {
      bp.src = 'http://push.zhanzhang.baidu.com/push.js';
    }
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(bp, s);
  })();
}
