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
 ================= ========================================================

.. code-block:: url

     DELETE /domains/<domain>

Delete a domain from your account.

.. note:: Mailgun imposes a rate limit for the Domains API endpoint. Users may 
		  issue no more than 300 requests per minute, per account. See the resultant
		  rate limit response below. 

Example
~~~~~~

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
	      "smtp_password": "4rtqo4p6rrx9"
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
	    "smtp_password": "4rtqo4p6rrx9"
	  },
	  "receiving_dns_records": [
	    {
	      "priority": "10",
	      "record_type": "MX",
	      "valid": "unknown",
	      "value": "mxa.mailgun.org"
	    },
	    {
	      "priority": "10",
	      "record_type": "MX",
	      "valid": "unknown",
	      "value": "mxb.mailgun.org"
	    }
	  ],
	  "sending_dns_records": [
	    {
	      "record_type": "TXT",
	      "valid": "unknown",
	      "name": "domain.com",
	      "value": "v=spf1 include:mailgun.org ~all"
	    },
	    {
	      "record_type": "CNAME",
	      "valid": "unknown",
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
	    "created_at": "Wed, 10 Jul 2013 19:26:52 GMT",
	    "smtp_login": "postmaster@samples.mailgun.org",
	    "name": "samples.mailgun.org",
	    "smtp_password": "4rtqo4p6rrx9"
	  },
	  "message": "Domain has been created"
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
