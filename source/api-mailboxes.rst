.. _api-mailboxes:

Mailboxes
============================

Mailgun Mailbox API allows you to programmatically create as many
mailboxes as you wish. The incoming messages can be stored in mailboxes.
There is no HTTP API to fetch the contents of the mailboxes: you
need to use POP3 or IMAP protocols for that.

.. warning:: Mailboxes is a legacy feature of Mailgun that is no longer 
   offered to new customers.  Please utilize the Store() endpoint instead.

.. warning:: Currently Mailgun stores mailbox passwords in plain text.
   This is not acceptable for some applications. We are considering
   changing this in the future.

.. code-block:: url

     GET /<domain>/mailboxes

Fetches the list of mailboxes for a given domain.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ==========================================================

.. code-block:: url

     POST /<domain>/mailboxes

Creates a new mailbox for a supplied domain

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 mailbox           The name of the mailbox, for example ``bob.bar``
 password          Mailbox password.
 ================= ==========================================================

.. code-block:: url

     PUT /<domain>/mailboxes/<mailbox>

Updates the specified mailbox. Currently only the password can be changed.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 password          Mailbox password.
 ================= ==========================================================

.. code-block:: url

     DELETE /<domain>/mailboxes/<mailbox>

Deletes the given mailbox.

Examples
~~~~~~~~

Listing all mailboxes:

.. include:: samples/get-mailboxes.rst

Sample response:

.. code-block:: javascript

 {
   "total_count": 2,
   "items": [
     {
       "size_bytes": 0,
       "created_at": "Tue, 27 Sep 2011 20:24:22 GMT",
       "mailbox": "postmaster@samples.mailgun.org"
     },
     {
       "size_bytes": 0,
       "created_at": "Thu, 06 Oct 2011 10:22:36 GMT",
       "mailbox": "user@samples.mailgun.org"
     }
   ]
 }

Creating a new mailbox:

.. include:: samples/create-mailbox.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Created 1 mailboxes"
  }

Updating the password for a given mailbox:

.. include:: samples/change-mailbox-password.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Password changed"
  }

Deleting a given mailbox:

.. include:: samples/delete-mailbox.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Mailbox has been deleted",
   "spec": "alice@samples.mailgun.org"
 }

