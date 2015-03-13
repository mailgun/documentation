.. _quickstart-events:

How to start tracking email events
==================================

Once you start sending and receiving messages, it's important to track what's happening with them. Mailgun provides a variety of methods to access data about your emails, which you can read more about in the :ref:`tracking-messages` section of the :ref:`user-manual`. Below is a brief summary of Events, the Events API and Events Webhooks.

Events
------

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
          "https://api.mailgun.net/v3/samples.mailgun.org/events/W3siY...",
      "previous":
          "https://api.mailgun.net/v3/samples.mailgun.org/events/Lkawm..."
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
