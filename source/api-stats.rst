.. _api-stats:

Stats
=====

Mailgun collects many different :ref:`events <manual-webhooks>` and
generates event statistics which are available in your Control Panel.
This data is also available via an API.

The statistics is calculated in hourly, daily and monthly resolution in UTC timezone.

The following retention policy is applied to the statistics:

- Hourly stats are preserved for a month.
- Daily stats are preserved for a year.
- Montly stats are stored throughout entire domain lifespan.

.. code-block:: url

      GET /<domain>/stats/total

Returns total stats for a given domain.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 event             The type of the event. For a complete list of all events writen
                   to the log see the `Event Types`_ table below. (Required)
 start             The starting time. Should be in :rfc:`2822#page-14` or
                   unix epoch format. Default: 7 days from the current time.
 end               The ending date. Should be in :rfc:`2822#page-14` or
                   unix epoch format. Default: current time.
 resolution        Can be either ``hour``, ``day`` or ``month``. Default: ``day``
 duration          Period of time with resoluton encoded. See `Duration`_ for
                   more info. If provided, overwrites the start date.
 ================= ============================================================

.. code-block:: url

      GET /<domain>/stats

Returns a list of event stat items.
Each record represents counts for one event per one day.

.. warning:: This is the legacy API that should not be used.

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
     "end": "Fri, 01 Apr 2012 00:00:00 UTC",
     "resolution": "month",
     "start": "Tue, 14 Feb 2012 00:00:00 UTC",
     "stats": [
       {
         "time": "Tue, 14 Feb 2012 00:00:00 UTC",
         "accepted": {
           "total": "15",
           "outgoing": 10,
           "incoming": 5
         },
         "delivered": {
             "total": 20,
             "smtp": 15,
             "http": 5
         },
         "failed": {
           "permanent": {
             "suppress-bounce": 1,
             "suppress-unsubscribe": 2,
             "suppress-complaint": 3,
             "bounce": 7,
             "total": 10
           },
           "temporary": {
             "espblock": 1
           }
         },
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
