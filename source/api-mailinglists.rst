.. _api-mailinglists:

Mailing Lists
=============

You can programmatically create mailing lists using Mailgun Mailing List API.
A mailing list is a group of members (recipients) which itself has an email address,
like developers@mailgun.net. This address becomes an ID for this mailing list.

When you send a message to developers@mailgun.net, all members of the list will
receive a copy of it.

.. code-block:: url

    GET /lists/pages

Paginate over mailing lists under your account

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 limit              Maximum number of records to return *(optional: 100 by default)*
 ================== =======================================================

.. code-block:: url

     GET /lists/<address>

Returns a single mailing list by a given address.

.. code-block:: url

     POST /lists

Creates a new mailing list.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            A valid email address for the mailing list, e.g.
                    ``developers@mailgun.net``, or ``Developers <devs@mg.net>``
 name               Mailing list name, e.g. ``Developers`` *(optional)*
 description        A description *(optional)*
 access_level       List access level, one of: readonly (default), members, everyone
 reply_preference   Set where replies should go: ``list`` (default) | ``sender`` *(optional)*
 ================== =======================================================

.. code-block:: url

     PUT /lists/<address>

Update mailing list properties, such as address, description or name

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            New mailing list address, e.g. ``devs@mg.net`` *(optional)*
 name               New name, e.g. ``My newsletter`` *(optional)*
 description        Description string *(optional)*
 access_level       List access level, one of: readonly (default), members, everyone
 reply_preference   Set where replies should go: ``list`` (default) | ``sender`` *(optional)*
 ================== =======================================================

.. code-block:: url

     DELETE /lists/<address>

Deletes a mailing list.


.. code-block:: url

    POST /lists/<address>/validate

Validate all the members of the mailing list.

.. code-block:: url

    GET /lists/<address>/validate

Retrieve current status of the mailing list validation job.

.. code-block:: url

    DELETE /lists/<address>/validate

Cancel an active mailing list validation job.

.. code-block:: url

    GET /lists/<address>/members/pages

Paginate over list members in the given mailing list

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 subscribed         ``yes`` to lists subscribed, ``no`` for unsubscribed.
                    list all if not set
 limit              Maximum number of records to return *(optional: 100 by default)*
 ================== =======================================================

.. code-block:: url

     GET /lists/<address>/members/<member_address>

Retrieves a mailing list member.

.. code-block:: url

     POST /lists/<address>/members

Adds a member to the mailing list.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address specification, e.g.
                    ``Alice <alice@example.com>`` or just ``alice@example.com``
 name               Optional member name
 vars               JSON-encoded dictionary string with arbitrary
                    parameters, e.g. ``{"gender":"female","age":27}``
 subscribed         ``yes`` to add as subscribed *(default)*,
                    ``no`` as unsubscribed
 upsert             ``yes`` to update member if present, ``no`` to
                     raise error in case of a duplicate member *(default)*
 ================== =======================================================

.. code-block:: url

     PUT /lists/<address>/members/<member_address>

Updates a mailing list member with given properties.
Won't touch the property if it's not passed in.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address specification, e.g.
                    ``Alice <alice@example.com>`` or just ``alice@example.com``
 name               Recipient name, e.g. ``Alice``
 vars               JSON-encoded dictionary string with arbitrary
                    parameters, e.g. ``{"gender":"female","age":27}``
 subscribed         ``no`` to set unsubscribed, ``yes`` as subscribed
 ================== =======================================================

.. code-block:: url

     POST /lists/<address>/members.json

Adds multiple members, up to 1,000 per call, to a Mailing List.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 members            JSON-encoded array. Elements can be either addresses, e.g. ``["bob@example.com", "alice@example.com"]``,
                    or JSON objects, e.g. ``[{"address": "bob@example.com", "name": "Bob", "subscribed": false}, {"address": "alice@example.com", "name": "Alice"}]`` . Custom variables can be provided, see examples.
 upsert             ``yes`` to update existing members, ``no`` (default) to ignore duplicates
 ================== =======================================================

.. code-block:: url

     DELETE /lists/<address>/members/<member_address>

Delete a mailing list member.

Access Levels
-------------
Mailing lists have three different access levels. These levels define how users
can interact with the list.

.. container:: ptable

 ================== =======================================================
 Access Level       Description
 ================== =======================================================
 read-only          Only authenticated users can post to this list. It is used
                    for mass announcements and newsletters. This is the default
                    access level.
 members            Subscribed members of the list can communicate with each other.
 everyone           Everyone can post to this list. Recommended turning spam
                    filtering on when using this mode.
 ================== =======================================================

Examples
--------

Create a mailing list:

.. include:: samples/create-mailing-list.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Mailing list has been created",
    "list": {
        "created_at": "Tue, 06 Mar 2012 05:44:45 GMT",
        "address": "dev@samples.mailgun.org",
        "members_count": 0,
        "description": "Mailgun developers list",
        "name": ""
    }
  }

Get a page of mailing lists:

.. include:: samples/get-mailing-lists.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
      {
        "access_level": "everyone",
        "address": "dev@samples.mailgun.org",
        "created_at": "Tue, 06 Mar 2012 05:44:45 GMT",
        "description": "Mailgun developers list",
        "members_count": 1,
        "name": ""
      },
      {
        "access_level": "readonly",
        "address": "bar@example.com",
        "created_at": "Wed, 06 Mar 2013 11:39:51 GMT",
        "description": "",
        "members_count": 2,
        "name": ""
      }
    ],
    "paging": {
      "first": "https://url_to_next_page",
      "last": "https://url_to_last_page",
      "next": "https://url_to_next_page",
      "previous": "https://url_to_previous_page"
    }
  }

Add a mailing list member:

.. include:: samples/add-list-member.rst

Sample response:

.. code-block:: javascript

  {
    "member": {
        "vars": {
            "age": 26
        },
        "name": "Bob Bar",
        "subscribed": true,
        "address": "bar@example.com"
    },
    "message": "Mailing list member has been created"
  }

Add multiple mailing list members (limit 1,000 per call):

.. include:: samples/add-list-members.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Mailing list has been updated",
	  "list": {
	    "members_count": 7,
	    "description": "My updated test mailing list",
	    "created_at": "Wed, 06 Mar 2013 11:39:51 GMT",
	    "access_level": "readonly",
	    "address": "dev@samples.mailgun.org",
	    "name": "Test List Updated"
	  }
	}


You can also update an existing member:

.. include:: samples/update-list-member.rst

Sample response:

.. code-block:: javascript

  {
    "member": {
        "vars": {
            "age": 26
        },
        "name": "Foo Bar",
        "subscribed": false,
        "address": "bar@example.com"
    },
    "message": "Mailing list member has been updated"
  }

Listing members:

.. include:: samples/get-list-members.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
        {
            "vars": {
                "age": 26
            },
            "name": "Foo Bar",
            "subscribed": false,
            "address": "bar@example.com"
        }
    ],
    "paging": {
      "first": "https://url_to_first_page",
      "last": "https://url_to_last_page",
      "next": "http://url_to_next_page",
      "previous": "http://url_to_previous_page"
    }
  }

Remove a member:

.. include:: samples/remove-list-member.rst

Sample response:

.. code-block:: javascript

  {
    "member": {
        "address": "bar@example.com"
    },
    "message": "Mailing list member has been deleted"
  }

Remove mailing list:

.. include:: samples/remove-mailing-list.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Mailing list has been deleted",
    "address": "dev@samples.mailgun.org"
  }


Run mailing list validation:

.. include:: samples/create-list-validation.rst

Sample response:

.. code-block:: javascript

    {
        "id": "listname@yourdomain.com",
        "message": "The validation job was submitted."
    }

Get mailing list validation status:

.. include:: samples/get-list-validation.rst

Sample response:

.. code-block:: javascript

    {
      "created_at": "Tue, 26 Feb 2019 21:30:03 GMT",
      "download_url": {
        "csv": "<download_link>",
        "json": "<download_link>"
      },
      "id": "listname@mydomain.sandbox.mailgun.org",
      "quantity": 207665,
      "records_processed": 207665,
      "status": "uploaded",
      "summary": {
        "result": {
          "deliverable": 184199,
          "do_not_send": 5647,
          "undeliverable": 12116,
          "unknown": 5613
        },
        "risk": {
          "high": 17763,
          "low": 142547,
          "medium": 41652,
          "unknown": 5613
        }
      }
    }

Field Explanation:

=====================    =========    ============================================================================================================
Parameter                Type         Description
=====================    =========    ============================================================================================================
created_at               string       Date/Time that the request was initiated
download_url             array        `csv` and `json` representation of the download link for the results of the list validation
id                       string       list name given when the list was initially created
quantity                 integer      number of total items in the list to be validated
records_processed        integer      de-duplicated total of validated email addresses
status                   string       current state of the list validation request
summary                  array        nested count results for `deliverable`, `do_not_send`, `undeliverable` and `unknown` statuses
risk                     array        nested count results for `high`, `low`, `medium` or `unknown` risk assessment results
=====================    =========    ============================================================================================================

Cancel mailing list validation:

.. include:: samples/delete-list-validation.rst

Sample response:

.. code-block:: javascript

    {
        "message": "Validation job canceled."
    }
