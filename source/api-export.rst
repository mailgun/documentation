.. _api-export:

Exports
==============

Exports are a fast, asynchronous method for getting large amounts of data
from Mailgun without worrying about pagination. Any list in the Mailgun api
can be exported into a CSV file that is made available from s3.

Depending on the size of the data requested, this can take anywhere from a
few seconds to minutes. The status of an export can be periodically checked
by fetching it by id. Once it is in `complete` status, it is ready to be
download.


.. note:: Exports are available for 24 hours after creation

.. code-block:: url

     POST /exports/<url>

.. container:: ptable

================= ========================================================
Parameter         Description
================= ========================================================
url               Partial URL to fetch, starting with the api version.
                  ex: /v3/domains, /v3/:domain/bounces
================= ========================================================

Create an export based on the URL given.

.. code-block:: url

     GET /exports/

.. container:: ptable

================= ========================================================
Parameter         Description
================= ========================================================
url               Filter the list to only include exports that match the
                  given URL
================= ========================================================

List all exports created within the past 24 hours.

.. code-block:: url

     GET /exports/<id>

Get an export by id.

.. code-block:: url

     GET /exports/<id>/download

Download an export by ID. This will response with a `302 Moved` with the
`Location` header of temporary S3 URL if it is available.



Examples
~~~~~~~~

Create a CSV export of all domains. If an export has already been requested
for the url and is currently processing, the API will return a 400 Bad Request

.. include:: samples/create-export.rst

Sample response:

.. code-block:: javascript

  {
    "id": "57b2085d7cedb2684815e08c",
    "status": "requested",
    "url": "domains"
  }

Listing all exports:

.. include:: samples/get-list-exports.rst

Sample response:

.. code-block:: javascript

  {
    "items": [
      {
        "id": "57b2085d7cedb2684815e08c",
        "status": "complete",
        "url": "domains"
      },
      {
        "id": "57b208a17cedb2684815e08d",
        "status": "processing",
        "url": "ninomail.com/bounces"
      }
    ]
  }

Get the export by id:

.. include:: samples/get-export.rst

Sample response:

.. code-block:: javascript

  {
    "id": "57b2085d7cedb2684815e08c",
    "status": "complete",
    "url": "domains"
  }
