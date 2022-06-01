.. _api-domains:

Domains
=======

The domains endpoint is available at:

.. code-block:: url

     v4/domains

The domains API allows you to create, access, and validate domains programmatically.

.. code-block:: url

     GET /domains

Returns a list of domains under your account in JSON. See examples below.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 authority         Filter the list by a given DKIM authority name
 state		   Filter the list by a given state. Can be ``active``, ``unverified`` or ``disabled``
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ========================================================

.. code-block:: url

     GET /domains/<domain>

Returns a single domain, including credentials and DNS records. See examples below.

.. code-block:: url

     PUT /domains/<domain>/verify

Places the domain in an unverified state and triggers the verification process. Returns a single domain, including credentials and DNS records.
If the domain is successfully verified the domain's state will be 'active'. For more information on verifying domains,
visit the Mailgun `User Manual`_.

.. _User Manual: https://documentation.mailgun.com/en/latest/user_manual.html#verifying-your-domain

.. code-block:: url

     POST /domains

Create a new domain. See examples below.

.. container:: ptable

 ===================== ========================================================
 Parameter             Description
 ===================== ========================================================
 name                  Name of the domain (ex. domain.com)
 smtp_password         Password for SMTP authentication
 spam_action           ``disabled``, ``block``, or ``tag``

                       If ``disabled``, no spam filtering will occur for inbound
                       messages.

                       If ``block``, inbound spam messages will not be delivered.

                       If ``tag``, inbound messages will be tagged with a spam header.
                       See :ref:`um-spam-filter`.

                       The default is ``disabled``.
 wildcard              ``true`` or ``false``

                       Determines whether the domain will accept email for sub-domains when sending messages.

                       The default is ``false``.
 force_dkim_authority  ``true`` or ``false``

                       If set to ``true``, the domain will be the DKIM authority for itself
                       even if the root domain is registered on the same mailgun account

                       If set to ``false``, the domain will have the same DKIM authority
                       as the root domain registered on the same mailgun account

                       The default is ``false``.
 dkim_key_size         ``1024`` or ``2048``

                       Set the length of your domain's generated DKIM key

                       The default is ``1024``
 ips                   An optional, comma-separated list of IP addresses to be assigned
                       to this domain. If not specified, all dedicated IP addresses on
                       the account will be assigned. If the request cannot be fulfilled
                       (e.g. a requested IP is not assigned to the account, etc), a
                       ``400`` will be returned.
		       
 pool_id	       The id of the IP Pool that you wish to assign to the domain. The pool must contain 
                       at least 1 IP. (Note: IP Pools are only available on certain plans; see http://mailgun.com/pricing)

 web_scheme            ``http`` or ``https``

                       Set your open, click and unsubscribe URLs to use http or https

                       The default is ``http``
 ===================== ========================================================

.. code-block:: url

     DELETE /domains/<domain>

Delete a domain from your account.

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

.. code-block:: url

     GET /domains/<domain>/connection

Returns delivery connection settings for the defined domain.

.. code-block:: url

     PUT /domains/<domain>/connection

Updates the specified delivery connection settings for the defined domain.

.. container:: ptable

 ================= =============================================================
 Parameter         Description
 ================= =============================================================
 require_tls       *true* or *false*

                   If set to *true*, this requires the message only be sent over
                   a TLS connection. If a TLS connection can not be established,
                   Mailgun will not deliver the message.

                   If set to *false*, Mailgun will still try and upgrade the
                   connection, but if Mailgun cannot, the message will be
                   delivered over a plaintext SMTP connection.

                   The default is `false`.

 skip_verification *true* or *false*

                   If set to *true*, the certificate and hostname will not be
                   verified when trying to establish a TLS connection and Mailgun
                   will accept any certificate during delivery.

                   If set to *false*, Mailgun will verify the certificate and
                   hostname. If either one can not be verified, a TLS connection
                   will not be established.

                   The default is *false*.
 ================= =============================================================

.. code-block:: url

     GET /domains/<domain>/tracking

Returns tracking settings for a domain.

.. code-block:: url

     PUT /domains/<domain>/tracking/open

Updates the open tracking settings for a domain.

.. container:: ptable

 ================= =============================================================
 Parameter         Description
 ================= =============================================================
 active            ``yes`` or ``no``
 ================= =============================================================

.. code-block:: url

     PUT /domains/<domain>/tracking/click

Updates the click tracking settings for a domain.

.. container:: ptable

 ================= =============================================================
 Parameter         Description
 ================= =============================================================
 active            ``yes``, ``no``, or ``htmlonly``

                   If set to *yes*, links will be overwritten and pointed to our
                   servers so we can track clicks.

                   If set to *htmlonly*, links will only be rewritten in the HTML
                   part of a message.
 ================= =============================================================

.. code-block:: url

     PUT /domains/<domain>/tracking/unsubscribe

Updates unsubscribe tracking settings for a domain.

.. container:: ptable

 ================= =============================================================
 Parameter         Description
 ================= =============================================================
 active            *true* or *false*.

 html_footer       Custom HTML version of unsubscribe footer.

 text_footer       Custom text version of unsubscribe footer.

                   *Mailgun can automatically provide an unsubscribe footer in
                   each email you send and also provides you with several
                   unsubscribe variables. You can customize your unsubscribe
                   footer by editing the settings in the Control Panel.*
                   See :ref:`um-tracking-unsubscribes` for more details.
 ================= =============================================================

.. code-block:: url

     PUT /domains/<domain>/dkim_authority

Change the DKIM authority for a domain.

.. container:: ptable

 ================= =============================================================
 Parameter         Description
 ================= =============================================================
 self              *true* or *false*

                   Change the DKIM authority for a domain.

                   If set to *true*, the domain will be the DKIM authority for itself
                   even if the root domain is registered on the same mailgun account

                   If set to *false*, the domain will have the same DKIM authority
                   as the root domain registered on the same mailgun account
 ================= =============================================================
.. note::  Use with caution: Do not forget to change the corresponding DNS record.
		It can take 24-48 hours for DNS changes to propagate.
		Changing the DKIM authority of an active domain affects its current deliverability.

Update the DKIM selector for a domains

.. code-block:: url

     PUT /domains/<domain>/dkim_selector

.. container:: ptable

================= =============================================================
Parameter         Description
================= =============================================================
dkim_selector     change the DKIM selector for a domain.
================= =============================================================

Update the CNAME used for tracking opens and clicks

.. code-block:: url

     PUT /domains/<domain>/web_prefix

.. container:: ptable

================= =============================================================
Parameter         Description
================= =============================================================
web_prefix        change the tracking CNAME for a domain.
================= =============================================================


Example
~~~~~~~

Get a list of all domains.

.. include:: samples/get-domains.rst

Sample response:

.. code-block:: javascript

	{
	    "items": [
		{
		    "created_at": "Mon, 30 Sep 2019 16:20:48 GMT",
		    "id": "55a55f40803267158aa113e8",
		    "is_disabled": false,
		    "name": "samples.mailgun.org",
		    "require_tls": false,
		    "skip_verification": false,
		    "smtp_login": "postmaster@samples.mailgun.org",
		    "spam_action": "disabled",
		    "state": "active",
		    "type": "sandbox",
		    "web_prefix": "email",
		    "web_scheme": "http",
		    "wildcard": false
		}
	    ],
	    "total_count": 1
	}

Get a single domain.

.. include:: samples/get-domain.rst

Sample response:

.. code-block:: javascript

	{
    	    "domain": {
        	"created_at": "Tue, 14 Jul 2015 19:13:04 GMT",
        	"id": "55a55f40803267158aa113e8",
        	"is_disabled": false,
        	"name": "samples.mailgun.org",
       	 	"require_tls": false,
        	"skip_verification": false,
        	"smtp_login": "postmaster@samples.mailgun.org",
        	"spam_action": "disabled",
        	"state": "active",
        	"type": "sandbox",
        	"web_prefix": "email",
        	"web_scheme": "http",
        	"wildcard": false
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
        	"created_at": "Tue, 14 Jul 2015 19:13:04 GMT",
        	"id": "55a55f40803267158aa113e8",
        	"is_disabled": false,
        	"name": "samples.mailgun.org",
       	 	"require_tls": false,
        	"skip_verification": false,
        	"smtp_login": "postmaster@samples.mailgun.org",
        	"spam_action": "disabled",
        	"state": "active",
        	"type": "sandbox",
        	"web_prefix": "email",
        	"web_scheme": "http",
        	"wildcard": false
    	    },
	    "message": "Domain has been created",
	    "receiving_dns_records": [
	    	{
	      	    "cached": [],
		    "priority": "10",
	      	    "record_type": "MX",
	      	    "valid": "valid",
	            "value": "mxa.mailgun.org"
	    },
	    {
	      	    "cached": [],
		    "priority": "10",
	      	    "record_type": "MX",
	      	    "valid": "valid",
	      	    "value": "mxb.mailgun.org"
	    }
	  ],
	  "sending_dns_records": [
	    {
	      	    "cached": [],
		    "name": "example.com",
		    "record_type": "TXT",
	      	    "valid": "valid",
	      	    "value": "v=spf1 include:mailgun.org ~all"
	    },
	    {
	       	    "cached": [],
		    "name": "k1._domainkey.example.com",
		    "record_type": "TXT",
	      	    "valid": "valid",
	      	    "value": "k=rsa; p=MIGfMA0GCSqGSIb3DQEBAQUAA4G...."
	    },
	    {
	      	    "cached": [],
		    "name": "email.example.com",
		    "record_type": "CNAME",
	      	    "valid": "valid",
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
       "mailbox": "user@samples.mailgun.org",
       "login": "user@samples.mailgun.org"
     },
     {
       "size_bytes": 0,
       "created_at": "Thu, 06 Oct 2011 10:22:36 GMT",
       "mailbox": "user@samples.mailgun.org",
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

Listing connection settings:

.. include:: samples/get-connection.rst

Sample response:

.. code-block:: javascript

 {
   "connection": {
     "require_tls": false,
     "skip_verification": false
 }

Update connection settings:

.. include:: samples/update-connection.rst

Sample response:

.. code-block:: javascript

 {
   "message": "Domain connection settings have been updated, may take 10 minutes to fully propagate",
   "require-tls": true,
   "skip-verification": false
 }

Get tracking settings for a domain:

.. include:: samples/get-domain-tracking.rst

Sample response:

.. code-block:: javascript

 {
 "tracking": {
   "click": {
     "active": false
   },
   "open": {
     "active": false
   },
   "unsubscribe": {
     "active": false,
     "html_footer": "\n<br>\n<p><a href=\"%unsubscribe_url%\">unsubscribe</a></p>\n",
     "text_footer": "\n\nTo unsubscribe click: <%unsubscribe_url%>\n\n"
   }
  }
 }
