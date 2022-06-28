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

Remove IP
---------

Use this endpoint to remove an IP address from blocklist monitoring. A
``204/No-Content`` response will be returned on success.

.. code-block:: url

    DELETE /v1/inboxready/ip_addresses/{ip}
