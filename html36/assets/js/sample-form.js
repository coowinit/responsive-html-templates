/* Demo only: validate locally and show a message. Never claim an actual email was sent. */
(() => {
  document.querySelectorAll('[data-s36-form]').forEach((form) => {
    const status = form.querySelector('[data-s36-status]');
    const controls = [...form.querySelectorAll('input, textarea')];
    controls.forEach((control) => {
      control.addEventListener('input', () => {
        if (control.getAttribute('aria-invalid') === 'true' && control.checkValidity()) {
          control.removeAttribute('aria-invalid');
        }
      });
    });
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      let firstInvalid = null;
      controls.forEach((control) => {
        const invalid = !control.checkValidity();
        if (invalid && !firstInvalid) firstInvalid = control;
        if (invalid) control.setAttribute('aria-invalid', 'true');
        else control.removeAttribute('aria-invalid');
      });
      if (firstInvalid) {
        status.dataset.state = 'error';
        status.textContent = '请检查必填项及邮箱格式。';
        firstInvalid.focus();
        return;
      }
      status.dataset.state = 'success';
      status.textContent = '演示验证通过：此页面不会实际发送邮件或保存信息。';
    });
  });
})();
