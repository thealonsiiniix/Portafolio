

document.addEventListener('DOMContentLoaded', () => {
  initYear();
  initMobileNav();
  initContactForm();
});

function initYear() {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initMobileNav() {
  const toggle = document.getElementById('navToggle');
  const nav = document.getElementById('siteNav');
  if (!toggle || !nav) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const fields = {
    name: {
      input: document.getElementById('name'),
      error: document.getElementById('nameError'),
      validate: (value) => {
        if (!value.trim()) return 'Cuéntame cómo te llamas.';
        if (value.trim().length < 2) return 'El nombre es muy corto.';
        return '';
      },
    },
    email: {
      input: document.getElementById('email'),
      error: document.getElementById('emailError'),
      validate: (value) => {
        if (!value.trim()) return 'Necesito un correo para responderte.';
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim())) return 'Ese correo no parece válido.';
        return '';
      },
    },
    message: {
      input: document.getElementById('message'),
      error: document.getElementById('messageError'),
      validate: (value) => {
        if (!value.trim()) return 'Escribe un mensaje antes de enviar.';
        if (value.trim().length < 10) return 'Cuéntame un poco más (mínimo 10 caracteres).';
        return '';
      },
    },
  };

  const status = document.getElementById('formStatus');

  Object.values(fields).forEach(({ input, error, validate }) => {
    input.addEventListener('blur', () => {
      showFieldError(input, error, validate(input.value));
    });
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('has-error')) {
        showFieldError(input, error, validate(input.value));
      }
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    let firstInvalid = null;
    let hasErrors = false;

    Object.values(fields).forEach(({ input, error, validate }) => {
      const message = validate(input.value);
      showFieldError(input, error, message);
      if (message && !firstInvalid) firstInvalid = input;
      if (message) hasErrors = true;
    });

    if (hasErrors) {
      status.textContent = 'Revisa los campos marcados antes de enviar.';
      firstInvalid.focus();
      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    status.textContent = 'Enviando mensaje…';

    fetch(form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/'), {
      method: 'POST',
      headers: { 'Accept': 'application/json' },
      body: new FormData(form),
    })
      .then((response) => {
        if (!response.ok) throw new Error('Respuesta no válida del servidor');
        status.textContent = `Gracias, ${fields.name.input.value.trim()}. Tu mensaje fue enviado.`;
        form.reset();
        Object.values(fields).forEach(({ input, error }) => showFieldError(input, error, ''));
      })
      .catch(() => {
        status.textContent = 'No se pudo enviar el mensaje. Intenta de nuevo más tarde o escríbeme directo a alonctras01@gmail.com.';
      })
      .finally(() => {
        submitButton.disabled = false;
      });
  });
}

function showFieldError(input, errorEl, message) {
  const field = input.closest('.field');
  errorEl.textContent = message;
  field.classList.toggle('has-error', Boolean(message));
  input.setAttribute('aria-invalid', message ? 'true' : 'false');
}
