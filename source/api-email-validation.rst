.. _api-email-validation:

Email Validation
================

This API endpoint is an email address validation service. Given an arbitrary address, we will validate the address based on:

- Syntax checks (RFC defined grammar)

- DNS validation

- Spell checks

- Email Service Provider (ESP) specific local-part grammar (if available).

Pricing details for Mailgun's email validation service can be found on our `pricing page`_.

Mailgun's email validation service is intended to validate email addresses submitted through forms like newsletters, online registrations and shopping carts.  It is not intended to be used for bulk email list scrubbing and we reserve the right to disable your account if we see it being used as such.

.. _pricing page: https://www.mailgun.com/pricing


Different email validation rates are given based on the API endpoint. Both the public and private
API endpoints are limited to a burst per minute rate. The public endpoints have a default
limit of calls per month, which can be changed, to prevent abuse of the public API key.
The use of private API endpoints for email validation is encouraged and there is no limit past the initial
burst per minute rate. It is highly suggested that the private key is used whenever possible.

.. warning:: Do not use your Mailgun private API key on publicly accessible code. Instead, use your Mailgun public key, available in the My Account tab of the Control Panel.

.. code-block:: url

     GET /address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 address           An email address to validate. (Maximum: 512 characters)
 api_key           If you can not use HTTP Basic Authentication (preferred),
                   you can pass your public api_key in as a parameter.
 ================= ========================================================

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
 api_key           If you can not use HTTP Basic Authentication (preferred),
                   you can pass your public api_key in as a parameter.
 ================= ========================================================

.. code-block:: url

    GET /address/private/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 address           An email address to validate. (Maximum: 512 characters)
 api_key           If you can not use HTTP Basic Authentication (preferred),
                   you can pass your private api_key in as a parameter.
 ================= ========================================================

.. code-block:: url

    GET /address/private/parse

Parses a delimiter-separated list of email addresses into two lists: parsed addresses and unparsable portions. The parsed addresses are a list of addresses that are syntactically valid (and optionally pass DNS and ESP specific grammar checks). The unparsable list is a list of character sequences that could not be parsed (or optionally failed DNS or ESP specific grammar checks). Delimiter characters are comma (,) and semicolon (;).

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

Simple sample response:

.. code-block:: javascript

  {
      "address": "foo@mailgun.net",
      "did_you_mean": null,
      "is_disposable_address": false,
      "is_role_address": false,
      "is_valid": true,
      "parts": {
          "display_name": null,
          "domain": "mailgun.net",
          "local_part": "foo"
      }
  }

For all validation requests, we provide whether an address is a role-based address
(e.g. postmaster@, info@, etc.). These addresses are typically distribution lists
with a much higher complaint rate since unsuspecting users on the list can receive
a message they were not expecting.

Role-based email address sample response:

.. code-block:: javascript

  {
      "address": "admin@samples.mailgun.org",
      "did_you_mean": null,
      "is_disposable_address": false,
      "is_role_address": true,
      "is_valid": true,
      "parts": {
          "display_name": null,
          "domain": "samples.mailgun.org",
          "local_part": "admin"
      }
  }

Disposable mailboxes are commonly used for fraudulent purposes. Mailgun can detect
whether the address provided is on a known disposable mailbox provider and given the
determination, you may choose how to proceed based on your own risk decisions. It is
important to check for disposable mailboxes to ensure communication between user
and web application.

Disposable email address sample response:

.. code-block:: javascript

  {
      "address": "fake@throwawaymail.com",
      "did_you_mean": null,
      "is_disposable_address": true,
      "is_role_address": false,
      "is_valid": true,
      "parts": {
          "display_name": null,
          "domain": "throwawaymail.com",
          "local_part": "fake"
      }
  }

SMTP Verification response:

.. code-block:: javascript

  {
      "address": "foo@samples.mailgun.org",
      "mailbox_verify": true,
      "did_you_mean": null,
      "is_disposable_address": false,
      "is_role_address": false,
      "is_valid": false,
      "parts": {
          "display_name": null,
          "domain": "samples.mailgun.org",
          "local_part": "foo"
      }
  }

.. note:: Mailbox verify will return true if the email is valid, false if the email
was invalid, or unknown if the SMTP request could not be completed.

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
