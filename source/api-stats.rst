.. _api-stats:

Stats
=====

Mailgun collects many different :ref:`events <manual-webhooks>` and
generates event statistics which are available in your Control Panel.
This data is also available via an API.

.. code-block:: url

      GET /<domain>/stats

Returns a list of event stat items.
Each record represents counts for one event per one day.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 event             Name of the event to receive the stats for. Note that you
                   can specify this parameter multiple times to fetch stats
                   for several events at the same time (see example below)
 start-date        The date to receive the stats starting from. Should
                   have ISO8601 format (YYYY-MM-DD).
 ================= ==========================================================

.. code-block:: url

      DELETE /<domain>/tags/<tag>

Deletes all counters for particular tag and the tag itself.

Examples
~~~~~~~~

Get stats for 'open' and 'sent' events sorted by date:

.. include:: samples/get-stats.rst

Sample response:

.. code-block:: javascript

  {
    "total_count": 95,
    "items": [
        {
            "event": "sent",
            "total_count": 16,
            "created_at": "Tue, 14 Feb 2012 00:00:00 GMT",
            "id": "4f39f7c56addaa3e1966714d",
            "tags": {}
        },
        {
            "event": "sent",
            "total_count": 1,
            "created_at": "Mon, 13 Feb 2012 00:00:00 GMT",
            "id": "4f38f9ac6addaa3e1966335e",
            "tags": {}
        }
    ]
  }

Delete tag:

.. include:: samples/delete-tag.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Tag deleted"
  }
