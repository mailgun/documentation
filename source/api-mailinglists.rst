.. _api-mailinglists:

Mailing Lists
=============

You can programmatically create mailing lists using Mailgun Mailing List API.
A mailing list is a group of members (recipients) which itself has an email address,
like developers@mailgun.net. This address becomes an ID for this mailing list.

When you send a message to developers@mailgun.net, all members of the list will
receive a copy of it.

.. code-block:: url

     GET /lists

Returns a list of mailing lists under your account.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Find a mailing list by it's address *(optional)*
 limit              Maximum number of records to return *(100 by default)*
 skip               Records to skip *(0 by default)*
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
 ================== =======================================================

.. code-block:: url

     DELETE /lists/<address>

Deletes a mailing list.

.. code-block:: url

     GET /lists/<address>/members

Fetches the list of mailing list members.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 subscribed         ``yes`` to list subscribed, ``no`` for unsubscribed,
                    list all if not set
 limit              Maximum number of records to return *(100 by default)*
 skip               Records to skip *(0 by default)*
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
 members            JSON-encoded array of email addresses, e.g. ``["bob@example.com", alice@example.com"]``. Custom variables can be provided, see examples.
 subscribed         ``no`` to set unsubscribed, ``yes`` as subscribed
 ================== =======================================================
 
.. code-block:: url

     DELETE /lists/<address>/members/<member_address>

Delete a mailing list member.

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
    "total_count": 1
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
