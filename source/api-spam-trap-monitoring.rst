.. _api-spam-trap-monitoring:

Spam Trap Monitoring
====================

Our spam trap monitoring services surfaces how much of your email is being sent
to known spam traps.

Add Domain
----------

This endpoint allows domains to be registered for spam trap monitoring. Please
note that your domain or subdomain must be verified before spam trap monitoring
can begin. Once your domain has been added, add the provided TXT record
(``txt_record``) to your domain configuration within your DNS provider. For
more details, see our documentation_. Following TXT record configuration, use
the `Verify Domain`_ endpoint to begin the domain verification process.

.. _documentation: https://help.mailgun.com/hc/en-us/articles/360026833053-Domain-Verification-Walkthrough

**NOTE:** If your domain is already verified for sending email via Mailgun, you
do not need to configure the provided TXT record. Instead, skip to the
`Verify Domain`_ section.

.. code-block:: url

    POST /v1/inboxready/domains?domain=example.com

Example 200 response:

.. code-block:: javascript

   {
     "domain": {
       "ID": "<ID>",
       "created_at": 123456789,
       "name": "example.com",
       "verified": {
         "verified_at": 0,
         "status": "pending"
       },
       "services": {
         "spam_trap_monitoring": true
       },
       "txt_record": "<HASHED TXT RECORD KEY>"
     },
     "message": "The domain has been added"
   }

Verify Domain
-------------

Use this endpoint to start the domain verification process. When called, a
background process will begin to periodically attempt domain verification for
up to 24 hours.

Please note that domain verification is not instant. DNS verification typically
takes 1 hour to complete, but in some cases may take up to 24 hours to complete.
Feel free to check your DNS configuration for accuracy, but please allow for up
to 24 hours for the verification process to complete.

The `Get Domains`_ endpoint can be used to check verification status. On
verification success, the domain ``verified.status`` property will contain a
value of "inbox_ready" or "sending".

**NOTE:** In the case that your domain is already verified for sending email
via Mailgun, you will still need to use this endpoint to begin the verification
process. Your domain verification status will be inherited from Mailgun. Upon
verification, your domain's ``verified.status`` will be set to "sending". Please
note that in this scenario, verification is still performed via the background
process workflow and that there will be a ~1 hour delay in verification.

.. code-block:: url

    PUT /v1/inboxready/domains/verify?domain=example.com

Example 200 response:

.. code-block:: javascript

   {
     "message": "Domain pending verification"
   }


Get Domains
-----------

This endpoint returns a list of domains.

.. code-block:: url

    GET /v1/inboxready/domains

Example 200 response:

.. code-block:: javascript

    {
      "items": [
        {
          "ID": "<ID>",
          "created_at": 123456789,
          "name": "example.com",
          "verified": {
            "verified_at": 123456789,
            "status": "inbox_ready"
          },
          "services": {
            "spam_trap_monitoring": true
          },
          "txt_record": "<HASHED TXT RECORD KEY>"
        },
        ...
      ],
      "paging": {
        "previous": "<URL>",
        "first": "<URL>",
        "next": "<URL>",
        "last": "<URL>"
      }
    }

Remove Domain
-------------

This endpoint can be used to remove a domain from spam trap monitoring.

.. code-block:: url

    DELETE /v1/inboxready/domains?domain=example.com

Example 200 response:

.. code-block:: javascript

    {
      "message": "example.com has been removed from InboxReady"
    }


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
