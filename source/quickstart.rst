.. _quickstart:

Quickstart Guide
=================

Verifying Your Domain
-----------------------

For the best experience using Mailgun, we recommend you add a domain you own (instead of a mailgun subdomain) and verify it by setting up the SPF and DKIM records we provide at your DNS provider. These DNS records simultaneously allow Mailgun to deliver email on your behalf and **prove that you are an authorized sender for the domain**.  

Benefits of verifying your domain
*********************************

- Complete white labeling of your emails so you won't see "sent via Mailgun.org" message in your emails.
- Establishing a positive email reputation for your own domain. 
- The Mailgun reputation system is less suspicious of traffic that is being sent on verified domains and so using one reduces the likelihood of being disabled. 
- Verified domains are not subject to a sending limit of 300 emails per day.

How to verify your domain
*************************

1. Add a domain or subdomain you own in the Domains tab of your control panel.  
2. Next, add the two TXT DNS records found in your control panel at your DNS provider. You'll find these DNS records when you click on a domain under the ``Domains`` tab on the Mailgun control panel. There are two types of DNS records, ``Sending`` and ``Receiving`` records.   The two TXT records needed to verify your domain are listed under the ``Sending`` section.
3. Though not required to verify your domain, if you want Mailgun to track clicks and opens you can also add the CNAME record. MX records should also be added unless you already have MX records for your domain pointed at another email service provider.  

Once you've added the two TXT records and they've propagated, your domain will be verified.  In some instances, we may need additional information to verify your domain.  If this is the case, we will contact you to resolve the issue.

.. note::  It can take 24-48 hours for DNS changes to propagate.

If you will be creating a lot of domains, Mailgun offers an API endpoint for adding/editing/removing domains from your account. See the :ref:`api-domains` endpoint for more information.

Sending DNS Records
*******************

- SPF: Sending server IP validation. Used by majority of inbound mail servers. `SPF Information`_.
- DKIM: Like SPF, but uses cryptographic methods for validation. Supported by many inbound mail servers. `DKIM Information`_ 
- CNAME: Used for tracking opens and clicks, when enabled. :ref:`tracking-messages`

========= =========================================================== ==================== 
Type      Value                                                       Purpose    
========= =========================================================== ==================== 
TXT       "v=spf1 include:mailgun.org ~all"                           SPF (Required)
TXT       *Find this record in your Control Panel, Domains Tab*       DKIM (Required)
CNAME     "mailgun.org"                                               Tracking (Optional)
========= =========================================================== ==================== 

.. _SPF Information: http://www.openspf.org/Introduction
.. _DKIM Information: http://www.dkim.org/#introduction

Receiving DNS Records
*********************

.. warning:: Do not configure Receiving MX DNS records if you already have another provider handling inbound 
		     mail delivery.

Mail server for handling inbound messages.  `MX Information`_

========= =========================================================== ==================== 
Type      Value														  Purpose
========= =========================================================== ==================== 
MX        mxa.mailgun.org 											  Receiving (Optional)
MX        mxb.mailgun.org											  Receiving (Optional)
========= =========================================================== ==================== 

.. _MX Information: http://en.wikipedia.org/wiki/MX_record

Common DNS Provider Documentation
*********************************

Common providers are listed below. If yours is not listed, contact your DNS provider for assistance.


GoDaddy: `MX <http://support.godaddy.com/help/article/7924/adding-or-editing-mx-records?locale=en>`__ - `CNAME <http://support.godaddy.com/help/article/7921/adding-or-editing-cname-records?locale=en>`__ - `TXT <http://support.godaddy.com/help/article/7925/adding-or-editing-txt-records?locale=en>`__                       

NameCheap: `All Records <http://www.namecheap.com/support/knowledgebase/article.aspx/473/2/demo-changing-host-record-settings>`__

Network Solutions: `MX <http://www.networksolutions.com/support/mx-records-mail-servers-2/>`__ - `CNAME <http://www.networksolutions.com/support/cname-records-host-aliases-2/>`__ - `TXT <http://www.networksolutions.com/support/how-to-manage-advanced-dns-records/>`__       

Rackspace Email & Apps: `All Records <http://www.rackspace.com/apps/support/portal/1172>`__

Rackspace Cloud DNS: `Developer Guide <http://www.rackspace.com/knowledge_center/article/rackspace-cloud-dns>`__

Amazon Route 53: `Developer Guide <http://docs.aws.amazon.com/Route53/latest/DeveloperGuide/R53Console.html>`__

Digital Ocean: `Mailgun on Digital Ocean Guide <http://www.arcweb.ro/blog/2013/12/18/mailgun-on-digitalocean-dns-settings/>`__


Authentication
---------------

Mailgun uses `HTTP Basic Auth`_ for API authentication.
Use ``api`` as the user name and your API key is the password.
You can manage your API key in the 'My Account' tab of the Control Panel.

For example::

    curl --user 'api:key-3ax6xnjp29jd6fds4gc373sgvjxteol0'

.. _HTTP Basic Auth: http://en.wikipedia.org/wiki/Basic_access_authentication

Sending Messages
-----------------

You can send messages via SMTP or via Mailgun HTTP API.

**Sending Messages using Mailgun HTTP API**

This method is preferred because it doesn't require any prior knowledge of
email-specific protocols and data formats like MIME. It is also much faster
and guarantees that your messages will be properly formatted.

The HTTP API uses familiar terms like from, to, cc, bcc, subject, body, attachments and so on.
The API is RESTful so sending is as easy as making an HTTP POST request to Mailgun.

.. include:: samples/send-simple-message.rst

This will send a simple text message to two recipients. Notice how POST parameters
mimic what you would typically see in your email client.

Lets send a more complicated message, with HTML body, two attachments and "cc" and "bcc" recipients:

.. include:: samples/send-complex-message.rst

HTTP allows you to specify multiple pairs of each parameter, hence by repeating
"cc" or "to" or "attachment" parameters you specify multiple recipients,
attached files and so on.

You can find more information in the :ref:`um-sending-messages` section of the :ref:`user-manual`.

**Sending Emails via SMTP**

All mainstream programming languages have SMTP support. The examples below assume you have already assembed a proper MIME body of your message.

Send an email using Python standard SMTP library:

.. code-block:: python

   def send_message_via_smtp():
       smtp = SMTP("smtp.mailgun.org", 587)
       smtp.login(login, password)
       smtp.sendmail("sender@host", "recipient@host", mime_message_body)
       smtp.quit()

Using Ruby on Rails Action Mailer configuration:

.. code-block:: ruby

   config.action_mailer.delivery_method = :smtp
   config.action_mailer.perform_deliveries = true
   config.action_mailer.raise_delivery_errors = true
   config.action_mailer.smtp_settings = {
    	:authentication => :plain,
    	:address => "smtp.mailgun.org",
    	:port => 587,
    	:domain => "my-mailgun-domain.com",
    	:user_name => "postmaster@my-mailgun-domain.com",
    	:password => "my-password"
   }

.. note:: Your SMTP login and password can be found by clicking on your
 domain in the Domains tab of your Control Panel.

.. warning:: Avoid sending your
 SMTP password unencrypted: make sure to use SSL or STARTTLS SMTP
 facilities available for your framework/language.


Receiving and Parsing Email
---------------------------

You can define a list of routes to handle incoming emails and prioritize the sequence
of their execution. Each route consists of a filter expression and an action.
When a message is received, Mailgun evaluates the filter expression against it, and
if the expression is true, the action is executed.

Regular expressions can be used to match against message recipients or
arbitrary headers such as subject. Below are some examples of filter expressions:

================================ ===========================================================
Expression                       Description
================================ ===========================================================
match_recipient("bob@myapp.com") Returns true if the incoming message is going to bob@myapp.com.
match_recipient(".*@myapp.com")  Returns true if the incoming message is going to any user
                                 at @myapp.com.
match_header("subject", "hello") Returns true if the subject of the message contains word 'hello'.
catch_all()                      Returns true if no other route matched, to implement catch-all
                                 behaviour.
================================ ===========================================================

Supported actions:

================================= ===========================================================
Action                            Description
================================= ===========================================================
forward("http://myapp/post")      Parses the message and forwards it to a given URL.
forward("support@myapp.com")      Forwards the message to a given email address.
store(notify="http://myapp/post") Stores the message temporarily to be retrieved later.
stop()                            Stops and doesn't look at any other routes.
================================= ===========================================================

Routes can be defined and tested using the Mailgun API (in addition, to using the
Control Panel).

.. include:: samples/create-route.rst

The example above defines a new route which will forward all messages coming to
@samples.mailgun.org to http://myhost.com/messages and will stop evaluating any other routes.

Now let's look at how to build HTTP handlers for incoming messages, i.e. what needs
to be done on your end to handle a message that Mailgun forwards to your URL.

Consider this Django code:

.. code-block:: python

    # Handler for HTTP POST to http://myhost.com/messages for the route defined above
    def on_incoming_message(request):
         if request.method == 'POST':
             sender    = request.POST.get('sender')
             recipient = request.POST.get('recipient')
             subject   = request.POST.get('subject', '')

             body_plain = request.POST.get('body-plain', '')
             body_without_quotes = request.POST.get('stripped-text', '')
             # note: other MIME headers are also posted here...

             # attachments:
             for key in request.FILES:
                 file = request.FILES[key]
                 # do something with the file

         # Returned text is ignored but HTTP status code matters:
         # Mailgun wants to see 2xx, otherwise it will make another attempt in 5 minutes
         return HttpResponse('OK')

Mailgun routes are very powerful. For example, you can use regular expression captures and refer
to captured values in your destination.

To learn more about Routes, check out the :ref:`um-routes` section of the :ref:`user-manual`.

.. _quickstart-tracking:

Tracking Messages
------------------

Once you start sending and receiving messages, it's important to track what's happening with them. Mailgun provides a variety of methods to access data about your emails, which you can read more about in the :ref:`tracking-messages` section of the :ref:`user-manual`. Below is a brief summary of Events, the Events API and Events Webhooks.

**Events**

Mailgun keeps track of every event that happens to every message (both inbound and outbound) and stores this data for at least 30 days for paid accounts and 2 days for free accounts. 

Below is the table of events that Mailgun tracks.

.. container:: ptable

================= ============================================================
Event             Description
================= ============================================================
accepted          Mailgun accepted the request to send/forward the email and the message
                  has been placed in queue.
rejected          Mailgun rejected the request to send/forward the email.
delivered         Mailgun sent the email and it was accepted by the recipient
                  email server.
failed            Mailgun could not deliver the email to the recipient email server.
opened            The email recipient opened the email and enabled image  
                  viewing. Open tracking must be enabled in the Mailgun control
                  panel, and the CNAME record must be pointing to mailgun.org.
clicked           The email recipient clicked on a link in the email.  
                  Click tracking must be enabled in the Mailgun control
                  panel, and the CNAME record must be pointing to mailgun.org.
unsubscribed      The email recipient clicked on the unsubscribe link.
                  Unsubscribe tracking must be enabled in the Mailgun control
                  panel.
complained        The email recipient clicked on the spam complaint button within
                  their email client. Feedback loops enable the notification to 
                  be received by Mailgun.

stored            Mailgun has stored an incoming message
================= ============================================================

You can access Events through a few interfaces:

* Webhooks (we POST data to your URL). 
* The Events API (you GET data through the API).
* The Logs Tab of the Control Panel (GUI).

.. _quickstart-events-api:

**Events API**  

You can programmatically query and download events through the :ref:`Events API <api-events>`:

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
          "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siY...", 
      "previous": 
          "https://api.mailgun.net/v2/samples.mailgun.org/events/Lkawm..."
    }
  }

.. _quickstart-webhooks:

**Events Webhooks**

Mailgun can also make an HTTP POST to your URLs when events occur with your messages. If you would like Mailgun to POST event notifications, you need to provide a callback URL in the respective tab of the Control Panel. Webhooks are at the domain level so you can provide a unique URL for each domain by using the domain drop down selector. 

You can read more about the data that is posted in the :ref:`webhooks` section of the :ref:`user-manual`. We recommend using `<http://bin.mailgun.net>`_ for creating temporary URLs to test and debug your webhooks.


Other Goodies
--------------

In addition to sending, receiving and storing mail, Mailgun can also help
developers with the following:

- Automatic "Unsubscribe me" functionality.
- Support for email campaigns and tracking their performance.
- Bounce handling.
- Spam complaints handling.
- Spam filtering for incoming messages.
- Searchable email logs.

The list of what Mailgun can do for you is growing every day.
Please take a look at our :ref:`user-manual` to learn more.
