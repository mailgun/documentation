.. _api-deliverability-alerts:

Alerts
======

This section describes our RESTful API for alert configuration for Optimize (formerly InboxReady)
products.


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
- ``validation_job``: A bulk email verification job has completed.
- ``validation_preview``: A bulk email verification preview job has completed.
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
 ``event_type``         Required. The type of event for which you would like to receive alerts.
 ``channel``            Required. The delivery method for the alert. Supported values include ``"webhook"`` and ``"email"``.
 ``settings``           Required. The details pertaining to the specified channel. Please note that the contents of this object differ per channel type. See below for details.
 ====================== ========================================================

Settings payload for ``webhook`` channel:

*NOTE: When registering a webhook alert, we will ensure the endpoint is reachable by
sending a GET request to the provided URL. If a 200 response is not returned, a 400 will
be returned and the alert setting will not be saved.*

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


List Alerts
-----------

This endpoint returns a list of all configured alert settings for your account.

.. code-block:: url

    GET /v1/alerts/settings

Example 200 response:

.. code-block:: javascript

   {
     "events": [
       {
         "id": "8a2db565-cdd0-41d2-ae5d-461ee9c64492"
         "event_type": "ip_listed",
         "channel": "webhook",
         "settings": {
           "url": "https://yourwebhookurl.com"
         },
         "disabled_at": null
       },
       {
         "id": "b1ca01c2-fde0-4b69-adc4-6cf42b3f33ed"
         "event_type": "ip_listed",
         "channel": "email",
         "settings": {
           "emails": ["recipient-1@example.com", "recipient-2@example.com"]
         },
         "disabled_at": null
       }
       ...
     ],
     "webhooks": {
       "signing_key": "bdee4d3e39910a92628f1df02fd0a73a"
     }
   }

See below for an explanation of the objects returned in the ``events`` list.

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``id``                 The unique identifier for the alert settings record.
 ``event_type``         The event type that is alerted on.
 ``channel``            The delivery channel for the alert.
 ``settings``           This object contains channel-specific settings.
 ``disabled_at``        Read only. When present, an iso8601 timestamp indicating when a webhook endpoint was disabled.
 ====================== ========================================================


Update Alert
------------

Use this endpoint to update an existing alert setting record.

.. code-block:: url

    PUT /v1/alerts/settings/events/{id}

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``event_type``         Required. The type of event for which you would like to receive alerts.
 ``channel``            Required. The delivery method for the alert. Supported values include ``"webhook"`` and ``"email"``.
 ``settings``           Required. The details pertaining to the specified channel. Please note that the contents of this object differ per channel type. See below for details.
 ====================== ========================================================

*NOTE: When updating a webhook alert, we will ensure the endpoint is reachable by
sending a GET request to the provided URL. If a 200 response is not returned, a 400 will
be returned and the alert setting update will be rejected.*

Example request:

.. code-block:: javascript

   // PUT /v1/alerts/settings/events/8a2db565-cdd0-41d2-ae5d-461ee9c64492
   {
     "event_type": "ip_listed",
     "channel": "webhook",
     "settings": {
       "url": "https://newwebhookurl.com"
     }
   }

Example 200 response:

.. code-block:: javascript

   {
     "id": "8a2db565-cdd0-41d2-ae5d-461ee9c64492"
     "event_type": "ip_listed",
     "channel": "webhook",
     "settings": {
       "url": "https://newwebhookurl.com"
     },
     "disabled_at": null
   }


Remove Alert
------------

Use this endpoint to delete an alert settings record. A 200 response is returned on success.

.. code-block:: url

    DELETE /v1/alerts/settings/events/{id}


Webhooks
--------

This section covers details around consuming Optimize deliverability alerts via webhooks.
If you are familiar with Mailgun webhooks, there is a lot of overlapping similarity, however,
there are also a few minor nuances to account for.

**Securing Webhooks**

HMAC_ is used to verified to integrity as well as the authenticity of received webhooks. To
verify the origin of a webhook:

1. Encode the webhook's entire POST request body with the HMAC algorithm (using your webhook signing key and SHA256 digest mode)
2. Compare the resulting hexdigest to the signature provided in the POST request's ``X-Sign`` header.

Below is a Ruby code example for verifying a webhook signature:

.. code-block:: ruby

    require "json"
    require "openssl"

    def verify(signing_key, webhook_payload, signature)
      data = JSON.generate(webhook_payload)

      signature == OpenSSL::HMAC.hexdigest("SHA256", signing_key, data)
    end


*NOTE: If you're comsuming Mailgun webhooks, please note that your Mailgun webhook signing key
differs from your Optimize alerts webhook signing key. Your Optimize alerts webhook signing key
is available within the Optimize UI.*

.. _HMAC: https://en.wikipedia.org/wiki/HMAC


**Webhook URL Validation**

When adding or updating a webhook URL for alerts, we will ensure the endpoint is reachable by
sending a GET request to the provided URL. If a 200 response is not returned from your endpoint,
the request will be rejected and your alert setting will not be saved. We intentionally chose
to send a GET request instead of a POST when validating URLs so that your webhook endpoint
does not have to account for test requests.

Additionally, when a POST request is sent to your webhook URL, if a 2xx is not returned, we will
attempt retries via an exponential backoff strategy for up to ~8 hours. If the max retry count is
reached, the alert will be disabled and the related alert settings record's ``disabled_at`` field
will be populated.

**Reset Webhook Signing Key**

Your webhook signing key is accessible via the ``GET /v1/alerts/settings`` API. You can reset your
signing key at any time using the endpoint below:

.. code-block:: url

    PUT /v1/alerts/settings/webhooks/signing_key


Example 200 response:

.. code-block:: javascript

   {
     "signing_key": "<SIGNING KEY>"
   }

**Webhook Samples**

Below are samples of webhook payloads for each support event type:

IP Blocklisted

.. code-block:: javascript

    {
      "signature": {
        "timestamp": 1661445572,
        "token": "b912851220af04be63e2feacebeafc7844f813847d309631ec"
      },
      "event_data": {
        "id": "927156bd-0000-0000-0000-38100897278d",
        "timestamp": "2022-08-25T16:00:00.04368716Z",
        "log_level": "warn",
        "event": "ip_listed",
        "ip": "49.0.2.000",
        "blocklist": "Barracuda",
        "message": "IP 49.0.2.000 was blocklisted by Barracuda"
      }
    }

IP Delisted

.. code-block:: javascript

    {
      "signature": {
        "timestamp": 1661445573,
        "token": "429caef899af60b9c412af6161428e7a41a669f6e5a30cb5f3"
      },
      "event_data": {
        "id": "f8b2cb0d-0000-0000-0000-a846ded58d3d",
        "timestamp": "2022-08-25T17:00:00.04368716Z",
        "log_level": "warn",
        "event": "ip_delisted",
        "ip": "49.0.2.000",
        "blocklist": "Barracuda",
        "message": "IP 49.0.2.000 was removed by Barracuda"
      }
    }

Validation Preview Complete

.. code-block:: javascript

    {
      "signature": {
        "timestamp": 1667592054,
        "token": "7582ab415b3542100d55388a085cc54f677e9acc4f1f944333"
      },
      "event_data": {
        "id": "fa2613d9-a795-4e40-8f7c-bdb6bafbfc76",
        "bulk_validation_job": {
          "created_at": 1667592049,
          "list_id": "LIST 34",
          "quantity": 100,
          "status": "uploaded",
          "summary": {
            "result": {
              "deliverable": 77,
              "undeliverable": 1,
              "catch_all": 15,
              "unknown": 6
            },
            "risk": {
              "high": 1,
              "low": 77,
              "medium": 15,
              "unknown": 6
            }
          }
        },
        "message": "Preview job fa2613d9-a795-4e40-8f7c-bdb6bafbfc76 is complete"
      }
    }

Validation Job Complete

.. code-block:: javascript

    {
      "signature": {
        "timestamp": 1667592181,
        "token": "6212180f809f15a8b4a4bc46ca64f7778619683455679c0035"
       },
      "event_data": {
        "id": "fa2613d9-a795-4e40-8f7c-bdb6bafbfc76",
        "bulk_validation_job": {
          "created_at": 1667592117,
          "download_urls": {
            "csv": "https://storage.googleapis.com/...csv.zip",
            "json": "https://storage.googleapis.com/...json.zip"
          },
          "list_id": "LIST 62",
          "quantity": 100,
          "processed": 100,
          "status": "uploaded",
          "summary": {
            "result": {
              "deliverable": 82,
              "undeliverable": 1,
              "catch_all": 13,
              "unknown": 4
            },
            "risk": {
              "high": 1,
              "low": 82,
              "medium": 13,
              "unknown": 4
            }
          }
        },
        "message": "Validation job fa2613d9-a795-4e40-8f7c-bdb6bafbfc76 is complete"
      }
    }
