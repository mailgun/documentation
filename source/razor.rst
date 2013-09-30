.. _razor:

Razor Error Codes
####################

Razor is Mailgun's reputation system for detecting spammers and phishers as well as improving deliverability for legitimate customers. Razor uses a host of signals to algorithmically detect messages that either look like spam or have been marked as spam, and shut them down. If your account has been shutdown by Razor, the below table will explain why Razor has shut your account down and the steps you can take to reactive your account.

If you believe Razor has deactivated your account in error, please contact `Mailgun Support`_ and reference the Razor error code you received to speed up account reactivation.

.. _Mailgun Support: https://mailgun.com/support

========= ===========================================================
Code      Reason
========= ===========================================================
rzr01     Your domain has been disabled in order to protect your
          email reputation. Mailgun has detected content that is
          labeled as spam or a large amount of incorrect email
          addresses and/or spam complaints. These issues will cause
          poor deliverability of your emails and need to be resolved
          before we can enable your account. 
rzr02     No longer in use.
rzr03     Suspicious activity has been detected on your account.
          Business verification is required.
rzr04     Suspicious activity has been reported on your account.
          Business verification is required.
========= ===========================================================
