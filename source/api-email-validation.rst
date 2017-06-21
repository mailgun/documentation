.. _api-email-validation:

Email Validation
================

This API endpoint is an email address validation service. Given an arbitrary address, we will validate the address based on:

- Syntax checks (RFC defined grammar)

- DNS validation

- Spell checks

- Email Service Provider (ESP) specific local-part grammar (if available).

Mailgun's email validation service is available for free to all Mailgun customers. It is intended to validate email addresses submitted through forms like newsletters, online registrations and shopping carts.  It is not intended to be used for bulk email list scrubbing and we reserve the right to disable your account if we see it being used as such.

.. note:: No addresses submitted to this service are ever stored on any Mailgun servers. The parser runs completely in memory and no address is persisted after the request is complete.

.. warning:: Do not use your Mailgun private API key. Instead, use your Mailgun public key, available in the My Account tab of the Control Panel.

.. code-block:: url

     GET /address/validate

Given an arbitrary address, validates address based off defined checks.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 address           An email address to validate. (Maximum: 512 characters)
 api_key           If you can not use HTTP Basic Authentication (preferred),
                   you can pass your api_key in as a parameter.
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
                   you can pass your api_key in as a parameter.
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
      "callback_verify": true,
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
