.. _api-email-validation:

Email Validation
================

This API endpoint is an email address validation service.

We will validate the given address based on:

- Mailbox detection

- Syntax checks (RFC defined grammar)

- DNS validation

- Spell checks

- Email Service Provider (ESP) specific local-part grammar (if available).

The Email Validation API endpoint is available at:

.. code-block:: url

      v4/address/validate

Pricing details for Mailgun's email validation service can be found on our `pricing page`_.

Mailgun's email validation service is intended to validate email addresses submitted through forms like newsletters, online registrations and shopping carts.  Refer to our `Acceptable Use Policy (AUP)`_ for more information about how to use the service appropriately.

.. _pricing page: https://www.mailgun.com/pricing
.. _Acceptable Use Policy (AUP): http://mailgun.com/aup

.. note::  A previous version of the API is described here :ref:`api-email-validation`

Single Validation
~~~~~~~
.. note:: This feature is now available via the EU API.

.. note:: The validations feature is rate limited to a set number of active requests at a time. If you receive a 429 error, please wait and try again.

.. code-block:: url

     GET /v4/address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ====================== ========================================================
 Parameter         	    Description
 ====================== ========================================================
 address           	    An email address to validate. (Maximum: 512 characters)
 ====================== ========================================================

.. code-block:: url

     POST /v4/address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ====================== ========================================================
 Form-Data         	    Description
 ====================== ========================================================
 address           	    An email address to validate. (Maximum: 512 characters)
 ====================== ========================================================

Request Examples
_______

Validate a single email address using the GET method.

.. include:: samples/get-validate.rst

Validate a single email address using the POST method.

.. include:: samples/post-validate.rst

Example of a failed mailbox verification result.

.. code-block:: javascript

    {
        "address": "nonexistentemail@realdomain.com",
        "is_disposable_address": false,
        "is_role_address": false,
        "reason": [mailbox_does_not_exist],
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

.. warning:: For advanced users only

The provider_lookup query parameter provides users with the control to allow or prevent Mailgun from reaching out to the mailbox provider.

.. code-block:: url

     GET /v4/address/validate?address=test123@test.com&provider_lookup=true

.. code-block:: url

     POST /v4/address/validate?provider_lookup=true

‘true’ (default state) - A provider lookup will be performed if Mailgun’s internal analysis is insufficient.

‘false’ - A provider lookup will not be performed. If Mailgun does not have information on the recipient address, the API will return the following response:

.. code-block:: javascript

    {
        "address": "address@domain.com",
        "is_disposable_address": false,
        "is_role_address": false,
        "reason": ["no_data"],
        "result": "unknown",
        "risk": "unknown"
    }


Field Explanation
_______

=====================    =========    ======================================================================================================================
Parameter                Type         Description
=====================    =========    ======================================================================================================================
address                  string       Email address being validated
did_you_mean             string       (Optional) Null if nothing, however if a potential typo is made to the domain, the closest suggestion is provided
is_disposable_address    boolean      If the domain is in a list of disposable email addresses, this will be appropriately categorized
is_role_address          boolean      Checks the mailbox portion of the email if it matches a specific role type ('admin', 'sales', 'webmaster')
reason                   array        List of potential reasons why a specific validation may be unsuccessful.
result                   string       Either ``deliverable``, ``undeliverable``, ``do_not_send``, ``catch_all`` or ``unknown``. Please see the Result Types section below for details on each result type.
risk                     string       ``high``, ``medium``, ``low``, or ``unknown`` Depending on the evaluation of all aspects of the given email.
root_address             string       (Optional) If the address is an alias; this will contain the root email address with alias parts removed.
=====================    =========    ======================================================================================================================

Reason Explanation
_______

=============================    ==========================================================================================================================================================================================
Reason                           Description
=============================    ==========================================================================================================================================================================================
unknown_provider                 The MX provider is an unknown provider.
no_mx / No MX host found         The recipient domain does not have a valid MX host. `Note: this reason will be consolidated to only "no_mx" in the future.`
high_risk_domain                 Information obtained about the domain indicates it is high risk to send email to.
subdomain_mailer                 The recipient domain is identified to be a subdomain and is not on our exception list. Subdomains are considered to be high risk as many spammers and malicious actors utilize them.
immature_domain                  The domain is newly created based on the WHOIS information.
tld_risk                         The domain has a top-level-domain (TLD) that has been identified as high risk.
mailbox_does_not_exist           The mailbox is undeliverable or does not exist.
mailbox_is_disposable_address    The mailbox has been identified to be a disposable address. Disposable address are temporary, generally one time use, addresses.
mailbox_is_role_address          The mailbox is a role based address (ex. support@..., marketing@...).
catch_all                        The validity of the recipient address cannot be determined as the provider accepts any and all email regardless of whether or not the recipient’s mailbox exists.
long_term_disposable             The mailbox has been identified as a long term disposable address. Long term disposable addresses can be quickly and easily deactivated by users, but they will not expire without user intervention.
failed custom grammar check      The mailbox failed our custom ESP local-part grammar check.
=============================    ==========================================================================================================================================================================================

Result Types
_______

=============================    ==========================================================================================================================================================================================
Reason                           Description
=============================    ==========================================================================================================================================================================================
deliverable                      The recipient address is considered to be valid and should accept email.
undeliverable                    The recipient address is considered to be invalid and will result in a bounce if sent to.
do_not_send                      The recipient address is considered to be highly risky and will negatively impact sending reputation if sent to.
catch_all                        The validity of the recipient address cannot be determined as the provider accepts any and all email regardless of whether or not the recipient’s mailbox exists.
unknown                          The validity of the recipient address cannot be determined for a variety of potential reasons. Please refer to the associated ‘reason’ array returned in the response.
=============================    ==========================================================================================================================================================================================


Bulk Validation
~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
    Bulk Validation allows for the validation of a list of email addresses. Given a list name and an uploaded file of email addresses,
    a backend processing job will be run to validate the list. Once the validations have all been completed, the
    results will be provided with download links.


.. note::
    It's important to upload as `multi-part/form-data` where the file is defined by `file`.

    Currently only raw `csv` and `gzip` are supported.

    The column header for emails needs to be either `email` or `email_address`

.. warning::
    Lists must comply to either UTF-8 or ASCII encoding and not have a '@' in the name.

.. code-block:: url

    GET /v4/address/validate/bulk

Get list of all bulk validation jobs.

.. code-block:: url

    POST /v4/address/validate/bulk/<list_id>

Create a bulk validation job.

.. code-block:: url

    GET /v4/address/validate/bulk/<list_id>

Check the current status of a bulk validation job.

.. code-block:: url

    DELETE /v4/address/validate/bulk/<list_id>

Cancel current running bulk validation job.


Bulk Validation Examples
------------------------

Get the status of a bulk validation job:

.. include:: samples/get-bulk-validation.rst

Sample Response:

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
          "deliverable": 181854,
          "do_not_send": 5647,
          "undeliverable": 12116,
          "catch_all" : 2345,
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

=====================    ===========    ============================================================================================================
Parameter                Type           Description
=====================    ===========    ============================================================================================================
created_at               string         Date/Time that the request was initiated
download_url             array          `csv` and `json` representation of the download link for the results of the bulk validations
id                       string         list_id name given when the list was initially created
quantity                 integer        number of total items in the list to be validated
records_processed        integer        de-duplicated total of validated email addresses
status                   string         current state of the list validation request. (``created``, ``processing``, ``completed``, ``uploading``, ``uploaded``, and ``failed``)
summary                  collection     summary of the validations in the list provided
result                   array          nested results count. (``catch_all``, ``deliverable``, ``do_not_send``, ``undeliverable``, and ``unknown``)
risk                     array          nested risk assessment count (``high``, ``low``, ``medium`` or ``unknown``)
=====================    ===========    ============================================================================================================



Get a list of bulk validation jobs:

This request will return a list of validation jobs in descending order by time created.


.. include:: samples/get-bulk-validations.rst


.. container:: ptable

    =====================    =========    ======================================================================================================================
    Parameter                Type         Description
    =====================    =========    ======================================================================================================================
    limit                    integer      Number of entries to return. Default: 500.
    =====================    =========    ======================================================================================================================

Sample Response:

.. code-block:: javascript

        {
            "jobs":[
            {
                "created_at": "Tue, 26 Feb 2019 21:30:03 GMT",
                "download_url": {
                    "csv": "<download_link>",
                    "json": "<download_link>"
                }
                "id": "bulk_validations_sandbox2_mailgun_org",
                "quantity": 207665,
                "records_processed": 207665,
                "status": "uploaded",
                "summary": {
                    "result": {
                        "deliverable": 181854,
                        "do_not_send": 5647,
                        "undeliverable": 12116,
                        "catch_all" : 2345,
                        "unknown": 5613},
                    "risk": {
                        "high": 17763,
                        "low": 142547,
                        "medium": 41652,
                        "unknown": 5613}
                }
            },
            {
                "created_at": "Tue, 23 Feb 2019 21:30:03 GMT",
                "download_url": {
                    "csv": "<download_link>",
                    "json": "<download_link>"
                }
                "id": "bulk_validations_sandbox_mailgun_org",
                "quantity": 207,
                "records_processed": 207,
                "status": "uploaded",
                "summary": {
                    "result": {
                        "deliverable": 181854,
                        "do_not_send": 5647,
                        "undeliverable": 12116,
                        "catch_all" : 2345,
                        "unknown": 5613},
                    "risk": {
                        "high": 17763,
                        "low": 142547,
                        "medium": 41652,
                        "unknown": 5613}
                }
            }],
        "total":3,
        "paging": {
          "next":
              "https://url_to_next_page",
          "previous":
              "https://url_to_previous_page",
          "first":
              "https://url_to_first_page",
          "last":
              "https://url_to_last_page"
        },
    }

Results Fields Explanation:

.. container:: ptable

    =====================       ======================================================================================================================
    Field                       Description
    =====================       ======================================================================================================================
    Deliverable                 The collection of validation jobs requested for.
    Undeliverable               The total number of validation jobs.
    Do Not Send                 A collection of pagination links for traversing the validation jobs.
    Catch All                   The total number of domain associated with result is considered a catch_all domain
    =====================       ======================================================================================================================


Create a bulk validation job:

.. include:: samples/create-bulk-validation.rst

Sample Response:

.. code-block:: javascript

    {
     "id":"myemails"
     "message": "The validation job was submitted."
    }


Cancel a bulk validation job:

.. include:: samples/delete-bulk-validation.rst

Sample Response:

.. code-block:: javascript

    {
     "message": "Validation job canceled."
    }


Bulk Validation Preview
~~~~~~~~~~~~~~~~~~~~~~~~~

.. note::
    Bulk validation preview performs a free analysis of a list of email addresses allowing
    you to make an informed decision to run a complete bulk validation or not. Given a preview name
    and an uploaded file of email addresses, a preliminary validation run will be preformed. The results of the preview
    will be, on average, an estimate of the deliverability and risk of the emails provide. This evaluation is based
    on a statistical sampling of the list provided.


.. note::
    It's important to upload as `multi-part/form-data` where the file is defined by `file`.

    Currently only raw `csv` and `gzip` are supported.

    The column header for emails needs to be either `email` or `email_address`

.. warning::
    Lists must comply to either UTF-8 or ASCII encoding and not have a '@' in the name.

.. code-block:: url

    GET /v4/address/validate/preview

Get list of all bulk validation previews.

.. code-block:: url

    POST /v4/address/validate/preview/<list_id>

Create a bulk validation preview.

.. code-block:: url

    GET /v4/address/validate/preview/<list_id>

Check the current status of a bulk validation preview.

.. code-block:: url

    DELETE /v4/address/validate/preview/<list_id>

Delete a bulk validation preview.

.. code-block:: url

    PUT /v4/address/validate/preview/<list_id>

Promote a bulk validation preview to a bulk validation job.

Bulk Validation Preview Examples
------------------------

Get the results of a bulk validation preview:

.. include:: samples/get-bulk-preview.rst

Sample Response:

.. code-block:: javascript

    {
      "preview": {
        "id": "test_500",
        "valid": true,
        "status": "preview_complete",
        "quantity": 8,
        "created_at": 1590080191,
        "summary": {
          "result": {
            "deliverable": 37.5,
            "undeliverable": 23,
            "catch_all" : 2,
            "unknown": 37.5
          },
          "risk": {
            "high": 25,
            "low": 25,
            "medium": 12.5,
            "unknown": 37.5
          }
        }
      }
    }

Field Explanation:

=====================    ===========    ============================================================================================================
Field                    Type           Description
=====================    ===========    ============================================================================================================
id                       string         list_id name given when the list was initially created
created_at               string         Date/Time that the request was initiated
quantity                 integer        number of total items in the list to be previewed
status                   string         current state of the list validation request. (``preview_processing``, ``preview_complete``)
valid                    bool           a boolean to represent if the list is valid
summary                  collection     summary of the validations in the list provided
result                   array          nested results averaged. (``deliverable``, ``undeliverable``, ``catch_all`` and ``unknown``)
risk                     array          nested risk assessment count (``high``, ``low``, ``medium`` or ``unknown``)
=====================    ===========    ============================================================================================================


Get a list of bulk validation previews:

This request will return a list of bulk validation previews.

.. include:: samples/get-bulk-previews.rst

Sample Response:

.. code-block:: javascript

    {
      "previews": [
        {
          "id": "test_500",
          "valid": true,
          "status": "preview_complete",
          "quantity": 8,
          "created_at": 1590080191,
          "summary": {
            "result": {
              "deliverable": 37.5,
              "do_not_send": 0,
              "undeliverable": 23,
              "catch_all": 2,
              "unknown": 37.5
            },
            "risk": {
              "high": 25,
              "low": 25,
              "medium": 12.5,
              "unknown": 37.5
            }
          }
        },
        {
          "id": "test_501",
          "valid": true,
          "status": "preview_complete",
          "quantity": 8,
          "created_at": 1590155015,
          "summary": {
            "result": {
              "deliverable": 37.5,
              "do_not_send": 0,
              "undeliverable": 23,
              "catch_all": 2,
              "unknown": 37.5
            },
            "risk": {
              "high": 25,
              "low": 25,
              "medium": 12.5,
              "unknown": 37.5
            }
          }
        }
      ]
    }

Response Fields Explanation:

.. container:: ptable

    =====================    ==========    ======================================================================================================================
    Field                    Type          Description
    =====================    ==========    ======================================================================================================================
    previews                 collection    A collection of bulk validation previews.
    =====================    ==========    ======================================================================================================================


Create a bulk validation preview:

.. include:: samples/create-bulk-preview.rst

Sample Response:

.. code-block:: javascript

    {
      "id": "test_501",
      "message": "The bulk preview was submitted."
    }

Delete a bulk validation preview:

.. include:: samples/delete-bulk-preview.rst

Sample Response:
   A 204 will be returned upon successful deletion.
