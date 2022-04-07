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
    "id": "<TEST_ID>",
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
      "id": "<TEST_ID>",
      "date": 1648177673,
      "type": "email-test",
    },
    {
      "id": "<TEST_ID>",
      "date": 1648177673,
      "type": "email-test",
    }
  ]


Get Test Info
-------------

This call returns the subject and submission time in UNIX timestamp format. It will also contain
one to three properties containing an array of clients. The ``completed`` property shows clients
that have completed screenshots uploaded. The ``processing`` property contains clients which are
still being processed by our system. The ``bounced`` property contains clients that were bounced
by the destination and cannot be retried.

This call will automatically requeue screenshots if they stay in processing for more than threeminutes.

.. code-block:: url

     GET /v1/preview/tests/{TEST_ID}

Example response:

.. code-block:: javascript

  {
    "subject": "Test Subject",
    "date": 1470034800,
    "completed": [
      "iphone12_15",
      "iphone12_15_dm"
    ],
    "processing": [
      "iphone13_15"
    ],
    "bounced": [
      "ffr_chr26_win"
    ]
  }


Get Test Results
----------------

This call returns detailed results for screenshots including their upload locations,
send times, completion times, and information about bounces, if any. ``TEST_ID`` is
a test ID returned from test creation or the get tests functions.

The URLs in this call are static – that is to say that they will not change for the
duration your test is active (90 days from test creation). Any reprocessing that is
done will replace the images in these locations. The image locations are generated
programmatically before the screenshots are complete, so the presence of a URL in
the call is not a guarantee that the file will be present. Use the "status" property
to determine whether or not the file is present in the location, or you can manually
test the URL provided. If the file is not present, you will receive a 403 Forbidden
response from the endpoint.

.. code-block:: url

     GET /v1/preview/tests/{TEST_ID}/results

Example response:

.. code-block:: javascript

  {
    "iphone13_15": {
      "id": "iphone13_15",
      "display_name": "iPhone 13",
      "client": "iPhone",
      "os": "iOS 15",
      "category": "Mobile",
      "screenshots": {
        "default": "<URL>",
        "horizontal": "<URL>"
      },
      "thumbnail": "<URL>",
      "full_thumbnail": "<URL>",
      "status": "Complete",
      "status_details": {
        "submitted": 1649353640,
        "completed": 1649353649
      }
    },
    "iphone13_15_dm": {
      ...
    }
  }


Get Test Content
----------------

Each of these calls will return an object with a single property ``content`` that
contains the desired format of content. ``TEST_ID`` is a test ID returned from
test creation or the get tests functions.

Example response:

.. code-block:: javascript

  {
    "content": "<CONTENT>"
  }

**HTML**

This call returns the HTML associated with your Email Test. This is what is sent to our servers.

.. code-block:: url

     GET /v1/preview/tests/{TEST_ID}/content

**INLINED CSS CONTENT**

This call returns HTML with all stylesheets inlined into the HTML.

.. code-block:: url

     GET /v1/preview/tests/{TEST_ID}/content/inlinecss

**TEXT ONLY CONTENT**

This call returns a plain text version of your HTML. This approximates what will be displayed
on devices that do not support HTML content. Our system does not currently support multipart
emails, so if you send a separate text/plain section when you send your email, this may not be
accurate to what users see. Additionally, devices may differ in their plain text renderings,
so this function should be used more as a guide than as an exact preview.

.. code-block:: url

     GET /v1/preview/tests/{TEST_ID}/content/textonly


Delete Test
-----------

This call marks an Email Test as deleted. Once it is deleted, it cannot be recovered.

.. code-block:: url

     DELETE /v1/preview/tests/{TEST_ID}

Example response:

.. code-block:: javascript

  {
    "success": true
  }
