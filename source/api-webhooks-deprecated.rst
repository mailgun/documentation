.. _api-webhooks-deprecated:

Webhooks (deprecated)
=====================

.. Warning:: This refers to a previous version of the API which is deprecated
          and may be removed in a future release. Ongoing development of webhooks
          should be using the latest API available here: :ref:`api-webhooks`

.. Note:: If you are looking forward to migrate to the new Webhooks API, 
          you don’t need to worry: both APIs can be used at the same time.
          You’ll be notified by the legacy webhooks and the new webhooks.
          But don’t forget to remove the legacy url as soon as you get migrated your app to the new API!


This API allows you to create, access, and delete webhooks programmatically.

Supported webhooks, and their documentation, are listed below:

================= ========================================================
Webhook Name      Documentation
================= ========================================================
bounce            :ref:`um-tracking-failures`, :ref:`api-bounces-webhook-data-format`
deliver           :ref:`um-tracking-deliveries`, :ref:`api-deliveries-webhook-data-format`
drop              :ref:`um-tracking-failures`, :ref:`api-drops-webhook-data-format`
spam              :ref:`um-tracking-spam-complaints`, :ref:`api-spam-webhook-data-format`
unsubscribe       :ref:`um-tracking-unsubscribes`, :ref:`api-unsubscribes-webhook-data-format`
click             :ref:`um-tracking-clicks`, :ref:`api-clicks-webhook-data-format`
open              :ref:`um-tracking-opens`, :ref:`api-opens-webhook-data-format`
================= ========================================================


.. code-block:: url

     GET /domains/<domain>/webhooks

Returns a list of webhooks set for the specified domain.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 domain            Name of the domain
 ================= ==========================================================

.. code-block:: url

     GET /domains/<domain>/webhooks/<webhookname>

Returns details about a the webhook specified in the URL.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 domain            Name of the domain
 id                Name of the webhook. (See above for supported webhooks)
 ================= ==========================================================

.. code-block:: url

     POST /domains/<domain>/webhooks

Creates a new webhook.

.. note:: When adding a Click or Open webhook, ensure that you also have tracking enabled.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 domain            Name of the domain
 id                Name of the webhook. (See above for supported webhooks)
 url               URL for the webhook event.
 ================= ========================================================

.. code-block:: url

     PUT /domains/<domain>/webhooks/<webhookname>

Updates an existing webhook.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 domain            Name of the domain
 id                Name of the webhook. (See above for supported webhooks)
 url               URL for the webhook event.
 ================= ========================================================

.. code-block:: url

     DELETE /domains/<domain>/webhooks/<webhookname>

Deletes an existing webhook.

.. note:: Mailgun imposes a rate limit for the Webhook API endpoint. Users may
		  issue no more than 300 requests per minute, per account. See the resultant
		  rate limit response below.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 domain            Name of the domain
 id                Name of the webhook. (See above for supported webhooks)
 ================= ========================================================

Webhooks Parameters
-------------------

.. _api-opens-webhook-data-format:

Opens Parameters
~~~~~~~~~~~~~~~~
You can specify a webhook URL programmatically using the API described above or in the ``Webhooks`` tab of your Control Panel. When a user opens
one of your emails, your URL will be called with the following parameters.

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("opened").
 recipient             Recipient who opened.
 domain                Domain that sent the original message.
 ip                    IP address the event originated from.
 country               Two-letter country code (as specified by ISO3166) the event came from or
                       'unknown' if it couldn't be determined.
 region                Two-letter or two-digit region code or 'unknown' if it couldn't be determined.
 city                  Name of the city the event came from or 'unknown' if it couldn't be determined.
 user-agent            User agent string of the client triggered the event.
 device-type           Device type the email was opened on. Can be 'desktop', 'mobile', 'tablet', 'other'
                       or 'unknown'.
 client-type           Type of software the email was opened in, e.g. 'browser', 'mobile browser',
                       'email client'.
 client-name           Name of the client software, e.g. 'Thunderbird', 'Chrome', 'Firefox'.
 client-os             OS family running the client software, e.g. 'Linux', 'Windows', 'OSX'.
 campaign-id           The id of campaign triggering the event.
 campaign-name         The name of campaign triggering the event.
 tag                   Message tag, if message was tagged. See :ref:`tagging`
 mailing-list          The address of mailing list the original message was sent to.
 "custom variables"    Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 ==================    ==================================================================================

.. _api-clicks-webhook-data-format:

Clicks Parameters
~~~~~~~~~~~~~~~~~
You can specify a webhook URL programmatically using the API described above or 
in the ``Webhooks`` tab of your Control Panel. Every time a user clicks on a link
inside of your messages, your URL will be called with the following parameters:

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("clicked").
 recipient             Recipient who clicked.
 domain                Domain that sent the original message.
 ip                    IP address the event originated from.
 country               Two-letter country code (as specified by ISO3166) the event came from or
                       'unknown' if it couldn't be determined.
 region                Two-letter or two-digit region code or 'unknown' if it couldn't be determined.
 city                  Name of the city the event came from or 'unknown' if it couldn't be determined.
 user-agent            User agent string of the client triggered the event.
 device-type           Device type the link was clicked on. Can be 'desktop', 'mobile', 'tablet', 'other'
                       or 'unknown'.
 client-type           Type of software the link was opened in, e.g. 'browser', 'mobile browser',
                       'email client'.
 client-name           Name of the client software, e.g. 'Thunderbird', 'Chrome', 'Firefox'.
 client-os             OS family running the client software, e.g. 'Linux', 'Windows', 'OSX'.
 campaign-id           The id of campaign triggering the event.
 campaign-name         The name of campaign triggering the event.
 tag                   Message tag, if it was tagged. See :ref:`tagging`.
 url                   The URL that was clicked.
 mailing-list          The address of mailing list the original message was sent to.
 "custom variables"    Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 ==================    ==================================================================================

.. _api-unsubscribes-webhook-data-format:

Unsubscribes Parameters
~~~~~~~~~~~~~~~~~~~~~~~
You can specify a webhook URL programmatically using the API described above or 
in the ``Webhooks`` tab of your Control Panel.
When a user unsubscribes, Mailgun will invoke the webhook with the following parameters:

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("unsubscribed").
 recipient             Recipient who unsubscribed.
 domain                Domain that sent the original message.
 ip                    IP address the event originated from.
 country               Two-letter country code (as specified by ISO3166) the event came from or
                       'unknown' if it couldn't be determined.
 region                Two-letter or two-digit region code or 'unknown' if it couldn't be determined.
 city                  Name of the city the event came from or 'unknown' if it couldn't be determined.
 user-agent            User agent string of the client triggered the event.
 device-type           Device type the person unsubscribed on. Can be 'desktop', 'mobile', 'tablet', 'other'
                       or 'unknown'.
 client-type           Type of software the unsubscribe link was clicked in, e.g. 'browser', 'mobile browser',
                       'email client'.
 client-name           Name of the client software, e.g. 'Thunderbird', 'Chrome', 'Firefox'.
 client-os             OS family running the client software, e.g. 'Linux', 'Windows', 'OSX'.
 campaign-id           The id of the campaign that recipient has unsubscribed from.
 campaign-name         The name of campaign triggering the event.
 tag                   Message tag, if it was tagged. See :ref:`tagging`.
 mailing-list          The address of mailing list the original message was sent to.
 "custom variables"    Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 ==================    ==================================================================================

.. _api-spam-webhook-data-format:

Spam Complaints Parameters
~~~~~~~~~~~~~~~~~~~~~~~~~~
You can specify a webhook URL programmatically using the API described above or 
in the ``Webhooks`` tab in the Control Panel.
When a user reports one of your emails as spam, Mailgun will invoke the
webhook with the following parameters:

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("complained").
 recipient             Recipient who clicked spam.
 domain                Domain that sent the original message.
 message-headers       String list of all MIME headers of the original message dumped to a JSON string (order of headers preserved).
 campaign-id           The id of campaign triggering the event.
 campaign-name         The name of campaign triggering the event.
 tag                   Message tag, if it was tagged. See :ref:`tagging`.
 mailing-list          The address of mailing list the original message was sent to.
 "custom variables"    Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 attachment-x          attached file (‘x’ stands for number of the attachment). Attachments are
                       included if the recipient ESP includes them in the bounce message. They are
                       handled as file uploads, encoded as multipart/form-data.
 ==================    ==================================================================================

.. _api-bounces-webhook-data-format:

Bounces Parameters
~~~~~~~~~~~~~~~~~~
You can specify a webhook URL programmatically using the API described above or 
in the ``Webhooks`` tab of your Control Panel.
If you do, every time a message experiences a hard bounce, your URL will be invoked with the following parameters:

.. container:: ptable

 ======================    ===========================================================================
 Parameter Name            Description
 ======================    ===========================================================================
 event                     Event name ("bounced").
 recipient                 Recipient who could not be reached.
 domain                    Domain that sent the original message.
 message-headers           String list of all MIME headers of the original message dumped to a JSON string (order of headers preserved).
 code                      SMTP bounce error code in form (X.X.X).
 error                     SMTP bounce error string.
 notification              Detailed reason for bouncing (optional).
 campaign-id               The id of campaign triggering the event.
 campaign-name             The name of campaign triggering the event.
 tag                       Message tag, if it was tagged. See :ref:`tagging`.
 mailing-list              The address of mailing list the original message was sent to.
 "custom variables"        Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp                 Number of seconds passed since January 1, 1970
 token                     Randomly generated string with length 50
 signature                 String with hexadecimal digits generate by HMAC algorithm
 attachment-x              attached file (‘x’ stands for number of the attachment). Attachments are
                           included if the recipient ESP includes them in the bounce message. They are
                           handled as file uploads, encoded as multipart/form-data.
 ======================    ===========================================================================

.. _api-drops-webhook-data-format:

Drops Parameters
~~~~~~~~~~~~~~~~
In the ``Webhooks`` tab or programmatically using the API described above,
you can specify a URL to be notified every time a message is dropped.
There are a few reasons why Mailgun needs to stop attempting to deliver messages and drop them.
The most common reason is that Mailgun received a Hard bounce or repeatedly received Soft bounces 
and continuing attempting to deliver may hurt your reputation with the receiving ESP.
Also, if the address is on one of the 'do not send lists' because that recipient had previously 
bounced, unsubscribed, or complained of spam, we will not attempt delivery and drop the message.
If one of these events occur we will POST the following parameters to your URL:

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("dropped").
 recipient             Intended recipient.
 domain                Domain that sent the original message.
 message-headers       String list of all MIME headers of the original message dumped to a JSON string (order of headers preserved).
 reason                Reason for failure. Can be one either "hardfail" or "old". See below.
 code                  ESP response code, e.g. if the message was blocked as a spam (optional).
 description           Detailed explanation of why the messages was dropped
 "custom variables"    Your own custom JSON object included in the header (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 attachment-x          attached file (‘x’ stands for number of the attachment). Attachments are
                       included if the recipient ESP includes them in the bounce message. They are
                       handled as file uploads, encoded as multipart/form-data.
 ==================    ==================================================================================

- ``old`` indicates that Mailgun tried to deliver the message unsuccessfully for more than 8 hours.
- ``hardfail`` not delivering to an address that previously bounced, unsubscribed, or complained.

.. _api-deliveries-webhook-data-format:

Deliveries Parameters
~~~~~~~~~~~~~~~~~~~~~
In the ``Webhooks`` tab or programmatically using the API described above, you can specify 
a URL to be notified every time a message is delivered. 
If the message is successfully delivered to the intended recipient, 
we will POST the following parameters to your URL:

.. container:: ptable

 ==================    ==================================================================================
 Parameter Name        Description
 ==================    ==================================================================================
 event                 Event name ("delivered").
 recipient             Intended recipient.
 domain                Domain that sent the original message.
 message-headers       String list of all MIME headers dumped to a JSON string (order of headers preserved).
 Message-Id            String id of the original message delivered to the recipient.
 "custom variables"    Your own custom JSON object included in the header of the original message (see :ref:`manual-customdata`).
 timestamp             Number of seconds passed since January 1, 1970
 token                 Randomly generated string with length 50
 signature             String with hexadecimal digits generate by HMAC algorithm
 ==================    ==================================================================================
 
Examples
--------

Return a list of webhooks set for the specified domain.

.. include:: samples/get-webhooks.rst

Sample response:

.. code-block:: javascript

	{
	  "webhooks": {
	    "open": {
	      "url": "http://postbin.heroku.com/860bcd65"
	    },
	    "click": {
	      "url": "http://postbin.heroku.com/860bcd65"
	    }
	  }
	}

Return a webhook for a specific event for the defined domain.

.. include:: samples/get-webhook-deprecated.rst

Sample response:

.. code-block:: javascript

	{
	  "webhook": {
	    "url": "http://google.com"
	  }
	}

Create a new webhook.

.. include:: samples/add-webhook-deprecated.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been created",
	  "webhook": {
	    "url": "http://bin.mailgun.net/8de4a9c4"
	  }
	}

Update an existing webhook.

.. include:: samples/update-webhook-deprecated.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been updated",
	  "webhook": {
	    "url": "http://google.com"
	  }
	}

Delete a webhook.

.. include:: samples/delete-webhook-deprecated.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been deleted",
	  "webhook": {
	    "url": "http://postbin.heroku.com/860bcd65"
	  }
	}

Rate Limit Response:

.. code-block:: javascript

	{
		"retry-seconds": 60,
	}
