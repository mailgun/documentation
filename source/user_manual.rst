.. _user-manual:

User Manual
###########

Introduction
************

This document is meant to be an overview of all of the capabilities of
Mailgun and how you can best leverage those capabilities.  It is
organized around the four major features that Mailgun provides:

- `Sending Messages`_
- `Tracking Messages`_
- `Receiving, Forwarding and Storing Messages`_
- `Email Verification`_
- `Inbox Placement`_

At the heart of Mailgun is the API.  Most of the Mailgun service can be
accessed through the RESTful HTTP API without the need to install any
libraries. However, we have written :ref:`libraries` for many popular languages.
Be sure to check out the additional capabilities provided by using our libraries.

You can also access many Mailgun features through your Mailgun Control
Panel using your browser and logging in at https://app.mailgun.com/app/dashboard.

In addition to the API, Mailgun supports the standard SMTP protocol.  We have included some :ref:`instructions <smtp>` on how to use Mailgun, via SMTP, at the end of the User Manual.

If you are anxious to get started right away, feel free to check
out the :ref:`quickstart` or :ref:`api-reference`.  There are
also :ref:`faqs` and :ref:`best-practices` that you can reference.

Finally, always feel free to `contact our Support Team <https://app.mailgun.com/app/support>`_.

Getting Started
***************

.. _verifying-your-domain:

Verifying Your Domain
=====================

Each new Mailgun account is automatically provisioned with a **sandbox domain**
``sandbox<uniq-alpha-numeric-string>@mailgun.org``. This domain is to be used
for **testing only**. It allows both sending and receiving messages; and also
tracking can be enabled for it. But it only allows sending to a list of up to 5
`authorized recipients <https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients>`_.
This limitation is also in effect for routes that are triggered by messages
addressed to the sandbox domain and mailing lists created under that domain.

To be able to use Mailgun in production a custom domain(s) has to be created
and verified with Mailgun.

Verifying your domain is easy. Start by adding a domain or subdomain you own in
the ``Domains`` tab of the Mailgun control panel. Next, add the two **TXT** DNS
records found in the **Domain Verification & DNS** section of the domain
settings page of the Mailgun control panel to your DNS provider:

- SPF: Sending server IP validation. Used by majority of email service
  providers. `Learn about SPF <http://www.open-spf.org/Introduction>`_.
- DKIM: Like SPF, but uses cryptographic methods for validation. Supported
  by many email service providers. This is the record that Mailgun references
  make sure that the domain actually belongs to you.
  `Learn about DKIM <http://www.dkim.org/#introduction>`_

Once you've added the two **TXT** records and they've propagated, your domain
will be verified. In the Mailgun control panel verified domains are marked by a
green ``Verified`` badge next to their name.

If it has been awhile since you have configured the DNS records but the domain
is still reported as ``Unverified``, then try pressing the **Check DNS Records Now**
button on the domain information page. If that does not help either, then
please create a support ticket.

**Other DNS records**

- **CNAME** DNS record with value `mailgun.org`, should be added if you want
  Mailgun to track **clicks**, **opens**, and **unsubscribes**.

- **MX** DNS records are required if you want Mailgun to receive and route/store
  messages addressed to the domain recipients. You need to configure 2 **MX**
  records with values ``10 mxa.mailgun.org`` and ``10 mxb.mailgun.org``. We
  recommend adding them even if you do not plan the domain to get inbound
  messages, because having **MX** DNS records configured may improve
  deliverability of messages sent from the domain.
  `Learn about MX DNS records <http://en.wikipedia.org/wiki/MX_record>`_

.. warning:: Do not configure **MX** DNS records if you already have another
             provider handling inbound mail delivery for the domain.

**DNS Records Summary**

========= ========= =========================== =============================================
Type      Required  Purpose                     Value
========= ========= =========================== =============================================
TXT       Yes       Domain verification (SPF)   ``v=spf1 include:mailgun.org ~all``
TXT       Yes       Domain verification (DKIM)  *Find this record in "Domain Verification & DNS" section of the settings page for a particular domain in the Mailgun control panel.*
CNAME               Enables tracking            ``mailgun.org``
MX                  Enables receiving           ``10 mxa.mailgun.org``
MX                  Enables receiving           ``10 mxb.mailgun.org``
========= ========= =========================== =============================================

**Common DNS Provider Documentation**

Common providers are listed below. If yours is not listed, contact your DNS
provider for assistance:

- GoDaddy: `MX <https://www.godaddy.com/help/add-an-mx-record-19234>`_ - `CNAME <https://www.godaddy.com/help/add-a-cname-record-19236>`_ - `TXT <https://www.godaddy.com/help/add-a-txt-record-19232>`_
- NameCheap: `All Records <https://www.namecheap.com/support/knowledgebase/subcategory.aspx/10/dns-questions>`_
- Network Solutions: `MX <http://www.networksolutions.com/support/mx-records-mail-servers-2/>`_ - `CNAME <http://www.networksolutions.com/support/cname-records-host-aliases-2/>`__ - `TXT <http://www.networksolutions.com/support/how-to-manage-advanced-dns-records/>`_
- Rackspace Email & Apps: `All Records <http://www.rackspace.com/apps/support/portal/1172>`_
- Rackspace Cloud DNS: `Developer Guide <http://www.rackspace.com/knowledge_center/article/rackspace-cloud-dns>`_
- Amazon Route 53: `Developer Guide <http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/R53Console.html>`_

Managing User Roles
===================

**How to Manage**

Role-based access control sets all current users to Admin-level users by default. To assign different roles
to your account’s users, please visit the Account section of the control panel. There, you can choose the
appropriate permissions level for each user. And when it’s time to add new users to your account, you’ll be
able to easily select a role upon user creation.

**Roles**

+------------+-----------------------------------------------------------------------------------------------------------+
| Role       |  Description                                                                                              |
+============+===========================================================================================================+
| Analyst    | Analyst users are very limited. They have access to read most data, but can only modify their own         |
|            | settings.                                                                                                 |
+------------+-----------------------------------------------------------------------------------------------------------+
| Billing    | Billing users are focused on billing actions. Most of their access will be read only, billing is the only |
|            | non-admin users who have access to:                                                                       |
|            |                                                                                                           |
|            | * Account Upgrade                                                                                         |
|            | * Editing Credit card on File                                                                             |
|            | * Setting/Clearing Custom Send Limits                                                                     |
|            | * Setting/Clearing Custom Verification Limits                                                             |
+------------+-----------------------------------------------------------------------------------------------------------+
| Support    | Support users are restricted in what they can edit. In addition to being able to read most data, they     |
|            | will be able to:                                                                                          |
|            |                                                                                                           |
|            | * Edit suppressions                                                                                       |
|            | * Edit mailing lists and members                                                                          |
|            | * Edit authorized recipients                                                                              |
|            | * Open and comment on support tickets                                                                     |
+------------+-----------------------------------------------------------------------------------------------------------+
| Developer  | Developer users are highly trusted. This role can read and write almost all data. This includes           |
|            | everything support has, plus can:                                                                         |
|            |                                                                                                           |
|            | * Edit webhooks                                                                                           |
|            | * Edit routes                                                                                             |
|            | * Edit domain settings                                                                                    |
|            | * View API Keys and SMTP passwords                                                                        |
|            |                                                                                                           |
|            | .. warning:: This role has access to read API Keys and SMTP credentials. This data is highly sensitive.   |
+------------+-----------------------------------------------------------------------------------------------------------+
| Admin      | Admin users have read and write access to everything. Only admins on the account can:                     |
|            |                                                                                                           |
|            | * Rotate and expire API Keys                                                                              |
|            | * Create and revoke SMTP credentials                                                                      |
|            | * Create and administer control panel users                                                               |
|            | * Edit account details                                                                                    |
|            |                                                                                                           |
|            | .. note:: The account owner will always be an admin user.                                                 |
|            | .. warning:: This role has access to change API Keys and SMTP credentials. This data is highly sensitive. |
+------------+-----------------------------------------------------------------------------------------------------------+


.. _um-sending-messages:

Sending Messages
****************

There are two ways to send messages using Mailgun:

- HTTP API
- SMTP

Both methods work great and support the same feature set,  so choose one
based on your preferences and requirements.

Sending via API
===============

When sending via HTTP API, Mailgun offers two options:

- You can send emails in MIME_ format, but this would require you to use a MIME building
  library for your programming language.
- You can submit the individual parts of your messages to Mailgun, such as text
  and html parts, attachments, and so on. This doesn't require any MIME knowledge on your part.

.. note:: - Mailgun supports maximum messages size of 25MB.
          - HTTP send will error with "parameter is not a valid address" if the provided email address
            fails syntax checks in accordance with RFC5321, RFC5322, RFC6854.

See :ref:`sending messages <api-sending-messages>` section in our API Reference for a full
list of message sending options.

.. _MIME: http://en.wikipedia.org/wiki/MIME

Examples: sending messages via HTTP
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Sending mails using Mailgun API is extremely simple: as simple as performing an
HTTP POST request to an API URL.

Sending a plain text message:

.. include:: samples/send-simple-message.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Queued. Thank you.",
   "id": "<20111114174239.25659.5817@samples.mailgun.org>"
 }

Sending a message with HTML and text parts. This example also attaches two files to the message:

.. include:: samples/send-complex-message.rst

Sending a MIME message which you pre-build yourself using a MIME library of your choice:

.. include:: samples/send-mime-message.rst

An example of how to toggle tracking on a per-message basis. Note the ``o:tracking`` option. This will disable link rewriting for this message:

.. include:: samples/send-message-no-tracking.rst

An example of how to set message delivery time using the ``o:deliverytime`` option:

.. include:: samples/send-scheduled-message.rst

An example of how to tag a message with the ``o:tag`` option:

.. include:: samples/send-tagged-message.rst

An example of how to send a message with custom connection settings:

.. include:: samples/send-connection.rst

.. _inline-image:

Sending Inline Images
~~~~~~~~~~~~~~~~~~~~~

Mailgun assigns content-id to each image passed via ``inline`` API parameter, so
it can be referenced in HTML part.

Example of sending inline image. Note how image is referenced in HTML part simply by the filename:

.. include:: samples/send-inline-image.rst

Sending via SMTP
================

Mailgun supports sending via SMTP. Our servers listen on ports ``25``, ``465``, ``587``, and ``2525``. Port 465 requires a TLS connection. Ports ``25``, ``587``, and ``2525`` require a non-TLS connection but may be upgraded to TLS using the ``STARTTLS`` command.

.. note:: - Some ISPs are blocking or throttling SMTP port 25. We recommend using #587 instead.
          - Google Compute Engine allows port ``2525`` for SMTP submission.
          - SMTP send will error with "cannot parse to address" or "cannot parse from address" if the
            provided email address fails syntax checks in accordance with RFC5321, RFC5322, RFC6854.

.. warning:: IP addresses for HTTP and SMTP API endpoints will change frequently and subjected to change without notice. Ensure there are no IP-based ACLs that would prevent communication to new IP addresses that may be added or removed at any time.

Use "plain text" SMTP authentication and the credentials from the domain details
page in your Control Panel which can be found by clicking on a domain in the Domains
Tab. For enhanced security, use TLS encryption.

.. note:: See `SMTP`_ to learn how to configure the most popular SMTP software and email clients
            to work with Mailgun

.. _passing_sending_options:

**Passing Sending Options**

When sending a message via SMTP you can pass additional sending options via
custom  MIME_ headers listed in the table below.


    ========================================= ============================================================
    Header                                    Description
    ========================================= ============================================================
    X-Mailgun-Tag                             Tag string used for aggregating stats. See :ref:`tagging`
                                              for more information. You can mark a message with several
                                              categories by setting multiple ``X-Mailgun-Tag`` headers.
    X-Mailgun-Dkim                            Enables/disables DKIM signatures on per-message basis.
                                              Use ``yes`` or ``no``.
    X-Mailgun-Deliver-By                      Desired time of delivery. See `Scheduling Delivery`_ and
                                              :ref:`date-format`.
    X-Mailgun-Drop-Message                    Enables sending in test mode. Pass ``yes`` if needed.
                                              See :ref:`manual-testmode`.
    X-Mailgun-Track                           Toggles tracking on a per-message basis, see
                                              :ref:`tracking-messages` for details.
                                              Pass ``yes`` or ``no``.
    X-Mailgun-Track-Clicks                    Toggles clicks tracking on a per-message basis. Has higher
                                              priority than domain-level setting. Pass ``yes``, ``no``
                                              or ``htmlonly``.
    X-Mailgun-Track-Opens                     Toggles opens tracking on a per-message basis. Has higher
                                              priority than domain-level setting. Pass ``yes`` or ``no``.
    X-Mailgun-Sending-Ip                      Used to specify an IP Address to send the email with that is
                                              owned by your account.
    X-Mailgun-Sending-Ip-Pool                 If an IP Pool ID is provided, the email will be delivered
                                              with an IP that belongs in that pool.
    X-Mailgun-Require-TLS                     Use this header to control TLS connection settings.
                                              See :ref:`tls-sending`
    X-Mailgun-Skip-Verification               Use this header to control TLS connection settings.
                                              See :ref:`tls-sending`
    X-Mailgun-Recipient-Variables             Use this header to substitute recipient variables referenced
                                              in a batched mail message.  See :ref:`batch-sending`
    X-Mailgun-Variables                       Use this header to attach a custom JSON data to the message.
                                              See :ref:`manual-customdata` for more information.
    X-Mailgun-Delivery-Time-Optimize-Period   Toggles STO on a per-message basis. String should be set to the number of hours in [0-                                                 9]+h format. See :ref:`Sending a message with STO` for details.
    X-Mailgun-Time-Zone-Localize              Toggles TZO on a per-message basis. String should be set to preferred delivery time in                                                 HH:mm or hh:mmaa format, where HH:mm is used for 24 hour format without AM/PM and                                                       hh:mmaa is used for 12 hour format with AM/PM. See :ref:`Sending a message with TZO` for 					             details.

    ========================================= ============================================================

.. _sto-sending:

Sending a message with STO
================

Mailgun's Send Time Optimization (STO) feature uses machine learning to analyze engagement data (opens and clicks) for a recipient to determine when a user is most engaged with their messages. If we have enough engagement data to make a determination of when a user is most engaged, Mailgun will hold onto the message and deliver it during that optimal period. The idea here is that if we can deliver a message to a user when they are most engaged, the message will be towards the top and is more likely to be engaged with.

You can send a message using STO via API by passing in the parameter ``o:deliverytime-optimize-period`` or via SMTP using the MIME header ``X-Mailgun-Delivery-Time-Optimize-Period``. The value should be a string in the ``[0-9]+h`` format. This value defines the window in which Mailgun will run the optimization algorithm against the data we have and deliver the message. We recommend using a minimum value of ``24h`` for best results, and the max value is ``72h``.

*Please note that STO is only available on certain plans. See www.mailgun.com/pricing for more info.*

.. _tzo-sending:

Sending a message with TZO
================

Mailgun’s Timezone Optimization feature allows senders to schedule messages to be delivered in a recipient’s local timezone. Similar to how our message scheduling works, with TZO you pass your desired delivery time, and Mailgun will convert that to a user's local timezone, if we have data for that recipient. If we do not have data for that recipient, the message will be delivered immediately.

Timezones are estimated based on a user’s IP address. Mailgun collects the IP address on click events, and uses a geolocation service to translate the IP address into a timezone for the user. We store that timezone in a database (hashed, of course), so that when TZO is used on a message, Mailgun will look up the timezone for that user, and schedule the message for the delivery time in that user’s local timezone.

You can send a message using TZO via API by passing in the parameter ``o:time-zone-localize`` or via SMTP using the MIME header ``X-Mailgun-Time-Zone-Localize``. The value (String) should be set to preferred delivery time in HH:mm or hh:mmaa format, where HH:mm is used for 24 hour format without AM/PM and hh:mmaa is used for 12 hour format with AM/PM.

*Please note that TZO is only available on certain plans. See www.mailgun.com/pricing for more info.*

Sending an AMP message
================

Google’s Accelerated Mobile Pages (AMP) for Email allows senders to include a subset of AMP components within an email message. This lets recipients receive content rich, dynamic emails,  that result in a more interactive experience with email messages. For recipients, this means the ability to view real time inventory, submit updates or replies in a doc, respond to surveys, etc., all from directly within the email message. For marketers, this could mean improved conversion rates since users can interact with you directly from the email without visiting a website!

**AMP Requirements**

While AMP is a really exciting email tool, it takes a bit of setup before you can successfully send an AMP email message to your recipients.

*Registration*

In order to send AMP emails to mailboxes that support it (Gmail for now), you’ll need to `register <https://support.google.com/mail/answer/81126>`_ your sending domain with Google.

*Content*

Your AMP email content must comply with Google’s requirements. First, you need to ensure that you’re following Google’s `Bulk Senders Guidelines <https://support.google.com/mail/answer/81126>`_.

Next, It’s important to follow the `Amp for Email specification <https://amp.dev/documentation/guides-and-tutorials/learn/amp-email-format>`_ when building your AMP messages, specifically the required markup,  AMP components, and CSS requirements. One of the gotchas you may run into, for example, is the <img> tag is replaced with <amp-img>. As you go along, you can use `Gmail's AMP for Email Playground <https://amp.gmail.dev/playground/>`_ to test whether your message content will pass the validation process.

*HTTPS URLs*

All URLs must use HTTPS, including tracking and unsubscribe URLs. If you’re using Mailgun for your open/click tracking and unsubscribe URLs, you’ll need to `follow these steps <https://help.mailgun.com/hc/en-us/articles/360011566033-How-to-Enable-HTTPS-Tracking-Links>`_ to enable HTTPS on your Mailgun tracking URLs.

**Sending an AMP email on Mailgun**

Mailgun has made it easy to send an AMP email using our API by providing the optional ``amp-html`` parameter along with your AMP content. Mailgun will take care of building the proper ``text/x-amp-html`` MIME portion. As long as you’re following the AMP requirements set by Google, you should be well on your way to sending your AMP messages.

**Testing your email messages**

If you’re waiting on Google for your domain to be registered, you can still start building AMP emails and testing them. Visit your Gmail settings page (GSuite users will need their admins to enable the Dynamic Email option), and then under the *Dynamic Email* section, check the box to *Enable dynamic email*. After that, click on *Developer settings* and enter your sending address in the field in order to whitelist your sending address, then click OK. As long as you’re following the proper requirements for sending AMP messages, you should be able to successfully receive an AMP email from your sending address to your Gmail account.

**AMP Best Practices**

*MIME part organization*

Some email clients will only render the last MIME part, so you should ensure your MIME parts are in the following order:

* ``text/plain``
* ``text/x-amp-html``
* ``text/html``

If you send a message via our API using the ``amp-html``, Mailgun will take care of the proper ordering.

*Text / HTML fallback*

Just like when you send an HTML email, you should provide a Text version as a fallback in case the recipient blocks HTML content. The same applies when sending AMP emails. If you send an AMP email to a recipient that doesn’t support it or has blocked the content, they can still view the message in another format.

*Replying to and forwarding AMP messages*

It’s important to note that email clients will strip out the ``text/x-amp-html`` MIME in your messages when you reply to or forward the message. This is another reason why you should ensure you have text and HTML versions as a fallback when you send your emails.



Message Queue
=============

When you submit messages for delivery Mailgun places them in a message queue.

- You can submit a large amount of messages and Mailgun will automatically queue the
  delivery in compliance with the receiving domains' guidelines and maximum allowed
  sending rate optimized for each ESP (email service provider) such as Yahoo, GMail, etc.
- The Queue is dynamic so as you send more messages, your sending rates will increase,
  assuming you are sending quality traffic.  (See :ref:`best-practices` about warming
  up IP addresses.) Do not get discouraged if your messages take longer to be delivered
  at the beginning. As your reputation grows, your sending rate will grow too.

The queueing algorithms are one of the most important features of Mailgun.  If you try to send bulk mailings all at once, most ISPs will block you, or worse, just drop your messages without telling you.  In addition, it is important to gradually increase your sending rates according to many factors, including consistency of traffic, IP address sending history, and domain reputation.

.. _batch-sending:

Batch Sending
=============

Mailgun supports the ability send to a group of recipients through a single API call or SMTP session.  This is achieved by either:

* Using Batch Sending by specifying multiple recipient email addresses as ``to`` parameters and using Recipient Variables.
* Using :ref:`mailing-lists` with Template Variables.

.. warning:: It is important when using Batch Sending to also use Recipient Variables. This tells Mailgun to send each recipient an individual email with only their email in the ``to`` field. If they are not used, all recipients' email addresses will show up in the ``to`` field for each recipient.

.. _recipient-variables:

**Recipient Variables**

Recipient Variables are custom variables that you define, which you can then reference in the message body.
They give you the ability to send a custom message to each recipient while still using a single API Call (or SMTP session).

To access a recipient variable within your email, simply reference ``%recipient.yourkey%``. For example, consider the following JSON:

.. code-block:: javascript

 {
   "user1@example.com" : {"unique_id": "ABC123456789"},
   "user2@example.com" : {"unique_id": "ZXY987654321"}
 }

To reference the above variables within your email, use ``%recipient.unique_id%``.

Recipient Variables allow you to:

* Submit a message template;
* Include multiple recipients; and
* Include a set of key:value pairs with unique data for each recipient.

.. include:: samples/send-template-message.rst

.. note:: The maximum number of recipients allowed for Batch Sending is 1,000.

.. note:: Recipient variables should be set as a valid JSON-encoded dictionary, where key is a plain recipient address and value is a dictionary with variables.

In the example above, Alice and Bob both will get personalized subject lines "Hey, Alice" and "Hey, Bob" and unique unsubscribe links.

When sent via SMTP, recipient variables can be included by adding the following header to
your email, ``X-Mailgun-Recipient-Variables: {"user1@example.com" : {"unique_id": "ABC123456789"}}``

Example:

.. code-block:: text

 X-Mailgun-Recipient-Variables: {"bob@example.com": {"first":"Bob", "id":1}, "alice@example.com": {"first":"Alice", "id": 2}}
 From: me@example.com
 To: %recipient%
 Date: 29 Mar 2016 00:23:35 -0700
 Subject: Hello, %recipient.first%!
 Message-Id: <20160329071939.35138.9413.6915422C@example.com>
 Content-Type: text/plain; charset="us-ascii"
 Content-Transfer-Encoding: quoted-printable

 Hi, %recipient.first%,
 =20
 Please review your profile at example.com/orders/%recipient.id%.
 =20
 Thanks,
 Example.com Team

.. note:: The value of the "X-Mailgun-Recipient-Variables" header should be valid JSON string,
          otherwise Mailgun won't be able to parse it.  If your "X-Mailgun-Recipient-Variables" header exceeds
          998 characters, you should use `folding <https://tools.ietf.org/html/rfc2822#page-11>`_ to
          spread the variables over multiple lines.

They can also supplied through a special construct, called a variables container.

To contain variables you create the following MIME construct:

.. code-block:: text

 multipart/mailgun-variables
 --application/json (base64 encoded)
 --message/rfc822
 ----original-message

In this construct, JSON will be Base64 encoded and will be stored inside the part body, which will handle recipient variables containing special characters.

Example:

.. code-block:: text

 Content-Type: multipart/mailgun-variables; boundary="8686cc907910484e9d21c54776cd791c"
 Mime-Version: 1.0
 From: bob@bob-mg
 Date: Thu, 26 Jul 2012 15:43:07 +0000
 Message-Id: <20120726154307.29852.44460@definebox.com>
 Sender: bob=bob-mg@definebox.com

 --8686cc907910484e9d21c54776cd791c
 Mime-Version: 1.0
 Content-Type: application/json
 Content-Transfer-Encoding: base64

 eyJkZXNjcmlwdGlvbiI6ICJrbGl6aGVudGFzIn0=

 --8686cc907910484e9d21c54776cd791c
 Content-Type: message/rfc822
 Mime-Version: 1.0

 Date: Thu, 26 Jul 2012 19:42:55 +0400
 To: %recipient.description% <support@mailgunhq.com>
 From: bob@bob-mg
 Subject: (rackspace) Hello
  MSK 2012 support@mailgunhq.com %recipient.description%
 Message-Id: <20120726154302.29322.40670@definebox.com>

 support@mailgunhq.com %recipient.description%

 --8686cc907910484e9d21c54776cd791c--

.. _mailing-lists:

Mailing Lists
==============

Mailing Lists provide a convenient way to send to multiple recipients by using an alias email address. Mailgun sends a copy of the message sent to the alias address to each subscribed member of the Mailing List. You can create and maintain your subscriber lists using the API or Control Panel. In addition, you can use Template Variables to create a unique message for each member of the Mailing List.

**Overview**

To use Mailing Lists you create a Mailing List address, like ``devs@example.com`` and add
member addresses to it. Each time you send a message to ``devs@example.com``, a copy
of it is delivered to each subscribed member.

**Managing a list**

You can create Mailing Lists using the ``Mailing Lists`` tab in the Control Panel or through the API.
We support a couple of formats to make your life easier:
you can upload a CSV file with members, use JSON or use form-like file upload.

Creating a mailing list through the API:

.. include:: samples/create-mailing-list.rst

Adding a member through the API:

.. include:: samples/add-list-member.rst

.. note:: You can attach a JSON dictionary with the structured data to each member
          of the mailing list and reference that data in the message body using Template Variables (see ``vars`` parameter in the example above).

.. note:: There are two modes available when adding a new member: strict and
          upsert. Strict will raise an error in case the member already
          exists, upsert will update an existing member if it's here or insert
          a new one. Learn how to toggle between the the modes and skip
          malformed addresses in the :ref:`api-mailinglists` API section.

**Sending to a list**

You can set the access level of Mailing Lists to:

* Only allow the administrator to post to the list (limited to an API call or authenticated SMTP session);
* Allow Mailing List members to post to the list; or
* Allow anybody to post to the list.

**Replying to a list**

You can set the preferred method for where a reply to the list should go:

* ``list`` Replies to the list go to the list address. This is the default setting for any new list created, except for read-only lists, where replies can only go to the sender. Reply-all will still go to the list.
* ``sender`` Replies to the list go to the sender (FROM) address. This is the default and only option for read-only lists.

.. _template-variables:

**Template Variables**

There are some pre-defined variables you can use to
personalize your message to each recipient. When adding members to a Mailing List you can also define
your own variables in addition to these pre-defined variables by using the ``vars`` parameter.

.. container:: ptable

    ==============================    =============================================================================================================
    Variable                          Description
    ==============================    =============================================================================================================
    %recipient%                       Full recipient spec, like "Bob <bob@example.com>" (for using as value for "To" MIME header).
    %recipient_email%                 Recipient's email address, like bob@example.com.
    %recipient_name%                  Recipient's full name, like "John Q. Public".
    %recipient_fname%                 Recipient's first name.
    %recipient_lname%                 Recipient's last name.
    %unsubscribe_url%                 A generated URL which allows users to unsubscribe from messages.
    %mailing_list_unsubscribe_url%    A generated URL which allows users to unsubscribe from mailing lists.
    %unsubscribe_email%               An email address which can be used for automatic unsubscription by adding it to List-Unsubscribe MIME header.
    %recipient.yourvar%               Accessing a custom datavalue. (see :ref:`manual-customdata`)
    ==============================    =============================================================================================================

**Unsubscribing**

For managing unsubscribes in Mailing Lists, you can use ``%mailing_list_unsubscribe_url%``.
We will generate the unique link to unsubscribe from the mailing list.
Once a recipient clicks on the unsubscribe link, we mark the recipient as
"unsubscribed" from this list and they won't get any further emails addressed
to this list. Note, that you can still override the "unsubscribe" setting via
the API or the Control Panel (in case of user error or accidental unsubscribe,
for example). You can also manually unsubscribe the customer without using any
links via the API or in the Control Panel. Read more in the :ref:`api-mailinglists`
API section.

**Mailing Lists and Routes**

Mailing Lists work independently from Routes.
If there is a Mailing List or Route with the same address, the incoming message will hit the Route and Mailing List simultaneously. This can be pretty convenient for processing replies to the Mailing List and integrating into things like forums
or commenting systems.

.. _templating:

Templates
==========

Mailgun allows you to store predefined templates via :ref:`Template API <api-templates>` and use them to send messages via :ref:`sending api <api-sending-messages>` just providing template name.
Don't be confused with :ref:`Template Variables <template-variables>` as **Templating** works independently.

Mailgun's templates uses a fork of the very popular template engine `handlebars`_.
To provide values for substitution you have to use :ref:`Attaching Data to Messages <manual-customdata>`. Let's see how to send a message using the template feature:

First create a template via the :ref:`Template API <api-templates>`

.. include:: samples/templates/create-template-usage.rst

Response returns stored template information

.. code-block:: javascript

 {
   "template": {
      "createdAt": "Wed, 29 Aug 2018 23:31:13 UTC",
      "description": "Sample template",
      "name": "template.test",
   },
   "message": "template has been stored"
 }

You can now use the template when sending a message:

.. include:: samples/send-message-by-template-id.rst

If you are sending a MIME you can instead pass template variables via the ``X-Mailgun-Template-Variables`` header.

.. note:: It is possible to use values defined via ``v:`` option or ``X-Mailgun-Variables`` in your templates.
          However if you do so, the variables are included in the delivered message via the ``X-Mailgun-Variables``
          header. If this is not desired, use the ``t:variables`` option or ``X-Mailgun-Template-Variables``
          header instead.

**Handlebars**

Speaking of Handlebars, one of the cool things you can do with Handelbars is use their block helpers, which are easy ways to implement dynamic content in your template. Our implementation of Handlebars supports the following helpers: if, unless, each, with, and equal. Let's explore what each of these do and some quick examples:

*The* ``if`` *block helper*

The ``if`` block helper will allow you to conditionally render a block in your template. For example, if you wanted to use a template that would dynamically change language body, you would include the following in your HTML:

.. code-block:: javascript

  {{#if english}}
  <p>This text is in the English language.</p>
  {{else if spanish}}
  <p>Este texto está en idioma español.</p>
  {{else if french}}
  <p>Ce texte est en langue française.</p>
  {{/if}}

In order to send the spanish version, for example, you would pass the ``h:X-Mailgun-Variables`` parameter with the following JSON data: {"spanish" : "true"}


*The* ``unless`` *block helper*

The ``unless`` helper is essentially the inverse of the ``if`` helper. The block will only be rendered if the expression returns a false value. Include the following in your HTML:

.. code-block:: javascript

  {{#unless paid}}
  <h3 class="warning">WARNING: Your account is past due and will be suspended shortly. Please contact our billing department for assistance</h3>
  {{/unless}}

An example JSON payload would look like this: {"paid" : "false"}


*The* ``each`` *block helper*

Using the ``each`` helper, you can iterate through a list. Include the following in your HTML:

.. code-block:: javascript

  {{#each user.services}}
  <li>You scheduled {{this.service}} on {{this.date}}</li>
  {{/each}}

Your JSON data could look something like this:

.. code-block:: javascript

  {
   "user":
   {
      "services":
      [
         {
            "date":"07/30/2019",
            "service":"deliverability consultation"
         },
         {
            "date":"08/05/2019",
            "service":"sales consultation"
         }
      ]
   }
  }

The email would end up looking like this:

- You scheduled deliverability consultation on 07/30/2019
- You scheduled sales consultation on 08/05/2019


*The* ``equal`` *helper*

The ``equal`` helper renders a block if the string version of both arguments are equals. For example, if you include the following in your HTML:

.. code-block:: javascript

	<p>{{#equal foo "bar"}}foo is bar{{/equal}}</p>
	<p>{{#equal foo baz}}foo is the same as baz{{/equal}}</p>
	<p>{{#equal nb 0}}nothing{{/equal}}</p>
	<p>{{#equal nb 1}}there is one{{/equal}}</p>
	<p>{{#equal nb "1"}}everything is stringified before comparison{{/equal}}</p>

And pass the ``h:X-Mailgun-Variables`` parameter with the following JSON data: {"foo": "bar", "baz": "bar", "nb": 1}

The resulting email would end up looking like this:

foo is bar

foo is the same as baz

there is one

everything is stringified before comparison


.. _handlebars: https://handlebarsjs.com/


.. _scheduling-delivery:

Scheduling Delivery
===================

Mailgun also allows you to request a specific time for your message delivery by
using the ``o:deliverytime`` parameter if sending via the API, or
``X-Mailgun-Deliver-By`` MIME header if sending via SMTP.

While messages are not guaranteed to arrive at exactly the requested time due to
the dynamic nature of the queue, Mailgun will do its best.

.. note:: Messages can be scheduled for a maximum of 3 days in the future.

**Scheduling Delivery API Example**

Supply :rfc:`2822#section-3.3` or `Unix epoch <http://en.wikipedia.org/wiki/Unix_time>`_
time to schedule your message. Time should be in GMT/UTC or timezone should be in
numerical offset format:

.. include:: samples/send-scheduled-message.rst

.. _manual-testmode:

Sending in Test Mode
====================

You can send messages in test mode by setting ``o:testmode`` parameter to ``true``.
When you do this, Mailgun will accept the message but will not send it.
This is useful for testing purposes.

.. note:: You are charged for messages sent in test mode.

.. _tracking-messages:

Tracking Messages
*****************

Once you start sending and receiving messages, it's important to track what's happening with them. We try to make tracking your messages as easy as possible through `Events`_, `Stats`_, and `Tagging`_.

In addition, Mailgun permanently stores when a message can not be delivered due to a hard bounce (permanent failure) or when a recipient unsubscribes or complains of spam. In these cases, Mailgun will not attempt to deliver to these recipients in the future, in order to protect your sending reputation.

Mailgun provides a variety of methods to access data on your emails:

- View and search Events through the ``Logs`` tab in the Control Panel to see every event that has happened to every message. You can search by fields like recipient, subject line and even fields that don't show up in the Logs, like message-id. Data is stored for at least 30 days for paid accounts and at least 2 days for free accounts.
- Access data on Events programmatically through the :ref:`Events API <api-events>`.  Data is stored for at least 30 days for paid accounts and at least 2 days for free accounts.
- View, search and edit tables for Bounces, Unsubscribes and Spam Complaints in the ``Suppressions`` tab of the Control Panel or their respective APIs (:ref:`Bounces API <api-bounces>`, :ref:`Unsubscribes API <api-unsubscribes>`, :ref:`Complaints API <api-complaints>`). Data is stored indefinitely.
- Access statistics aggregated by tags in the ``Analytics`` tab of the Control Panel or the :ref:`Stats API <api-stats>`. Data is stored for at least 6 months.
- Receive notifications of events through a Webhook each time an Event happens and store the data on your side.

**Enable Tracking**

Event tracking is automatically enabled except for Unsubscribes, Opens and Clicks.

You can enable Unsubscribes tracking for your domain via the ``Domains`` tab of the Control Panel.
You can also manage unsubscribes per message by using unsubscribe variables (see `Tracking Unsubscribes`_)

You can enable Opens & Clicks tracking on two levels: per sending domain and per message.

- You can enable Open & Click tracking on a per domain basis under the **Tracking Settings** section of a particular domain's settings page.
- Tracking can also be toggled by setting ``o:tracking``, ``o:tracking-clicks`` and ``o:tracking-opens`` parameters when sending your message. This will override the domain-level setting.

.. note:: You will also have to point CNAME records to mailgun.org for Mailgun to rewrite links and track opens. In addition, there needs to be an html part of message for Mailgun to track opens (see `Tracking Opens`_ and `Tracking Clicks`_ for more detail).

.. _events:

Events
======

Mailgun keeps track of every event that happens to every message (both inbound and outbound) and stores this data for at least 30 days for paid accounts and 2 days for free accounts.

Below is the table of events that Mailgun tracks.

.. container:: ptable

    ========================== ============================================================
    Event                      Description
    ========================== ============================================================
    accepted                   Mailgun accepted the request to send/forward the email and the message
                               has been placed in queue.
    rejected                   Mailgun rejected the request to send/forward the email.
    delivered                  Mailgun sent the email and it was accepted by the recipient
                               email server.
    failed                     Mailgun could not deliver the email to the recipient email server.
    opened                     The email recipient opened the email and enabled image
                               viewing. Open tracking must be enabled in the Mailgun control
                               panel, and the CNAME record must be pointing to mailgun.org.
    clicked                    The email recipient clicked on a link in the email.
                               Click tracking must be enabled in the Mailgun control
                               panel, and the CNAME record must be pointing to mailgun.org.
    unsubscribed               The email recipient clicked on the unsubscribe link.
                               Unsubscribe tracking must be enabled in the Mailgun control
                               panel.
    complained                 The email recipient clicked on the spam complaint button within
                               their email client. Feedback loops enable the notification to
                               be received by Mailgun.

    stored                     Mailgun has stored an incoming message
    list_member_uploaded       This event occurs after successfully adding a member to a
                               mailing list.
    list_member_upload_error   This event occurs if an error occurs adding a member to a
                               mailing list.
    list_uploaded              This event occurs after successfully uploading a large list of
                               members to a mailing list.
    ========================== ============================================================

You can access Events through a few interfaces:

* Webhooks (we POST data to your URL).
* The Events API (you GET data through the API).
* The ``Logs`` tab of the Control Panel (GUI).

.. _manual-events-api:

**Events API**

You can programmatically query and download events through the :ref:`Events API <api-events>`.

.. include:: samples/events-date-time-recipient.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
      {
        "tags": [],
        "timestamp": 1376325780.160809,
        "envelope": {
          "sender": "me@samples.mailgun.org",
          "transport": ""
        },
        "event": "accepted",
        "campaigns": [],
        "user-variables": {},
        "flags": {
          "is-authenticated": true,
          "is-test-mode": false
        },
        "message": {
          "headers": {
            "to": "user@example.com",
            "message-id": "20130812164300.28108.52546@samples.mailgun.org",
            "from": "Excited User <me@samples.mailgun.org>",
            "subject": "Hello"
          },
          "attachments": [],
          "recipients": [
            "user@example.com"
          ],
          "size": 69
        },
        "recipient": "user@example.com",
        "method": "http"
      }
    ],
    "paging": {
      "next":
          "https://api.mailgun.net/v3/samples.mailgun.org/events/W3siY...",
      "previous":
          "https://api.mailgun.net/v3/samples.mailgun.org/events/Lkawm..."
    }
  }

.. _webhooks:

Webhooks
========

Mailgun can make an HTTP/HTTPS POST to your URLs when events occur with your messages. If you would like Mailgun to POST event notifications, you need to provide a callback URL in the ``Webhooks`` tab of the Control Panel. Webhooks are at the domain level so you can provide a unique URL for each domain by using the domain drop down selector. Note, if you want to include an HTTPS endpoint it must be confiured with a trusted CA signed SSL certificate, not a self signed certificate.

You can read more about the data that is posted in the appropriate section below (`Tracking Opens`_, `Tracking Clicks`_, `Tracking Unsubscribes`_, `Tracking Spam Complaints`_, `Tracking Failures`_, `Tracking Deliveries`_). We recommend using `<http://bin.mailgun.net/>`_ for creating temporary URLs to test and debug your webhooks.

For Webhook POSTs, Mailgun listens for the following codes from your server and reacts accordingly:

* If Mailgun receives a ``200 (Success)`` code it will determine the webhook POST is successful and not retry.
* If Mailgun receives a ``406 (Not Acceptable)`` code, Mailgun will determine the POST is rejected and not retry.
* For any other code, Mailgun will retry POSTing according to the schedule below for Webhooks other than the delivery notification.

If your application is unable to process the webhook request but you do not return a 406 error code, Mailgun will retry (other than for delivery notification) during 8 hours at the following intervals before stop trying: 10 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hour and 4 hours.

The Webhooks API endpoint allows you to programmatically manipulate the webhook
URLs defined for a specific domain. Head over to the :ref:`api-webhooks` API endpoint documentation.

.. _webhooks payload:

**Payload**

When something has happened to your email, your URL will be called with application/json payload
and with the following data:

.. code-block:: javascript

  {
    “signature”:
    {
      "timestamp": "1529006854",
      "token": "a8ce0edb2dd8301dee6c2405235584e45aa91d1e9f979f3de0",
      "signature": "d2271d12299f6592d9d44cd9d250f0704e4674c30d79d07c47a66f95ce71cf55"
    }
    “event-data”:
    {
      "event": "opened",
      "timestamp": 1529006854.329574,
      "id": "DACSsAdVSeGpLid7TN03WA",
      // ...
    }
  }

The 'signature' parameters are described in `securing webhooks`_
and the 'event-data' parameters are the same as described in :ref:`api-events-structure`

.. _securing webhooks:

**Securing Webhooks**

To ensure the authenticity of event requests, Mailgun signs them and posts the signature
along with other webhook parameters:

.. container:: ptable

 =========    ======    ==========================================================
 Parameter    Type      Description
 =========    ======    ==========================================================
 timestamp    int       Number of seconds passed since January 1, 1970.
 token        string    Randomly generated string with length 50.
 signature    string    String with hexadecimal digits generate by HMAC algorithm.
 =========    ======    ==========================================================

To verify the webhook is originating from Mailgun you need to:

- Concatenate timestamp and token values.
- Encode the resulting string with the HMAC algorithm (using your Webhook Signing Key as a key and SHA256 digest mode).
- Compare the resulting hexdigest to the signature.
- Optionally, you can cache the token value locally and not honor any subsequent request with the same token. This will prevent replay attacks.
- Optionally, you can check if the timestamp is not too far from the current time.

.. note:: Due to potentially large size of posted data, Mailgun computes an authentication
          signature based on a limited set of HTTP headers.

Below is a Python (version 3.x.x) code sample used to verify the signature:

.. code-block:: python

    import hashlib, hmac

    def verify(signing_key, token, timestamp, signature):
        hmac_digest = hmac.new(key=signing_key.encode(),
                               msg=('{}{}'.format(timestamp, token)).encode(),
                               digestmod=hashlib.sha256).hexdigest()
        return hmac.compare_digest(str(signature), str(hmac_digest))

And here's a sample in Ruby:

.. code-block:: ruby

    require 'openssl'

    def verify(signing_key, token, timestamp, signature)
      digest = OpenSSL::Digest::SHA256.new
      data = [timestamp, token].join
      signature == OpenSSL::HMAC.hexdigest(digest, signing_key, data)
    end

And here's a sample in PHP:

.. code-block:: php

    function verify($signingKey, $token, $timestamp, $signature)
    {
        // check if the timestamp is fresh
        if (\abs(\time() - $timestamp) > 15) {
            return false;
        }

        // returns true if signature is valid
        return \hash_equals(\hash_hmac('sha256', $timestamp . $token, $signingKey), $signature);
    }

And here's a sample in Go

.. code-block:: go

    import (
        "github.com/mailgun/mailgun-go/v3"
    )

    func VerifyWebhookSignature(domain, signingKey, timestamp, token, signature string) (bool, error) {
        mg := mailgun.NewMailgun(domain, signingKey)

        return mg.VerifyWebhookSignature(mailgun.Signature{
            TimeStamp: timestamp,
            Token:     token,
            Signature: signature,
        })
    }

And here's a sample in Node.js

.. code-block:: javascript

    const crypto = require('crypto')

    const verify = ({ signingKey, timestamp, token, signature }) => {
        const encodedToken = crypto
            .createHmac('sha256', signingKey)
            .update(timestamp.concat(token))
            .digest('hex')

        return (encodedToken === signature)
    }

.. _manual-customdata:

Attaching Data to Messages
==========================

When sending you can attach data to your messages for later retrieval, you can for instance attach campaign
identifiers or recipient identifiers to messages to help relate webhook payloads or events retrieved from mailgun
back to marketing campaigns or individual recipients in your system.

There are two methods of attaching data to emails. If you are sending email via SMTP, you can attach data by
providing a ``X-Mailgun-Variables`` header. The header data must be in JSON map format. For example::

    X-Mailgun-Variables: {"first_name": "John", "last_name": "Smith"}
    X-Mailgun-Variables: {"my_message_id": 123}

Multiple ``X-Mailgun-Variables`` headers may be provided and their map values will be combined.

.. note:: The value of the "X-Mailgun-Variables" header must be valid JSON string,
          otherwise Mailgun won't be able to parse it. If your X-Mailgun-Variables header exceeds
          998 characters, you should use `folding <https://tools.ietf.org/html/rfc2822#page-11>`_ to
          spread the variables over multiple lines.

If you are sending email via the HTTP API, you can attach data by providing a form parameter prefixed with ``v:``.
For example::

    v:first_name=John
    v:last_name=Smith
    v:my_message_id=123

The data provided will be included the recipients email via a header called ``X-Mailgun-Variables``.
Additionally the data will also be available via webhook payloads and events returned from the events API. The
data will be attached to these payloads via the ``user-variables`` field as a JSON map. For Example::

    {
        "event": "delivered",
        "user-variables": {
            "first_name": "John",
            "last_name:" "Smith",
            "my_message_id": "123"
        }
    }

When sending batches of emails, you can use values from recipient variables to provide a custom variable per
recipient using templating. For example given a variable of ``v:recipient-id=%recipient.id%`` and a recipient
variable of ``{"user1@example.com" : { "id": 123 }}`` events and webhooks associated with the recipient
``user1@example.com`` will contain a ``user-variable`` field with the content of ``{ "recipient-id": "123" }``

When using variables, the ``X-Mailgun-Variables`` header will be included in the MIME of the delivered email. This
means that recipients who receive emails when variables are used WILL be able to see the variables if they view
the MIME headers.

.. _tagging:

Tagging
=======

Sometimes it's helpful to categorize your outgoing email traffic based on some
criteria, perhaps separate signup emails from password recovery emails or from
user comments. Mailgun lets you tag each outgoing message with a custom value.
When you access stats on your messages, they will be aggregated by these tags.

The application of tags is more useful in tandem with our tracking features. Tags
are unique to each send and can be used to collect data on different message
distributions being sent out (e.g. how many recipients opened messages of a given tag
or clicks on linked URLs in messages of a tag). This provides the ability to review
the overall performance of tags as well as gives the ability to compare one tag
against another. For example, two messages of similar content can be assigned
different tags for analysis of which message type had better engagement, more
recipient activity, etc.

.. note:: By default, each account is allowed a maximum of 4,000 tags. Any tags created
          after the 4,000 tag limit are dropped. If more tags are needed, please contact
          our support team by creating a support ticket `here <https://app.mailgun.com/app/support/list>`_.

**Tagging Code Samples**

Supply one or more ``o:tag`` parameters to tag the message.

.. include:: samples/send-tagged-message.rst

.. note:: A single message may be marked with up to 3 tags.

.. note:: Tags are case insensitive and should be ascii only. Maximum tag length is 128 characters.


.. _um-tracking-opens:

Tracking Opens
==============

Mailgun can keep track of every time a recipient opens your messages. You can see when Opens happen in the ``Logs`` tab or see counters of opens aggregated by tags in the ``Analytics`` tab of the Control Panel.  In addition, you can be notified through a webhook or get the data programmatically through the :ref:`Events API <api-events>`.

You can enable Open tracking in the **Tracking Settings** section of your domain's settings page in the ``Domains`` tab of your Control Panel or by using the ``o:tracking`` or ``o:tracking-opens`` parameters when sending a message. You will also have to add the appropriate CNAME records to your DNS as specified in the **Domain Verification & DNS** section, which is also located in your domain's settings page in the ``Domains`` tab of your Control Panel.

Opens are tracked by including a transparent .png file, which will only work if there is
an HTML component to the email (i.e., text only emails will not track opens). You should
note that many email service providers disable images by default, so this data will only
show up if the recipient clicks on display images button in his/her email.


**Opens Webhook**

You can specify webhook URLs programmatically using the :ref:`api-webhooks` API.
When a user opens one of your emails, your ``opened`` URLs will be called with the following `webhooks payload`_.

.. _Return Path: http://www.returnpath.net/
.. _country code: http://dev.maxmind.com/static/csv/codes/iso3166.csv
.. _ISO3166: http://www.iso.org/iso/country_codes.htm
.. _region code: http://dev.maxmind.com/static/csv/codes/maxmind/region.csv
.. _User agent: http://en.wikipedia.org/wiki/User_agent

.. _um-tracking-clicks:

Tracking Clicks
===============

Mailgun can keep track of every time a recipient clicks on links in your messages. You can see when clicks happen in the ``Logs`` tab or see counters of clicks aggregated by tags in the ``Analytics`` tab of the Control Panel.  In addition, you can be notified through a webhook or get the data programmatically through the :ref:`Events API <api-events>`.

You can enable click tracking in the **Tracking Settings** section of your domain's settings page in the ``Domains`` tab of your Control Panel or by using the ``o:tracking`` or ``o:tracking-clicks`` parameters when sending a message. You will also have to add the appropriate CNAME records to your DNS as specified in the **Domain Verification & DNS** section, which is also located in your domain's settings page in the ``Domains`` tab of your Control Panel. If you enable Click tracking, links will be overwritten and pointed to our servers so we can track clicks. You can specify that you only want links rewritten in the HTML part of a message with the parameter ``o:tracking-clicks`` and passing ``htmlonly``.

**Clicks Webhook**

You can specify webhook URLs programmatically using the :ref:`api-webhooks` API.
Every time a user clicks on a link inside of your messages, your ``clicked`` URLs will be called with the following `webhooks payload`_.

.. _um-tracking-unsubscribes:

Tracking Unsubscribes
=====================

Mailgun can keep track of every time a recipient requests to be unsubscribed from
your mailings.  If you enable unsubscribe tracking, Mailgun will insert unsubscribe links and remove those recipients
from your mailings automatically for you.

You can see when unsubscribes happen in the ``Logs`` tab or see counters of unsubscribes aggregated by tags in the ``Analytics`` tab of the Control Panel.  In addition, you can be notified through a webhook or get the data programmatically through the :ref:`Events API <api-events>` or the :ref:`Bounces API <api-bounces>`.

Mailgun supports three types of unsubscribes: domain, :ref:`tag <tagging>` or :ref:`mailing-lists` levels.

- Domain level: Once recipient selects to unsubscribe from domain, he will not receive any more messages from this sending domain.
- Tag level: Sometimes you need to separate traffic by types, for example provide newsletter mailings, security updates mailings and so on.
  Recipients may want to unsubscribe from your newsletters but still receive security updates.
  For this purpose you can use tags: mark your messages by setting approriate ``X-Mailgun-Tag`` header and use
  special ``%tag_unsubscribe_url%`` variable (see below).
- Mailing Lists level: If a recipient unsubscribes from a Mailing List, they will still be a member of the Mailing List but will be flagged as unsubscribed and Mailgun will no longer send messages from that Mailing List to the unsubscribed recipient.

**Auto-Handling**

You can enable Mailgun's Unsubscribe functionality by turning it on in the settings area for your
domain. We will automatically prevent future emails being sent to recipients that have unsubscribed.
You can edit the unsubscribed address list from your Control Panel or through the API.

.. note:: Before enabling, you will need to configure the required DNS entries provided in your Control Panel.

Mailgun provides you with several unsubscribe variables:

.. container:: ptable

 ==============================    ====================================================================
 Variable                          Description
 ==============================    ====================================================================
 %unsubscribe_url%                 link to unsubscribe recipient from all messages sent by given domain
 %tag_unsubscribe_url%             link to unsubscribe from all tags provided in the message
 %mailing_list_unsubscribe_url%    link to unsubscribe from future messages sent to a mailing list
 ==============================    ====================================================================

If you include these variables in your emails, any recipient that clicks on the
url will be automatically unsubscribed and those email addresses will be blocked
from receiving future emails from that domain or message tag as appropriate.

Mailgun can automatically provide an unsubscribe footer in each email you send. You can customize
your unsubscribe footer by editing the settings in the Control Panel.

To enable/disable unsubscribes programmatically per message you can do the following:

- Enable unsubscription feature for your domain.
- Remove text in the html and text footer templates so they won't be appended automatically.
- Insert a variable in the html and text bodies of your email when you need unsubscribe links.
- This variable will be replaced by the corresponding unsubscribe link.

In the ``Suppressions`` tab of the Control Panel or through the API you can also:

- View/get a list of unsubscribed addresses.
- Remove an unsubscribed address from the list.
- Add a new unsubscribed address.

Take a look at :ref:`Unsubscribes section <api-unsubscribes>` of the API reference
to learn how to programmatically manage lists of unsubscribed users.

**Unsubscribes Webhook**

You can specify webhook URLs programmatically using the :ref:`api-webhooks` API.
When a user unsubscribes, Mailgun will invoke ``unsubscribed`` webhook with the following `webhooks payload`_.

.. _um-tracking-spam-complaints:

Tracking Spam Complaints
========================

Mailgun automatically keeps track of every time a recipient complains that a
message is spam.

You can see when complaints happen in the ``Logs`` tab or see counters of complaints, aggregated by tags, in the ``Analytics`` tab of the Control Panel.  In addition, you can be notified through a webhook or get the data programmatically through the :ref:`Events API <api-events>` or the :ref:`Complaints API <api-complaints>`.

Email service providers ("ESPs") are very sensitive to users clicking on spam
complaint buttons and it's important to monitor that activity to maintain a
good sending reputation. While, not every ESP supports Feedback Loop ("FBL")
notifications, we make sure that you get data on all of the ones that do.
We will remove recipients from future messages if a complaint has been filed
by that recipient. This is necessary to maintain your reputation and not have
your emails automatically sent to spam folders.

Spam Complaint tracking is always enabled.

Mailgun provides :ref:`Spam complaints API <api-complaints>` to programmatically
manage the lists of users who have complained.

**Spam Complains Webhook**

You can specify webhook URLs programmatically using the :ref:`api-webhooks` API.
When a user reports one of your emails as spam, Mailgun will invoke ``complained`` webhook with the following `webhooks payload`_.

.. _um-tracking-failures:

Tracking Failures
=================

Mailgun tracks all delivery failures.
Failures consist of both Hard Bounces (permanent failures) and Soft Bounces (temporary failures).

An email message is said to "bounce" if it is rejected by the recipient SMTP server.

With respect to failure persistence Mailgun classifies bounces into the
following two groups:

- Hard bounces (permanent failure): Recipient is not found and the recipient
  email server specifies the recipient does not exist. Mailgun stops attempting
  delivery to invalid recipients after one Hard Bounce. These addresses are
  added to the "Bounces" table in the ``Suppressions`` tab of your Control Panel and Mailgun
  will not attempt delivery in the future.
- Soft bounces (temporary failure): Email is not delivered because the mailbox
  is full or for other reasons. These addresses are not added to the "Bounces" table in
  the ``Suppressions`` tab.

With respect to when the recipient SMTP server rejected an incoming message
Mailgun classifies bounces into the following two groups:

- Immediate bounce: An email message is rejected by the recipient SMTP server
  during the SMTP session.
- Delayed (asynchronous) bounce: The recipient SMTP server accepts an email
  message during the SMTP session. After some time it will then send a
  Non-Delivery Report email message to the message sender.

.. note:: In the case of a bounce Mailgun will retry to deliver the message
 only if the bounce was both Immediate and Soft. After several unsuccessful
 attempts Mailgun will quit retrying in order to maintain your sending
 reputation.

.. warning:: Mailgun can track delayed bounces but only if the domain, that the
 email message was sent from, has MX records pointing to Mailgun. Otherwise NDR
 email messages won't reach Mailgun. Please refer to
 :ref:`Verifying Your Domain <verifying-your-domain>` for details on how to do that.

You can see when bounces happen in the ``Logs`` tab or see counters of
bounces, aggregated by tags, in the ``Analytics`` tab of the Control Panel. In addition, you can be
notified through a webhook or get the data programmatically through the
:ref:`Events API <api-events>` or the :ref:`Bounces API <api-bounces>`.

Mailgun provides :ref:`Bounces API <api-bounces>` to programmatically
manage the lists of hard bounces.

**Permanent Failure Webhook**

There are a few reasons why Mailgun needs to stop attempting to deliver messages and drop them.
The most common reason is that Mailgun received a Hard bounce or repeatedly received Soft bounces
and continuing attempting to deliver may hurt your reputation with the receiving ESP.
Also, if the address is on one of the 'do not send lists' because that recipient
had previously bounced, unsubscribed, or complained of spam, we will not attempt delivery and drop the message.
If one of these events occur we will POST the following `webhooks payload`_ to your ``permanent_fail`` URLs.
You can specify webhook URLs programmatically using the :ref:`api-webhooks` API.

**Temporary Failure Webhook**

If Mailgun got a Soft bounce (temporary failure) we will POST the following `webhooks payload`_ to your ``temporary_fail`` URLs.
You can specify webhooks URLs programmatically using the :ref:`api-webhooks` API.


.. _um-tracking-deliveries:

Tracking Deliveries
===================

Mailgun tracks all successful deliveries of messages. A successful delivery occurs when the recipient email server responds that it has accepted the message.

You can see when deliveries happen in the ``Logs`` tab.  In addition, you can be notified through a webhook when a message is delivered or get the data programmatically through the :ref:`Events API <api-events>`.

**Delivered Event Webhook**

You can specify a webhook URL programmatically using the :ref:`api-webhooks` API
to be notified every time a message is delivered.
If the message is successfully delivered to the intended recipient,
we will POST the following `webhooks payload`_ to your ``delivered`` URLs

.. _stats:

Stats
=====

Stats provide you with the summary of the events that occur with your messages and can be aggregated by tag, see `Tagging`_ above.

You can see your current statistics in the Control Panel, or download them using :ref:`the API <api-stats>`

Receiving, Forwarding and Storing Messages
*******************************************

Mailgun allows you to receive emails through Routes. Routes will accept emails and then perform an action which can include:

* Forwarding the email to a different email address.
* POSTing the data in the email to a URL.
* Storing the email temporarily for subsequent retrieval through a GET request.

.. _um-routes:

Routes
======

You can define a list of routes to handle incoming emails. This idea of routes is
borrowed from MVC web frameworks like Django or Ruby on Rails: if a message matches
a route expression, Mailgun can forward it to your application via HTTP or
to another email address or store the message temporarily (3 days) for subsequent retrieval.

You can define routes visually in the Control Panel, or programmatically using
:ref:`the Routes API. <api_routes>`

A Route is a pair of filter+action. Each incoming message is passed to a filter
expression, and if it evaluates to true, the action is executed.

Each Route can be assigned a priority. Routes are evaluated in the order of priority, with lower numbers having a higher priority. The default is for all Routes to be evaluated (even if a higher priority Route is triggered). To avoid this you can use a ``stop()`` action (see below).

Here's a more formal list of route properties:

.. container:: ptable

 ==================    =============================================================================================================
 Field                 Description
 ==================    =============================================================================================================
 Priority              Integer indicating the priority of route execution. Lower numbers have higher priority.
 Filter                Filters available in routes - ``match_recipient() match_header() catchall()`` (see below for description).
 Actions               Type of action to take when a filter is triggered - ``forward() store() stop()`` (see below for description).
 Description           Arbitrary string to describe the route (shown in the Control Panel UI)
 ==================    =============================================================================================================

.. note:: The length of the Filter or Action fields cannot exceed 4k. If you need more actions or filters than is allowed under the 4k limit,
          you can add additional routes. Multiple routes with the same Filter expression are allowed. This will allow you to add many more Actions
          for the same Filter but spread across multiple route entries.

Route Filters
~~~~~~~~~~~~~

Route filters are expressions that determine when an action is triggered. You can create a filter based on the recipient of the incoming email, the headers in the incoming email or use a catch-all filter. Filters support regular expressions in the pattern to give you a lot of flexibility when creating them.

**match_recipient(pattern)**

Matches the SMTP recipient of the incoming message against the regular expression pattern.
For example this filter will match messages going to foo@bar.com::

    match_recipient("foo@bar.com")

You can use Python-style regular expression in your filter.
For example, this will match all messages coming to any recipient at @bar.com::

    match_recipient(".*@bar.com")

Another example, handling plus addressing for a specific recipient::

	match_recipient("^chris\+(.*)@example.com$")

Mailgun supports regexp captures in filters. This allows you to use captured values
inside of your actions. The example below captures the local name (the part of email before @)
and passes it as a ``mailbox`` parameter to an application URL::

    route filter : match_recipient("(.*)@bar.com")
    route action : forward("http://myhost.com/post/?mailbox=\1")


You can use named captures as well::

    route filter : match_recipient("(?P<user>.*?)@(?P<domain>.*)")
    route action : forward("http://mycallback.com/domains/\g<domain>/users/\g<user>")


**match_header(header, pattern)**

Similar to ``match_recipient`` but instead of looking at a message recipient, it applies
the pattern to an arbitrary MIME header of the message.

The example below matches any message with a word "support" in its subject::

    match_header("subject", ".*support")

The example below matches any message against several keywords::

	match_header('subject', '(.*)(urgent|help|asap)(.*)')

The example below will match any messages deemed spam (if spam filtering is enabled)::

	match_header('X-Mailgun-Sflag', 'Yes')

**match_recipient(pattern) AND match_header(header, pattern)**

The example below will match any recipient for a domain, then match if the message is in English::

	match_recipient('^(.*)@example.com$') and match_header("Content-Language", "^(.*)en-US(.*)$")

**catch_all()**

Matches if no preceeding routes matched. Usually you need to use it in a route
with a lowest priority, to make sure it evaluates last.


Route Actions
~~~~~~~~~~~~~

If a route expression evaluates to true, Mailgun executes the corresponding action.
Currently you can use the following three actions in your routes: ``forward()``, ``store()`` and ``stop()``.

**forward(destination)**

Forwards the message to a specified destination, which can be another email address or a URL.
A few examples::

    forward("mailbox@myapp.com")
    forward("http://myapp.com/messages")

You can combine multiple destinations separating them by a comma::

    forward("http://myapp.com/messages, mailbox@myapp.com")

.. note:: If you forward messages to another email address, then you should disable click tracking, open tracking and unsubscribes, by editing your domain settings in the Control Panel. If these features are enabled, the content of each message is modified by Mailgun before forwarding, which invalidates the DKIM signature. If the message comes from a domain publishing a DMARC policy (like Yahoo! Mail), the message will be rejected as spam by the forwarding destination.

**store(notification endpoint)**

Stores the message temporarily (for up to 3 days) on Mailgun's servers so that you can retrieve it later.  This is helpful for large attachments that may cause time-outs or if you just want to retrieve them later to reduce the frequency of hits on your server.

You can specify a URL and we will notify you when the email arrives along with a URL where you can use to retrieve the message::

    store(notify="http://mydomain.com/callback")

If you don't specify a URL with the notify parameter, the message will still be stored and you can get the message later through the :ref:`Messages API <api-sending-messages>`. You can see a full list of parameters we will post/return to you below.

**stop()**

Simply stops the priority waterfall so the subsequent routes will not be evaluated. Without a stop() action executed, all lower priority Routes will also be evaluated.

Receiving Messages via HTTP through a forward() action
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When you specify a URL of your application as a route destination through a forward() action, Mailgun will perform an
HTTP POST request into it using one of two following formats:

- Fully parsed: Mailgun will parse the message, transcode it into UTF-8 encoding, process attachments,
  and attempt to separate quoted parts from the actual message. This is the preferred option.
- Raw MIME: message is posted as-is. In this case you are responsible for parsing MIME.
  To receive raw MIME messages, the destination URL must end with ``mime``.

For Route POSTs, Mailgun listens for the following codes from your server and reacts accordingly:

* If Mailgun receives a ``200 (Success)`` code it will determine the webhook POST is successful and not retry.
* If Mailgun receives a ``406 (Not Acceptable)`` code, Mailgun will determine the POST is rejected and not retry.
* For any other code, Mailgun will retry POSTing according to the schedule below for Webhooks other than the delivery notification.

If your application is unable to process the webhook request but you do not return a 406 error code, Mailgun will
retry (other than for delivery notification) during 8 hours at the following intervals before stop trying:
10 minutes, 10 minutes, 15 minutes, 30 minutes, 1 hour, 2 hour and 4 hours.

Below are two tables of HTTP parameters that you can expect to be posted into your application through a forward() action.

.. note:: In addition to these parameters Mailgun will post `all` MIME headers.

.. note:: Do not rely on the ``body-plain``, ``stripped-text``, and ``stripped-signature`` fields for HTML sanitization. These fields
          merely provide content from the text/plain portion of an incoming message. This content may contain unescaped HTML.

Parsed Messages Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. container:: ptable

 ==================    =========    ============================================================================================================
 Parameter             Type         Description
 ==================    =========    ============================================================================================================
 recipient             string       recipient of the message as reported by ``MAIL TO`` during SMTP chat.
 sender                string       sender of the message as reported by ``MAIL FROM`` during SMTP chat. Note: this value may differ
                                    from ``From`` MIME header.
 from                  string       sender of the message as reported by ``From`` message header, for example "Bob <bob@example.com>".
 subject               string       subject string.
 body-plain            string       text version of the email. This field is always present.
                                    If the incoming message only has HTML body, Mailgun will create a text representation for you.
 stripped-text         string       text version of the message without quoted parts and signature block (if found).
 stripped-signature    string       the signature block stripped from the plain text message (if found).
 body-html             string       HTML version of the message, if message was multipart. Note that all parts of the message will be posted,
                                    not just text/html. For instance if a message arrives with "foo" part it will be posted as "body-foo".
 stripped-html         string       HTML version of the message, without quoted parts.
 attachment-count      int          how many attachments the message has.
 attachment-x          string       attached file ('x' stands for number of the attachment). Attachments are handled as file uploads,
                                    encoded as ``multipart/form-data``.
 timestamp             int          number of seconds passed since January 1, 1970 (see `securing webhooks`_).
 token                 string       randomly generated string with length 50 (see `securing webhooks`_).
 signature             string       string with hexadecimal digits generate by HMAC algorithm (see `securing webhooks`_).
 message-headers       string       list of all MIME headers dumped to a json string (order of headers preserved).
 content-id-map        string       JSON-encoded dictionary which maps Content-ID (CID) of each attachment to the corresponding ``attachment-x`` parameter. This allows you to map posted attachments to tags like ``<img src='cid'>`` in the message body.
 ==================    =========    ============================================================================================================

Note the ``message-headers`` parameter. It was added because not all web frameworks support multi-valued keys parameters. For example Ruby on Rails requires a special syntax to post params like that: you need to add `[]` to a key to collect it's values on the server side as an array. Below is a Ruby on Rails example of obtaining MIME headers via ``message-headers`` parameter:

.. code-block:: rb

 def mailgun_posted_params
   message_headers = JSON.parse(params["message-headers"])
   message_headers.each do |header|
     key, value = header
     puts "header key: #{key}, header value: #{value}"
   end
 end


MIME Messages Parameters
~~~~~~~~~~~~~~~~~~~~~~~~

.. container:: ptable

 ===========    ======    ============================================================================================================
 Parameter      Type      Description
 ===========    ======    ============================================================================================================
 recipient      string    recipient of the message.
 sender         string    sender of the message as reported by SMTP MAIL FROM.
 from           string    sender of the message as reported by ``From`` message header, for example "Bob <bob@example.com>".
 subject        string    subject string.
 body-mime      string    full MIME envelope. You will need a MIME parsing library to process this data.
 timestamp      int       number of seconds passed since January 1, 1970 (see `securing webhooks`_).
 token          string    randomly generated string with length 50 (see `securing webhooks`_).
 signature      string    string with hexadecimal digits generate by HMAC algorithm(see `securing webhooks`_).
 ===========    ======    ============================================================================================================

.. note:: To receive raw MIME messages and perform your own parsing you must configure a route with a
          URL ending with "mime", like http://myhost/post_mime.

.. note:: Consider using `<http://bin.mailgun.net>`_ to debug and play with your routes. This tool allows you to forward
          incoming messages to a temporary URL and inspecting the posted data. No programming required.


Storing and Retrieving Messages
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

When storing an email through a ``store()`` action in a Route, you can chose to be notified when the message is stored by including a URL with the notify parameter when setting up the store action or you can retrieve the message later by searching for the message through the :ref:`Events API <api-events>` and retrieving it through the :ref:`Messages API <api-sending-messages>`.

If you set a URL to be posted when the message is received (``store(notify="http://mydomain.com/callback")``), or retrieve the message later through a GET request to the :ref:`Messages API <api-sending-messages>`, the following parameters are posted/returned in JSON.

          .. container:: ptable

           ==================    =========    ============================================================================================================
           Parameter             Type         Description
           ==================    =========    ============================================================================================================
           domain                string       domain name this message was received for.
           recipient             string       recipient of the message as reported by ``MAIL TO`` during SMTP chat.
           sender                string       sender of the message as reported by ``MAIL FROM`` during SMTP chat. Note: this value may differ
                                              from ``From`` MIME header.
           from                  string       sender of the message as reported by ``From`` message header, for example "Bob Lee <blee@mailgun.net>".
           subject               string       subject string.
           body-plain            string       text version of the email. This field is always present.
                                              If the incoming message only has HTML body, Mailgun will create a text representation for you.
           stripped-text         string       text version of the message without quoted parts and signature block (if found).
           stripped-signature    string       the signature block stripped from the plain text message (if found).
           body-html             string       HTML version of the message, if message was multipart. Note that all parts of the message will be posted,
                                              not just text/html. For instance if a message arrives with "foo" part it will be posted as "body-foo".
           stripped-html         string       HTML version of the message, without quoted parts.
           attachments           string       contains a json list of metadata objects, one for each attachment, see below.
           message-url           string       a URL that you can use to get and/or delete the message. Only present in the payload posted to the notification URL.
           timestamp             int          number of seconds passed since January 1, 1970 (see `securing webhooks`_).
           token                 string       randomly generated string with length 50 (see `securing webhooks`_).
           signature             string       string with hexadecimal digits generate by HMAC algorithm (see `securing webhooks`_).
           message-headers       string       list of all MIME headers dumped to a json string (order of headers preserved).
           content-id-map        string       JSON-encoded dictionary which maps Content-ID (CID) of each attachment to the corresponding ``attachment-x`` parameter. This allows you to map posted attachments to tags like ``<img src='cid'>`` in the message body.
           ==================    =========    ============================================================================================================

The attachments JSON contains the following items.

.. container:: ptable

    ==================    =========    ============================================================================================================
    Parameter             Type         Description
    ==================    =========    ============================================================================================================
    size                  integer      indicates the size of the attachment in bytes.
    url                   string       contains the url where the attachment can be found. This does not support DELETE.
    name                  string       the name of the attachment
    content-type          string       the content type of the attachment
    ==================    =========    ============================================================================================================

Alternatively, you can choose the following parameters when the ``Accept`` header is set to ``message/rfc2822``

            ===========    ======    ============================================================================================================
            Parameter      Type      Description
            ===========    ======    ============================================================================================================
            recipient      string    recipient of the message.
            sender         string    sender of the message as reported by SMTP MAIL FROM.
            from           string    sender of the message as reported by ``From`` message header, for example "Bob <bob@example.com>".
            subject        string    subject string.
            body-mime      string    full MIME envelope. You will need a MIME parsing library to process this data.
            ===========    ======    ============================================================================================================


API Routing Samples
~~~~~~~~~~~~~~~~~~~

You can define routes programmatically using our :ref:`HTTP API <api_routes>`
like in these examples.

Create a route of the highest priority with multiple actions:

.. include:: samples/create-route.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Route has been created",
    "route": {
        "description": "Sample route",
        "created_at": "Wed, 15 Feb 2012 13:03:31 GMT",
        "actions": [
            "forward(\"http://myhost.com/messages/\")",
            "stop()"
        ],
        "priority": 0,
        "expression": "match_recipient(\".*@samples.mailgun.org\")",
        "id": "4f3bad2335335426750048c6"
    }
  }

.. note:: Higher priority routes are handled first. Smaller numbers indicate
          higher priority. Default is 0.


Listing routes:

.. include:: samples/get-routes.rst

Sample response:

.. code-block:: javascript

  {
    "total_count": 266,
    "items": [
        {
            "description": "Sample route",
            "created_at": "Wed, 15 Feb 2012 12:58:12 GMT",
            "actions": [
                "forward(\"http://myhost.com/messages/\")",
                "stop()"
            ],
            "priority": 0,
            "expression": "match_recipient(\".*@samples.mailgun.org\")",
            "id": "4f3babe4ba8a481c6400476a"
        }
    ]
  }

Access the route by id:

.. include:: samples/get-route.rst

Sample response:

.. code-block:: javascript

  {
    "route": {
        "description": "Sample route",
        "created_at": "Wed, 15 Feb 2012 13:03:31 GMT",
        "actions": [
            "forward(\"http://myhost.com/messages/\")",
            "stop()"
        ],
        "priority": 0,
        "expression": "match_recipient(\".*@samples.mailgun.org\")",
        "id": "4f3bad2335335426750048c6"
    }
  }


Credentials
===========

Mailgun gives you the ability to programmatically create SMTP credentials which can be used to send mail. SMTP credentials can be used to relay email, through Mailgun, using the SMTP protocol.

SMTP Credentials API Examples
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Listing all credentials:

.. include:: samples/get-credentials.rst

Sample response:

.. code-block:: javascript

 {
   "total_count": 2,
   "items": [
     {
       "size_bytes": 0,
       "created_at": "Tue, 27 Sep 2011 20:24:22 GMT",
       "mailbox": "user@samples.mailgun.org"
       "login": "user@samples.mailgun.org"
     },
     {
       "size_bytes": 0,
       "created_at": "Thu, 06 Oct 2011 10:22:36 GMT",
       "mailbox": "user@samples.mailgun.org"
       "login": "user@samples.mailgun.org"
     }
   ]
 }

Creating a new SMTP credential:

.. include:: samples/create-credentials.rst

.. code-block:: javascript

  {
    "message": "Created 1 credentials pair(s)"
  }

Updating the password for a given credential:

.. include:: samples/change-pwd-credentials.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Password changed"
  }

Deleting a given credential:

.. include:: samples/delete-credentials.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Credentials have been deleted",
   "spec": "alice@samples.mailgun.org"
 }

.. _um-spam-filter:

Spam Filter
===========

If you are receiving email, you need spam filtering. Mailgun spam filtering is powered
by an army of SpamAssassin machines. Mailgun gives you three ways to configure spam
filtering. You can select the appropriate option in the Control Panel when you click
on a domain name in the ``Domains`` tab.

- Disabled (default)
- Delete spam (spam is removed and you won’t see it)
- Mark spam with MIME headers and you decide what to do with it

If you chose option 3, there are four headers we provide for you: ``X-Mailgun-Sflag``,
``X-Mailgun-Sscore``, ``X-Mailgun-Dkim-Check-Result`` and ``X-Mailgun-Spf``.

``X-Mailgun-Sflag``
	Inserted with the value 'Yes' if the message was classified as a spam.

``X-Mailgun-Sscore``
	A 'spamicity' score that you can use to calibrate your own filter. Inserted for every
	message checked for a spam. The score ranges from low negative digits (very unlikely to be spam)
	to 20 and occasionally higher (very likely to be spam).

	At the time of writing this, we are filtering spam at a score of around 5.0 but we are
	constantly calibrating this.

``X-Mailgun-Dkim-Check-Result``
	If DKIM is used to sign an inbound message, Mailgun will attempt DKIM validation,
	the results will be stored in this header.
	Possible values are: 'Pass' or 'Fail'

``X-Mailgun-Spf``
    Mailgun will perform an SPF validation, and results will be stored in this header.
    Possible values are: 'Pass', 'Neutral', 'Fail' or 'SoftFail'.


Email Verification
*******************

Mailgun’s email verification service is a multi-point check of an email address to ensure it exists,
is not a high-risk address, is not disposable and more. Maintaining a list of verified and deliverable
email addresses is important in order to reduce the ratio of bounced emails and prevent
negative impacts to your reputation as a sender.

Mailgun offers verifications in three forms: performing a **single verification**, verifying the email
addresses of the members of a **mailing list**, and verifying lists in **bulk** via CSV.

Mailgun’s revamp of our initial verification service now offers a definitive **result** of our verification
check and a **risk** assessment of the given address. The **result** parameter will return one of four
values, described in the table below. This is the definitive answer for whether or not a sender
should use an address and replaces the **is_valid** parameter in v3 verifications.


.. list-table::
    :widths: 15 255
    :stub-columns: 1

    * - deliverable
      - An address that has a high likelihood of being legitimate and has passed all verification checks.
    * - undeliverable
      - An address that is confirmed invalid and should be discarded from a list or corrected.  Sending to this address may damage sender reputation.
    * - do_not_send
      - An address that may damage sender reputation if messages or sent.
    * - unknown
      - Unable to make a decision about the validity of the supplied address, usually due to a timeout when attempting to verify an address.

The **risk** parameter will return one of three values, described in the table below. This helps
senders understand how sending to an address may impact reputation or the potential impact of
allowing a user onto a platform.


.. list-table::
    :widths: 15 255
    :stub-columns: 1

    * - low
      - An address that is likely legitimate and sending has a low likelihood of damaging reputation if the address has been obtained in a legitimate manner - we’ll make this assumption based on well known domains (hotmail.com, gmail.com, etc)
    * - medium
      - The default or neutral state for risk calculation.  An address that isn’t deemed a low or high risk will default to a medium risk.
    * - high
      - An address that has a high risk of damaging sender reputation or when used for verification should be challenged for validity.

Role-based Address Check
========================

For all verification requests, we provide whether an address is a role-based address (e.g.
postmaster@, info@, etc.). These addresses are typically distribution lists with a much higher
complaint rate since unsuspecting users on the list can receive a message they were not
expecting.

Disposable Mailbox Detection
============================

Disposable mailboxes are commonly used for fraudulent purposes. Mailgun can detect whether
the address provided is on a known disposable mailbox provider and given the determination,
you may choose how to proceed based on your own risk decisions. It is important to check for
disposable mailboxes to ensure communication between user and web application.

List Verification
===============

The members of a Mailing List that exists within Mailgun can be verified with the click of a button in
the Control Panel as demonstrated below:

.. figure::  _static/img/validation_control_panel.png
    :align: center
    :width: 700 px

Note that the existing limitation of a maximum of 2.5 million members still exists for Mailing Lists.

Bulk Verification
===============

.. figure:: _static/img/validation_bulk_list_control_panel.png
    :align: center
    :width: 700px

A CSV no greater than 25 MB can be submitted via API or Control Panel for verification *en masse*.
In addition, a gzip no greater than 25 MB containing a single CSV of whatever size can also
be submitted which greatly increases the potential size of the list that can take.

Note that the following conditions must be met:
    - The column of email addresses must be preceded with a single cell with the text email or email_address in it. Any other columns will be ignored. This text must be all lowercase.
    - The size of the CSV must not exceed 25 MB, and the size of the gzip must not exceed 25 MB.
    - For best results, do not include a header line in the CSV.
    - Make sure the contents of the CSV do not contain any non-ASCII characters. The character set used must be ASCII or UTF-8.


Inbox Placement
*******************

The Inbox Placement product is an email deliverability tool that provides visibility into where an email will land in the
mailbox. While mailbox providers (i.e. Gmail, Yahoo, Hotmail, etc.) will provide feedback that an email is delivered or not
(i.e. delivery), they do not provide insight into where in the mailbox the email landed (i.e. deliverability). Specifically,
an email can land in the inbox, spam/junk folder, or in the case of Gmail, specific tabs within the inbox. The Inbox
Placement product utilizes a mechanism known as seed testing to provide visibility in to where emails are landing.

Seed testing roughly works as follows:

1. Mailgun manages a list of seed mailbox accounts with mailbox providers in the market.
2. A test email is sent to the seed list.
3. Mailgun tracks where the test email landed for each mailbox in the seed list and returns the results to the user. The results contain the following information:

   a. "Spam", "Missed", or "Inbox" placement (and which tab for Gmail mailboxes) for each individual mailbox in our seed list.
   b. A rollup percentage summary for each mailbox provider. The rollup aggregates the results from each mailbox.
   c. A rollup percentage summary for each seed test. The rollup aggregates the results from each mailbox provider.

Creating a Test
===============

Creating and running an Inbox Placement test is simple and only requires minimal configuration in either the control panel or the API:

*Required*

- A sending domain to send a test from. If you haven't set up a domain please see the `Verifying Your Domain`_ section.
- A message subject.
- A message body.

*Optional*

- Provide a 'from' address prefix. Mailgun provides 'user' by default.

Once configured, a test can be performed. Please wait for results to come in.

.. _smtp:

SMTP Protocol
*************

In addition to our HTTP API, Mailgun servers supports the standard SMTP protocol... You can send using SMTP with or without TLS.

Please consult a standard library documentation for language of your choice to learn how to use the SMTP protocol. Below are some helpful links for a few popular languages:

- `Ruby SMTP`_
- `Python SMTP`_
- `JavaMail API`_

.. _Ruby SMTP: http://ruby-doc.org/stdlib/libdoc/net/smtp/rdoc/classes/Net/SMTP.html
.. _Python SMTP: http://docs.python.org/library/smtplib.html
.. _JavaMail API: http://java.sun.com/products/javamail/javadocs/index.html

SMTP Relay
==========

You can also configure your own mailserver to relay mail via Mailgun as shown below. All of them require these three variables which you can look up in the Control Panel:

- Your SMTP username
- Your SMTP password
- SMTP host name mailserver (these instructions will use smtp.mailgun.org as an example)

You have an SMTP username and password for each domain you have at Mailgun.  To send mail from a particular domain, just use the appropriate credentials.

**Postfix Instructions**

You have to configure a relay host with SASL authentication like shown below::

    # /etc/postfix/main.cf:

    mydestination = localhost.localdomain, localhost
    relayhost = [smtp.mailgun.org]:587
    smtp_sasl_auth_enable = yes
    smtp_sasl_password_maps = static:postmaster@mydomain.com:password
    smtp_sasl_security_options = noanonymous

    # TLS support
    smtp_tls_security_level = may
    smtpd_tls_security_level = may
    smtp_tls_note_starttls_offer = yes

When using TLS encryption, make sure Postfix knows where to locate the CA database for your Linux distribution::

    smtpd_tls_key_file = /etc/ssl/private/smtpd.key
    smtpd_tls_cert_file = /etc/ssl/certs/smtpd.crt
    smtpd_tls_CApath = /etc/ssl/certs

.. Note:: You can use SMTP Credentials, but not your Control Panel password.

**Exim Instructions**

For more information see Exim's documentation for authenticated outgoing SMTP. You need to configure "smarthost" for your Exim setup.
::

	# In your exim.conf:
	# In routes configuration:
	mailgun:
  		driver = manualroute
  		domains = ! +local_domains
  		transport = mailgun_transport
  		route_list = * smtp.mailgun.org byname

	# In transports configuration:
	mailgun_transport:
  		driver=smtp
  		hosts_require_auth = <; $host_address
  		hosts_require_tls = <; $host_address

Also make sure to configure login credentials (in your /etc/exim/passwd.client)::

*.mailgun.org:username:password

**Sendmail Instructions**

Define the smarthost in your sendmail.mc before mailer definitions::

	## Mailgun
	define(`SMART_HOST', `smtp.mailgun.org')dnl
	FEATURE(`authinfo', `hash /etc/mail/authinfo')dnl
	# optional, see http://www.sendmail.org/m4/features.html before enabling:
	# FEATURE(`accept_unresolvable_domains')dnl
	# FEATURE(`accept_unqualified_senders')dnl
	# execute: make -C /etc/mail
	## Mailgun

Specify login credentials in your authinfo::

	AuthInfo:smtp.mailgun.org "U:<LOGIN>" "P:<PASSWORD>" "M:PLAIN"

Don't forget to run the following command and then restart sendmail::

	make -C /etc/mail

Using Standard Email Clients
==============================

Standard email clients like Thunderbird or Outlook can also be used to send mail.

Settings for sending mail::

	SMTP server: smtp.mailgun.org

.. Note:: Use a full address like "user@mymailgundomain.com" as a login for SMTP. SSL or TLS are supported.

.. _tls-sending:

TLS Sending Connection Settings
*******************************

For message delivery, Mailgun exposes two flags that will work at the domain level or message level
(message level will override domain level) that allow you to control how messages are delivered. See
documentation for sending messages and domains for examples on how these fields can be updated.

**require tls**: If set to `True` this requires the message only be sent over
a TLS connection. If a TLS connection can not be established,
Mailgun will not deliver the message. If set to `False`, Mailgun will still
try and upgrade the connection, but if Mailgun can not, the message will be
delivered over a plaintext SMTP connection. The default is False.

**skip verification**: If set to `True`, the certificate and hostname will not be
verified when trying to establish a TLS connection and Mailgun will accept any
certificate during delivery. If set to `False`, Mailgun will verify the certificate
and hostname. If either one can not be verified, a TLS connection will not be
established. The default is `False`.

To help you better understand the configuration possibilities and potential issues, take a look at the
following table. Take into account the type of threat you are concerned with when making your decision
on how to configure sending settings. By default, `require-tls` and `skip-verification` are `false`.

=========== ================= ======== ======================== ============================= ===========================
require-tls skip-verification TLS      TLS Active Attack (MITM) TLS Passive Attack (Capture)  Passive Plaintext Capture
=========== ================= ======== ======================== ============================= ===========================
false       false             Attempt  Not Possible             Not Possible                  Possible via downgrade
false       true              Attempt  Possible                 Not Possible                  If STARTTLS not offered
true        false             Required Not Possible             Not Possible                  Not Possible
true        true              Required Possible                 Not Possible                  Not Possible
=========== ================= ======== ======================== ============================= ===========================

Additionally the following fields are available in your logs under `delivery-status` to indicate how the message was delivered:

===================== =============================================================================
Field                 Description
===================== =============================================================================
tls                   Indicates if a TLS connection was used or not when delivering the message.
certificate-verified  Indicates if we verified the certificate or not when delivering the message.
mx-host               Tells you the MX server we connected to to deliver the message.
===================== =============================================================================

.. _Internationalization:

Internationalization
********************

**Internationalized Domain Names (IDN)**

Our messages API supports sending to addresses that leverage internationalized domain names in
the `to` and `from` fields.  When necessary, Mailgun will automatically convert the domains to
the ASCII equivalent through the use of `punycode <https://en.wikipedia.org/wiki/Punycode>`_

At this time, sending domains cannot be created using non-ASCII characters.

**Internationalized Email Addresses (SMTPUTF8)**

Mailgun supports internationalized email addresses through the use of the
`SMTPUTF8 <https://tools.ietf.org/html/rfc6531>`_ extension.  An internationalized email address
will contain a non-ASCII character in the local-part portion of the email address and may also
use an internationalized domain name.

Mailgun supports internationalized email addresses in the following portions of our product:

- Outgoing Messages (HTTP API / SMTP endpoint)
- Inbound SMTP
- Routes (match_recipient and forward action)
- Mailing Lists (list names and member addresses)
- Email Verification
- Suppressions Lists

In order to send messages to an internationalized email address, the receiving mailbox provider
must support the SMTPUTF8 extension.
