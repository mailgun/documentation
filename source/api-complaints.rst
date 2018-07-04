.. _api-complaints-old:

Spam Complaints
===============

When recipients of your messages press "Spam" button, Mailgun receives
those complaints from ESPs (email service providers).

Mailgun can :ref:`notify your application <um-tracking-spam-complaints>` every time a
recipient flags your message as spam.

This API allows you to programmatically download the list of users who
have complained, add a complaint, or delete a complaint.

.. code-block:: url

     GET /<domain>/complaints

Fetches the list of complaints.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ==========================================================

.. code-block:: url

     GET /<domain>/complaints/<address>

Fetches a single spam complaint by a given email address.
This is useful to check if a particular user has complained.

.. code-block:: url

     POST /<domain>/complaints

Adds an address to the complaints table.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 ================== =======================================================

.. code-block:: url

     DELETE /<domain>/complaints/<address>

Removes a given spam complaint.

Examples
~~~~~~~~

Fetch the full list of all recipients who have pressed their "Spam" buttons:

.. include:: samples/get-complaints.rst

Sample JSON response is shown below. Notice the following:

* There was only one user who clicked "Spam" button.
* According to ``count`` value, he clicked twice.
* ``created_at`` indicates the time when it happend.

.. code-block:: javascript

  {
    "total_count": 1,
    "items": [
        {
            "count": 2,
            "created_at": "Tue, 15 Nov 2011 08:25:11 GMT",
            "address": "baz@example.com"
        }
    ]
  }

Now lets check if ``baz@example.com`` ever complained:

.. include:: samples/get-complaint.rst

Of course he did. The response:

.. code-block:: javascript

  {
    "complaint": {
        "count": 2,
        "created_at": "Tue, 15 Nov 2011 08:25:11 GMT",
        "address": "baz@example.com"
    }
  }

Add a complaint to the table:

.. include:: samples/add-complaint.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Address has been added to the complaints table",
    "address": "bob@example.com"
  }
