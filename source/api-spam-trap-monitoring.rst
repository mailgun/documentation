.. _api-spam-trap-monitoring:

Spam Trap Monitoring
====================

Our `spam trap monitoring <https://help.mailgun.com/hc/en-us/articles/4413151071515-What-are-Spam-Traps>`_ service
surfaces how much of your email is being sent to known spam traps.

To add and remove domains from our Spam Trap Monitoring service, see the `domain management`_ API docs.

.. _domain management: https://documentation.mailgun.com/en/latest/api-inboxready-domains.html

Get Counts
----------

Use this endpoint to understand how much of your mail being sent to known
spam traps. This endpoint returns daily spam trap hit counts for a provided
timerange, categorized by trap type.

**NOTE**: You must provide a timerange via ``start`` and ``end`` query params.
If any date(s) at the start and/or end boundaries of your provided timerange
contain zero spam trap hits, those dates will be excluded from the response.

.. code-block:: url

    GET /v1/spamtraps?start=2022-01-01&end=2022-01-31

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``start``              Required. The start date in UTC (format YYYY-MM-DD) of the timeframe for which you wish to see data.
 ``end``                Required. The end date in UTC (format YYYY-MM-DD) of the timeframe for which you wish to see data.
 ``sortby``             Optional. Acceptable values include ``date``, ``totals``, ``domain``, ``subject``, ``ip``, and ``from``. Defaults to ``date``.
 ``groupby``            Optional. Use this field to group results. Acceptable values include ``domain``, ``subject``, ``ip``, and ``from``.
 ====================== ========================================================

Example 200 response:

.. code-block:: javascript

    {
      "items": [
        {
          "date": "2022-01-01",
          "pristine": 34,
          "recycled": 258,
          "typo": 178,
          "total": 470
        },
        ...
      ],
      "paging": {
        ...
      }
    }

For more details on the data returned by this API endpoint such as trap
types, see our `help documentation <https://help.mailgun.com/hc/en-us/articles/4413151071515-What-are-Spam-Traps>`_.

**Filtered Results**

The request fields below can be used to filter spam trip hit counts:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``ip``                 Optional. Use this field to filter results by ip(s).
 ``domain``             Optional. Use this field to filter results by domain(s).
 ``subject``            Optional. Use this field to filter results by email subject.
 ``from``               Optional. Use this field to filter results by sender email address.
 ====================== ========================================================

Example request of results grouped by IP *and* filtered by multiple IP addresses:

.. code-block:: url

    GET /v1/spamtraps?start=2022-01-01&end=2022-01-31&groupby=ip&ip=208.75.123.183&ip=208.75.123.186

Example 200 response:

.. code-block:: javascript

    {
      "items": [
        {
          "208.75.123.183": [
            {
              "date": "2022-01-01",
              "pristine": 2,
              "recycled": 85,
              "typo": 32,
              "total": 119
            },
            ...
          ]
        },
        {
          "208.75.123.186": [
            ...
          ]
        },
      ],
      "paging": {
        ...
      }
    }
