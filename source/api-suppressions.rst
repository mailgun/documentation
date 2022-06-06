.. _api-suppressions:

Suppressions
############

Mailgun keeps three lists of addresses it blocks the delivery to: bounces,
unsubscribes and complaints. These lists are populated automatically as Mailgun
detects undeliverable addresses you try to send to and as recipients unsubscribe
from your mailings or mark your emails as a spam (for ESPs that provide FBL).
You can also add/remove addresses from any of these lists using the API.

It's important to note that these suppression lists are unique to a sending domain and are not an account level (global) suppression list. If you want to add/remove the same address(es) from multiple domains, you'll need to do so for each domain.

You can determine if you have reached the last page of suppressions if the <next page URL> is equal to the <last page URL>.

.. _api-bounces:

Bounces
=======

Bounce list stores events of delivery failures due to permanent recipient
mailbox errors such as non-existent mailbox. Soft bounces (for example, mailbox
is full) and other failures (for example, ESP rejects an email because it
thinks it is spam) are not added to the list.

Subsequent delivery attempts to an address found in a bounce list are prevented
to protect your sending reputation.

The bounce suppression API endpoint is available at:

.. code-block:: url

      v3/<domain>/bounces

Mailgun can notify your application every time a message bounces via
a :ref:`permanent_fail webhook <um-tracking-failures>`.

View all bounces
----------------

.. code-block:: url

      GET /<domain>/bounces

Paginate over a list of bounces for a domain.

.. note:: Via this API method bounces are returned in the alphabetical order. If
          you wish to poll for the recently occurred bounces, please consider
          using the :ref:`Events API <api-events>`.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return (optional, default: 100,
                   max: 1000)
 ================= ==========================================================

Example:

.. include:: samples/get-bounces.rst

Expected response:

.. code-block:: javascript

      200
      {
        "items":
          [
            {
              "address": "alice@example.com",
              "code": "550",
              "error": "No such mailbox",
              "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
            },
            ...
          ],
        "paging":
          {
            "first": <first page URL>,
            "next": <next page URL>,
            "previous": <previous page URL>,
            "last": <last page URL>
          }
      }

View a single bounce
--------------------

.. code-block:: url

     GET /<domain>/bounces/<address>

Fetch a single bounce event by a given email address. Useful to check if
a given email address has bounced before.

Example:

.. include:: samples/get-bounce.rst

Expected responses:

.. code-block:: javascript

      200
      {
        "address": "foo@bar.com",
        "code": "550",
        "error": "No such mailbox",
        "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
      }

.. code-block:: javascript

      404
      {
        "message": "Address not found in bounces table"
      }

Add a single bounce
-------------------

.. code-block:: url

     POST /<domain>/bounces

Add a bounce record to the bounce list. Updates the existing record
if the address is already there.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 code               Error code (optional, default: 550)
 error              Error description (optional, default: empty string)
 created_at         Timestamp of a bounce event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Example:

.. include:: samples/add-bounce.rst

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Address has been added to the bounces table",
        "address": "bob@example.com"
      }

Add multiple bounces
--------------------

.. code-block:: url

      POST /<domain>/bounces, Content-Type: application/json

Add multiple bounce records to the bounce list in a single API call.

Request body is expected to be a valid JSON encoded string containing up
to 1000 bounce records in the following format.

.. code-block:: javascript

      [
        {
          "address": "alice@example.com",
          "code": "550",
          "error": "Bounced",
          "created_at": "Thu, 13 Oct 2011 18:02:00 UTC"
        },
        {
          "address": "bob@example.com",
          "code": "550",
          "error": "Bounced"
        },
        {
          "address": "carol@example.com",
          "code": "550"
        },
        {
          "address": "dan@example.com"
        }
      ]

Fields within each individual bounce record are the same as for the "add
a single bounce" API method, with the same defaults and optionality rules.

.. note:: The current versions of our language libraries do not support
          adding multiple bounces yet.

Expected response:

.. code-block:: javascript

      200
      {
        "message": "4 addresses have been added to the bounces table"
      }

Import a list of bounces
------------------------

.. code-block:: url

      POST /<domain>/bounces/import, Content-Type: multipart/form-data

Import a CSV file containing a list of addresses to add to the bounce list.

CSV file must be 25MB or under and must contain the following column headers: `address,code,error,created_at`

 ================== =======================================================
 Column             Description
 ================== =======================================================
 address            Valid email address
 code               Error code (optional, default: 550)
 error              Error description (optional, default: empty string)
 created_at         Timestamp of a bounce event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Expected response:

.. code-block:: javascript

      200
      {
        "message": "file uploaded successfully"
      }


Delete a single bounce
----------------------

.. code-block:: url

      DELETE /<domain>/bounces/<address>

Clears a given bounce event. The delivery to the deleted email address resumes
until it bounces again.

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Bounced address has been removed"
      }

Delete an entire bounce list
----------------------------

.. code-block:: url

      DELETE /<domain>/bounces

Clears all bounced email addresses for a domain. Delivery to the deleted email addresses will no
longer be suppressed.

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Bounced addresses for this domain have been removed"
      }


.. _api-unsubscribes:



Unsubscribes
============

Unsubscribe list stores email addresses of recipients who unsubscribed from
your mailings by clicking a Mailgun generated unsubscribe link.

Mailgun allows you to quickly add "Unsubscribe me" feature to your outgoing
emails without any programming on your end. You can enable this in your
Control Panel under your domain settings.

The unsubscribe suppression API endpoint is available at:

.. code-block:: url

      v3/<domain>/unsubscribes

Mailgun can notify your application every time a user unsubscribes via
an :ref:`unsubscribed webhook <um-tracking-unsubscribes>`.

View all unsubscribes
---------------------

.. code-block:: url

     GET /<domain>/unsubscribes

Paginate over a list of unsubscribes for a domain.

.. note:: Via this API method unsubscribes are returned in the alphabetical
          order. If you wish to poll for the recently occurred unsubscribes,
          please consider using the :ref:`Events API <api-events>`.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Number of records to return (optional, default: 100,
                   max: 1000)
 ================= ==========================================================

Example:

.. include:: samples/get-unsubscribes.rst

Expected response:

.. code-block:: javascript

      200
      {
        "items":
          [
            {
              "address": "alice@example.com",
              "tag": "*",
              "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
            },
            ...
          ],
        "paging":
          {
            "first": <first page URL>,
            "next": <next page URL>,
            "previous": <previous page URL>,
            "last": <last page URL>
          }
      }

View a single unsubscribe
-------------------------

.. code-block:: url

     GET /<domain>/unsubscribes/<address>

Fetch a single unsubscribe record. Can be used to check if a given address
is present in the list of unsubscribed users.

Expected responses:

.. code-block:: javascript

      200
      {
        "address": "alice@example.com",
        "tag": "*",
        "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
      }

.. code-block:: javascript

      404
      {
        "message": "Address not found in unsubscribers table"
      }

Add a single unsubscribe
------------------------

.. code-block:: url

     POST /<domain>/unsubscribes

Add an address to the unsubscribe table.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 tag                Tag to unsubscribe from, use ``*`` to unsubscribe
                    an address from all domain's correspondence (optional,
                    default: ``*``)
 created_at         Timestamp of an unsubscribe event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Example:

.. include:: samples/add-unsubscribe-all.rst

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Address has been added to the unsubscribes table",
        "address": "bob@example.com"
      }

Add multiple unsubscribes
-------------------------

.. code-block:: url

      POST /<domain>/unsubscribes, Content-Type: application/json

Add multiple unsubscribe records to the unsubscribe list in a single API call.

Request body is expected to be a valid JSON encoded string containing up
to 1000 unsubscribe records in the following format.

.. code-block:: javascript

      [
        {
          "address": "alice@example.com",
          "tags": ["some tag"],
          "created_at": "Thu, 13 Oct 2011 18:02:00 UTC"
        },
        {
          "address": "bob@example.com",
          "tags": ["*"],
        },
        {
          "address": "carol@example.com"
        }
      ]

Fields within each individual unsubscribe record are the same as for the "add
a single unsubscribe" API method, with the same defaults and optionality rules.

.. note:: The current versions of our language libraries do not support
          adding multiple unsubscribes yet.

Expected response:

.. code-block:: javascript

      200
      {
        "message": "3 addresses have been added to the unsubscribes table"
      }


Import a list of unsubscribes
-----------------------------

.. code-block:: url

      POST /<domain>/unsubscribes/import, Content-Type: multipart/form-data

Import a CSV file containing a list of addresses to add to the unsubscribe list.

CSV file must be 25MB or under and must contain the following column headers: `address,tag,created_at`

 ================== =======================================================
 Column             Description
 ================== =======================================================
 address            Valid email address
 tags               Tag to unsubscribe from, use ``*`` to unsubscribe
                    an address from all domain's correspondence (optional,
                    default: ``*``)
 created_at         Timestamp of an unsubscribe event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Expected response:

.. code-block:: javascript

      200
      {
        "message": "file uploaded successfully"
      }

Delete a single unsubscribe
---------------------------

.. code-block:: url

     DELETE /<domain>/unsubscribes/<address>

Remove an address from the unsubscribes list. If ``tag`` parameter is not provided,
completely removes an address from the list.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 tag                Specific tag to remove (optional)
 ================== =======================================================

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Unsubscribe event has been removed"
      }

.. _api-complaints:

Complaints
==========

Complaint list stores email addresses of recipients who marked your messages
as a spam (for ESPs that support FBL).

The complaint API endpoint is available at:

.. code-block:: url

      v3/<domain>/complaints

Mailgun can notify your application every time a recipient flags your message
as spam via a :ref:`complained webhook <um-tracking-spam-complaints>`.

View all complaints
-------------------

.. code-block:: url

     GET /<domain>/complaints

Paginate over a list of complaints for a domain.

.. note:: Via this API method complaints are returned in the alphabetical
          order. If you wish to poll for the recently occurred complaints,
          please consider using the :ref:`Events API <api-events>`.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return (optional, default: 100,
                   max: 1000)
 ================= ==========================================================

Example:

.. include:: samples/get-complaints.rst

Expected response:

.. code-block:: javascript

      200
      {
        "items":
          [
            {
              "address": "alice@example.com",
              "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
            },
            ...
          ],
        "paging":
          {
            "first": <first page URL>,
            "next": <next page URL>,
            "previous": <previous page URL>,
            "last": <last page URL>
          }
      }

View a single complaint
-----------------------

.. code-block:: url

     GET /<domain>/complaints/<address>

Fetch a single spam complaint by a given email address. This is useful to check
if a particular user has complained.

Example:

.. include:: samples/get-complaint.rst

Expected response:

.. code-block:: javascript

      200
      {
        "address": "baz@example.com",
        "created_at": "Fri, 21 Oct 2011 11:02:55 GMT"
      }

.. code-block:: javascript

      404
      {
        "message": "No spam complaints found for this address"
      }

Add a single complaint
----------------------

.. code-block:: url

     POST /<domain>/complaints

Add an address to the complaints list.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address
 created_at         Timestamp of a complaint event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Example:

.. include:: samples/add-complaint.rst

Expected response:

.. code-block:: javascript

      200
      {
        "message": "Address has been added to the complaints table",
        "address": "bob@example.com"
      }

Add multiple complaints
-----------------------

.. code-block:: url

      POST /<domain>/complaints, Content-Type: application/json

Add multiple complaint records to the complaint list in a single API call.

Request body is expected to be a valid JSON encoded string containing up
to 1000 complaint records in the following format.

.. code-block:: javascript

      [
        {
          "address": "alice@example.com",
          "created_at": "Thu, 13 Oct 2011 18:02:00 UTC"
        },
        {
          "address": "bob@example.com"
        }
      ]

Fields within each individual complaint record are the same as for the "add
a single unsubscribe" API method, with the same defaults and optionality rules.

.. note:: The current versions of our language libraries do not support
          adding multiple complaints yet.

Expected response:

.. code-block:: url

      200
      {
        "message": "2 complaint addresses have been added to the complaints table"
      }


Import a list of complaints
---------------------------

.. code-block:: url

      POST /<domain>/complaints/import, Content-Type: multipart/form-data

Import a CSV file containing a list of addresses to add to the complaint list.

CSV file must be 25MB or under and must contain the following column headers: `address,created_at`

 ================== =======================================================
 Column             Description
 ================== =======================================================
 address            Valid email address
 created_at         Timestamp of a complaint event in :ref:`RFC2822 format
                    <date-format>` (optional, default: current time)
 ================== =======================================================

Expected response:

.. code-block:: javascript

      200
      {
        "message": "file uploaded successfully"
      }

Delete a single complaint
-------------------------

.. code-block:: url

     DELETE /<domain>/complaints/<address>

Remove a given spam complaint.

Expected response:

.. code-block:: url

      200
      {
        "message": "Spam complaint has been removed"
      }


Whitelists
===========

The whitelist API provides the ability to whitelist specific addresses from being added to bounce list.
You can whitelist by domain name (i.e example.com) or by specific address (i.e. alice@example.com). Mailgun doesn't add an address to bounce list if the address is whitelisted.
This API is very useful if you test against your private services and don't want to constantly clean up bounce lists.

View all whitelist records
--------------------------

.. code-block:: url

     GET /<domain>/whitelists

Paginate over a whitelists for a domain.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Number of records to return (optional, default: 100,
                   max: 1000)
 ================= ==========================================================

Example:

.. include:: samples/get-whitelists.rst

Expected response:

.. code-block:: javascript

      200
      {
        "items":
          [
            {
              "value": "alice@example.com",
              "reason": "reason of white listing"
              "type": "address",
              "createdAt": "Fri, 21 Oct 2011 11:02:55 UTC"
            },
            {
              "value": "test.com",
              "reason": "reason of white listing"
              "type": "domain",
              "createdAt": "Fri, 21 Oct 2012 11:02:56 UTC"
            }
            ...
          ],
        "paging":
          {
            "first": <first page URL>,
            "next": <next page URL>,
            "previous": <previous page URL>,
            "last": <last page URL>
          }
      }

View a single whitelist record
------------------------------

.. code-block:: url

     GET /<domain>/whitelists/<address or domain>

Fetch a single whitelist record. Can be used to check if a given address or domain
is present in the whitelist table

Expected responses:

.. code-block:: javascript

      200
      {
        "value": "alice@example.com",
        "reason": "why the record was created"
        "type": "address",
        "createdAt": "Fri, 21 Oct 2011 11:02:55 GMT"
      }

.. code-block:: javascript

      404
      {
        "message": "Address/Domain not found in whitelists table"
      }


Add a single whitelist record
-----------------------------

.. code-block:: url

     POST /<domain>/whitelists

Add an address or domain to the whitelist table.

.. container:: ptable

 ================== =======================================================
 Parameter          Description
 ================== =======================================================
 address            Valid email address if you would like to whitelist email address
 domain             Valid domain name if you would like whitelist entire domain name
 ================== =======================================================

.. note:: The single request accepts either one `address` or `domain` parameter

Example:

.. include:: samples/add-whitelist.rst

Expected response:

.. code-block:: javascript

    200
    {
      "message":"Address/Domain has been added to the whitelists table",
      "type":"domain",
      "value":"example.com"
    }

Import a list of addresses and/or domains
-----------------------------------------

.. code-block:: url

      POST /<domain>/whitelists/import, Content-Type: multipart/form-data

Import a CSV file containing a list of addresses and/or domains to add to the whitelist.

CSV file must be 25MB or under and must contain the following column headers: `address,domain`

 ================== =======================================================
 Column             Description
 ================== =======================================================
 address            Valid email address if you would like to whitelist email address
 domain             Valid domain name if you would like whitelist entire domain name
 ================== =======================================================

Expected response:

.. code-block:: javascript

      200
      {
        "message": "file uploaded successfully"
      }

Delete a single record from whitelist table
-------------------------------------------

.. code-block:: url

     DELETE /<domain>/whitelists/<address or domain>

Remove a given record from whitelist table.

Expected response:

.. code-block:: javascript

      200
      {
        "message":"Whitelist address/domain has been removed",
        "value":"alice@example.com"
      }
