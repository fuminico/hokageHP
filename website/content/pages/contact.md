---
title: お問い合わせ
slug: contact
imagePosition: center 40%
---

お気軽にお問い合わせください。ご相談・お見積もりは無料です。

<form class="contact-form" id="contactForm">
  <div class="form-group">
    <label for="company">会社名・団体名</label>
    <input type="text" id="company" name="company" placeholder="例：株式会社〇〇">
  </div>

  <div class="form-group required">
    <label for="name">お名前 <span class="required-mark">*</span></label>
    <input type="text" id="name" name="name" required placeholder="例：山田 太郎">
  </div>

  <div class="form-group required">
    <label for="email">メールアドレス <span class="required-mark">*</span></label>
    <input type="email" id="email" name="email" required placeholder="例：example@example.com">
  </div>

  <div class="form-group required">
    <label for="email-confirm">メールアドレス確認 <span class="required-mark">*</span></label>
    <input type="email" id="email-confirm" name="email-confirm" required placeholder="もう一度メールアドレスを入力してください">
  </div>

  <div class="form-group required">
    <label for="phone">連絡先お電話番号 <span class="required-mark">*</span></label>
    <input type="tel" id="phone" name="phone" required placeholder="例：090-1234-5678">
  </div>

  <div class="form-group required">
    <label for="message">お問い合わせ内容 <span class="required-mark">*</span></label>
    <textarea id="message" name="message" rows="8" required placeholder="お問い合わせ内容をご記入ください"></textarea>
  </div>

  <div class="form-actions">
    <button type="submit" class="btn btn-primary btn-large">送信する</button>
  </div>
</form>

<script>
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const email = document.getElementById('email').value;
  const emailConfirm = document.getElementById('email-confirm').value;
  
  if (email !== emailConfirm) {
    alert('メールアドレスが一致しません。もう一度ご確認ください。');
    return;
  }
  
  // フォームデータの収集
  const formData = {
    company: document.getElementById('company').value,
    name: document.getElementById('name').value,
    email: email,
    phone: document.getElementById('phone').value,
    message: document.getElementById('message').value
  };
  
  // ここでフォームデータを送信する処理を実装
  // 現在は仮の処理として、コンソールに出力とアラート表示
  console.log('送信データ:', formData);
  alert('お問い合わせを受け付けました。\n担当者より折り返しご連絡させていただきます。');
  
  // フォームをリセット
  this.reset();
});
</script>
