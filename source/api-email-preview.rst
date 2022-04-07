.. _api-email-preview:

Email Preview
=============

Create Test
-----------

This call creates a new email preview test and submits it to our system for processing.

All requests must contain a ``subject`` property and one source property (either ``html`` or ``url`` All other properties are optional. In the following table,
each property and its default value is shown.

The response will include an ``id`` property that should be used to request the results or run processes on the email content.

.. code-block:: url

     POST /v1/preview/tests

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 subject                The subject line of your email, encoded as declared in ``transfer_encoding``.
 html                   The email source of your email, encoded as declared in ``transfer_encoding``.
 url                    A URL pointing to the email source of your email.
 clients                An array of string IDs as returned from client list functions.
 reference_id           This value can be used for searching and internal reporting.
 charset                The character set your HTML is encoded in.
 image_blocking         If true, run a test with images blocked in clients that support it.
 transfer_encoding      One of base64, quoted-printable, 7bit, or 8bit.
 ====================== ========================================================

Example response:

.. code-block:: javascript

  {
    "id": "<UNIQUE ID>",
    "reference_id": "123ABC"
  }

Get Tests
---------

This call returns a list of all available Email Tests and some metadata about them.
Email Tests are stored for 90 days. The query string is an optional standard URL
parameterized version containing any or all of the below search parameters.

.. code-block:: url

     GET /v1/preview/tests?<query_string>

The available search query parameters are as follows:

.. container:: ptable

 ====================== ========================================================
 Name                   Description
 ====================== ========================================================
 from                   The starting point of your test date range.
 to                     The ending point of your test date range.
 subject                The ``subject`` field of returned tests must contain the exact string. This search is case-insensitive.
 results                The number of results to return. Must be between 1 and 200. The default value is 50.
 page                   The page number. If you submit a number higher than the number of pages in the data, an empty array will be returned. The default value is 1.
 ====================== ========================================================

Example response:

.. code-block:: javascript

  [
    {
      "id": "<UNIQUE ID>",
      "date": 1648177673,
      "type": "email-test",
    },
    {
      "id": "<UNIQUE ID>",
      "date": 1648177673,
      "type": "email-test",
    }
  ]
