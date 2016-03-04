.. _api_routes:

Routes
==============

Mailgun Routes are a powerful way to handle the incoming traffic.
See :ref:`um-routes` section in the User Manual to learn more
about how they work. This API allows you to work with routes programmatically.

Routes are comprised of the following arguments:

* A filter (when to do something).
* A priority (in what order).
* An action (what to do).

Filters
~~~~~~~~

Route filters are expressions that determine when an action is triggered. You can create a filter based on the recipient of the incoming email, the headers in the incoming email or use a catch-all filter. Filters support regular expressions in the pattern to give you a lot of flexibility when creating them.

**match_recipient(pattern)**

Matches smtp recipient of the incoming message against the regular expression pattern.
For example this will match all messages coming to any recipient at @bar.com::

    match_recipient(".*@bar.com")

**match_header(header, pattern)**

Similar to ``match_recipient`` but instead of looking at a message recipient, it applies
the pattern to an arbitrary MIME header of the message. For this will match any message
with a word "support" in its subject::

    match_header("subject", ".*support")

**catch_all()**

Matches if no preceeding routes matched. Usually you need to use it in a route
with a lowest priority, to make sure it evaluates last.

Actions
~~~~~~~~

If a route expression evaluates to true, Mailgun executes the corresponding action.
Currently you can use the following three actions in your routes: ``forward()``, ``store()`` and ``stop()``.

**forward(destination)**

Forwards the message to a specified destination, which can be another email address or a URL.
A few examples::

    forward("mailbox@myapp.com")
    forward("http://myapp.com/messages")

**store(notification endpoint)**

Stores the message temporarily (for up to 3 days) on Mailgun's servers so that you can retrieve them later.  This is helpful for large messages that may cause time outs or if you just want to retrieve them later.

You can specify a URL and we will notify you when the email arrives along with a URL where you can use to retrieve the message::

    store(notify="http:mydomain.com/callback")

You can see a full list of parameters we will post to your URL in the :ref:`um-routes` section of the User Manual. You can also get the locations of messages through the :ref:`Events API <api-events>` and then retrieve the message through the :ref:`Messages API <api-sending-messages>`.

    **stop()**

Simply stops the priority waterfall so the subsequent routes will not be evaluated. Without a stop() action executed, all lower priority Routes will also be evaluated.

.. code-block:: url

     GET /routes

Fetches the list of routes. Note that routes are defined globally, per
account, not per domain as most of other API calls.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default, 1000 max)
 skip              Number of records to skip. (0 by default)
 ================= ==========================================================

.. code-block:: url

     GET /routes/<id>

Returns a single route object based on its ID. See examples below.

.. code-block:: url

     POST /routes

Creates a new route.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 priority          Integer: smaller number indicates higher priority. Higher
                   priority routes are handled first. Defaults to 0.
 description       An arbitrary string.
 expression        A filter expression like
                   ``match_recipient('.*@gmail.com')``
 action:           Route action. This action is executed when the expression
                   evaluates to True. Example: ``forward("alice@example.com")``
                   You can pass multiple ``action`` parameters.
 ================= ==========================================================

.. code-block:: url

     PUT /routes/<id>

Updates a given route by ID. All parameters are optional: this API call
only updates the specified fields leaving others unchanged.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 priority          Integer: smaller number indicates higher priority. Higher
                   priority routes are handled first.
 description       An arbitrary string.
 expression        A filter expression like
                   ``match_recipient('.*@gmail.com')``
 action:           Route action. This action is executed when the expression
                   evaluates to True. Example: ``forward("alice@example.com")``
                   You can pass multiple ``action`` parameters.
 ================= ==========================================================

.. code-block:: url

     DELETE /routes/<id>

Deletes a route based on the id.

Examples
~~~~~~~~

Create a route of the highest priority with multiple actions:

.. include:: samples/create-route.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Route has been created",
    "route": {
        "description": "Sample route",
        "created_at": "Wed, 15 Feb 2012 13:03:31 GMT",
        "actions": [
            "forward(\"http://myhost.com/messages/\")",
            "stop()"
        ],
        "priority": 0,
        "expression": "match_recipient(\".*@samples.mailgun.org\")",
        "id": "4f3bad2335335426750048c6"
    }
  }

Listing routes:

.. include:: samples/get-routes.rst

Sample response:

.. code-block:: javascript

  {
    "total_count": 266,
    "items": [
        {
            "description": "Sample route",
            "created_at": "Wed, 15 Feb 2012 12:58:12 GMT",
            "actions": [
                "forward(\"http://myhost.com/messages/\")",
                "stop()"
            ],
            "priority": 0,
            "expression": "match_recipient(\".*@samples.mailgun.org\")",
            "id": "4f3babe4ba8a481c6400476a"
        }
    ]
  }

Access the route by id:

.. include:: samples/get-route.rst

Sample response:

.. code-block:: javascript

  {
    "route": {
        "description": "Sample route",
        "created_at": "Wed, 15 Feb 2012 13:03:31 GMT",
        "actions": [
            "forward(\"http://myhost.com/messages/\")",
            "stop()"
        ],
        "priority": 0,
        "expression": "match_recipient(\".*@samples.mailgun.org\")",
        "id": "4f3bad2335335426750048c6"
    }
  }
