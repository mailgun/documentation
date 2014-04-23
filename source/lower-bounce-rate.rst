How to lower your bounce rate
=============================

Mailgun has thresholds in place that if exceeded will result in a domain being temporarily disabled. These limits are in place to **protect your email reputation** in case your system is compromised by a spammer or someone in your organization makes a large mistake.

If you do not have a good reputation tied to your domain and IP address, your email will not reach your recipients’ inboxes.

The number one reason we see people get blocked is because they have a **bad mailing list**. Most of these lists have bad email addresses and include spam traps. ESPs are good at recognizing bad mailing lists.

You can check your `logs`_ to see emails that are bouncing and check your `bounce list`_ for emails that we have stopped sending to as a result of bounces.

.. _logs: https://mailgun.com/cp/log?severity=error
.. _bounce list: https://mailgun.com/cp/bounces

Best practices for lowering bounce rates
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

1. If you think your application has been compromised, change your SMTP credentials or API key through the `Mailgun control panel`_
2. Clean your mailing list of invalid email addresses.
3. Only send emails to recipients that have signed up to receive them.
4. Verify the email address is correct with a confirmation email (aka, `confirmed opt-in`_).
5. We recommend using our `free email validator`_ at the point of signup to reduce invalid email addresses.
6. **Don’t** purchase your list or scrape websites for emails.

If your domain does get disabled, `contact support`_ after you have made the recommended changes above so we can re-enable your domain.

.. _Mailgun Control Panel: https://mailgun.com/cp
.. _confirmed opt-in: http://en.wikipedia.org/wiki/Opt-in_email
.. _free email validator: http://documentation.mailgun.com/api-email-validation.html
.. _contact support: https://mailgun.com/cp/support

