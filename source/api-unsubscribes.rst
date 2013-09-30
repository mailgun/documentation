.. _api-unsubscribes:

Unsubscribes
============

Mailgun allows you to quickly add "Unsubscribe me" feature to your outgoing
emails without any programming on your end. You can enable this in your
Control Panel.

Mailgun can :ref:`notify your application <manual-webhooks>` every time a
user unsubscribes.

This API allows you to programmatically download the list of recipients who have
unsubscribed from your emails. You can also programmatically "clear" the
unsubscribe event.

.. code-block:: url

     GET /<domain>/unsubscribes

Fetches the list of unsubscribes.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ==========================================================

.. code-block:: url

     GET /<domain>/unsubscribes/<address>

Retreives a single unsubscribe record. Can be used to check if
a given address is present in the list of unsubscribed users.

.. code-block:: url

     DELETE /<domain>/unsubscribes/<address or id>

Removes an address from the unsubscribes table. Address defines
which events to delete. can be one of two things:

 - an email address: all unsubscribe events for that email
   address will be removed.
 - id string: deletes a specific event.

.. code-block:: url

     POST /<domain>/unsubscribes

Adds address to unsubscribed table.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 tag                Tag to unsubscribe from, use ``*`` to
                    unsubscribe address from domain
 ================== =======================================================

Examples
~~~~~~~~

Fetch the full list of all unsubscribed recipients:

.. include:: samples/get-unsubscribes.rst

Sample response:

.. code-block:: javascript

  {
    "total_count": 4,
    "items": [
        {
            "created_at": "Thu, 15 Mar 2012 08:35:02 GMT",
            "tag": "*",
            "id": "4f3b954a6addaa3e196735a2",
            "address": "bob@example.com"
        },
        {
            "created_at": "Thu, 15 Mar 2012 08:35:02 GMT",
            "tag": "tag1",
            "id": "4f3b954a6addaa3e1967359f",
            "address": "bob@example.com"
        },
        {
            "created_at": "Wed, 01 Feb 2012 08:09:45 GMT",
            "tag": "Testing Tag",
            "id": "4f28f3494d532a3a823d0d9f",
            "address": "alice@example.com"
        },
        {
            "created_at": "Wed, 01 Feb 2012 08:09:38 GMT",
            "tag": "*",
            "id": "4f28f1024d532a3a823d0d68",
            "address": "alice@example.com"
        }
    ]
  }

Unsubscribe a recipient from a certain tag:

.. include:: samples/add-unsubscribe-tag.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Address has been added to the unsubscribes table",
    "address": "bob@example.com"
  }

Unsubscribe a recipient from all mail sent through this domain:

.. include:: samples/add-unsubscribe-all.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Address has been added to the unsubscribes table",
    "address": "bob@example.com"
  }
