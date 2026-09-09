(function () {
  "use strict";

  /* ============ SITE DATA ============ */
  var services = [
    { slug: "medical-billing", title: "Medical Billing", icon: "MB", desc: "End-to-end claim submission, scrubbing, and follow-up that keeps cash flowing." },
    { slug: "medical-coding", title: "Medical Coding", icon: "MC", desc: "Certified coders assign accurate CPT, ICD-10, and HCPCS codes to maximize reimbursement." },
    { slug: "credentialing", title: "Credentialing & Enrollment", icon: "CR", desc: "Fast provider enrollment and payer credentialing so you can bill from day one." },
    { slug: "eligibility-verification", title: "Eligibility Verification", icon: "EV", desc: "Real-time benefit checks before the visit eliminate front-end denials." },
    { slug: "denial-management", title: "Denial Management", icon: "DM", desc: "Root-cause analysis and aggressive appeals recover revenue others write off." },
    { slug: "ar-recovery", title: "AR / Recovery", icon: "AR", desc: "Systematic aging follow-up shrinks days in AR and unlocks stranded revenue." },
    { slug: "patient-billing", title: "Patient Billing", icon: "PB", desc: "Clear statements and friendly support improve patient collections and satisfaction." },
    { slug: "payment-posting", title: "Payment Posting", icon: "PP", desc: "Accurate ERA/EOB posting and reconciliation with underpayment screening." }
  ];

  var specialties = [
    "Internal Medicine", "Mental / Behavioral Health", "Dermatology", "Cardiology",
    "Physical Therapy", "Orthopedics", "Family Practice", "OB-GYN",
    "Emergency Room", "Urgent Care"
  ];

  var states = [
    "Texas", "California", "Florida", "New York", "Georgia", "Ohio",
    "Illinois", "North Carolina", "Arizona", "Pennsylvania"
  ];

  /* ============ RENDER: SERVICES GRID ============ */
  var serviceGrid = document.querySelector("[data-services-grid]");
  if (serviceGrid) {
    serviceGrid.innerHTML = services.map(function (s) {
      return (
        '<a href="services/' + s.slug + '.html" class="service-card reveal">' +
          '<span class="service-icon">' + s.icon + '</span>' +
          '<h3>' + s.title + '</h3>' +
          '<p>' + s.desc + '</p>' +
          '<span class="service-link">Learn more ' +
            '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>' +
          '</span>' +
        '</a>'
      );
    }).join("");
  }

  /* ============ RENDER: NAV DROPDOWN ============ */
  var servicesNav = document.querySelector("[data-services-nav]");
  if (servicesNav) {
    servicesNav.innerHTML = services.map(function (s) {
      return '<a href="services/' + s.slug + '.html">' + s.title + '</a>';
    }).join("");
  }

  /* ============ RENDER: SPECIALTIES PILLS ============ */
  var specialtiesList = document.querySelector("[data-specialties-list]");
  if (specialtiesList) {
    specialtiesList.innerHTML = specialties.map(function (s) {
      return '<a href="specialties.html" class="specialty-pill">' + s + '</a>';
    }).join("");
  }


/* ============ RENDER: STATES PILLS ============ */

var statesList = document.querySelector("[data-states-list]");

if (statesList) {
    statesList.innerHTML = states.map(function (state) {
        return '<a href="states.html" class="specialty-pill">' + state + '</a>';
    }).join("");
}
  /* ============ RENDER: FOOTER COLUMNS ============ */
  var footerServices = document.querySelector("[data-footer-services]");
  if (footerServices) {
    footerServices.innerHTML = services.map(function (s) {
      return '<li><a href="services/' + s.slug + '.html">' + s.title + '</a></li>';
    }).join("");
  }
  var footerSpecialties = document.querySelector("[data-footer-specialties]");
  if (footerSpecialties) {
    footerSpecialties.innerHTML = specialties.slice(0, 8).map(function (s) {
      return '<li><a href="specialties.html">' + s + '</a></li>';
    }).join("");
  }
  var footerStates = document.querySelector("[data-footer-states]");
  if (footerStates) {
    footerStates.innerHTML = states.slice(0, 8).map(function (s) {
      return '<li><a href="states.html">' + s + '</a></li>';
    }).join("");
  }

  /* ============ RENDER: MARQUEE ============ */
  var marqueeTrack = document.getElementById("marqueeTrack");
  if (marqueeTrack) {
    var doubled = states.concat(states);
    marqueeTrack.innerHTML = doubled.map(function (s) {
      return '<span class="marquee-pill">' + s + ' Medical Billing</span>';
    }).join("");
  }

  /* ============ FOOTER YEAR ============ */
  var yearEl = document.getElementById("footerYear");
  if (yearEl) {
    yearEl.textContent = "© " + new Date().getFullYear() + " Evernest Billing. All rights reserved. HIPAA Compliant.";
  }

  /* ============ MOBILE MENU ============ */
  var menuToggle = document.getElementById("menuToggle");
  var mobileMenu = document.getElementById("mobileMenu");
  var iconOpen = document.getElementById("menuIconOpen");
  var iconClose = document.getElementById("menuIconClose");
  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function () {
      var isOpen = mobileMenu.classList.toggle("open");
      iconOpen.style.display = isOpen ? "none" : "block";
      iconClose.style.display = isOpen ? "block" : "none";
    });
  }

  /* ============ SERVICES DROPDOWN (desktop) ============ */
  var dropdown = document.getElementById("servicesDropdown");
  var dropdownTrigger = document.getElementById("servicesDropdownTrigger");
  if (dropdown && dropdownTrigger) {
    var closeTimer;
    var openDropdown = function () {
      clearTimeout(closeTimer);
      dropdown.classList.add("open");
      dropdownTrigger.setAttribute("aria-expanded", "true");
    };
    var closeDropdown = function () {
      closeTimer = setTimeout(function () {
        dropdown.classList.remove("open");
        dropdownTrigger.setAttribute("aria-expanded", "false");
      }, 120);
    };
    dropdown.addEventListener("mouseenter", openDropdown);
    dropdown.addEventListener("mouseleave", closeDropdown);
    dropdownTrigger.addEventListener("click", function (e) {
      e.preventDefault();
      dropdown.classList.contains("open") ? closeDropdown() : openDropdown();
    });
    document.addEventListener("click", function (e) {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove("open");
        dropdownTrigger.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ============ SCROLL REVEAL ============ */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in-view"); });
  } else {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: "-40px" });
    revealEls.forEach(function (el) { observer.observe(el); });
  }

  /* ============ ANIMATED COUNTERS ============ */
  var counters = document.querySelectorAll("[data-counter]");
  var animateCounter = function (el) {
    var target = parseFloat(el.getAttribute("data-counter"));
    var suffix = el.getAttribute("data-suffix") || "";
    var decimals = target % 1 !== 0 ? 1 : 0;
    var duration = 1600;
    var start = null;
    var step = function (timestamp) {
      if (!start) start = timestamp;
      var progress = Math.min((timestamp - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      var value = target * eased;
      el.textContent = value.toFixed(decimals) + suffix;
      if (progress < 1) requestAnimationFrame(step);
    };
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals) + suffix;
    } else {
      requestAnimationFrame(step);
    }
  };
  if (counters.length) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(animateCounter);
    } else {
      var counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            counterObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { counterObserver.observe(el); });
    }
  }

  /* ============ SAVINGS CALCULATOR ============ */
  var providersInput = document.getElementById("providers");
  var collectionsInput = document.getElementById("collections");
  var providersValue = document.getElementById("providersValue");
  var collectionsValue = document.getElementById("collectionsValue");
  var outInHouse = document.querySelector('[data-output="in-house"]');
  var outOutsourced = document.querySelector('[data-output="outsourced"]');
  var outSavings = document.querySelector('[data-output="savings"]');

  var formatCurrency = function (n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  };
  var formatK = function (n) {
    return "$" + Math.round(n / 1000) + "K";
  };

  var recalc = function () {
    if (!providersInput || !collectionsInput) return;
    var providers = parseFloat(providersInput.value);
    var collections = parseFloat(collectionsInput.value);
    providersValue.textContent = providers;
    collectionsValue.textContent = formatK(collections);

    var inHouse = providers * 4800 + collections * 0.02;
    var outsourced = collections * 0.045;
    var savings = Math.max(0, inHouse - outsourced);

    outInHouse.textContent = formatCurrency(inHouse);
    outOutsourced.textContent = formatCurrency(outsourced);
    outSavings.textContent = formatCurrency(savings);
  };
  if (providersInput && collectionsInput) {
    providersInput.addEventListener("input", recalc);
    collectionsInput.addEventListener("input", recalc);
    recalc();
  }

  /* ============ LEAD FORM SUBMISSION ============ */
  var leadForms = document.querySelectorAll("[data-lead-form]");
  leadForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var statusEl = form.querySelector("[data-form-status]");
      var submitBtn = form.querySelector('button[type="submit"]');
      var originalLabel = submitBtn.textContent;

      if (statusEl) { statusEl.textContent = ""; }
      submitBtn.disabled = true;
      submitBtn.textContent = "Sending…";

      /*
        NOTE: This static build has no backend attached.
        Replace this simulated delay with a real fetch() POST call to your
        lead-capture endpoint (e.g. Formspree, a custom API, etc.), sending
        new FormData(form) as the payload.
      */
      setTimeout(function () {
        var shell = form.closest(".form-shell") || form.parentElement;
        var successHTML =
          '<div class="form-success">' +
            '<div class="check-circle">✓</div>' +
            '<h3>Request received</h3>' +
            '<p>A revenue specialist will reach out within one business day with your no-obligation audit.</p>' +
          '</div>';
        form.outerHTML = successHTML;
      }, 900);
    });
  });

  /* ============ NEWSLETTER FORM ============ */
  var newsletterForms = document.querySelectorAll("[data-newsletter-form]");
  newsletterForms.forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = form.querySelector("input");
      var button = form.querySelector("button");
      var originalLabel = button.textContent;
      button.textContent = "Subscribed ✓";
      button.disabled = true;
      setTimeout(function () {
        input.value = "";
        button.textContent = originalLabel;
        button.disabled = false;
      }, 2200);
    });
  });

})();
