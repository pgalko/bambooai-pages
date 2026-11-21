// BambooAI site: the menu, the sections fading in, the record diagram playing, the screenshot lightbox, Launch App and
// its request form, the copy button. No dependencies. Everything on the page works without it except the dialogs.

// The access requests go to the same Google Apps Script as before; it answers in plain text
// ("success", or a reason such as "duplicate email").
const ACCESS_URL = 'https://script.google.com/macros/s/AKfycbzRf20J8lqnIpSdeEZ6HEumJYiV-AFwkZZmHk3mbjSAgu6V4awVPFATajAyNRiTuuK6/exec';

(function () {
    'use strict';

    // ---- the menu on narrow screens ----
    const menuButton = document.querySelector('.menu-button');
    const nav = document.getElementById('site-nav');

    function setMenu(open) {
        if (!menuButton || !nav) return;
        menuButton.setAttribute('aria-expanded', String(open));
        nav.classList.toggle('is-open', open);
    }

    if (menuButton && nav) {
        menuButton.addEventListener('click', () => setMenu(menuButton.getAttribute('aria-expanded') !== 'true'));
        nav.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuButton.focus(); }
        });
        window.matchMedia('(min-width: 961px)').addEventListener('change', (e) => { if (e.matches) setMenu(false); });
    }

    // ---- the sections fade in as they come into view. Nothing is hidden unless this runs, motion is welcome and the
    // block is still below the fold; anything already on screen is shown as it is ----
    const still = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!still && 'IntersectionObserver' in window) {
        const below = [...document.querySelectorAll('main .section-head, main .showcase, main .br, main .facts, main .editions')]
            .filter((el) => el.getBoundingClientRect().top > window.innerHeight);
        const watch = new IntersectionObserver((entries) => {
            entries.forEach((e) => {
                if (!e.isIntersecting) return;
                e.target.classList.add('is-in');
                watch.unobserve(e.target);
            });
        }, { rootMargin: '0px 0px -8% 0px' });
        below.forEach((el) => { el.classList.add('reveal'); watch.observe(el); });
    }

    // ---- the record diagram: each part names the moments it takes a class (data-t: "on:1.2 act:1.2-3.8"). It plays
    // once as it comes into view, with one button to pause, play and replay. It is armed only when motion is welcome;
    // otherwise, as without this script, it stays the finished drawing ----
    const dg = document.querySelector('.dg');
    if (dg && !still && 'IntersectionObserver' in window) {
        const end = Number(dg.dataset.end) || 15;
        const parts = [...dg.querySelectorAll('[data-t]')].map((el) => ({
            el,
            cues: el.dataset.t.trim().split(/\s+/).map((cue) => {
                const [cls, span] = cue.split(':');
                const [from, to] = span.split('-').map(Number);
                return { cls, from, to: Number.isNaN(to) || to === undefined ? Infinity : to };
            }),
        }));
        const button = dg.querySelector('.dg-ctl');
        let t = 0, playing = false, last = 0, frame = 0;

        const show = () => {
            parts.forEach(({ el, cues }) => {
                const want = {};                     // a class may have more than one moment: it holds in any of them
                cues.forEach(({ cls, from, to }) => { want[cls] = want[cls] || (t >= from && t < to); });
                Object.keys(want).forEach((cls) => el.classList.toggle(cls, want[cls]));
            });
            button.textContent = playing ? 'Pause' : (t >= end ? 'Replay' : 'Play');
        };
        const tick = (now) => {
            if (!playing) return;
            t = Math.min(end, t + (now - last) / 1000);
            last = now;
            if (t >= end) playing = false;
            show();
            if (playing) frame = requestAnimationFrame(tick);
        };
        const play = () => {
            if (t >= end) t = 0;
            playing = true;
            last = performance.now();
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(tick);
            show();
        };

        dg.classList.add('is-armed');
        button.hidden = false;
        button.addEventListener('click', () => {
            if (playing) { playing = false; cancelAnimationFrame(frame); show(); } else { play(); }
        });
        show();
        const watch = new IntersectionObserver((entries) => {
            if (!entries.some((e) => e.isIntersecting)) return;
            watch.disconnect();
            play();
        }, { threshold: 0.25 });
        watch.observe(dg);
    }

    // ---- dialogs ----
    function openDialog(dialog) {
        if (!dialog) return;
        if (typeof dialog.showModal === 'function') dialog.showModal();
        else dialog.setAttribute('open', '');
    }

    function closeDialog(dialog) {
        if (!dialog) return;
        if (typeof dialog.close === 'function') dialog.close();
        else dialog.removeAttribute('open');
    }

    document.querySelectorAll('dialog').forEach((dialog) => {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) closeDialog(dialog);            // a click on the backdrop
            if (e.target.closest('[data-close]')) closeDialog(dialog);
        });
    });

    // ---- the screenshot lightbox ----
    const imageDialog = document.getElementById('image-dialog');
    if (imageDialog) {
        const big = imageDialog.querySelector('img');
        const zoom = imageDialog.querySelector('.image-zoom');

        function setZoom(on) {
            imageDialog.classList.toggle('is-zoomed', on);
            zoom.setAttribute('aria-pressed', String(on));
            zoom.textContent = on ? 'Fit to screen' : 'Actual size';
        }

        document.querySelectorAll('.shot').forEach((shot) => {
            shot.addEventListener('click', () => {
                big.src = shot.dataset.full;
                big.alt = shot.dataset.alt || '';
                imageDialog.setAttribute('aria-label', shot.dataset.alt || 'Screenshot');
                setZoom(false);
                openDialog(imageDialog);
            });
        });

        zoom.addEventListener('click', () => setZoom(!imageDialog.classList.contains('is-zoomed')));
        big.addEventListener('click', () => setZoom(!imageDialog.classList.contains('is-zoomed')));
        imageDialog.addEventListener('close', () => { big.removeAttribute('src'); });
    }

    // ---- Launch App: the invitation beta note, then the request form (as on the old site) ----
    const accessDialog = document.getElementById('access-dialog');
    const form = accessDialog ? accessDialog.querySelector('form') : null;
    const start = accessDialog ? accessDialog.querySelector('.access-start') : null;
    const showForm = accessDialog ? accessDialog.querySelector('[data-show-form]') : null;

    function resetAccess() {
        if (!form || !start || !showForm) return;
        form.hidden = true;
        start.hidden = false;
        showForm.setAttribute('aria-expanded', 'false');
    }

    document.querySelectorAll('[data-open-access]').forEach((button) => {
        button.addEventListener('click', () => {
            setMenu(false);
            resetAccess();
            openDialog(accessDialog);
            if (showForm) showForm.focus();
        });
    });

    if (showForm && form && start) {
        showForm.addEventListener('click', () => {
            form.hidden = false;
            start.hidden = true;
            showForm.setAttribute('aria-expanded', 'true');
            const first = form.querySelector('input');
            if (first) first.focus();
        });
    }

    if (form) {
        const status = form.querySelector('.form-status');
        const submit = form.querySelector('[type="submit"]');

        function say(text, kind) {
            status.textContent = text;
            status.classList.toggle('is-error', kind === 'error');
            status.classList.toggle('is-done', kind === 'done');
        }

        function mark(field, bad) {
            field.setAttribute('aria-invalid', String(bad));
        }

        // the server's plain-text answer, said in the page's words
        const REASONS = [
            ['missing fields', 'Please fill in all three fields.'],
            ['invalid email', 'That email address doesn’t look right.'],
            ['duplicate email', 'That email address is already on the list.'],
            ['please provide more details', 'Please tell us a bit more about your data (at least 15 characters).'],
            ['rate limit exceeded', 'Too many requests from your network. Please try again later.'],
            ['server error', 'Something went wrong on our side. Please try again in a moment.'],
        ];

        form.addEventListener('input', (e) => {
            if (e.target.matches('input, textarea')) mark(e.target, false);
        });

        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = form.elements.name;
            const email = form.elements.email;
            const reason = form.elements.reason;

            const problems = [];
            if (!name.value.trim()) { mark(name, true); problems.push('your name'); }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { mark(email, true); problems.push('a valid email address'); }
            if (reason.value.trim().length < 15) { mark(reason, true); problems.push('a sentence or two about your data'); }
            if (problems.length) {
                say('Please add ' + problems.join(', ').replace(/, ([^,]*)$/, ' and $1') + '.', 'error');
                form.querySelector('[aria-invalid="true"]').focus();
                return;
            }

            submit.disabled = true;
            say('Sending…');

            // the server limits requests per address, as it always has
            let ip = 'unknown';
            try {
                const r = await fetch('https://api.ipify.org?format=json');
                ip = (await r.json()).ip || 'unknown';
            } catch (err) { /* the request goes without it */ }

            const data = new FormData();
            data.append('name', name.value.trim());
            data.append('email', email.value.trim());
            data.append('reason', reason.value.trim());
            data.append('userIP', ip);

            try {
                const response = await fetch(ACCESS_URL, { method: 'POST', body: data });
                const text = (await response.text()).toLowerCase();
                if (text.includes('success')) {
                    say('Thanks, your request is in.', 'done');
                    form.reset();
                    window.setTimeout(() => { submit.disabled = false; }, 1500);
                    return;
                }
                const known = REASONS.find(([key]) => text.includes(key));
                say(known ? known[1] : 'Something went wrong. Please try again.', 'error');
            } catch (err) {
                say('The request didn’t go through. Check your connection and try again.', 'error');
            }
            submit.disabled = false;
        });

        accessDialog.addEventListener('close', () => { say(''); resetAccess(); });
    }

    // ---- copying the install commands ----
    document.querySelectorAll('[data-copy]').forEach((button) => {
        button.addEventListener('click', async () => {
            const text = button.dataset.copy;
            try {
                await navigator.clipboard.writeText(text);
                button.textContent = 'Copied';
            } catch (err) {
                const code = button.parentElement.querySelector('code');
                const range = document.createRange();
                range.selectNodeContents(code);
                const sel = window.getSelection();
                sel.removeAllRanges();
                sel.addRange(range);
                button.textContent = 'Selected';
            }
            window.setTimeout(() => { button.textContent = 'Copy'; }, 1600);
        });
    });
})();
