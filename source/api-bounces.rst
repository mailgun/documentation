.. _api-bounces-old:

Bounces
=======

Mailgun automatically handles bounced emails. The bounced addresses
are collected in a bounces list and subsequent delivery attempts are
ignored to protect your sending reputation.

Mailgun can :ref:`notify your application <um-tracking-bounces>` every time a
message bounces.

The list of bounced addresses can be accessed programmatically:

.. code-block:: url

      GET /<domain>/bounces

Fetches the list of bounces.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ==========================================================

.. code-block:: url

     GET /<domain>/bounces/<address>

Fetches a single bounce event by a given email address.
This is useful to check if a given email address has bounced before.

.. code-block:: url

     POST /<domain>/bounces

Adds a permanent bounce to the bounces table.
Updates the existing record if already here.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 code               Error code (default 550)
 error              Error description, (default is empty)
 ================== =======================================================

.. code-block:: url

      DELETE /<domain>/bounces/<address>

"Clears" a given bounce event.

Examples
~~~~~~~~

Fetch the full list of all recipient addresses that bounced:

.. include:: samples/get-bounces.rst

Sample JSON response is shown below. Notice the following:

* There was only one bounce
* Both SMTP error code and SMTP error message are preserved

.. code-block:: javascript

  {
    "total_count": 1,
    "items": [
        {
            "created_at": "Fri, 21 Oct 2011 11:02:55 GMT",
            "code": 550,
            "address": "'baz@example.com",
            "error": "Message was not accepted -- invalid mailbox.  Local mailbox 'baz@example.com is unavailable: user not found"
        }
    ]
  }

Lets check if any messages sent to foo@bar.com have bounced before:

.. include:: samples/get-bounce.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Address not found in bounces table"
  }

Add a bounce to the table:

.. include:: samples/add-bounce.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Address has been added to the bounces table",
    "address": "bob@example.com"
  }
