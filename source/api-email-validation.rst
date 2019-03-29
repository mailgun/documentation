.. _api-email-validation:

Email Validation
================

This API endpoint is an email address validation service. We will validate the given address based on:

- Mailbox detection

- Syntax checks (RFC defined grammar)

- DNS validation

- Spell checks

- Email Service Provider (ESP) specific local-part grammar (if available).

Pricing details for Mailgun's email validation service can be found on our `pricing page`_.

Mailgun's email validation service is intended to validate email addresses submitted through forms like newsletters, online registrations and shopping carts.  Refer to our `Acceptable Use Policy (AUP)`_ for more information about how to use the service appropriately.

.. _pricing page: https://www.mailgun.com/pricing
.. _Acceptable Use Policy (AUP): http://mailgun.com/aup


Different email validation rates are given based on the API endpoint. Both the public and private
API endpoints are limited to a burst per minute rate. The public endpoints have a default
limit of calls per month, which can be changed, to prevent abuse of the public API key.
The use of private API endpoints for email validation is encouraged and there is no limit past the initial
burst per minute rate. It is highly suggested that the private key is used whenever possible.

.. warning:: Do not use your Mailgun private API key on publicly accessible code. Instead, use your Mailgun public key, available in the "Security" tab under the **Account** section of the Control Panel.

.. warning:: This version is deprecated and will be replaced by /v4/ directories.

             version-4-documentation_



.. code-block:: url

     GET /address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ====================== ========================================================
 Parameter         	Description
 ====================== ========================================================
 address           	An email address to validate. (Maximum: 512 characters)
 api_key          	If you cannot use HTTP Basic Authentication (preferred),
                   	you can pass your public api_key in as a parameter.
 mailbox_verification	If set to true, a mailbox verification check will be 
 			performed against the address.
 			
			The default is `False`.
 ====================== ========================================================

.. code-block:: url

    GET /address/parse

Parses a delimiter-separated list of email addresses into two lists: parsed addresses and unparsable portions. The parsed addresses are a list of addresses that are syntactically valid (and optionally pass DNS and ESP specific grammar checks). The unparsable list is a list of character sequences that could not be parsed (or optionally failed DNS or ESP specific grammar checks). Delimiter characters are comma (,) and semicolon (;).

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 addresses         A delimiter separated list of addresses.
                   (Maximum: 8000 characters)
 syntax_only       Perform only syntax checks or DNS and ESP specific
                   validation as well. (true by default)
 api_key           If you cannot use HTTP Basic Authentication (preferred),
                   you can pass your public api_key in as a parameter.
 ================= ========================================================

.. code-block:: url

    GET /address/private/validate

Addresses are validated based off defined checks.

This operation is only accessible with the private API key and not subject to the
daily usage limits.

.. container:: ptable

 ====================== ========================================================
 Parameter         	Description
 ====================== ========================================================
 address           	An email address to validate. (Maximum: 512 characters)
 mailbox_verification	If set to true, a mailbox verification check will be 
 			performed against the address.
 			
			The default is `False`.
 ====================== ========================================================

.. code-block:: url

    GET /address/private/parse

Parses a delimiter-separated list of email addresses into two lists: parsed addresses and unparsable portions. The parsed addresses are a list of addresses that are syntactically valid (and optionally pass DNS and ESP specific grammar checks). The unparsable list is a list of character sequences that could not be parsed (or optionally failed DNS or ESP specific grammar checks). Delimiter characters are comma (,) and semicolon (;).

This operation is only accessible with the private API key and not subject to the
daily usage limits.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 addresses         A delimiter separated list of addresses.
                   (Maximum: 8000 characters)
 syntax_only       Perform only syntax checks or DNS and ESP specific
                   validation as well. (true by default)
 api_key           If you can not use HTTP Basic Authentication (preferred),
                   you can pass your private api_key in as a parameter.
 ================= ========================================================

Example
~~~~~~~

Validate a single email address.

.. include:: samples/get-validate.rst

Sample response *without* mailbox verification enabled:

.. code-block:: javascript

  {
    "address": "foo@mailgun.net",
    "did_you_mean": null,
    "is_disposable_address": false,
    "is_role_address": false,
    "is_valid": true,
    "mailbox_verification": null,
    "parts": {
        "display_name": null,
        "domain": "mailgun.net",
        "local_part": "foo"
    },
    "reason": null
  }
  
Sample response *with* mailbox verification enabled:

.. code-block:: javascript

  {
      "address": "foo@mailgun.net",
      "did_you_mean": null,
      "is_disposable_address": false,
      "is_role_address": true,
      "is_valid": true,
      "mailbox_verification": "true",
      "parts": {
          "display_name": null,
          "domain": "mailgun.net",
          "local_part": "foo"
      }
  }


Field Explanation:

=====================    =========    ============================================================================================================
Parameter                Type         Description
=====================    =========    ============================================================================================================
address                  string       Email address being validated
did_you_mean             string       Null if nothing, however if a potential typo is made, the closest suggestion is provided
is_disposable_address    boolean      If the domain is in a list of disposable email addresses, this will be appropriately categorized
is_role_address          boolean      Checks the mailbox portion of the email if it matches a specific role type ('admin', 'sales', 'webmaster')
is_valid                 boolean      Runs the email segments across a valid known provider rule list. If a violation occurs this value is false
mailbox_verification     string       If the mail_verification flag is enabled, a call is made to the ESP to return existence. (true, false, unknown or null)
parts                    object       (display_name, domain, local_part): Parsed segments of the provided email address
=====================    =========    ============================================================================================================


.. note:: is_valid returns true when an address is parsable, passes known grammar checks and an SMTP server is present. The role-based and disposable address check will not impact the state of the `is_valid` result. The user should determine whether or not to permit the address to be used.

.. note:: The mailbox verification attribute will return true if the email is valid, false if the email was invalid, or unknown if the SMTP request could not be completed. Unknown will also be returned if mailbox verification is not supported on the target mailbox provider. The outcome of the verification check will not impact the state of the is_valid result.

Parse a list of email addresses.

.. include:: samples/get-parse.rst

Sample response:

.. code-block:: javascript

    {
        "parsed": [
            "Alice <alice@example.com>",
            "bob@example.com"
        ],
        "unparseable": [
        ]
    }

jQuery Plugin
~~~~~~~~~~~~~

We also have a `jQuery plugin`_ you can use for front-end email validation.

Just remember to use your public Mailgun API key.

.. _jQuery plugin: https://github.com/mailgun/validator-demo

Attaching to a form:

.. code-block:: javascript

   $('jquery_selector').mailgun_validator({
       api_key: 'api-key',
       in_progress: in_progress_callback, // called when request is made to validator
       success: success_callback,         // called when validator has returned
       error: validation_error,           // called when an error reaching the validator has occured
   });


.. _version-4-documentation:
Version 4 Documentation
~~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: url

     GET /v4/address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ====================== ========================================================
 Parameter         	Description
 ====================== ========================================================
 address           	An email address to validate. (Maximum: 512 characters)
 api_key          	If you cannot use HTTP Basic Authentication (preferred),
                   	you can pass your public api_key in as a parameter.
 ====================== ========================================================


Example
~~~~~~~

Validate a single email address with version 4.

.. include:: samples/get-validate4.rst

Example of a failed mailbox verification result.

.. code-block:: javascript

    {
        "address": "nonexistentemail@realdomain.com",
        "is_disposable_address": false,
        "is_role_address": false,
        "reason": "mailbox_does_not_exist",
        "result": "undeliverable",
        "risk": "high"
    }


Example of successful mailbox verification result.

.. code-block:: javascript

    {
        "address": "existingemail@realdomain.com",
        "is_disposable_address": false,
        "is_role_address": false,
        "reason": [],
        "result": "deliverable",
        "risk": "low"
    }

Field Explanation:

=====================    =========    ============================================================================================================
Parameter                Type         Description
=====================    =========    ============================================================================================================
address                  string       Email address being validated
did_you_mean             string       (Optional) Null if nothing, however if a potential typo is made, the closest suggestion is provided
is_disposable_address    boolean      If the domain is in a list of disposable email addresses, this will be appropriately categorized
is_role_address          boolean      Checks the mailbox portion of the email if it matches a specific role type ('admin', 'sales', 'webmaster')
reason                   array        List of potential reasons why a specific validation may be unsuccessful.
result                   string       Either "deliverable", "undeliverable" or "unknown" status given the evaluation.
risk                     string       "High", "Medium", "Low" or "null" Depending on the evaluation of all aspects of the given email.
=====================    =========    ============================================================================================================


Version 3 List Validation
~~~~~~~~~~~~~~~~~~~~~~~~~


.. note::
    List validation supports a provided uploaded list through our email list service. Passing in the ID
    to the list validation route deploys a task to validate every email address in the provided list.


.. code-block:: url

    POST /v3/lists/<list_ID>/validate

V3 List Validation Request Example

.. code-block:: javascript

    {
      "id": "57713334-aa10-4699-a1fe-1c624ca6a671",
      "message": "The validation job was submitted."
    }


V3 List Validation Response Example

.. code-block:: url

     GET /v3/lists/listname@mydomain.sandbox.mailgun.org/validate

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
download_url             array        `csv` and `json` representation of the download link for the results of the bulk validations
id                       string       list_id name given when the list was initially created
quantity                 integer      number of total items in the list to be validated
records_processed        integer      de-duplicated total of validated email addresses
status                   string       current state of the list validation request
summary                  array        nested count results for `deliverable`, `do_not_send`, `undeliverable` and `unknown` statuses
risk                     array        nested count results for `high`, `low`, `medium` or `unknown` risk assessment results
=====================    =========    ============================================================================================================



Version 4 Bulk Validation
~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
    Bulk Validations accepts an uploaded list of emails then proceeds to initiate a job that will run V4 validations
    against the list. Upon initial request, a list_id is given that can be queried to check the current state or retrieve
    the download link.

.. warning:: Column header for emails needs to be either `email` or `email_address`


.. warning::
    Lists must comply to either UTF-8 or ASCII encoding. Others will cause the list processing to halt or not be processed.




V4 Bulk Validation Request Example


.. note::
    Its important to remember that to upload as `multi-part/form-data` where the file is defined by `file`.

    Currently only raw `csv` and `gzip` are supported.

.. code-block:: url

    curl -F 'file=@/path/to/file' http...




.. code-block:: url

    POST /v4/address/validate/bulk/<list_id>

.. code-block:: javascript

    {
        id: <list_id>
    }



V4 Bulk Validation Response Example

.. code-block:: url

    GET /v4/address/validate/bulk/<list_id>

.. code-block:: javascript

    {
      "created_at": "Tue, 26 Feb 2019 21:30:03 GMT",
      "download_url": {
        "csv": "<download_link>",
        "json": "<download_link>"
      },
      "id": "bulk_validations_sandbox_mailgun_org",
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
download_url             array        `csv` and `json` representation of the download link for the results of the bulk validations
id                       string       list_id name given when the list was initially created
quantity                 integer      number of total items in the list to be validated
records_processed        integer      de-duplicated total of validated email addresses
status                   string       current state of the list validation request
summary                  array        nested count results for `deliverable`, `do_not_send`, `undeliverable` and `unknown` statuses
risk                     array        nested count results for `high`, `low`, `medium` or `unknown` risk assessment results
=====================    =========    ============================================================================================================
