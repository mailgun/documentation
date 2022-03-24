.. _api-email-preview:

Email Preview
=============

Create Email Test
-----------------

This call creates a new email test and submits it to our system for processing.

All requests must contain a “subject” property and one source property (either “html” or “url”). All other properties are optional. In the following table, each property and its default value is shown.

The response will include an “id” property that should be used to request the results or run processes on the email content.

.. code-block:: url

     POST /v1/previews/tests

The available request fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 subject                The subject line of your email, encoded as declared in `transfer_encoding`.
 html                   The email source of your email, encoded as declared in `transfer_encoding`.
 url                    A URL pointing to the email source of your email.
 clients                An array of string IDs as returned from client list functions.
 customer_id            Enterprise customers can set this value for searching and internal reporting.
 reference_id           Enterprise customers can set this value for searching and internal reporting.
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
