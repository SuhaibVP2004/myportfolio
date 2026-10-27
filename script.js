// ===== MOBILE MENU =====
const navToggle = document.getElementById("nav-toggle");
const navList = document.getElementById("nav-list");

function closeMenu() {
  if (!navToggle || !navList) return;

  navList.classList.remove("open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.textContent = "☰";
}

if (navToggle && navList) {
  navToggle.addEventListener("click", () => {
    const isOpen = navList.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    navToggle.textContent = isOpen ? "✕" : "☰";
  });

  navList.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  // Escape closes the menu
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && navList.classList.contains("open")) {
      closeMenu();
      navToggle.focus();
    }
  });
}


// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll("main section[id]");
const navLinks = document.querySelectorAll(".nav__link");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle(
              "active",
              link.getAttribute("href") === "#" + entry.target.id
            );
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px" }
  );

  sections.forEach((section) => sectionObserver.observe(section));
}


// ===== SCROLL REVEAL =====
const reduceMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll(".reveal").forEach((el) => {
    revealObserver.observe(el);
  });
} else {
  document.querySelectorAll(".reveal").forEach((el) => {
    el.classList.add("visible");
  });
}


// ===== BIG ORB: FOLLOWS THE MOUSE =====
const orb = document.querySelector(".orb");

const canFollow = window.matchMedia(
  "(hover: hover) and (pointer: fine)"
).matches;

if (orb && canFollow && !reduceMotion) {
  orb.style.left = "0";
  orb.style.top = "0";

  let targetX = 0;
  let targetY = 0;

  let x = 0;
  let y = 0;

  let running = false;

  function restPosition() {
    targetX = window.innerWidth * 0.5;
    targetY = window.innerHeight * 0.55;
  }

  function draw() {
    orb.style.transform = `translate3d(${x}px, ${y}px, 0)`;
  }

  function animate() {
    x += (targetX - x) * 0.08;
    y += (targetY - y) * 0.08;

    draw();

    if (
      Math.abs(targetX - x) > 0.1 ||
      Math.abs(targetY - y) > 0.1
    ) {
      requestAnimationFrame(animate);
    } else {
      running = false;
    }
  }

  function start() {
    if (!running) {
      running = true;
      requestAnimationFrame(animate);
    }
  }

  restPosition();

  x = targetX;
  y = targetY;

  draw();

  document.addEventListener("pointermove", (event) => {
    targetX = event.clientX;
    targetY = event.clientY;
    start();
  });

  document.documentElement.addEventListener("mouseleave", () => {
    restPosition();
    start();
  });

  window.addEventListener("resize", () => {
    restPosition();
    start();
  });
}


// ===== PROJECT IMAGE ARROW =====
document.querySelectorAll(".pcard__img--link").forEach((link) => {
  function move(event) {
    if (event.pointerType !== "mouse") return;

    const rect = link.getBoundingClientRect();

    link.style.setProperty(
      "--x",
      event.clientX - rect.left + "px"
    );

    link.style.setProperty(
      "--y",
      event.clientY - rect.top + "px"
    );
  }

  link.addEventListener("pointerenter", (event) => {
    link.classList.add("snap");

    move(event);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        link.classList.remove("snap");
      });
    });
  });

  link.addEventListener("pointermove", move);
});


// ===== SKILLS CARDS =====
document.querySelectorAll(".skcard").forEach((card) => {
  const btn = card.querySelector(".skcard__btn");

  if (!btn) return;

  card.addEventListener("click", () => {
    const open = card.classList.toggle("is-open");

    btn.setAttribute("aria-expanded", open);
  });
});


// ==================================================
// TECH STACK BUBBLES
// Medium-sized bubbles + smooth movement + hover label
// ==================================================

(function () {
  const arena = document.getElementById("bubbles");

  if (!arena) return;

  const hint = arena.querySelector(".bubbles__hint");

  const DEV =
    "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/";

  // Technology name, icon path, glow colour, size, logo inversion
  const STACK = [
    {
      name: "Python",
      icon: "python/python-original.svg",
      c: "#3776ab",
      s: 1.08
    },
    {
      name: "Django",
      icon: "django/django-plain.svg",
      c: "#0c4b33",
      s: 1.02,
      invert: true
    },
    {
      name: "JavaScript",
      icon: "javascript/javascript-original.svg",
      c: "#f7df1e",
      s: 1.08
    },
    {
      name: "React",
      icon: "react/react-original.svg",
      c: "#61dafb",
      s: 1.04
    },
    {
      name: "HTML",
      icon: "html5/html5-original.svg",
      c: "#e34f26",
      s: 1.0
    },
    {
      name: "CSS",
      icon: "css3/css3-original.svg",
      c: "#1572b6",
      s: 1.0
    },
    {
      name: "Express",
      icon: "express/express-original.svg",
      c: "#888888",
      s: 0.96,
      invert: true
    },
    {
      name: "Node.js",
      icon: "nodejs/nodejs-original.svg",
      c: "#5fa04e",
      s: 1.04
    },
    {
      name: "Next.js",
      icon: "nextjs/nextjs-original.svg",
      c: "#888888",
      s: 1.06,
      invert: true
    },
    {
      name: "Tailwind CSS",
      icon: "tailwindcss/tailwindcss-original.svg",
      c: "#38bdf8",
      s: 1.0
    },
    {
      name: "Git",
      icon: "git/git-original.svg",
      c: "#f05032",
      s: 0.96
    },
    {
      name: "GitHub",
      icon: "github/github-original.svg",
      c: "#888888",
      s: 0.96,
      invert: true
    },
    {
      name: "VS Code",
      icon: "vscode/vscode-original.svg",
      c: "#007acc",
      s: 0.98
    },
    {
      name: "PostgreSQL",
      icon: "postgresql/postgresql-original.svg",
      c: "#336791",
      s: 1.0
    },
    {
      name: "MySQL",
      icon: "mysql/mysql-original.svg",
      c: "#00758f",
      s: 1.0
    },
    {
      name: "MongoDB",
      icon: "mongodb/mongodb-original.svg",
      c: "#47a248",
      s: 1.02
    },
    {
      name: "Java",
      icon: "java/java-original.svg",
      c: "#f89820",
      s: 1.04
    },
    {
      name: "C++",
      icon: "cplusplus/cplusplus-original.svg",
      c: "#00599c",
      s: 1.0
    },
    {
      name: "C",
      icon: "c/c-original.svg",
      c: "#5c6bc0",
      s: 0.94
    }
  ];


  // Animation variables
  let W = 0;
  let H = 0;

  let baseR = 36;

  const mouse = {
    x: -9999,
    y: -9999
  };

  let running = false;
  let ready = false;
  let lastTime = 0;

  let activeName = "";


  // ===== CREATE THE BUBBLES =====
  const balls = STACK.map((item) => {
    const el = document.createElement("div");

    el.className = "bubble";

    el.setAttribute("role", "img");
    el.setAttribute("aria-label", item.name);

    el.style.setProperty("--c", item.c);

    el.innerHTML =
      '<img src="' +
      DEV +
      item.icon +
      '" alt="" loading="lazy"' +
      (item.invert ? ' class="invert"' : "") +
      ' onerror="this.remove()">' +
      "<span>" +
      item.name +
      "</span>";

    arena.appendChild(el);

    return {
      el,
      item,
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      r: 30
    };
  });


  // ===== UPDATE THE BOTTOM LABEL =====
  function setActiveName(name) {
    if (!hint || activeName === name) return;

    activeName = name;

    hint.textContent = name
      ? name.toUpperCase() + "  ·  TECH STACK"
      : "HOVER OVER A BUBBLE";

    hint.classList.toggle("is-active", Boolean(name));
  }


  // ===== MEASURE THE BUBBLES =====
  function measure() {
    W = arena.clientWidth;
    H = arena.clientHeight;

    // Medium bubble size, responsive to the available space.
    baseR = Math.max(
      25,
      Math.min(39, W / 28, H / 11.5)
    );

    balls.forEach((b) => {
      b.r = baseR * b.item.s;

      b.el.style.width = b.r * 2 + "px";
      b.el.style.height = b.r * 2 + "px";

      b.el.style.setProperty(
        "--fs",
        Math.max(
          0.68,
          Math.min(0.9, b.r / 43)
        ) + "rem"
      );
    });
  }


  // ===== INITIAL BUBBLE POSITIONS =====
  function place() {
    const cols = Math.ceil(
      Math.sqrt(balls.length * (W / Math.max(H, 1)))
    );

    const rows = Math.ceil(balls.length / cols);

    const cellW = Math.min(W / (cols + 1), 112);

    const cellH = Math.min(
      (H - 70) / (rows + 1),
      105
    );

    balls.forEach((b, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);

      b.x =
        W / 2 +
        (col - (cols - 1) / 2) * cellW +
        (Math.random() - 0.5) * 14;

      b.y =
        H / 2 -
        12 +
        (row - (rows - 1) / 2) * cellH +
        (Math.random() - 0.5) * 14;

      b.vx = 0;
      b.vy = 0;
    });
  }


  // ===== DRAW BUBBLES =====
  function drawBubbles() {
    balls.forEach((b) => {
      b.el.style.transform =
        `translate3d(${b.x - b.r}px, ${b.y - b.r}px, 0)`;
    });
  }


  // ===== PHYSICS AND SMOOTH MOVEMENT =====
  function step(dt = 1) {
    const cx = W / 2;
    const cy = (H - 24) / 2;

    const reach = 94;

    for (let i = 0; i < balls.length; i++) {
      const a = balls[i];


      // Gentle pull towards the centre.
      a.vx += (cx - a.x) * 0.00048 * dt;

      a.vy += (cy - a.y) * 0.00048 * dt;


      // Cursor interaction: nearby bubbles move away smoothly.
      const dx = a.x - mouse.x;
      const dy = a.y - mouse.y;

      const dist = Math.hypot(dx, dy) || 1;

      const range = a.r + reach;

      if (dist < range) {
        const f =
          ((range - dist) / range) * 0.62 * dt;

        a.vx += (dx / dist) * f;
        a.vy += (dy / dist) * f;
      }


      // Bubble-to-bubble collision handling.
      for (let j = i + 1; j < balls.length; j++) {
        const b = balls[j];

        const ox = b.x - a.x;
        const oy = b.y - a.y;

        const d = Math.hypot(ox, oy) || 1;

        const min = a.r + b.r + 3;

        if (d < min) {
          const nx = ox / d;
          const ny = oy / d;

          const push = (min - d) * 0.18 * dt;

          a.x -= nx * push;
          a.y -= ny * push;

          b.x += nx * push;
          b.y += ny * push;

          const rv =
            (b.vx - a.vx) * nx +
            (b.vy - a.vy) * ny;

          if (rv < 0) {
            a.vx += nx * rv * 0.18;
            a.vy += ny * rv * 0.18;

            b.vx -= nx * rv * 0.18;
            b.vy -= ny * rv * 0.18;
          }
        }
      }
    }


    // Smooth, frame-rate-independent damping.
    const damping = Math.pow(0.965, dt);

    balls.forEach((b) => {
      b.vx *= damping;
      b.vy *= damping;

      b.x += b.vx * dt;
      b.y += b.vy * dt;


      // Keep bubbles inside the animation area.
      if (b.x < b.r) {
        b.x = b.r;
        b.vx = Math.abs(b.vx) * 0.45;
      }

      if (b.x > W - b.r) {
        b.x = W - b.r;
        b.vx = -Math.abs(b.vx) * 0.45;
      }

      if (b.y < b.r) {
        b.y = b.r;
        b.vy = Math.abs(b.vy) * 0.45;
      }

      if (b.y > H - b.r - 34) {
        b.y = H - b.r - 34;
        b.vy = -Math.abs(b.vy) * 0.45;
      }
    });
  }


  // ===== ANIMATION LOOP =====
  function loop(time) {
    if (!running) return;

    const dt = lastTime
      ? Math.min((time - lastTime) / 16.667, 1.8)
      : 1;

    lastTime = time;

    step(dt);

    drawBubbles();

    requestAnimationFrame(loop);
  }


  // ===== DETECT THE HOVERED BUBBLE =====
  function updatePointer(clientX, clientY) {
    const rect = arena.getBoundingClientRect();

    mouse.x = clientX - rect.left;
    mouse.y = clientY - rect.top;

    let hovered = null;
    let nearest = Infinity;

    balls.forEach((b) => {
      const d = Math.hypot(
        mouse.x - b.x,
        mouse.y - b.y
      );

      if (d <= b.r && d < nearest) {
        hovered = b;
        nearest = d;
      }
    });

    // Show the selected technology name at the bottom.
    setActiveName(
      hovered ? hovered.item.name : ""
    );
  }


  // ===== MOUSE AND TOUCH EVENTS =====
  arena.addEventListener("pointermove", (event) => {
    updatePointer(event.clientX, event.clientY);
  });

  arena.addEventListener("pointerleave", () => {
    mouse.x = -9999;
    mouse.y = -9999;

    setActiveName("");
  });

  arena.addEventListener("pointerup", () => {
    if (window.matchMedia("(pointer: coarse)").matches) {
      mouse.x = -9999;
      mouse.y = -9999;
    }
  });


  // ===== RESPONSIVE RESIZING =====
  window.addEventListener("resize", () => {
    if (!ready) return;

    measure();

    balls.forEach((b) => {
      b.x = Math.min(
        Math.max(b.x, b.r),
        W - b.r
      );

      b.y = Math.min(
        Math.max(b.y, b.r),
        H - b.r - 34
      );
    });

    drawBubbles();
  });


  // ===== RUN ONLY WHEN THE TECH STACK IS VISIBLE =====
  if ("IntersectionObserver" in window) {
    new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!ready) {
              measure();

              place();

              ready = true;

              // Settle the bubbles before displaying them.
              for (let i = 0; i < 220; i++) {
                step();
              }

              drawBubbles();
            }

            if (!reduceMotion && !running) {
              running = true;
              lastTime = 0;

              requestAnimationFrame(loop);
            }
          } else {
            running = false;
            lastTime = 0;
          }
        });
      },
      { threshold: 0.1 }
    ).observe(arena);
  } else {
    measure();
    place();

    ready = true;

    for (let i = 0; i < 220; i++) {
      step();
    }

    drawBubbles();

    if (!reduceMotion) {
      running = true;
      requestAnimationFrame(loop);
    }
  }
})();


// ===== EXPERIENCE / EDUCATION TABS =====
const xTabs = document.querySelectorAll(".xtab");

const xTitleTop = document.getElementById("x-title-top");

const xTitleBottom = document.getElementById("x-title-bottom");


function selectTab(tab) {
  xTabs.forEach((t) => {
    const active = t === tab;

    t.classList.toggle("is-active", active);

    t.setAttribute("aria-selected", active);

    t.tabIndex = active ? 0 : -1;

    const panel = document.getElementById(
      t.getAttribute("aria-controls")
    );

    if (panel) {
      panel.hidden = !active;
    }
  });

  if (xTitleTop) {
    xTitleTop.textContent = tab.dataset.top;
  }

  if (xTitleBottom) {
    xTitleBottom.textContent = tab.dataset.bottom;
  }
}


xTabs.forEach((tab, i) => {
  tab.addEventListener("click", () => {
    selectTab(tab);
  });

  tab.addEventListener("keydown", (event) => {
    if (
      event.key !== "ArrowRight" &&
      event.key !== "ArrowLeft"
    ) {
      return;
    }

    const next =
      xTabs[
        (
          i +
          (event.key === "ArrowRight" ? 1 : -1) +
          xTabs.length
        ) % xTabs.length
      ];

    selectTab(next);

    next.focus();
  });
});


// ===== CONTACT: COPY EMAIL BUTTON =====
const copyBtn = document.getElementById("copy-email");

if (copyBtn) {
  const copyLabel = copyBtn.querySelector(".copybtn__label");

  let copyTimer;


  async function copyText(text) {
    try {
      await navigator.clipboard.writeText(text);

      return true;
    } catch {
      // Fallback for browsers where Clipboard API is unavailable.
      const box = document.createElement("textarea");

      box.value = text;

      box.setAttribute("readonly", "");

      box.style.cssText =
        "position:fixed;opacity:0;";

      document.body.appendChild(box);

      box.select();

      let ok = false;

      try {
        ok = document.execCommand("copy");
      } catch {
        // Copy failed.
      }

      box.remove();

      return ok;
    }
  }


  copyBtn.addEventListener("click", async () => {
    const ok = await copyText(copyBtn.dataset.email);

    if (copyLabel) {
      copyLabel.textContent = ok
        ? "Email copied"
        : "Copy failed";
    }

    copyBtn.classList.toggle("is-copied", ok);

    clearTimeout(copyTimer);

    copyTimer = setTimeout(() => {
      if (copyLabel) {
        copyLabel.textContent = "Copy email";
      }

      copyBtn.classList.remove("is-copied");
    }, 2000);
  });
}


// ===== FOOTER YEAR =====
const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}