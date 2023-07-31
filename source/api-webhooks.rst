.. _api-webhooks:

Webhooks
========

This API allows you to create, access, and delete webhooks programmatically.

The webhooks API endpoint is available at:

.. code-block:: url

      v3/domains/<domain>/webhooks

Supported webhooks, and their documentation, are listed below:

================= ========================================================
Webhook Name      Documentation
================= ========================================================
accepted          :ref:`um-tracking-accepted`
clicked           :ref:`um-tracking-clicks`
complained        :ref:`um-tracking-spam-complaints`
delivered         :ref:`um-tracking-deliveries`
opened            :ref:`um-tracking-opens`
permanent_fail    :ref:`um-tracking-failures`
temporary_fail    :ref:`um-tracking-failures`
unsubscribed      :ref:`um-tracking-unsubscribes`
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

.. note:: When adding a Clicked or Opened webhook, ensure that you also have tracking enabled.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 domain            Name of the domain
 id                Name of the webhook. (See above for supported webhooks)
 url               URL for the webhook event. May be repeated up to 3 times.
 ================= ========================================================

.. code-block:: url

     PUT /domains/<domain>/webhooks/<webhookname>

Updates an existing webhook.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 domain            Name of the domain
 webhookname       Name of the webhook. (See above for supported webhooks)
 url               URL for the webhook event. May be repeated up to 3 times.
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
 webhookname       Name of the webhook. (See above for supported webhooks)
 ================= ========================================================

Examples
~~~~~~~~

Return a list of webhooks set for the specified domain.

.. include:: samples/get-webhooks.rst

Sample response:

.. code-block:: javascript

	{
	  "webhooks": {
	    "opened": {
	      "urls": [
		        "https://your_domain.com/v1/opened",
		        "https://your_domain.com/v2/opened" 
		      ]
	    },
	    "clicked": {
	      "urls": [ "https://your_domain.com/v1/clicked" ]
	    }
	  }
	}

Return a webhook for a specific event for the defined domain.

.. include:: samples/get-webhook.rst

Sample response:

.. code-block:: javascript

	{
	  "webhook": {
	    "urls": [ "https://your_domain.com/v1/clicked" ]
	  }
	}

Create a new webhook.

.. include:: samples/add-webhook.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been created",
	  "webhook": {
	    "urls": [
		      "https://your_domain.com/v1/clicked",
		      "https://your_domain.com/v2/clicked",
		      "https://your_partner_domain.com/v1/clicked" 
		    ]
	  }
	}

Update an existing webhook.

.. include:: samples/update-webhook.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been updated",
	  "webhook": {
	    "urls": [ "https://your_domain.com/v1/clicked" ]
	  }
	}

Delete a webhook.

.. include:: samples/delete-webhook.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Webhook has been deleted",
	  "webhook": {
	    "urls": [
		      "https://your_domain.com/v1/clicked",
		      "https://your_domain.com/v2/clicked",
		      "https://your_partner_domain.com/v1/clicked" 
		    ]
	  }
	}

Rate Limit Response:

.. code-block:: javascript

	{
		"retry-seconds": 60,
	}
