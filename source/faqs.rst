.. _faqs:

FAQ
=============

.. contents::
    :local:
    :backlinks: none

Getting Started / Settings
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Why not just use Sendmail + Postfix + Courier IMAP?
**************************************************************************************************************

You can but you should be aware that there is a constant battle raging between good and evil (i.e., spam) in the email universe.  In order to be on the 'good' side of that battle and get your email delivered, there are numerous things you need to do.  You need to have the right authentication infrastructure and register your IP and Domain appropriately.  Also, you need to have a history of email sending that complies with ESPs rules in order to build a good reputation.

Moreover, if you are going to receive, store and host emails, you better be prepared for maintaining this orchestra of software,
take care of backups, hardware failures, security patches and monitoring. Stop kidding yourself, it's not 1998 anymore. :-)

Here's a classic post, `So You'd Like to Send Some Email (Through Code)`_, from Jeff Atwood about all of the hurdles in order to properly send email, and that's just sending.

.. _So You'd Like to Send Some Email (Through Code): http://blog.codinghorror.com/so-youd-like-to-send-some-email-through-code/

What are the differences between free and paid accounts?
**************************************************************************************************************

First of all, for both free and paid accounts, you get 10,000 free messages per month. However, there are some limitations if you don't provide payment information:

* You will not be able to send more than 10,000 messages per month
* Data retention for logs and the :ref:`Events API <api-events>` is 2 days.
* The limit for number of domains is 5.

If you do provide payment information:

* There is no limit on the number of emails sent or received.
* Data retention for Logs and the :ref:`Events API <api-events>` is 30 days.
* You can create up to 1,000 domains.

If these limits are not enough for you, or if you need to talk to us about a custom contract, you can reach us at sales@mailgun.com.

You can find a full list of features on our `pricing page`_.

.. _pricing page: http://mailgun.com/pricing

Can I get multiple Domains and IP Addresses?
**************************************************************************************************************

By default we give you one shared IP address. If you would like a dedicated IP address, simply click on the "Add Dedicated IP" button in the **IP Management** section of the Control Panel. You will need to add a credit card to your account first, though, if you have not already done so. If you want multiple IPs, you can `contact our Support Team <https://app.mailgun.com/app/support>`_.

You can create multiple domains in the Control Panel or through the :ref:`Domains API <api-domains>`(limit of 5 for free accounts and 1,000 for paid accounts).

Do I need a dedicated IP address?
**************************************************************************************************************

It depends on various factors.

If you are sending a lot of email (greater than 50k per week), it is a good idea to have a dedicated IP in order to isolate your reputation.  If you are sharing your IP, you are sharing your reputation with those other senders.  In addition, ESPs limit the total volume per IP, per hour.  If you are a high volume sender you should consider a pool of IPs.  However, you will have trouble establishing your reputation if you are not sending enough volume consistently from an IP - in this case, a shared IP is preferred.

If your email sending is volatile with large spikes of volume, ESPs may assume those large spikes are spam.  Also, if your overall volume is too low, they won't acknowledge your reputation.  Generally, if you are sending less than 5,000 emails per day, a shared IP may be the right solution.

The other thing to consider is using separate IPs for your bulk and transactional mail.  There are a couple reasons for this:

- Delivery of time-sensitive transactional emails may get queued behind a large batch of bulk/marketing emails.
- Your transactional mail will be affected by the reputation created by your bulk/marketing mail.

Mailgun's infrastructure mitigates some of the arguments for a dedicated IP address.  First of all, we are constantly monitoring our shared IP addresses for any reputation issues.  We also allow you to schedule delivery of your emails by using the ``o:deliverytime`` parameter.  This allows you to delay the delivery by using a time in the future and also allows you to jump other messages in your queue (say from a large bulk mailing) by using a delivery time of now.

How do I pick a domain name for my Mailgun account?
**************************************************************************************************************

The name of an email domain matters most for receiving messages:
If your domain name is ``mycompany.com`` it means you can receive messages sent
to ``xxx@mycompany.com``

Domain names do not matter as much if you're only sending. You can send messages
from ``sales@mycompany.com`` even if your domain name is called
``anothercompany.org``.  Although, it is best for deliverability if you are
using the same domain in the From field that the actual sender is using.

There are two types of domains you can configure with Mailgun:

* A sandbox subdomain of mailgun.org. Example: ``sandboxXX.mailgun.org``. This option allows for quick testing, without having to setup DNS entries. This domain is provisioned automatically with every new account. But you can send only to `authorized recipients <https://help.mailgun.com/hc/en-us/articles/217531258>`_.
* Your own domain like ``mycompany.com``.  This requires you to configure some records at your DNS provider. We provide you with those records and instructions in your Control Panel.

If your company's primary domain is ``mycompany.com``, we recommend the
following domain names for mailgun:

  - ``mycompany.com``, unless you're already using this name for your corporate
    email;
  - ``m.mycompany.com`` or ``mail.mycompany.com``;
  - ``mycompany.net`` or ``mycompany.org``.

Sometimes, it is a good idea to separate the domains for the type of messages
you are sending. For example, some companies will use a different domains or
subdomains for bulk marketing mailings and transactional or corporate mail in
order to keep the reputations separate.

Finally, if you want multiple addresses and you want to direct certain emails
to certain IP addresses, you will need to have a unique domain or subdomain for
each IP address.  In this situation, it's best to
`contact our Support Team <https://app.mailgun.com/app/support>`_ to discuss your
infrastructure.

Can I use the same domain name for Mailgun and for Google Apps (or another email server)?
**************************************************************************************************************

Yes, for sending. No, for receiving.  Only one email server can receive messages for a given domain name. It could be either
Mailgun or Google servers, but not both.  However, you can use the same domain for sending at multiple
servers.  If you'd like to register your Domain at multiple servers for sending but you don't
want to receive email at Mailgun, just don't configure your MX records to point to Mailgun.

If you are receiving emails elsewhere with your domain, we recommend using a subdomain at Mailgun so you can also receive emails at Mailgun. This helps improve deliverability and allows us to more easily deal with any issues that arise with recipient email servers.

Can I rename a domain?
**************************************************************************************************************

No, you need to create a new one and delete the old one.  It's a good idea to create the new one first.

What if I need multiple SPF records?
**************************************************************************************************************

If you are using multiple email servers and you want an SPF record for each of them, you should NOT set up a separate TXT record for each.  You need to include the different servers in the same record.  Below is sample syntax:

'v=spf1 include:myemailserver.com include:mailgun.org ~all'

How do I know if my DNS records are set up correctly
**************************************************************************************************************

We have a "Check DNS Records Now" button when you click on a domain in the ``Domains`` tab that will confirm that they are set up correctly and, if not, show the incorrect records in red.

You could also use `dig`_ in your command line interface.

.. _dig: http://en.wikipedia.org/wiki/Domain_Information_Groper

Do you support SSL/TLS?
**************************************************************************************************************

Only TLS is supported. Support for SSL has been dropped due to the `POODLE security vulnerability`_.

.. _POODLE security vulnerability: http://status.mailgun.com/incidents/9g4kmgh00y5x

Ok, everything is set up, how do I start using Mailgun?
**************************************************************************************************************

Mailgun is primarily a developer's tool so the best way use Mailgun is through our APIs.  They are quite `RESTful`_ and we've tried to make them as intuitive as possible.  Our `Quickstart Guide`_ is a good place to start and you can also use the `API Reference`_ for more detail.  We also expose a lot of the features through the Control Panel.  The `User Manual`_ is a good place to get a full overview of all of the capabilities of Mailgun.

.. _RESTful: http://en.wikipedia.org/wiki/REST
.. _Quickstart Guide: http://documentation.mailgun.com/quickstart.html
.. _API Reference: http://documentation.mailgun.com/api_reference.html
.. _User Manual: http://documentation.mailgun.com/user_manual.html


Sending
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Should I use SMTP or the HTTP API?
**************************************************************************************************************

It's really up to you. Whatever you find easier is fine with us.  The HTTP API has some advantages, however.  First of all, it's faster.  Second, we think it's easier to use - you don't have to deal with MIME because we will assemble it on our side.  Just use a request library available for your language of choice.

Email clients say "sent via mailgun.us" with messages I send.  How do I get rid of this?
**************************************************************************************************************

Check the following:

* You have a custom domain defined in the ``Domains`` tab of the Control Panel.
* You've setup the DKIM DNS record (provided in the Control Panel, ``Domains`` tab).
* You're authenticating (SMTP) or posting (API) against the custom domain. (e.g. https://api.mailgun.net/v3/youcustomdomain.com/messages)

If you're still seeing "via mailgun.org", please `contact our Support Team <https://app.mailgun.com/app/support>`_ and we'll investigate.

What is the difference between the "From" and "Sender"
**************************************************************************************************************

Each message you send out has both the sender and from address. Simply put, the sender domain
is what the receiving email server sees when initiating the session, and the from address is what your
recipients will see. For better deliverability it is recommended to use the same from
domain as the sender, but it is not required.

You can technically set the from field to be whatever you like.  The sender must always be one of your Mailgun domains.

Where do I specify BCC recipients?
**************************************************************************************************************

BCC functionality works like this: specify a BCC recipient in the recipients list when sending,
but do not include their address in the "To" or "CC" fields.  You could also use the API, which has a
specific BCC parameter.

How do I send the same message to multiple users using Mailgun?
**************************************************************************************************************

Mailgun supports the ability send to a group of recipients through a single API call or SMTP session. This is achieved by either:

* Using Batch Sending by specifying multiple recipient email addresses as to parameters and using Recipient Variables.
* Using Mailing Lists with Template Variables.

See the :ref:`batch-sending` section of the :ref:`user-manual` for more information.

I am getting timeouts when connecting via SMTP. Why?
**************************************************************************************************************

Most often, this is caused by internet service providers ("ISP") blocking port #25. This tends to happen if you are
using a residential ISP.

To check this, try running telnet in command line::

    telnet smtp.mailgun.org 25

If port 25 is not blocked, you should see something like this::

    Trying 174.37.214.195...
    Connected to mxa.mailgun.org.
    Escape character is '^]'.
    220 mxa.mailgun.org (Mailgun)

If you don't see this, then you are being blocked.  There are a couple workarounds:
  * Send using our HTTP API
  * Try using port #587 or #2525

I have multiple domains at Mailgun.  How do I tell Mailgun which domain to send mail from?
**************************************************************************************************************

For SMTP, you have an SMTP username and password for each domain you have registered at Mailgun.
To send mail from a particular domain, just use the appropriate credentials.  For the API, the domain is one
of the parameters in the URI.

I just submitted a lot of messages. Why is delivery happening so slowly?
**************************************************************************************************************

There are many factors that can affect the speed of delivery.
1. Your established reputation for the domain and IPs on your account.
2. The total number of IPs allocated to your account.
3. The content quality for the emails being sent.

For newly allocated IPs, Mailgun protects and improves the reputation by gradually increasing sending rates. This means, as time passes, with high quality traffic, being sent from your IPs, your sending rates will increase automatically. If you're seeing slow delivery, please contact us... We'll evaluate your account configuration to ensure it is configured for handling the volume you require.

Deliverability / Reputation
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If I'm just starting to send mail, how do I build a good reputation?
**************************************************************************************************************

The way to think about your email reputation is much like your credit score.  When you haven't sent any email, you don't have a bad reputation but you don't have a good one, either.  Also, no ESP is going to allow you to send a million emails to their mailboxes, much like no one is going to give you a credit card with a huge credit limit when you graduate from college.  There needs to be a history of performance for you to create a reputation.  We use algorithms for our new senders that automatically queues your email and sends them at rates that makes the ESPs happy, increasing those rates as your sending reputation grows.

Some of the factors that help you build a good reputation faster and increase deliverability are:

- Limited spam complaints and bounces.
- Including the ability for recipients to unsubscribe.
- Recipients interacting with your emails in a good way: reading, replying, forwarding and adding your addresses to their contacts.
- Following ESPs' guidelines on sending rates.
- Paying attention to ESPs' feedback to slow or stop sending for a period of time.
- Having good content (see below for more guidance on content).

Also, consider letting your users to reply to your emails. Having a meaningful email conversations with your audience will do wonders for your reputation as a member of email community.

Finally, there are certification and white label services that can help (although, you still need some history of sending).  We have a partnership with `Return Path`_ and can help get you signed up for their `Email Certification Program`_.  They have already audited our infrastructure so we can get you a discount off of their list pricing.

.. _Email Certification Program: http://www.returnpath.com/solution-content/certification/

Does the content of my email matter for deliverability?
**************************************************************************************************************

Absolutely.  Ideally, you send email that people want.  That's over half the battle.  In addition, you should make your
content interesting and relevant to the recipient.

There are a few things to keep in mind about your email content. First, we suggest setting up a test mailbox at http://www.mail-tester.com. Mail-Tester will provide you with a full analysis of your email for free. Here are some other things to consider:

- Personalize your emails.  Make sure to include the recipient's address in the "To:" field and include his/her name in the greeting.
- It is best to send multi-part emails using both text and HTML or text only. Sending HTML only email is not well received by ESPs. Also, remember that ESPs generally block images by default so HTML only will not look very good unless users are proactive about enabling images.
- Test how your html email looks across all email clients and browsers. Litmus_ and `Return Path`_ have tools to do this.
- Make your content relevant and targeted to the recipient. There are even tools like `Movable Ink`_ that let you dynamically update your content after it is delivered.
- The higher the text to link and text to image ratios, the better. Too many links and images trigger spam flags at ESPs.
- Misspellings, spammy words (buy now!, Free!) are big spam flags, as are ALL CAPS AND EXCLAMATION MARKS!!!!!!!!!!!!!
- The from field in your emails should match the domain you are sending from. Hotmail is particularly focused on this.
- Make sure you are using unsubscribe links and headers in your emails. Many ESPs (particularly Hotmail) pay attention to this and if they are not there, you are likely to get filtered. You can always use Mailgun’s auto unsubscribe handling if you don’t want to deal with this on your end.
- Include your physical mailing address.  CAN-SPAM requires an unsubscribe link and a physical mailing list.  It is also a good idea to provide a link to your privacy policy.
- Gmail pays particularly close attention to Message ID and Received headers. Message IDs that are formed incorrectly (without brackets <> and with wrong domain after @) can make Gmail think you are a spammer. The simplest way to create the right Message ID is to not set Message ID at all. Then Mailgun will create a perfect Message ID for you. Also, if you use the HTTP API, Mailgun will deal with all of this for you.
- Links should include the domain that is sending the email. Also, popular url shorteners can be a bad idea because they are frequently used by spammers.
- Long links may cause bounces.  Some ESPs will block emails with links (or any consecutive text) longer than 99 characters.
- A/B test your emails to optimize recipient engagement. Subject lines are particularly important. You can use Mailgun’s tagging and tracking statistics in order to measure A/B testing and improve your content.

.. _Movable Ink: http://movableink.com/
.. _Litmus: http://litmus.com/
.. _Return Path: http://www.returnpath.com

Should I use my primary corporate domain name to send email?
**************************************************************************************************************

You can, but remember that your reputation is tied to your domain name as well as the IP address.  If you are in danger of being classified as a 'bad' sender of email, you will be affecting your domain reputation, which is very hard to recover from. It may be safer to use a completely separate domain (not a subdomain of your primary corporate domain) for sending marketing or even transactional email if you are worried about issues with domain reputation.

Why does the amount of email I send matter?
**************************************************************************************************************

Rate limiting allows ESPs proper time to process and filter spam and ensure that transactional email doesn't get backed up. Without rate limiting in place, ESPs would be even more overwhelmed than they already are. The ESPs all have different sending limits on a per hour, per day basis. Once you hit thresholds with the rate limits, send too much spam, or have any number of other issues, the ISP may start returning error messages. Some ESPs will want you to slow down the sending, stop sending for a period of time, or change your habits (due to bad engagement, bad reputation, etc). We automatically adjust your sending rates according to the feedback from these ESPs to keep you in their good graces.

Generally, these rate limits are on a per IP address basis.  `Contact our Support Team <https://app.mailgun.com/app/support>`_ if you wish to purchase additional dedicated
IP addresses for your account.

Does the amount of email I send from my IP affect my deliverability?
**************************************************************************************************************

Yes. Generally speaking, you don't want too few IPs, in case you experience more volume than you expect and you don't want so many IPs that you look suspicious or spread out your volume over too many IPs. There has to be a balance of volume to IP/domain. Sending too much volume from an IP, sending from too many IPs or sending too little from a range of IPs can all lead to deliverability issues.

Where can I learn more about Deliverability and Email?
**************************************************************************************************************

One of the best resources is the blog `Word to the Wise`_.  Also, `Return Path`_ is a service that enhances deliverability and they publish a lot of great information through their blog and white papers.  Below is are some best practices from the major ESPs.

- `AOL Best Practices`_
- `Gmail Best Practices`_
- `Hotmail Best Practices`_
- `Yahoo Best Practices`_

.. _Word to the Wise: http://blog.wordtothewise.com/
.. _AOL Best Practices: https://postmaster.aol.com/best-practices
.. _Yahoo Best Practices: https://help.yahoo.com/kb/postmaster/practices-senders-sln3435.html
.. _Hotmail Best Practices: http://mail.live.com/mail/policies.aspx
.. _Gmail Best Practices: https://support.google.com/mail/answer/81126?hl=en

Receiving
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Do you provide spam filtering for incoming mail?
**************************************************************************************************************

Yes. Click on your domain in the `Control Panel <https://app.mailgun.com/app/domains>`_ and enable
our spam filtering service.

.. _Log In: https://app.mailgun.com/sessions/new

How do you handle quotations from replies and signatures when receiving mail?
**************************************************************************************************************

We parse them and provide parameters for you to handle them as you wish.  Please take a look at our :ref:`user-manual`
or :ref:`api-reference` to see more details on the parameters we provide.

Why am I not receiving an email when sending via the route with the sending address as a destination?
**************************************************************************************************************

You're most likely using GMail for sending your message. From GMail's
documentation (https://support.google.com/mail/troubleshooter/2935079?rd=1):

Finally, if you're sending mail to a mailing list that you subscribe to, those
messages will only appear in 'Sent Mail.' This behavior also occurs when sending to
an email address that automatically forwards mail back to your Gmail address.
To test forwarding addresses or mailing lists, use a different email address to
send your message.

When a message from, say, ``bob@gmail.com`` goes through a
route::

    test@mailgun-domain.com -> bob@gmail.com

When this message arrives to GMail, it will have ``bob@gmail.com``
as both sender and recipient, therefore GMail will not show it.

In other words GMail does not show you messages you sent to yourself.

The other possibility is that the address had previously experienced a Hard
Bounce and is on the 'do not send' list.  Check the ``Suppressions`` tab of your
Control Panel for a list of these addresses and remove the address in question if
it is there.

How do I know if HTTP POST callbacks are coming from Mailgun, and not forged?
**************************************************************************************************************

Mailgun allows you to check the authenticity of its requests by providing three
additional parameters in every HTTP POST request it makes. Please take a look
at our `webhooks documentation`_ for more information.

.. _webhooks documentation: http://documentation.mailgun.com/user_manual.html#events-webhooks

How do I know if the sender of an email is spoofed?
**************************************************************************************************************

There is no 100% guarantee. However, there are some good clues. Mailgun provides
DKIM and SPF verification for incoming mail, which is shown in the MIME headers
once spam filtering is enabled in the `Control Panel`_. This way you can at least
know if the message is coming from an authenticated server.

Can I use Mailgun for my personal email address?
**************************************************************************************************************

It's not recommended. Honestly, there are plenty of hosted email services better suited for this than Mailgun: Gmail, Google Apps, Outlook, etc. Mailgun is meant to be a tool for developers and their applications.

Tracking
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Can I use Mailgun to track what happens with my emails?
**************************************************************************************************************

Yep, Mailgun tracks all of the typical events that occur with emails: Opens, Link Clicks, Bounces, Unsubscribes and
Spam Complaints.  We make that data available to you via the Control Panel or through the API.  In addition, you can
set up webhooks and we will post events to your URL. Take a look at our `tracking documentation`_ for more information.

.. _tracking documentation: http://documentation.mailgun.com/user_manual.html#tracking-messages

What about Email List Management?
**************************************************************************************************************

Mailgun does have features to help you with list management.  First of all, we will not deliver again to recipients that
have hard bounced, unsubscribed, or complained of spam.  This is to maintain your email reputation.  You can remove emails from these
do not send lists if it was a temporary issue.  You can always access this information via the API or Control Panel to update
your lists.

What is the difference between hard and soft bounces and how do you handle them?
**************************************************************************************************************

You can think of hard bounces like permanent errors and soft bounces as temporary errors.  We will stop attempting delivery after one hard bounce.  With soft bounces, we keep trying to deliver but eventually we will stop trying to delivery in accordance with the receiving ESP's feedback.

Do I control the unsubscribe handling or do you?
**************************************************************************************************************

It's up to you.  You can use Mailgun's unsubscribe handling.  You can include our unsubscribe variables: ``%unsubscribe_url%`` (for the entire domain) and ``%tag_unsubscribe_url%`` (for just emails with this tag) and we will take care of the unsubscribe handling for you.  Take a look at our `unsubscribe documentation`_ for more information.

.. _unsubscribe documentation: http://documentation.mailgun.com/user_manual.html#unsubscribes

How do I create Campaigns in Mailgun?
**************************************************************************************************************

It's very simple, just tag your emails with the appropriate ``o:tag`` parameter and Mailgun will group all of the events that occur to emails with that tag. Our analytics reports include those tags as one of the dimensions by which you can view and filter data.  You can have multiple tags per email and up to 4,000 total tags.  Take a look at our `tagging documentation`_ for more information.

.. _tagging documentation: http://documentation.mailgun.com/user_manual.html#tagging

Do you support A/B testing?
**************************************************************************************************************

Since creating a campaign is as easy as including an arbitrary tag, yes.  You can easily view which campaign is performing best by viewing the data grouped by tag in the ``Analytics`` tab of the Mailgun control panel.

How do I track which email a recipient has replied to?
**************************************************************************************************************

This has been a popular question, so we wrote a `blog post`_ about it.  Basically, the Message-ID in the original email is included in the In-Reply-To header in the reply email.  So you can use that to track which specific email was replied to.  Mailgun will automatically include a unique Message-ID or you can set your own.

.. _blog post: http://blog.mailgun.com/tracking-replies-in-mailgun-or-any-other-email/
