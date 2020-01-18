.. _api-inbox-placement:

Email Validation
================

This API endpoint is used for interfacing with the inbox placement service.
Pricing details for Mailgun's inbox placement service can be found on our `pricing page`_.
Mailgun's inbox placement service is intended to be used for seed testing for emails.
Refer to our `Acceptable Use Policy (AUP)`_ for more information about how to use the service appropriately.

.. _pricing page: https://www.mailgun.com/pricing
.. _Acceptable Use Policy (AUP): http://mailgun.com/aup

.. code-block:: url

     GET /v3/inbox/tests

Retrieve a list of all the inbox placement tests and their results ran on the account.

Example
~~~~~~~

Get all inbox placement tests

.. include:: samples/get-inbox-placement-tests.rst

Example of inbox placement lists.

.. code-block:: javascript

    {
      "paging": {
        "first": "https://api.mailgun.net/v3/inbox/tests?ascending=0",
        "last": "https://api.mailgun.net/v3/inbox/tests?ascending=1",
        "next": "https://api.mailgun.net/v3/inbox/tests?ascending=0&cursor=5e22167af8424f444ca6d8ea",
        "previous": "https://api.mailgun.net/v3/inbox/tests?ascending=1&cursor=5e22167af8424f444ca6d8e2"
      },
      "tests": [
        {
          "tid": "5e22167af8424f444ca6d8e2",
          "counts": {
            "inbox": 2,
            "junk": 1,
            "missing": 0
          },
          "domain": "ibp.voxcreator.com",
          "status": "completed",
          "seeds": [
            "gunnerjorge915@o365.mailgun.email",
            "gunnerjorge916@o365.mailgun.email",
            "gunnerjonathon@o365.mailgun.email"
          ],
          "start_time": "2020-01-17T20:18:02.093Z",
          "end_time": "2020-01-17T20:33:02.097Z",
          "summary": {
            "stats": {
              "averages": {
                "mailgun_send": {
                  "inbox": 95.48,
                  "junk": 3.2,
                  "missing": 1.32
                }
              }
            }
          },
          "subject": "This Service is Awesome!"
        },
        {
          "tid": "5e22167af8424f444ca6d8ea",
          "counts": {
            "inbox": 2,
            "junk": 1,
            "missing": 0
          },
          "domain": "ibp.voxcreator.com",
          "status": "completed",
          "seeds": [
            "gunnerjorge915@o365.mailgun.email",
            "gunnerjorge916@o365.mailgun.email",
            "gunnerjonathon@o365.mailgun.email"
          ],
          "start_time": "2020-01-17T20:18:02.093Z",
          "end_time": "2020-01-17T20:33:02.097Z",
          "summary": {
            "stats": {
              "averages": {
                "mailgun_send": {
                  "inbox": 95.48,
                  "junk": 3.2,
                  "missing": 1.32
                }
              }
            }
          },
          "subject": "This Mail is Awesome!"
        }
      ],
      "total": 2
    }

=====================    =========    ======================================================================================================================
Parameter                Type         Description
=====================    =========    ======================================================================================================================
paging                   object       Urls used to page through the list of inbox placement tests.
tests                    array        List of inbox placement tests.
total                    integer      Total number of inbox placement tests ran for the account

