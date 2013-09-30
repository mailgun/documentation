.. _api-logs:

Logs
=======

This simple logging API allows you to fetch the same log entries
you would normally see in your Control Panel.

.. code-block:: url

     GET /<domain>/log

Fetches the list of log entries.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 limit             Maximum number of records to return. (100 by default)
 skip              Number of records to skip. (0 by default)
 ================= ========================================================

Example
~~~~~~~

An example of how to fetch a single 51st log message skipping the first 50, using the API:

.. include:: samples/get-log-entry.rst

Sample response:

.. code-block:: javascript

  {
    "total_count": 1244,
    "items": [
        {
            "hap": "delivered",
            "created_at": "Wed, 15 Feb 2012 12:35:39 GMT",
            "type": "info",
            "message": "Delivered:  me@samples.mailgun.org \u2192 alice@example.com 'Hello'",
            "message_id": "20120215123539.7267.56179@samples.mailgun.org"
        }
    ]
  }
