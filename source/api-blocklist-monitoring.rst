.. _api-blocklist-monitoring:

Blocklist Monitoring
====================

`Blocklist Monitoring <https://www.mailgun.com/products/inbox/deliverability/blocklist-monitoring-service/>`_
enables you to keep an eye on your reputation. Monitor every IP address you have
against our curated list of blocklist providers to make sure you aren’t being
blocked.

Add IP
------

This endpoint allows IP addresses to be registered for blocklist monitoring.

.. code-block:: url

    POST /v1/inboxready/ip_addresses

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``ip``                 Required. The IP address you wish to add. Note that only IPv4 format is supported.
 ``ip_pool``            Optional. Use this field to specify an IP pool.
 ``description``        Optional. Use this field to provide a description for you IP address.
 ====================== ========================================================

Example 201 response:

.. code-block:: javascript

   {
     "ip": "127.0.0.1",
     "ip_pool": "",
     "description": "",
     "state": "healthy",
     "listed": []
   }


Read IP
-------

This endpoint allows you to retrieve the current health status of a single IP address.

.. code-block:: url

    GET /v1/inboxready/ip_addresses/{ip}

Example 200 response:

.. code-block:: javascript

   {
     "ip": "127.0.0.1",
     "ip_pool": "",
     "description": "",
     "state": "listed",
     "listed": [
       {
         "list":"cbl.abuseat.org",
         "name":"CBL",
         "first_seen":"2022-06-24T04:19:43.212Z",
         "last_seen":"2022-06-28T16:43:38.954Z",
         "delist_requested_at":"0001-01-01T00:00:00Z",
         "comments":["https://www.spamhaus.org/query/ip/127.0.0.1"]
       },
     ]
   }

See below for an explanation of the health details returned in the response body:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``state``              This field describes IP's current state of health. Possible values include "healthy" and "listed". If the IP exists on any monitored blocklists, state will be "listed".
 ``listed``             This field contains a list of blocklists where your IP is currently listed. 
 ====================== ========================================================


List IPs
--------

This endpoint allows you to retrieve a list of monitored IP addresses including
their information about their health statuses.

.. code-block:: url

    GET /v1/inboxready/ip_addresses

Example 200 response:

.. code-block:: javascript

   {
     "items": [
       {
         "ip": "127.0.0.1",
         "ip_pool": "",
         "description": "",
         "state": "listed",
         "listed": [
           {
             "list":"cbl.abuseat.org",
             "name":"CBL",
             "first_seen":"2022-06-24T04:19:43.212Z",
             "last_seen":"2022-06-28T16:43:38.954Z",
             "delist_requested_at":"0001-01-01T00:00:00Z",
             "comments":["https://www.spamhaus.org/query/ip/127.0.0.1"]
           },
         ]
       },
       {
         "ip": "124.124.124.124",
         "ip_pool": "",
         "description": "",
         "state": "healthy",
         "listed": []
       }
     ]
   }

See below for an explanation of the health details returned in the response body:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``state``              This field describes IP's current state of health. Possible values include "healthy" and "listed". If the IP exists on any monitored blocklists, state will be "listed".
 ``listed``             This field contains a list of blocklists where your IP is currently listed. 
 ====================== ========================================================


Update IP
---------

Use this endpoint to update IP address attributes.

.. code-block:: url

    PUT /v1/inboxready/ip_addresses/{ip}

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``ip_pool``            Optional. Use this field to specify an IP pool.
 ``description``        Optional. Use this field to provide a description for you IP address.
 ====================== ========================================================

Example 200 response:

.. code-block:: javascript

   {
     "ip": "127.0.0.1",
     "ip_pool": "",
     "description": "",
     "state": "healthy",
     "listed": []
   }


Remove IP
---------

Use this endpoint to remove an IP address from blocklist monitoring. A
``204/No-Content`` response will be returned on success.

.. code-block:: url

    DELETE /v1/inboxready/ip_addresses/{ip}


Blocklist Events
----------------

This endpoint returns blocklisted and delisted event data for your monitored
IP addresses.

.. code-block:: url

    GET /v1/blocklist_monitoring/events

The available filter parameters are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``timerange_start``    Required. An ISO8601 format timestamp specifying the start of your desired timerange.
 ``timerange_end``      Required. An ISO8601 format timestamp specifying the end of your desired timerange.
 ``ip``                 Optional. Use to filter events by specific IP address.
 ``blocklist``          Optional. Use to filter events by specific blocklist.
 ``event``              Optional. Use to filter events by event type. Accepted values include ``[ip_listed, ip_delisted]``.
 ====================== ========================================================

Example 200 response:

.. code-block:: javascript

   {
     "items": [
       {
         "ip": "123.123.123.123",
         "ip_pool": "",
         "timestamp": "2022-01-01T12:14:16-04:00",
         "event": "ip_delisted",
         "blocklist": "pbl.spamhaus.org",
         "account_id": "",
       },
       {
         "ip": "123.123.123.123",
         "ip_pool": "",
         "timestamp": "2022-01-01T12:12:12-04:00",
         "event": "ip_delisted",
         "blocklist": "pbl.spamhaus.org",
         "account_id": "",
       },
       ...
     ],
     "paging": {
       ...
     }
   }


Monitored Blocklists
--------------------

This endpoint returns the blocklists monitored by InboxReady.

.. code-block:: url

    GET /v1/blocklist_monitoring/blocklists

Example 200 response:

.. code-block:: javascript

   {
     "items": [
       {
         "blocklist": "b.barracudacentral.org",
         "name": "Barracuda",
       },
       {
         "blocklist": "bl.score.senderscore.com",
         "name": "Senderscore BL",
       },
       ...
     ],
   }
