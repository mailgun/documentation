.. _api-events:

Events
=============

Mailgun tracks every event that happens to your emails and makes this data available to you through the Events API. Mailgun retains this detailed data for two days for free accounts and 30 days for paid accounts.  You can query the data and traverse through the events API as explained below.

.. code-block:: url

     GET /<domain>/events

To complete a request, a selection range, along with a filter, should be passed with the request. In response, a page of log records is returned, along with two URLs to retrieve the next and the previous pages. Adjacent page URLs are always provided, even when the time range boundary is reached. To traverse an entire range, you should keep requesting the next page until an empty page is returned.

The API allows for continuous polling. If the end date of the time range is not specified and the traversal is ascending (forward in time) you will eventually receive an empty page (i.e., end of the data set). You can use the same URL at a later time and the result will contain log entries written since the previous request.

.. note:: The Events API replaces the depreciated Logs API endpoint. You should use the Events API moving forward.

Query Options
-------------
URL parameters allow you to manipulate the results of your query:

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 begin             An RFC2822 (:ref:`date-format`) time string or epoch seconds. 
                   It defines the beginning of the time range to select log 
                   records from. By default it is the time of the request.

 end               An RFC2822 (:ref:`date-format`) time string or epoch seconds. 
                   It defines the end of the time range and the direction of 
                   the log record traversal. If **end** is less than **begin**,
                   then traversal is performed in the timestamp descending order, 
                   otherwise in timestamp ascending order. By default, if ascending 
                   is `yes`, then it is a date in the distant future, otherwise a date in
                   the distant past.

 ascending         Can be either ``yes`` or ``no``. It defines a direction of
                   log record traversal. If **end** is also specified, then the
                   relation between **begin** and **end** should agree with the
                   **ascending** value, otherwise an error will be returned. 
                   The default value is deduced from the **begin** and **end** 
                   relation. If **end** is not specified, then the value is ``no``, 
                   effectively defining traversal direction from **begin**, to the 
                   past, until the end of time.

 limit             The maximum number of log entries to return. The default and
                   maximum value is 100.

 pretty            Can be either ``yes`` or ``no``. This defines whether the results
                   should be returned in human-readable (indented) or compact
                   form. It is ``yes`` by default.

 *<field>*         *<field>* is either the name of the `Filter Field`_, or the alias of a log
                   record field, to filter by. The value of the parameter should
                   be a valid `Filter Expression`_. The possible filtering 
                   expressions are listed below. There is not limit on the amount of 
                   parameters. If the same field is mentioned, more then once, then all
                   filtering expressions combined via **AND** operator.
 ================= ============================================================

Filter Field
-------------
Log records can be filtered by the following fields:

.. container:: ptable

 ============= ==================================
 Fields        Description
 ============= ==================================
 event         An event type. For a complete list
               of all events writen to the log
               see the `Filter Event`_ table below.  
 list          The email address of a mailing
               list the message was originally
               sent to.
 attachment    A name of an attached file.
 from          An email address mentioned in
               the `from` MIME header.
 message-id    A Mailgun message id returned by
               the messages API.
 subject       A subject line.
 to            An email address mentioned in
               the `to` MIME header.
 size          Message size. Mostly intended to
               be used with range filtering
               expressions (see below).
 recipient     An email address of a particular
               recipient. Even though a message
               may be addressed to several
               recipients, delivery is tracked on
               per recipient basis and every
               event pertains to only one
               recipient.
 tags          User defined tags.
 ============= ==================================

Filter Expression
-----------------
Possible filtering expressions are listed below:

.. container:: ptable

 ================= ============================================================
 Expression        Description
 ================= ============================================================
 foo bar           Matches field values that contain both term ``foo`` and
                   term ``bar``.
 foo AND bar       Same as above.
 foo OR bar        Matches field values that contain either term ``foo`` or
                   term ``bar``.
 "foo bar"         Matches field values that literally contain ``foo bar``.
 foo -bar          Matches field values that contain term ``foo`` but do
                   **not** contain term ``bar``.
 >10000            Matches values that greater then ``10000``. This filter can
                   be applied to numeric fields only.
 >10000 <20000     Matches values that are greater then ``10000`` and less then
                   ``20000``. This filter can be applied to numeric fields only.
 ================= ============================================================

Filter Event
------------

Mailgun tracks all of the events that occur throughout the system. Below are 
the events that you can filter by.

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

Log Records
~~~~~~~~~~~

Log records are represented as loosely structured json documents. The
following *sample* json document contains a superset of fields that
different log records may contain. It is not intended to be complete, and
provided here as an example only. 

Note that there are only two fields that every log record is guaranteed 
to have, they are ``event`` and ``timestamp``.

Examples
~~~~~~~~

Fetches the first page of log records that are older than ``Fri, 3 May 2013 09:00:00 -0000``
and correspond to delivery to ``joe@example.com``:

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
            "to": "foo@example.com", 
            "message-id": "20130812164300.28108.52546@samples.mailgun.org", 
            "from": "Excited User <me@samples.mailgun.org>", 
            "subject": "Hello"
          }, 
          "attachments": [], 
          "recipients": [
            "foo@example.com", 
            "baz@example.com", 
            "bar@example.com"
          ], 
          "size": 69
        }, 
        "recipient": "baz@example.com", 
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

Fetches the first page of log records that contain different types of failure,
starting from the most recent:

.. include:: samples/events-failure.rst

.. code-block:: javascript

  {
    "items": [
      {
        "severity": "temporary", 
        "tags": [], 
        "envelope": {
          "sender": "me@samples.mailgun.org", 
          "transport": ""
        }, 
        "delivery-status": {
          "code": 498, 
          "message": "No MX for [example.com]",
          "retry-seconds": 900, 
          "description": "No MX for [example.com]"
        }, 
        "campaigns": [], 
        "reason": "generic", 
        "user-variables": {}, 
        "flags": {
          "is-authenticated": true, 
          "is-test-mode": false
        }, 
        "timestamp": 1376435471.10744, 
        "message": {
          "headers": {
            "to": "baz@example.com, bar@example.com", 
            "message-id": "20130813230036.10303.40433@samples.mailgun.org", 
            "from": "Excited User <me@samples.mailgun.org>", 
            "subject": "Hello"
          }, 
          "attachments": [], 
          "recipients": [
            "baz@example.com", 
            "bar@example.com"
          ], 
          "size": 370
        }, 
        "recipient": "bar@example.com", 
        "event": "failed"
      }
    ], 
    "paging": {
      "next": 
          "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siY...", 
      "previous": 
          "https://api.mailgun.net/v2/samples.mailgun.org/events/Lkawm..."
    }
  }

Fetches the first page of log records written so far. Traversal is performed
starting from the most recent records to the oldest:

.. include:: samples/events-traversal.rst

Fetches the next page of log records, assuming that the URL was returned by the
previous request:

.. include:: samples/events-pagination.rst


.. _`log`: http://documentation.mailgun.com/user_manual.html#logs
.. _`send`: http://documentation.mailgun.com/user_manual.html#sending-via-api

Per Event Result
----------------

**Accepted:**

.. code-block:: javascript

  {
  "items": [
    {
      "tags": [], 
      "timestamp": 1377211256.096436, 
      "envelope": {
        "sender": "sender@example.com"
      }, 
      "event": "accepted", 
      "campaigns": [], 
      "user-variables": {}, 
      "flags": {
        "is-authenticated": false, 
        "is-test-mode": false
      }, 
      "routes": [
        {
          "priority": 1, 
          "expression": "match_recipient(\".*@samples.mailgun.org\")", 
          "description": "Sample route", 
          "actions": [
            "stop()", 
            "forward(\"http://host.com/messages\")"
          ]
        }
      ], 
      "message": {
        "headers": {
          "to": "", 
          "message-id": "77AF5C3CA1416D93FC47AF8AD42A60AD@example.com", 
          "from": "John Doe <sender@example.com>", 
          "subject": "Test Subject"
        }, 
        "attachments": [], 
        "recipients": [
          "recipient@example.com"
        ], 
        "size": 6021
      }, 
      "recipient": "recipient@example.com", 
      "method": "smtp"
    }
  ], 
  "paging": {
    "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICIy", 
    "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6"
  }


**Delivered:**

.. code-block:: javascript

  {
  "items": [
    {
      "tags": [], 
      "envelope": {
        "transport": "smtp", 
        "sender": "postmaster@samples.mailgun.org", 
        "sending-ip": "184.173.153.199"
      }, 
      "delivery-status": {
        "message": "", 
        "code": 0, 
        "description": null
      }, 
      "campaigns": [], 
      "user-variables": {}, 
      "flags": {
        "is-authenticated": true, 
        "is-test-mode": false
      }, 
      "timestamp": 1377208314.173742, 
      "message": {
        "headers": {
          "to": "recipient@example.com", 
          "message-id": "20130822215151.29325.59996@samples.mailgun.org", 
          "from": "sender@example.com", 
          "subject": "Sample Message"
        }, 
        "attachments": [], 
        "recipients": [
          "recipient@example.com"
        ], 
        "size": 31143
      }, 
      "recipient": "recipient@example.com", 
      "event": "delivered"
    }
  ], 
  "paging": {
    "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICIy", 
    "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6"
  }

**Failed:**

.. code-block:: javascript

  {
  "items": [
    {
      "severity": "permanent", 
      "tags": [], 
      "envelope": {
        "transport": "smtp", 
        "sender": "postmaster@samples.mailgun.org", 
        "sending-ip": "184.173.153.199"
      }, 
      "delivery-status": {
        "message": "Relay Not Permitted", 
        "code": 550, 
        "description": null
      }, 
      "campaigns": [], 
      "reason": "bounce", 
      "user-variables": {}, 
      "flags": {
        "is-authenticated": true, 
        "is-test-mode": false
      }, 
      "timestamp": 1377198389.769129, 
      "message": {
        "headers": {
          "to": "recipient@example.com", 
          "message-id": "20130822185902.31528.73196@samples.mailgun.org", 
          "from": "John Doe <sender@example.com>", 
          "subject": "Test Subject"
        }, 
        "attachments": [], 
        "recipients": [
          "recipient@example.com"
        ], 
        "size": 557
      }, 
      "recipient": "recipient@example.com", 
      "event": "failed"
      }
    ], 
    "paging": {
      "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICIy", 
      "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6"
    }
  }

**Opened:**

.. code-block:: javascript

  {
  "items": [
    {
      "geolocation": {
        "country": "US", 
        "region": "Texas", 
        "city": "Austin"
      }, 
      "tags": [], 
      "timestamp": 1377047343.042277, 
      "campaigns": [], 
      "user-variables": {}, 
      "ip": "111.111.111.111", 
      "client-info": {
        "client-type": "mobile browser", 
        "client-os": "iOS", 
        "device-type": "mobile", 
        "client-name": "Mobile Safari", 
        "user-agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 6_1 like Mac OS X) AppleWebKit/536.26 (KHTML, like Gecko) Mobile/10B143"
      }, 
      "message": {
        "headers": {
          "message-id": "20130821005614.19826.35976@samples.mailgun.org"
        }
      }, 
      "recipient": "recipient@example.com", 
      "event": "opened"
      }
    ], 
    "paging": {
      "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICIyMD", 
      "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6IC"
    }
  }



**Clicked:**

.. code-block:: javascript

  {
  "items": [
    {
      "geolocation": {
        "country": "US", 
        "region": "TX", 
        "city": "Austin"
      }, 
      "tags": [], 
      "url": "http://google.com", 
      "ip": "127.0.0.1", 
      "campaigns": [], 
      "user-variables": {}, 
      "timestamp": 1377075564.094891, 
      "client-info": {
        "client-type": "browser", 
        "client-os": "Linux", 
        "device-type": "desktop", 
        "client-name": "Chromium", 
        "user-agent": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/28.0.1500.71 Chrome/28.0.1500.71 Safari/537.36"
      }, 
      "message": {
        "headers": {
          "message-id": "20130821085807.30688.67706@samples.mailgun.org"
        }
      }, 
      "recipient": "recipient@example.com", 
      "event": "clicked"
      }
    ], 
    "paging": {
      "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICI", 
      "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI"
    }
  }

**Unsubscribed:**

.. code-block:: javascript

  {
  "items": [
    {
      "geolocation": {
        "country": "US", 
        "region": "TX", 
        "city": "San Antonio"
      }, 
      "tags": [
        "*"
      ], 
      "timestamp": 1377213791.421473, 
      "campaigns": [], 
      "user-variables": {}, 
      "ip": "50.51.14.451", 
      "client-info": {
        "client-type": "browser", 
        "client-os": "OS X", 
        "device-type": "desktop", 
        "client-name": "Chrome", 
        "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/28.0.1500.95 Safari/537.36"
      }, 
      "message": {
        "headers": {
          "message-id": "20130822232216.13966.79700@samples.mailgun.org"
        }
      }, 
      "recipient": "recipient@example.com", 
      "event": "unsubscribed"
      }
    ], 
    "paging": {
      "next": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI6ICI", 
      "previous": "https://api.mailgun.net/v2/samples.mailgun.org/events/W3siYiI"
    }
  }

**Complained:**

.. code-block:: javascript

  {
  "items": [
    {
      "tags": [], 
      "timestamp": 1377214260.049634, 
      "campaigns": [], 
      "user-variables": {}, 
      "flags": {
        "is-test-mode": false
      }, 
      "message": {
        "headers": {
          "to": "foo@example.com",
          "message-id": "20130718032413.263EE2E0926@example.com", 
          "from": "John Doe <sender@example.com>", 
          "subject": "This is the subject."
        }, 
        "attachments": [], 
        "size": 18937
      }, 
      "recipient": "foo@example.com",
      "event": "complained"
      }
    ], 
    "paging": {
      "next": "https://api.mailgun.net/v2/nt2.farmersonly.com/events/W3siYSI6IGZh", 
      "previous": "https://api.mailgun.net/v2/nt2.farmersonly.com/events/W3siYSI6"
    }
  }


**Stored:**

.. code-block:: javascript

  {
  "items": [
    {
       "campaigns":[

       ],
       "user-variables":{

       },
       "flags":{
          "is-test-mode":false
       },
       "tags":[

       ],
       "timestamp":1378335036.859382,
       "message":{
          "headers":{
             "to":"satshabad <satshabad@mailgun.com>",
             "message-id":"CAC8xyJxAO7Y0sr=3r-rJ4C6ULZs3cSVPPqYEXLHtarKOKaOCKw@mail.gmail.com",
             "from":"Someone <someone@example.com>",
             "subject":"Re: A TEST"
          },
          "attachments":[

          ],
          "recipients":[
             "satshabad@mailgun.com"
          ],
          "size":2566
       },
       "storage":{
          "url":"https://api.mailgun.net/v2/domains/ninomail.com/messages/WyI3MDhjODgwZTZlIiwgIjF6",
          "key":"WyI3MDhjODgwZTZlIiwgIjF6"
       },
       "event":"stored"
    }
  ]
 }
