.. _api-stats:

Stats
=====

Mailgun collects many different events and
generates event statistics which are available in your Control Panel.
This data is also available via our stats API endpoint. The stats endpoint is available at:

.. code-block:: url

      v3/<domain>/stats


The statistics are calculated in hourly, daily and monthly resolution in UTC timezone.

.. code-block:: url

      GET /<domain>/stats/total

Returns total stats for a given domain.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 event             The type of the event. For a complete list of all events written
                   to the log see the `Event Types`_ table below. (Required)
 start             The starting time. Should be in :rfc:`2822#page-14` or
                   unix epoch format. Default: 7 days from the current time.
 end               The ending date. Should be in :rfc:`2822#page-14` or
                   unix epoch format. Default: current time.
 resolution        Can be either ``hour``, ``day`` or ``month``. Default: ``day``
 duration          Period of time with resoluton encoded. See `Duration`_ for
                   more info. If provided, overwrites the start date.
 ================= ============================================================

Data Retention
--------------

The following retention policy is applied to the statistics:

- Hourly stats are preserved for two months.
- Daily stats are preserved for a year.
- Monthly stats are stored throughout the lifespan of the domain.

Duration
--------

Duration is a string that represents a period of time with some resolution.
It has a format ``[0-9]+[m,d,h]`` where

- ``h`` - an hour
- ``d`` - a day
- ``m`` - a month

Examples:

- `24h` - a period of 24 hours (a day) with hourly resolution
- `1d` - a period of 1 day with daily resolution
- `2m` - a period of 2 months with monthly resolution

Event Types
-----------

Mailgun tracks all of the events that occur throughout the system. Below are
listed the events that you can retrieve using this API.

.. container:: ptable

 ================= ============================================================
 Event Type        Description
 ================= ============================================================
 accepted          Mailgun accepted the request to send/forward the email and the message
                   has been placed in queue.
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

Examples
--------

Get stats for 'accepted', 'delivered', and 'failed' events for the past month:

.. include:: samples/get-stats.rst

Sample response:

.. code-block:: javascript

   {
     "end": "Fri, 01 Apr 2012 00:00:00 UTC",
     "resolution": "month",
     "start": "Tue, 14 Feb 2012 00:00:00 UTC",
     "stats": [
       {
         "time": "Tue, 14 Feb 2012 00:00:00 UTC",
         "accepted": {
           "outgoing": 10,  // authenticated
           "incoming": 5,   // unauthenticated
           "total": 15
         },
         "delivered": {
             "smtp": 15,  // delivered over SMTP
             "http": 5,   // delivered over HTTP
             "total": 20
         },
         "failed": {
           "permanent": {
             "bounce": 4,
             "delayed-bounce": 1,
             "suppress-bounce": 1,       // recipients previously bounced
             "suppress-unsubscribe": 2,  // recipients previously unsubscribed
             "suppress-complaint": 3,    // recipients previously complained
             "total": 10                 // failed permanently and dropped
           },
           "temporary": {
             "espblock": 1   // failed temporary due to ESP block, will be retried
           }
         },
       }
     ]
   }
