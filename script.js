// BambooAI site: the menu, the hero's recipe, the screenshot lightbox, Launch App and its request form, the copy button.
// No dependencies. Everything on the page works without it except the dialogs.

// The access requests go to the same Google Apps Script as before; it answers in plain text
// ("success", or a reason such as "duplicate email").
const ACCESS_URL = 'https://script.google.com/macros/s/AKfycbzRf20J8lqnIpSdeEZ6HEumJYiV-AFwkZZmHk3mbjSAgu6V4awVPFATajAyNRiTuuK6/exec';

(function () {
    'use strict';

    const root = document.documentElement;

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

    // ---- the hero: the cited number's recipe, unfolded once, then opened and closed with its [cell 2] chip ----
    const record = document.querySelector('.record');
    if (record) {
        const cite = record.querySelector('.cite');
        const items = record.querySelectorAll('.recipe-head, .recipe-from, .trace li, .recipe-note, .record-replay');
        items.forEach((el, i) => el.style.setProperty('--i', String(i)));

        if (root.classList.contains('unfold')) {
            window.setTimeout(() => {
                record.classList.add('is-unfolding');
                window.setTimeout(() => {
                    root.classList.remove('unfold');
                    record.classList.remove('is-unfolding');
                }, items.length * 110 + 500);
            }, 450);
        }

        if (cite) {
            cite.addEventListener('click', () => {
                const open = cite.getAttribute('aria-expanded') !== 'true';
                cite.setAttribute('aria-expanded', String(open));
                record.classList.toggle('is-collapsed', !open);
            });
        }
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
