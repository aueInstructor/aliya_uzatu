/* ══════════════════════════════════════════════════
   TRANSLATIONS
══════════════════════════════════════════════════ */
const T = {
  kk: {
    sealScript:      'Шақыру',
    sealSubtitle:    'ҚЫЗ ҰЗАТУ ӘЛИЯ-ТҰМАР',
    sealOpen:        'АШУ',
    sealHint:        'Шақыруды ашу үшін «АШУ» батырмасын басыңыз.',
    sectionDate:     'Той салтанаты:',
    timeLabel:       'сағат',
    sectionAddr:     'Мекенжайы:',
    mapBtn:          'КАРТАНЫ АШУ',
    sectionCountdown:'Той басталғанға дейін',
    cdDays: 'күн', cdHours: 'сағат', cdMinutes: 'минут', cdSeconds: 'секунд',
    sectionSchedule: 'Бағдарлама',
    sectionDresscode:'Дресс-код',
    rsvpTitle:       'Сауалнама',
    rsvpDesc:        'Құрметті қонақ,<br>тойға келуіңізді растауды<br>сұраймыз',
    rsvp1:           'Иə, барамын!',
    rsvp2:           'Жұбайыммен бірге барамын',
    rsvp3:           'Өкінішке орай, келе алмаймын',
    rsvpName:        'Сіздің атыңыз',
    rsvpBtn:         'ЖАУАП БЕРУ',
    musicOn:         'Əуен қосу',
    musicOff:        'Əуен өшіру',
    wishesBtn:       'ТІЛЕК ЖАЗУ',
    wishesTitle:     'Тілек жазу',
    wishName:        'Сіздің атыңыз',
    wishText:        'Тілегіңізді жазыңыз...',
    wishesSend:      'ЖІБЕРУ',
    footer:          'Қыздың бақытты болуын тілейміз',
    months: ['Қаңтар','Ақпан','Наурыз','Сəуір','Мамыр','Маусым','Шілде','Тамыз','Қыркүйек','Қазан','Қараша','Желтоқсан'],
    rsvpSuccessTitle: 'Жауап жіберілді',
    rsvpSuccessText:  'Рақмет! Сізді күтеміз.',
    rsvpSuccessBtn:   'Жабу',
    waRsvp: 'Сауалнама жауабы',
    waWish: 'Тілек',
  },
  ru: {
    sealScript:      'Приглашение',
    sealSubtitle:    'ҚЫЗ ҰЗАТУ ӘЛИЯ-ТҰМАР',
    sealOpen:        'ОТКРЫТЬ',
    sealHint:        'Нажмите «ОТКРЫТЬ» чтобы увидеть приглашение.',
    sectionDate:     'Дата торжества:',
    timeLabel:       'начало',
    sectionAddr:     'Место проведения:',
    mapBtn:          'ОТКРЫТЬ КАРТУ',
    sectionCountdown:'До начала торжества',
    cdDays: 'дней', cdHours: 'часов', cdMinutes: 'минут', cdSeconds: 'секунд',
    sectionSchedule: 'Программа',
    sectionDresscode:'Дресс-код',
    rsvpTitle:       'Анкета',
    rsvpDesc:        'Уважаемый гость, просим<br>подтвердить ваше участие',
    rsvp1:           'Да, приду!',
    rsvp2:           'Приду с супругом / супругой',
    rsvp3:           'К сожалению, не смогу прийти',
    rsvpName:        'Ваше имя',
    rsvpBtn:         'ОТВЕТИТЬ',
    musicOn:         'Включить музыку',
    musicOff:        'Выключить музыку',
    wishesBtn:       'ПОЖЕЛАНИЕ',
    wishesTitle:     'Написать пожелание',
    wishName:        'Ваше имя',
    wishText:        'Напишите ваше пожелание...',
    wishesSend:      'ОТПРАВИТЬ',
    footer:          'Желаем невесте счастья',
    months: ['Январь','Февраль','Март','Апрель','Май','Июнь','Июль','Август','Сентябрь','Октябрь','Ноябрь','Декабрь'],
    rsvpSuccessTitle: 'Ответ отправлен',
    rsvpSuccessText:  'Спасибо! Мы вас ждём.',
    rsvpSuccessBtn:   'Закрыть',
    waRsvp: 'Ответ на анкету',
    waWish: 'Пожелание',
  },
};

/* ══════════════════════════════════════════════════
   STATE
══════════════════════════════════════════════════ */
let lang = 'kk';
let musicPlaying = false;

/* ══════════════════════════════════════════════════
   HELPERS
══════════════════════════════════════════════════ */
const $   = id => document.getElementById(id);
const set  = (id, v) => { const e=$(id); if(e && v!=null) e.textContent = v; };
const html = (id, v) => { const e=$(id); if(e && v!=null) e.innerHTML   = v; };
const fmtDate = (s, o) => s ? new Date(s).toLocaleDateString('ru-RU', o) : null;

// читает локализованное поле: строка → как есть; объект {ru,kk} → нужный язык или фоллбэк
const t = field => {
  if (!field || typeof field === 'string') return field || '';
  return field[lang] || field[lang === 'ru' ? 'kk' : 'ru'] || '';
};

const colorMap = {
  'пудровый':'#EDCFC5','голубой':'#A8C8D8','бежевый':'#D8C8B0',
  'розовый':'#E8B0B8','лиловый':'#C8B0D8','сиреневый':'#C4A8D4',
  'мятный':'#A8D4C4','белый':'#F4F0EC','кремовый':'#F0E4D0',
  'золотой':'#D4AF7A','персиковый':'#F0C0A0','жёлтый':'#F0D870',
  'салатовый':'#B8D888','шампанский':'#E8D4B0',
};

let configRendered = false;

function renderConfigText() {
  configRendered = true;

  set('invite-greeting', t(CONFIG.invitation.greeting));
  html('invite-body',    t(CONFIG.invitation.body));
  set('addr-venue',      t(CONFIG.event.venueName));
  set('addr-detail',     t(CONFIG.event.venueAddress));
  set('dresscode-text',  t(CONFIG.dresscode.description));

  const list = $('schedule-list');
  if (list && CONFIG.schedule.length) {
    list.innerHTML = CONFIG.schedule
      .filter(s => s.time || s.text)
      .map(s => `
        <div class="sch-row reveal">
          <span class="sch-time">${s.time||''}</span>
          <span class="sch-dot"></span>
          <span class="sch-text">${t(s.text)}</span>
        </div>`).join('');
    if ($('main').classList.contains('open')) {
      list.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
    }
  }

  if (CONFIG.contacts.rsvpDeadline) {
    const d = new Date(CONFIG.contacts.rsvpDeadline);
    const dateStr = lang === 'kk'
      ? `${d.getDate()} ${T.kk.months[d.getMonth()].toLowerCase()} ${d.getFullYear()} жылға`
      : d.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' });
    const text = lang === 'kk'
      ? `Қатысуыңызды ${dateStr} дейін растасаңыз алғыс болар еді.`
      : `Будем благодарны, если вы подтвердите своё присутствие до ${dateStr}.`;
    set('rsvp-deadline', text);
  }

  const swBox = $('dc-swatches');
  if (swBox && CONFIG.dresscode.colors.length) {
    swBox.innerHTML = CONFIG.dresscode.colors.map(c => `
      <div class="dc-swatch">
        <div class="dc-circle" style="background:${colorMap[c.toLowerCase()]||'#ddd'}"></div>
        <span class="dc-name">${c}</span>
      </div>`).join('');
  }
}

/* ══════════════════════════════════════════════════
   LOCALIZATION
══════════════════════════════════════════════════ */
function setLang(l) {
  lang = l;

  const tr = T[l];

  /* update all [data-i18n] */
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (tr[key] != null) el.textContent = tr[key];
  });

  /* update [data-i18n-html] (innerHTML) */
  document.querySelectorAll('[data-i18n-html]').forEach(el => {
    const key = el.getAttribute('data-i18n-html');
    if (tr[key] != null) el.innerHTML = tr[key];
  });

  /* update placeholders */
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (tr[key] != null) el.placeholder = tr[key];
  });

  /* update month if date is set */
  if (CONFIG.event.date) {
    const month = new Date(CONFIG.event.date).getMonth();
    set('date-month', tr.months[month].toUpperCase());
  }

  /* update music label based on current state */
  set('music-label', musicPlaying ? tr.musicOff : tr.musicOn);

  /* re-render CONFIG text fields if DOM is ready */
  if (configRendered) renderConfigText();
}

/* ══════════════════════════════════════════════════
   LANGUAGE SELECTION
══════════════════════════════════════════════════ */
function chooseLang(l) {
  setLang(l);
  $('lang-screen').classList.add('hidden');
  const toggle = $('lang-toggle');
  if (toggle) { toggle.style.display = 'block'; updateLangToggle(); }
}

function toggleLang() {
  chooseLang(lang === 'ru' ? 'kk' : 'ru');
}

function updateLangToggle() {
  const btn = $('lang-toggle');
  if (btn) btn.textContent = lang === 'ru' ? 'ҚАЗ' : 'РУС';
}

/* ══════════════════════════════════════════════════
   COUNTDOWN
══════════════════════════════════════════════════ */
function startCountdown() {
  const cdSection = $('countdown-section');
  function tick() {
    if (!CONFIG.event.date) { if (cdSection) cdSection.style.display = 'none'; return; }
    const diff = new Date(`${CONFIG.event.date}T${CONFIG.event.time||'18:00'}:00`) - Date.now();
    if (diff <= 0) { if (cdSection) cdSection.style.display = 'none'; return; }
    const pad = n => String(Math.floor(n)).padStart(2, '0');
    set('cd-days',    pad(diff / 864e5));
    set('cd-hours',   pad((diff % 864e5) / 36e5));
    set('cd-minutes', pad((diff % 36e5) / 6e4));
    set('cd-seconds', pad((diff % 6e4) / 1e3));
  }
  tick();
  setInterval(tick, 1000);
}

/* ══════════════════════════════════════════════════
   OPEN INVITATION (seal click)
══════════════════════════════════════════════════ */
function openInvitation() {
  $('seal-btn').classList.add('pressed');

  // make seal-screen background transparent → reveals #main underneath
  $('seal-screen').classList.add('opening');
  document.body.classList.remove('sealed');
  $('main').classList.add('open');
  $('fixed-bar').style.display = 'flex';
  if (window.innerWidth > 500) $('phone-shell').style.display = 'block';
  initReveal();
  startCountdown();

  // fly all 4 flaps out simultaneously
  $('env-flap-top').classList.add('open');
  $('env-flap-bot').classList.add('open');
  $('env-flap-left').classList.add('open');
  $('env-flap-right').classList.add('open');

  // once flaps are gone, remove seal-screen entirely
  setTimeout(() => $('seal-screen').classList.add('hidden'), 1900);

}

/* ══════════════════════════════════════════════════
   SCROLL REVEAL
══════════════════════════════════════════════════ */
function initReveal() {
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach(el => io.observe(el));
}

/* ══════════════════════════════════════════════════
   POPULATE FROM CONFIG
══════════════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {

  /* lock scroll until envelope opened */
  document.body.classList.add('sealed');

  setLang('kk');
  $('lang-screen').classList.add('hidden');
  const toggle = $('lang-toggle');
  if (toggle) { toggle.style.display = 'block'; updateLangToggle(); }

  /* page title */
  if (CONFIG.bride.name) document.title = `Қыз Ұзату · ${CONFIG.bride.name}`;
  if (CONFIG.version) set('site-version', `v${CONFIG.version}`);

  /* photo */
  if (CONFIG.photo && CONFIG.photo.path) {
    const img = $('photo-img');
    img.src = CONFIG.photo.path;
    img.style.cssText = 'display:block;position:absolute;inset:0;width:100%;height:100%;object-fit:cover';
    $('photo-placeholder').style.display = 'none';
  }
  set('photo-name', CONFIG.bride.name || '');

  /* date section */
  if (CONFIG.event.date) {
    const d   = new Date(CONFIG.event.date);
    const day = d.getDate();
    set('date-day', day);
    set('dr-d1', day - 2 > 0 ? day - 2 : '');
    set('dr-d2', day - 1 > 0 ? day - 1 : '');
    set('dr-d3', day + 1);
    set('dr-d4', day + 2);
  }
  set('event-time', CONFIG.event.time || '');

  /* map button */
  const mapBtn = $('map-btn');
  if (mapBtn && CONFIG.event.mapLink) {
    mapBtn.href = CONFIG.event.mapLink;
    mapBtn.style.display = 'inline-flex';
  }

  /* localizable CONFIG fields — re-rendered on lang change */
  renderConfigText();

  /* countdown — запускается из openInvitation() */

  /* music */
  const audio = $('bg-music');
  if (CONFIG.music && CONFIG.music.url && audio) {
    audio.src = CONFIG.music.url;
    $('music-btn').style.display = 'flex';
  }

  /* RSVP radio visual */
  document.querySelectorAll('.rsvp-opt').forEach(opt => {
    opt.addEventListener('click', () => {
      document.querySelectorAll('.rsvp-opt').forEach(o => o.classList.remove('selected'));
      opt.classList.add('selected');
    });
  });

  /* язык применяется через chooseLang() на экране выбора */
});

/* ══════════════════════════════════════════════════
   MUSIC
══════════════════════════════════════════════════ */
function toggleMusic() {
  const audio = $('bg-music');
  if (!audio || !audio.src) return;
  const tr = T[lang];
  if (musicPlaying) {
    audio.pause();
    set('music-icon', '▶');
    set('music-label', tr.musicOn);
  } else {
    audio.play().catch(()=>{});
    set('music-icon', '⏸');
    set('music-label', tr.musicOff);
  }
  musicPlaying = !musicPlaying;
}

/* ══════════════════════════════════════════════════
   RSVP
══════════════════════════════════════════════════ */
function submitRSVP() {
  const name    = ($('rsvp-name').value || '').trim();
  const checked = document.querySelector('.rsvp-opt.selected [data-i18n]');
  const key     = checked ? checked.getAttribute('data-i18n') : '';
  const answer  = key ? (T.ru[key] || '') : '';

  if (!name) { alert('Пожалуйста, введите ваше имя.'); return; }

  const formUrl = 'https://docs.google.com/forms/d/e/1FAIpQLScKquYgGTCRlnV039Y8DL8kgLNPjymEd4ofZTGqu-n08klznQ/formResponse';
  const body = new FormData();
  body.append('entry.2120107983', name);
  body.append('entry.92164775', answer);

  fetch(formUrl, { method: 'POST', mode: 'no-cors', body })
    .then(showRsvpModal)
    .catch(showRsvpModal);
}

function showRsvpModal() {
  $('rsvp-name').value = '';
  document.querySelectorAll('.rsvp-opt').forEach(o => o.classList.remove('selected'));
  document.querySelector('.rsvp-opt')?.classList.add('selected');
  const modal = $('rsvp-modal');
  modal.style.display = 'flex';
}

function closeRsvpModal() {
  $('rsvp-modal').style.display = 'none';
}

