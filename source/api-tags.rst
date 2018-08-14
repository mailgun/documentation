.. _api-tags:

Tags
====

Mailgun lets you tag each outgoing message with a custom value and provides statistics on the tag level.
To tag a message you need to provide one or more ``o:tag`` parameter in the API.
Tags are created on the fly but they are subject to a limit.

.. code-block:: url

      GET /<domain>/tags

Returns a list of tags for a domain. Provides pagination urls
if the result set is too long to be returned in a single response.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 domain            Name of the domain
 limit             Number of entries to return. Default: 100.
 ================= ============================================================

.. code-block:: url

      GET /<domain>/tags/<tag>

Returns a given tag.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 domain            Name of the domain
 tag               Name of the tag
 ================= ============================================================

.. code-block:: url

      PUT /<domain>/tags/<tag>

Updates a given tag with the information provided.

.. container:: ptable

 ================= ============================================================
  Parameter         Description
 ================= ============================================================
 domain            Name of the domain
 tag               Name of the tag
 description       Optional description of a tag.
 ================= ============================================================

.. code-block:: url

      GET /<domain>/tags/<tag>/stats

Returns statistics for a given tag.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 event             The type of the event. For a complete list of all events written
                   to the log see the `Event Types`_ table below. (Required)
 start             The starting time. Should be in :rfc:`2822#page-14` or
                   unix epoch format. Default: 7 days from the current time.
 end               The ending date. Should be in :rfc:`2822#page-14` or
                   unix epoch time in seconds. Default: current time.
 resolution        Can be either ``hour``, ``day`` or ``month``. Default: ``day``
 duration          Period of time with resolution encoded. See `Duration`_ for
                   more info. If provided, overwrites the start date and resolution.
 ================= ============================================================


 .. code-block:: url

       DELETE /<domain>/tags/<tag>

Deletes the tag. **Note:** The statistics for the tag are not destroyed.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 domain            Name of the domain
 ================= ============================================================

 .. code-block:: url

        GET /<domain>/tags/<tag>/stats/aggregates/countries

Returns a list of countries of origin for a given domain for different event types.


.. code-block:: url

        GET /<domain>/tags/<tag>/stats/aggregates/providers

Returns a list of email providers for a given domain for different event types.


.. code-block:: url

        GET /<domain>/tags/<tag>/stats/aggregates/devices

Returns a list of devices for a given domain that have triggered event types.


Duration
--------

Duration is a string that represents a period of time with some resolution.
It has a format ``[0-9]+[m,d,h]`` where

- ``h`` - an hour
- ``d`` - a day
- ``m`` - a month

Examples:

- ``24h`` - a period of 24 hours (a day) with hourly resolution
- ``1d`` - a period of 1 day with daily resolution
- ``2m`` - a period of 2 months with monthly resolution

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

Retrieve all tags for a domain:

.. include:: samples/get-tags.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
        {
          "tag": "red",
          "description": "red signup button",
        },
        {
          "tag": "green",
          "description": "green signup button",
        },
    ],
    "paging": {
      "next":
          "https://url_to_next_page",
      "previous":
          "https://url_to_previous_page",
      "first":
          "https://url_to_first_page",
      "last":
          "https://url_to_last_page"
    }
  }

Delete tag:

.. include:: samples/delete-tag.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Tag deleted"
  }

Retrieve all countries of origin for a domain with event types:

.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/countries

.. code-block:: javascript

  {
    "countries": {
        "ad": {
            "clicked": 7,
            "complained": 4,
            "opened": 18,
            "unique_clicked": 0,
            "unique_opened": 2,
            "unsubscribed": 0
        },
        "ck": {
            "clicked": 13,
            "complained": 2,
            "opened": 1,
            "unique_clicked": 1,
            "unique_opened": 0,
            "unsubscribed": 2
        },
    },
    "tag": "exampletag"
  }

Retrieve all providers of a domain with corresponding event types:

.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/providers

.. code-block:: javascript

  {
    "providers": {
        "gmail.com": {
            "accepted": 23,
            "clicked": 15,
            "complained": 0,
            "delivered": 23,
            "opened": 19,
            "unique_clicked": 2,
            "unique_opened": 7,
            "unsubscribed": 1
        },
        "yahoo.com": {
            "accepted": 16,
            "clicked": 8,
            "complained": 2,
            "delivered": 8,
            "opened": 4,
            "unique_clicked": 0,
            "unique_opened": 0,
            "unsubscribed": 0
        }
    },
    "tag": "exampletag"
  }

Retrieve all devices that have triggered an event type in a domain:

.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/devices

.. code-block:: javascript

  {
    "devices": {
        "desktop": {
            "clicked": 8,
            "complained": 1,
            "opened": 8,
            "unique_clicked": 0,
            "unique_opened": 0,
            "unsubscribed": 0
        },
        "mobile": {
            "clicked": 3,
            "complained": 1,
            "opened": 5,
            "unique_clicked": 0,
            "unique_opened": 0,
            "unsubscribed": 0
        }
    },
    "tag": "exampletag"
  }
