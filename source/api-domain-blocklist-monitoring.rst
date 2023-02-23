.. _api-domain-blocklist-monitoring:

Domain Blocklist Monitoring
===========================

`Blocklist Monitoring <https://www.mailgun.com/products/inbox/deliverability/blocklist-monitoring-service/>`_
enables you to keep an eye on your reputation. Monitor your domains against our
curated list of blocklist providers to make sure you aren’t being blocked.

Monitored blocklists include:

- Spamhaus DBL
- URIBL
- SURBL

To add and remove domains from our domain blocklist monitoring service, see the `domain management`_ API docs.

.. _domain management: https://documentation.mailgun.com/en/latest/api-inboxready-domains.html

List Domains
------------

This endpoint allows you to retrieve a list of monitored domains including information about
their health statuses.

.. code-block:: url

    GET /v1/monitoring/domains

Example 200 response:

.. code-block:: javascript

  {
    "domains": [
        {
            "domain": "yourdomain.com",
            "updated_at": "2023-02-22T23:00:00.000Z",
            "state": "healthy",
            "listed": null
        },
        {
            "domain": "yourotherdomain.com",
            "updated_at": "2023-02-23T23:00:00:000Z",
            "state": "listed",
            "listed": [
                {
                    "list": "dbl.spamhaus.org",
                    "name": "Spamhaus DBL",
                    "first_seen": "2022-12-12T18:45:02.357Z",
                    "last_seen": "2023-02-23T12:45:01.941Z",
                    "comments": [
                        "https://www.spamhaus.org/query/domain/yourotherdomain.com"
                    ]
                }
            ]
        },
    ]

See below for an explanation of the health details returned in the response body:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``state``              This field describes the domain's current state of health. Possible values include "healthy" and "listed". If the domain exists on any monitored blocklists, state will be "listed".
 ``listed``             This field contains a list of blocklists where your domain is currently listed. 
 ====================== ========================================================
