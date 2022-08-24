.. _api-deliverability-alerts:

Deliverability Alerts
=====================

This section describes our RESTful API for alert configuration for InboxReady
products and Mailgun deliverability tools.


Events & Channels
-----------------

Our alerting solution is centered around two concepts: **events** and **channels**.
The occurrence of an event can be configured to trigger an alert. A channel
describes the delivery method for an alert. Every configured alert consists
of an event type / channel pair. This level of granularity allows alerting to
be configured to your exact preference.

The current supported delivery channels include **email** and **webhooks**.

The current list of events that you can chose to receive alerts for are:

- ``ip_listed``: A monitored IP has been added to a blocklist.
- ``ip_delisted``: A monitored IP has been removed from a blocklist.
- ``domain_listed``: A monitored domain has been added to a blocklist.
- ``domain_delisted``: A monitored domain has been removed from a blocklist.


Add Alert
---------

Use this endpoint to add new alert settings record.

.. code-block:: url

    POST /v1/alerts/settings/events

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``event_type``         Required. The type of event that you would like to receive alerts for. 
 ``channel``            Required. The delivery method for the alert. Supported values include ``"webhook"`` and ``"email"``.
 ``settings``           Required. The details pertaining to the specified channel. Please note that the contents of this object differ per channel type. See below for details.
 ====================== ========================================================

Settings payload for ``webhook`` channel:

.. code-block:: javascript

   {
     ...,
     "settings": {
       "url": "https://yourwebhookurl.com"
     }
   }

Settings payload or ``email`` channel:

.. code-block:: javascript

   {
     ...,
     "settings": {
       "emails": ["recipient-a@example.com", "recipient-b@example.com"]
     }
   }


In the below example request, the supplied alert configuration causes a webhook to be
sent to the specified URL whenever a monitored IP is blocklisted.

.. code-block:: javascript

   // POST /v1/alerts/settings/events
   {
     "event_type": "ip_listed",
     "channel": "webhook",
     "settings": {
       "url": "https://yourwebhookurl.com"
     }
   }


Example 200 response:

.. code-block:: javascript

   {
     "id": "8a2db565-cdd0-41d2-ae5d-461ee9c64492"
     "event_type": "ip_listed",
     "channel": "webhook",
     "settings": {
       "url": "https://yourwebhookurl.com"
     },
     "disabled_at": null
   }

