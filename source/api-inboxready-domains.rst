.. _api-inboxready-domains:

Domains
=======

This section describes domain management for InboxReady products. Use these APIs 
to register domains for domain-based reputation monitoring tools such as `Spam Trap
Monitoring`_ and `Domain Blocklist Monitoring`_.

.. _Spam Trap Monitoring: https://documentation.mailgun.com/en/latest/api-spam-trap-monitoring.html
.. _Domain Blocklist Monitoring: https://documentation.mailgun.com/en/latest/api-domain-blocklist-monitoring.html

Add Domain
----------

This endpoint allows domains to be registered for reputation monitoring.

.. code-block:: url

    POST /v1/inboxready/domains

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``domain``             Required. The domain or subdomain that you wish to add.
 ====================== ========================================================

Example 200 response:

.. code-block:: javascript

   {
     "domain": {
       "ID": "<ID>",
       "created_at": 123456789,
       "name": "example.com",
       "verified": {
         "verified_at": 0,
         "status": "inbox_ready"
       },
       "services": {
         "spam_trap_monitoring": true,
         "domain_blocklist_monitoring": true,
       },
       "txt_record": "<HASHED TXT RECORD KEY>"
     }
   }


Get Domains
-----------

This endpoint returns a list of domains.

.. code-block:: url

    GET /v1/inboxready/domains

Example 200 response:

.. code-block:: javascript

    {
      "items": [
        {
          "ID": "<ID>",
          "created_at": 123456789,
          "name": "example.com",
          "verified": {
            "verified_at": 123456789,
            "status": "inbox_ready"
          },
          "services": {
            "spam_trap_monitoring": true,
            "domain_blocklist_monitoring": true
          },
          "txt_record": "<HASHED TXT RECORD KEY>"
        },
        ...
      ],
      "paging": {
        "previous": "<URL>",
        "first": "<URL>",
        "next": "<URL>",
        "last": "<URL>"
      }
    }

Remove Domain
-------------

This endpoint can be used to remove a domain from reputation monitoring.

.. code-block:: url

    DELETE /v1/inboxready/domains

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 ``domain``             Required. The domain or subdomain that you wish to remove.
 ====================== ========================================================

Example 200 response:

.. code-block:: javascript

    {
      "message": "example.com has been removed from InboxReady"
    }
