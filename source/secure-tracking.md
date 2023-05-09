Initiate generation of an x509 keypair
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

   POST /v2/x509/{domain}

+---------------------------------------+-------------------------------+
| Path parameter                        | Description                   |
+=======================================+===============================+
| domain                                | The tracking domain for which |
|                                       | the x509 key pair will be     |
|                                       | generated                     |
+---------------------------------------+-------------------------------+

Sample Request
''''''''''''''

.. code:: bash

   curl -X POST https://api.mailgun.net/v2/x509/tracking.example.com

Sample Responses
''''''''''''''''

``202 Accepted``: x509 keypair generation has been initiated

.. code:: json

   {
       "message":  "Initiated x509 key pair generation",
       "location": "/v2/x509/tracking.example.com/status"
   }

``400 Bad Request``: tracking domain has missing/incorrect CNAME record

.. code:: json

   {
       "message":  "invalid CNAME record",
   }

``402 Payment Required``: account is not enabled to use HTTPS link
tracking based on billing plan

.. code:: json

   {
       "message":  "upgrade your account to enable this feature",
   }

``409 Conflict``: x509 keypair already exists or is pending for this
tracking domain

.. code:: json

   {
       "message":  "x509 key pair generation has already been initiated for tracking.example.com",
   }

Get the status of an x509 keypair
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

::

   GET /v2/x509/{domain}/status

+---------------------------------------+-------------------------------+
| Path parameter                        | Description                   |
+=======================================+===============================+
| domain                                | The link tracking domain      |
|                                       | assoicated with the x509 key  |
|                                       | pair                          |
+---------------------------------------+-------------------------------+

Response contains certificate, status, message, and possibly an error
depending on status.

========== ======================================
Status     Meaning
========== ======================================
active     success (i.e. (re)generation complete)
processing (re)generation in-progress
expired    expired
error      error during (re)generation
========== ======================================
