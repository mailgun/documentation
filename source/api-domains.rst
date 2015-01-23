.. _api-domains:

Domains
=======

This API allows you to create, access, and validate domains programmatically.

.. code-block:: url

     GET /domains

Returns a list of domains under your account in JSON. See examples below.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ========================================================

.. code-block:: url

     GET /domains/<domain>

Returns a single domain, including credentials and DNS records. See examples below.

.. code-block:: url

     POST /domains

Create a new domain. See examples below.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 name              Name of the domain (ex. domain.com)
 smtp_password     Password for SMTP authentication
 spam_action       *disabled* or *tag* Disable, no spam filtering will occur
                   for inbound messages. Tag, messages will be tagged wtih a
                   spam header. See :ref:`um-spam-filter`.
 wildcard          *true* or *false* Determines whether the domain will
                   accept email for sub-domains.
 ================= ========================================================

.. code-block:: url

     DELETE /domains/<domain>

Delete a domain from your account.

.. code-block:: url

     GET /domains/<domain>/credentials

Returns a list of SMTP credentials for the defined domain. 

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ========================================================

.. code-block:: url

     POST /domains/<domain>/credentials

Creates a new set of SMTP credentials for the defined domain.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 login             The user name, for example ``bob.bar``
 password          A password for the SMTP credentials. (Length Min 5, Max 32)
 ================= ==========================================================

.. code-block:: url

     PUT /domains/<domain>/credentials/<login>

Updates the specified SMTP credentials. Currently only the password can be changed.

.. container:: ptable

 ================= ==========================================================
 Parameter         Description
 ================= ==========================================================
 password          A password for the SMTP credentials. (Length Min 5, Max 32)
 ================= ==========================================================

.. code-block:: url

     DELETE /domains/<domain>/credentials/<login>

Deletes the defined SMTP credentials.

.. note:: Mailgun imposes a rate limit for the Domains API endpoint. Users may 
		  issue no more than 300 requests per minute, per account. See the resultant
		  rate limit response below. 

Example
~~~~~~~

Get a list of all domains.

.. include:: samples/get-domains.rst

Sample response:

.. code-block:: javascript

	{
	  "total_count": 1,
	  "items": [
	    {
	      "created_at": "Wed, 10 Jul 2013 19:26:52 GMT",
	      "smtp_login": "postmaster@samples.mailgun.org",
	      "name": "samples.mailgun.org",
	      "smtp_password": "4rtqo4p6rrx9",
	      "wildcard": true, 
	      "spam_action": "disabled",
	      "state": "active"
	    }
	  ]
	}

Get a single domain.

.. include:: samples/get-domain.rst

Sample response:

.. code-block:: javascript

	{
	  "domain": {
	    "created_at": "Wed, 10 Jul 2013 19:26:52 GMT",
	    "smtp_login": "postmaster@domain.com",
	    "name": "domain.com",
	    "smtp_password": "4rtqo4p6rrx9",
	    "wildcard": false, 
	    "spam_action": "tag",
	    "state": "active"
	  },
	  "receiving_dns_records": [
	    {
	      "priority": "10",
	      "record_type": "MX",
	      "valid": "valid",
	      "value": "mxa.mailgun.org"
	    },
	    {
	      "priority": "10",
	      "record_type": "MX",
	      "valid": "valid",
	      "value": "mxb.mailgun.org"
	    }
	  ],
	  "sending_dns_records": [
	    {
	      "record_type": "TXT",
	      "valid": "valid",
	      "name": "domain.com",
	      "value": "v=spf1 include:mailgun.org ~all"
	    },
	    {
	      "record_type": "TXT",
	      "valid": "valid",
	      "name": "domain.com",
	      "value": "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUA...."
	    },
	    {
	      "record_type": "CNAME",
	      "valid": "valid",
	      "name": "email.domain.com",
	      "value": "mailgun.org"
	    }
	  ]
	}
Adding a domain.

.. include:: samples/add-domain.rst

Sample response:

.. code-block:: javascript

	{
	  "domain": {
	    "name": "example.com", 
	    "created_at": "Fri, 22 Nov 2013 18:42:33 GMT", 
	    "wildcard": false, 
	    "spam_action": "disabled", 
	    "smtp_login": "postmaster@example.com", 
	    "smtp_password": "thiswontwork",
	    "state": "active"
	  }, 
	  "receiving_dns_records": [
	    {
	      "priority": "10", 
	      "record_type": "MX", 
	      "valid": "valid", 
	      "value": "mxa.mailgun.org"
	    }, 
	    {
	      "priority": "10", 
	      "record_type": "MX", 
	      "valid": "valid", 
	      "value": "mxb.mailgun.org"
	    }
	  ], 
	  "message": "Domain has been created", 
	  "sending_dns_records": [
	    {
	      "record_type": "TXT", 
	      "valid": "valid", 
	      "name": "example.com", 
	      "value": "v=spf1 include:mailgun.org ~all"
	    }, 
	    {
	      "record_type": "TXT", 
	      "valid": "valid", 
	      "name": "k1._domainkey.example.com", 
	      "value": "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4G...."
	    }, 
	    {
	      "record_type": "CNAME", 
	      "valid": "valid", 
	      "name": "email.example.com", 
	      "value": "mailgun.org"
	    }
	  ]
	}
	
Deleting a domain.

.. include:: samples/delete-domain.rst

Sample response:

.. code-block:: javascript

	{
	  "message": "Domain has been deleted"
	}

Rate Limit Response:

.. code-block:: javascript

	{
	  "retry-seconds": 60,
	}


Listing all SMTP credentials:

.. include:: samples/get-credentials.rst

Sample response:

.. code-block:: javascript

 {
   "total_count": 2,
   "items": [
     {
       "size_bytes": 0,
       "created_at": "Tue, 27 Sep 2011 20:24:22 GMT",
       "mailbox": "user@samples.mailgun.org"
       "login": "user@samples.mailgun.org"
     },
     {
       "size_bytes": 0,
       "created_at": "Thu, 06 Oct 2011 10:22:36 GMT",
       "mailbox": "user@samples.mailgun.org"
       "login": "user@samples.mailgun.org"
     }
   ]
 }

Creating new SMTP credentials:

.. include:: samples/create-credentials.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Created 1 credentials pair(s)"
  }

Updating the password for a given credential pair:

.. include:: samples/change-pwd-credentials.rst

Sample response:

.. code-block:: javascript

  {
    "message": "Password changed"
  }

Deleting a given credential pair:

.. include:: samples/delete-credentials.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Credentials have been deleted",
   "spec": "alice@samples.mailgun.org"
 }
