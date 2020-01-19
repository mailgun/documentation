.. _api-inbox-placement:

Inbox Placement
===============

This API endpoint is used for interfacing with the inbox placement service.
Pricing details for Mailgun's inbox placement service can be found on our `pricing page`_.
Mailgun's inbox placement service is intended to be used for seed testing for emails.
Refer to our `Acceptable Use Policy (AUP)`_ for more information about how to use the service appropriately.

.. _pricing page: https://www.mailgun.com/pricing
.. _Acceptable Use Policy (AUP): http://mailgun.com/aup

.. code-block:: url

     GET /v3/inbox/tests

Retrieve a list of all the inbox placement tests and their results ran on the account.

.. code-block:: url

     POST /v3/inbox/tests

Start an inbox placement test. The required form fields are as follows.

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 domain                 The sending domain registered with mailgun to send the messages with.
 subject                The subject associated with the message being tested.
 html                   The html that makes up the body of the message being tested.
 from         	        The sending address associated with the sending of the message.
 ====================== ========================================================


.. code-block:: url

     GET /v3/inbox/tests/<test_id>

Retrieve a single inbox placement test.

.. container:: ptable

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    the unique identifier for the inbox placement test.
 ====================== ========================================================




Inbox Placement Examples
~~~~~~~~~~~~~~~~~~~~~~~~

**Get all inbox placement tests.**

.. include:: samples/get-inbox-placement-tests.rst

Example response of getting a list of inbox placement tests.

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


Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
paging                   object       Urls used to page through the list of inbox placement tests.
tests                    array        List of inbox placement tests.
total                    integer      Total number of inbox placement tests ran for the account
=====================    =========    ======================================================================================================================


**Get a inbox placement test.**

.. include:: samples/get-inbox-placement-test.rst

Example response of getting a inbox placement test.

.. code-block:: javascript

    {
      "tid": "5e22167af8424f444ca6d8e2",
      "counts": {
        "inbox": 2,
        "junk": 1,
        "missing": 0
      },
      "domain": "inbox_placement.domain.com",
      "status": "completed",
      "seeds": [
        "gunnerjorge915@o365.mailgun.email",
        "gunnerjorge916@o365.mailgun.email",
        "gunnerjonathon@o365.mailgun.email",
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
      "render_url": "https://mg-inbox-placement.s3.amazonaws.com/export/b156f44d9c27ee74422a3e38dd831343ec541938.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAJR5LUWTPXYIVY4GA%2F20200118%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20200118T225458Z&X-Amz-Expires=3600&X-Amz-SignedHeaders=host&X-Amz-Signature=f255b140f0efa94507bb62542b7a1191faaac708588edcb0d5dfd88a777e0061",
      "subject": "This is an awesome API!"
    }


Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
tid                      string       Unique identifier for a inbox placement test.
counts                   object       Total counts for the mailboxes where the messages landed across the seed address sent to.
domain                   string       The sending domain used to send the messages to the seed addresses.
status                   string       The current status for a test. e.g. ("running", "completed", "error", "created")
seeds                    array        The seed addresses the test message was sent to.
start_time               string       The time in which the inbox placement test began.
end_time                 string       The time in which the inbox placement test ended.
summary                  object       A summarized view of the inbox placement test.
rendered_url             string       A link to a rendered version of the message that was sent to the seed addresses.
subject                  string       The subject for the message that was sent to the seed addresses.
=====================    =========    ======================================================================================================================

**Start a inbox placement test**

.. include:: samples/create-inbox-placement-test.rst

Example response for creating a inbox placement test.

.. code-block:: javascript

    {
        "tid": "5e22167af8424f444ca6d8e2"
    }

