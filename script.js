const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const TAU = Math.PI * 2;

function setupCanvas(canvas) {
  const rect = canvas.getBoundingClientRect();
  const dpr = Math.min(devicePixelRatio || 1, 2);
  canvas.width = Math.round(rect.width * dpr);
  canvas.height = Math.round(rect.height * dpr);
  const ctx = canvas.getContext("2d");
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  return { ctx, w: rect.width, h: rect.height };
}

function polygon(ctx, points, fill, stroke = null, width = 1) {
  ctx.beginPath();
  points.forEach(([x, y], index) => index ? ctx.lineTo(x, y) : ctx.moveTo(x, y));
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = width;
    ctx.stroke();
  }
}

function drawHero(time = 0) {
  const canvas = document.querySelector("#hero-canvas");
  if (!canvas) return;
  const { ctx, w, h } = setupCanvas(canvas);
  const t = time * 0.00025;

  ctx.fillStyle = "#aebbae";
  ctx.fillRect(0, 0, w, h);

  const sky = ctx.createLinearGradient(0, 0, 0, h);
  sky.addColorStop(0, "#cdd3c8");
  sky.addColorStop(.54, "#91a095");
  sky.addColorStop(1, "#66736c");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, w, h);

  const horizon = h * .57;
  polygon(ctx, [[0,horizon],[w*.28,horizon-h*.12],[w*.55,horizon-h*.04],[w,horizon-h*.18],[w,h],[0,h]], "#657068");
  polygon(ctx, [[0,horizon+h*.05],[w*.35,horizon-h*.02],[w*.7,horizon+h*.05],[w,horizon-h*.05],[w,h],[0,h]], "#4c5651");

  ctx.save();
  ctx.translate(w * .55, h * .42);
  ctx.rotate(Math.sin(t) * .025);
  const scale = Math.min(w, h) * .27;
  const faces = [
    [[0,-scale],[scale*.72,-scale*.55],[0,-scale*.05],[-scale*.72,-scale*.55]],
    [[-scale*.72,-scale*.55],[0,-scale*.05],[0,scale*.72],[-scale*.7,scale*.15]],
    [[scale*.72,-scale*.55],[0,-scale*.05],[0,scale*.72],[scale*.7,scale*.15]]
  ];
  faces.forEach((face, i) => polygon(ctx, face, ["#d8ff48","#bdde34","#89a927"][i], "rgba(30,35,28,.24)", 1));
  ctx.restore();

  for (let i = 0; i < 22; i++) {
    const x = (i / 21) * w;
    const y = horizon + Math.sin(i * 2.3 + t) * 6 + (i % 3) * 9;
    ctx.fillStyle = i % 2 ? "rgba(223,255,82,.32)" : "rgba(255,255,255,.18)";
    ctx.fillRect(x, y, 1.5, h - y);
  }

  const vignette = ctx.createRadialGradient(w*.5,h*.42,Math.min(w,h)*.12,w*.5,h*.42,Math.max(w,h)*.72);
  vignette.addColorStop(0, "rgba(255,255,255,.12)");
  vignette.addColorStop(1, "rgba(9,17,13,.32)");
  ctx.fillStyle = vignette;
  ctx.fillRect(0, 0, w, h);
}

function drawGreenhouse(ctx, w, h, time) {
  const t = time * .00012;
  ctx.fillStyle = "#b5c0b2";
  ctx.fillRect(0, 0, w, h);
  polygon(ctx, [[0,0],[w*.32,0],[w*.62,h],[0,h]], "#d2d7ca");
  polygon(ctx, [[w*.32,0],[w,0],[w,h],[w*.62,h]], "#7b8c7b");
  ctx.strokeStyle = "rgba(30,42,31,.38)";
  ctx.lineWidth = Math.max(1, w / 500);
  for (let i = -2; i < 9; i++) {
    ctx.beginPath();
    ctx.moveTo((i / 7) * w, 0);
    ctx.lineTo((i / 7 + .25) * w, h);
    ctx.stroke();
  }
  for (let i = 0; i < 5; i++) {
    ctx.beginPath();
    ctx.moveTo(0, (i / 4) * h);
    ctx.lineTo(w, (i / 4) * h);
    ctx.stroke();
  }
  const cx = w * .68, cy = h * .47;
  for (let i = 0; i < 12; i++) {
    const angle = i / 12 * TAU + t;
    const length = h * (.12 + (i % 4) * .035);
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    polygon(ctx, [[0,0],[length*.23,-length*.14],[length,0],[length*.23,length*.14]], i % 2 ? "#d9ff43" : "#9dbb4c");
    ctx.restore();
  }
  ctx.fillStyle = "#ff684d";
  ctx.beginPath();
  ctx.arc(cx, cy, Math.min(w,h)*.085, 0, TAU);
  ctx.fill();
  const light = ctx.createLinearGradient(0,0,w,h);
  light.addColorStop(0,"rgba(255,255,225,.38)");
  light.addColorStop(1,"rgba(10,20,12,.12)");
  ctx.fillStyle = light;
  ctx.fillRect(0,0,w,h);
}

function drawRoom(ctx, w, h, time) {
  const t = time * .00018;
  ctx.fillStyle = "#c8b5aa";
  ctx.fillRect(0, 0, w, h);
  polygon(ctx, [[0,0],[w,0],[w*.7,h*.25],[w*.25,h*.25]], "#d9cbc0");
  polygon(ctx, [[0,0],[w*.25,h*.25],[w*.25,h*.83],[0,h]], "#a98f86");
  polygon(ctx, [[w*.25,h*.25],[w*.7,h*.25],[w,h],[w*.25,h*.83]], "#c0a59a");
  polygon(ctx, [[0,h],[w*.25,h*.83],[w,h],[w*.82,h]], "#766d69");
  for (let i = 0; i < 7; i++) {
    const x = w * (.3 + i * .085);
    const y = h * (.32 + Math.sin(t + i * .8) * .035);
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(Math.sin(t * 1.4 + i) * .12);
    polygon(ctx, [[0,0],[w*.055,0],[w*.065,h*.14],[0,h*.16]], i % 2 ? "#d9ff43" : "#43464d");
    ctx.restore();
  }
  ctx.fillStyle = "#ff684d";
  ctx.fillRect(w*.31,h*.55,w*.18,h*.12);
  ctx.fillStyle = "#202229";
  ctx.fillRect(w*.34,h*.67,w*.025,h*.16);
  ctx.fillRect(w*.45,h*.67,w*.025,h*.16);
}

function drawMoon(ctx, w, h, time) {
  const t = time * .00014;
  const sky = ctx.createLinearGradient(0,0,0,h);
  sky.addColorStop(0,"#1d2028");
  sky.addColorStop(1,"#8b5b56");
  ctx.fillStyle = sky;
  ctx.fillRect(0,0,w,h);
  for (let i = 0; i < 65; i++) {
    const x = (i * 83.17) % w;
    const y = (i * 37.61) % (h * .58);
    const r = 0.5 + (i % 3) * .45;
    ctx.fillStyle = `rgba(235,238,220,${.25 + (i % 5) * .11})`;
    ctx.beginPath();
    ctx.arc(x,y,r,0,TAU);
    ctx.fill();
  }
  const moonX = w * .72, moonY = h * .24;
  const glow = ctx.createRadialGradient(moonX,moonY,2,moonX,moonY,h*.28);
  glow.addColorStop(0,"rgba(226,255,142,.9)");
  glow.addColorStop(.25,"rgba(226,255,142,.25)");
  glow.addColorStop(1,"rgba(226,255,142,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0,0,w,h);
  ctx.fillStyle = "#e4f58c";
  ctx.beginPath();
  ctx.arc(moonX,moonY,h*.09,0,TAU);
  ctx.fill();

  polygon(ctx, [[0,h*.66],[w*.18,h*.54],[w*.36,h*.64],[w*.53,h*.47],[w*.72,h*.61],[w,h*.5],[w,h],[0,h]], "#44464c");
  polygon(ctx, [[0,h*.78],[w*.24,h*.67],[w*.42,h*.75],[w*.61,h*.62],[w*.81,h*.72],[w,h*.66],[w,h],[0,h]], "#272a30");

  const objX = w * .46 + Math.sin(t) * w*.015;
  const objY = h * .43 + Math.cos(t*.7) * h*.012;
  ctx.save();
  ctx.translate(objX,objY);
  ctx.rotate(t*.35);
  polygon(ctx, [[0,-h*.11],[w*.065,0],[0,h*.11],[-w*.065,0]], "#ff684d", "rgba(255,220,200,.45)", 1);
  ctx.restore();
}

const projectDrawers = {
  greenhouse: drawGreenhouse,
  room: drawRoom,
  moon: drawMoon
};

function renderProjects(time = 0) {
  document.querySelectorAll(".project-canvas").forEach(canvas => {
    const { ctx, w, h } = setupCanvas(canvas);
    projectDrawers[canvas.dataset.scene](ctx, w, h, time);
  });
}

function animate(time) {
  drawHero(time);
  if (!reduceMotion) requestAnimationFrame(animate);
}

function resize() {
  renderProjects(performance.now());
  if (reduceMotion) drawHero(0);
}

drawHero(0);
renderProjects(0);
if (!reduceMotion) requestAnimationFrame(animate);
new ResizeObserver(resize).observe(document.body);

document.querySelectorAll(".motion-video").forEach(video => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !reduceMotion) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  }, { threshold: 0.35 });
  observer.observe(video);
});

const sandParticles = document.querySelector(".splash-sand-particles");
if (sandParticles) {
  for (let index = 0; index < 34; index += 1) {
    const particle = document.createElement("i");
    particle.style.setProperty("--sand-y", `${13 + ((index * 23) % 76)}%`);
    particle.style.setProperty("--sand-delay", `${-((index * 0.43) % 7.8)}s`);
    particle.style.setProperty("--sand-duration", `${4.8 + ((index * 17) % 36) / 10}s`);
    particle.style.setProperty("--sand-size", `${1 + (index % 4)}px`);
    particle.style.setProperty("--sand-opacity", `${0.18 + (index % 5) * 0.09}`);
    particle.style.setProperty("--sand-drift", `${50 + (index % 7) * 13}px`);
    sandParticles.appendChild(particle);
  }
}

const splashMenuButton = document.querySelector(".splash-menu-button");
const splashMenuPanel = document.querySelector(".splash-menu-panel");
if (splashMenuButton && splashMenuPanel) {
  const setMenu = open => {
    splashMenuButton.classList.toggle("is-open", open);
    splashMenuPanel.classList.toggle("is-open", open);
    splashMenuButton.setAttribute("aria-expanded", String(open));
    splashMenuButton.setAttribute("aria-label", open ? "关闭导航" : "打开导航");
    splashMenuPanel.setAttribute("aria-hidden", String(!open));
  };
  splashMenuButton.addEventListener("click", () => {
    setMenu(!splashMenuPanel.classList.contains("is-open"));
  });
  splashMenuPanel.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => setMenu(false));
  });
  addEventListener("keydown", event => {
    if (event.key === "Escape") setMenu(false);
  });
}

(() => {
  const overlay = document.querySelector("#splash-intro");
  const video = document.querySelector("#splash-intro-video");
  if (!overlay) return;

  document.body.classList.add("intro-open");
  video?.play().catch(() => {});

  const enterSite = () => {
    if (!overlay.isConnected || overlay.classList.contains("is-exiting")) return;
    overlay.classList.add("is-exiting");
    document.body.classList.remove("intro-open");
    setTimeout(() => {
      video?.pause();
      overlay.remove();
      window.dispatchEvent(new CustomEvent("splash-complete"));
    }, 950);
  };

  setTimeout(enterSite, 5000);
  addEventListener("keydown", event => {
    if (event.key === "Escape" && overlay.isConnected) enterSite();
  });
})();
