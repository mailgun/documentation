.. _api-inbox-placement:

Inbox Placement v2
==================

A seed list is an object that provides the mailing list for your inbox placement test.
It also acts as a container for all the results of those tests and will aggregate
the stats of all the tests.

When you create a seed list you will be provided a mailing list. You may adjust
this mailing list as you see fit, but you must send to the ``target_email`` otherwise
a placement test will not be run.

Generate a seed list
--------------------

.. code-block:: url

     POST /v4/inbox/seedlists
   
Generate a seed list. The available form fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 sending_domains        The sending domains that messages will come from. You may specify this multiple times. At least one is required.
 name                   The name that you would like to use for this seed list.
 seed_filter            A regular expression that will be applied to addresses in the mailing list.
 ====================== ========================================================

.. include:: samples/create-seed-list.rst

Example response for creating a seed list.

.. code-block:: javascript

  {
    "kid": "610abd2009b08f382ac86c45",
    "created_at": "2021-08-04T16:15:28.08Z",
    "updated_at": "2021-08-04T16:15:28.08Z",
    "last_result_at": "0001-01-01T00:00:00Z",
    "target_email": "ibp-12345678-1234-1234-1234-123456789012@domain.com",
    "sending_domains": [
      "yourdomain.com"
    ],
    "has_results": false,
    "name": "My campaign inbox test",
    "seed_filter": ".*",
    "mailing_list": "ibp-12345678-1234-1234-1234-123456789012@domain.com,another@email.com",
    "delivery_stats": {
      "all": {
        "delivered": 0,
        "missing": 0,
        "pending": 0,
        "spam": 0,
        "inbox": 0,
        "total": 0,
        "provider": "all"
      }
    },
    "results": []
  }

Field Explanation:

.. include:: samples/fields-ibp-seed-lists.rst

Delivery Stats
--------------

Delivery stats is an object that is included with seed list and results from the API. It is an attribute of the main object that is returned. A sample object:

.. code-block:: javascript

   "delivery_stats": {
    "all": {
      "delivered": 10,
      "missing": 1,
      "pending": 0,
      "spam": 3,
      "inbox": 6,
      "total": 10,
      "provider": "all"
    },
    "yahoo.com": {
      "delivered": 4,
      "missing": 1,
      "pending": 0,
      "spam": 0,
      "inbox": 4,
      "total": 5,
      "provider": "yahoo.com"
    },
    "gmail.com": {
      "delivered": 5,
      "missing": 0,
      "pending": 0,
      "spam": 3,
      "inbox": 2,
      "total": 5,
      "provider": "gmail.com"
    }
  }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
sub-object -"subkey"     object       The sub-object of the main delivery_stats object is divided by provider. There will always be an "all" provider that is the total sum.
delivered                number       The amount of messages that were received by the system.
missing                  number       The amount of messages that were not received by the required reporting time period.
pending                  number       The amount of messages that have yet to be received within the required reporting time period.
spam                     number       The amount of messages that were detected in the provider's spam folder.
inbox                    number       The amount of messages that were detected in a non-spam folder.
total                    number       The amount of messages that are expected.
provider                 string       The provider that these mailboxes are a part of (identical to key).
=====================    =========    ======================================================================================================================

Results
-------

A result is an object summarizing Inbox Placement tests sent to the ``target_email``.

.. code-block:: javascript

  {
    "result_id": "12345678-1234-1234-1234-123456789012",
    "subject": "IBP Test - 1",
    "sender": "generated@yourdomain.com",
    "delivery_stats": {
      "all": {
        "delivered": 7,
        "missing": 0,
        "pending": 0,
        "spam": 2,
        "inbox": 5,
        "total": 7,
        "provider": "all",
        "categories": {}
      }
    }
  }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
result_id                string       Unique identifier for a received test.
subject                  string       The subject of the email sent to the ``target_email``.
sender                   string       Sender address of the email sent to the ``target_email``.
delivery_stats           object       An object that contains sub-objects that describe delivery stats. See above.
=====================    =========    ======================================================================================================================

Get all seed lists
------------------

.. code-block:: url

   GET /v4/inbox/seedlists

Get a list of all of your seed lists. You can filter this using the available filters.
These can be listed from the "Get all available filters for seed lists" endpoint
described below.

.. include:: samples/get-seed-lists.rst

Example response for listing seed lists.

.. code-block:: javascript

  {
    "items": [
      {
        "kid": "123456789123456789123456",
        "created_at": "2021-08-02T23:10:17.915Z",
        "updated_at": "2021-08-03T17:26:55.629Z",
        "last_result_at": "2021-08-03T17:26:55.629Z",
        "target_email": "ibp-12345678-1234-1234-1234-123456789012@domain.com",
        "sending_domains": [
          "mydomain.com"
        ],
        "has_results": true,
        "name": "Inbox Placement Test",
        "seed_filter": ".*",
        "mailing_list": "ibp-12345678-1234-1234-1234-123456789012@domain.com,some@where.com",
        "delivery_stats": {
          "all": {
            "delivered": 7,
            "missing": 0,
            "pending": 0,
            "spam": 2,
            "inbox": 5,
            "total": 7,
            "provider": "all"
          }
        },
        "results": [
          {
            "result_id": "12345678-1234-1234-1234-123456789012",
            "subject": "IBP Test - 1",
            "sender": "generated@yourdomain.com",
            "delivery_stats": {
              "all": {
                "delivered": 7,
                "missing": 0,
                "pending": 0,
                "spam": 2,
                "inbox": 5,
                "total": 7,
                "provider": "all",
                "categories": {}
              }
            }
          }
        ]
      }
    ],
    "paging": {
      "first": "http://domain.com/v4/inbox/seedlists?ascending=0&limit=1",
      "last": "http://domain.com/v4/inbox/seedlists?ascending=1&limit=1",
      "next": "http://domain.com/v4/inbox/seedlists?ascending=0&cursor=123987123981723987873497&limit=1",
      "previous": "http://domain.com/v4/inbox/seedlists?ascending=1&cursor=123987123981723987873487&limit=1"
    },
    "total": 32
  }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
items                    array        A list of seed list objects (same fields as above).
paging                   object       A paging sub-object to navigate through sections of data.
total                    number       The total amount of seed lists.
=====================    =========    ======================================================================================================================

Paging sub-object
-----------------

The paging sub-object assists with navigating paginated responses. For a variety of reasons
the number of items that can be returned in a response has been limited. This object contains
the following fields:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
first                    url          A url address to the first item of this set
last                     url          A url address to the last item of this set
next                     url          A url address to the next item of this set
previous                 url          A url address to the previous item of this set
=====================    =========    ======================================================================================================================

Additionally you can interact with the pagination through a few fields added to
the query-string of your request:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
limit                    number       A limit on the number of items that can be returned (defaults to 25)
offset                   number       A the amount of items to "move" by
ascending                bool         A flag that will set the order of the pagination
cursor                   string       A unique id that can be used as a "pivot" of where you are in the set
sort                     string       The parameter to sort by (EXPERIMENTAL)
=====================    =========    ======================================================================================================================

Note: cursor and offset may not both be used at the same time

Get a seed list
---------------

You can select a single seed list with this endpoint.

.. code-block:: url

   GET /v4/inbox/seedlists/ibp-seedlist-address@domain.net

.. include:: samples/create-inbox-placement-test.rst

Example response of getting a single seed list.

.. code-block:: javascript

  {
    "kid": "610abd2009b08f382ac86c45",
    "created_at": "2021-08-04T16:15:28.08Z",
    "updated_at": "2021-08-04T16:15:28.08Z",
    "last_result_at": "0001-01-01T00:00:00Z",
    "target_email": "ibp-seedlist-address@domain.net",
    "sending_domains": [
      "yourdomain.com"
    ],
    "has_results": false,
    "name": "My campaign inbox test",
    "seed_filter": ".*",
    "mailing_list": "ibp-seedlist-address@domain.net,another@email.com",
    "delivery_stats": {
      "all": {
        "delivered": 0,
        "missing": 0,
        "pending": 0,
        "spam": 0,
        "inbox": 0,
        "total": 0,
        "provider": "all"
      }
    },
    "results": [
      {
        "result_id": "12345678-1234-1234-1234-123456789012",
        "subject": "IBP Test - 1",
        "sender": "generated@yourdomain.com",
        "delivery_stats": {
          "all": {
            "delivered": 7,
            "missing": 0,
            "pending": 0,
            "spam": 2,
            "inbox": 5,
            "total": 7,
            "provider": "all",
            "categories": {}
          }
        }
      }
    ]
  }

.. include:: samples/fields-ibp-seed-lists.rst

Get all iterable attributes of seed lists
-----------------------------------------

You can use this endpoint to find all attributes that are available for listing values of.

.. code-block:: url

   GET /v4/inbox/seedlists/a

.. include:: samples/get-seed-list-attributes.rst

Example response of seed list attributes.

.. code-block:: javascript

 {
  "items": {
    "attribute": "available attributes",
    "values": [
      "name"
    ]
  }
 }


=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
attribute                string       A string describing what was selected.
values                   array        A list of attributes that can be retrieved from the API.
=====================    =========    ======================================================================================================================

Get all values of a specific attribute of your seed lists
---------------------------------------------------------

You can use this endpoint to find all the values for a particular attribute. This can be used to produce autocomplete or suggestions from a frontend.

.. code-block:: url

   GET /v4/inbox/seedlists/a/attribute

.. include:: samples/get-seed-list-attribute.rst

Example response of seed list attribute values.

.. code-block:: javascript

 {
  "items": {
    "attribute": "name",
    "values": [
      "Inbox Placement Test",
      "My email campaign"
    ]
  }
 }


=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
attribute                string       A string describing what was selected.
values                   array        A list of attributes that can be retrieved from the API.
=====================    =========    ======================================================================================================================

Get all available filters for seed lists
----------------------------------------

You can use this endpoint to list the available filters for seed lists.

.. code-block:: url

   GET /v4/inbox/seedlists/_filters

.. include:: samples/get-seed-list-filters.rst

Example response of seed list filters.

.. code-block:: javascript

 {
  "supported_filters": {
    "filters": [
      {
        "parameter": "name",
        "description": "Get seedlists by name"
      },
      {
        "parameter": "time_before",
        "description": "Get seedlists before date"
      },
      {
        "parameter": "time_after",
        "description": "Get seedlists after date"
      }
    ]
  }
 }

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
parameter                string       The key of the parameter you can pass in your query string.
description              string       A description of the filter
=====================    =========    ======================================================================================================================

Delete a seed list
------------------

You can delete a seed list with this endpoint. The results under it will not be kept.

.. code-block:: url

   DELETE /v4/inbox/seedlists/ibp-seedlist-address@domain.net

.. include:: samples/delete-seed-list.rst

This does not return any value.

Update a seed list
------------------

You can update a seed list with this endpoint. Modifying the sending domains or the seed filter will not affect historical results.

.. code-block:: url

   PUT /v4/inbox/seedlists/ibp-seedlist-address@domain.net

Update a seed list. The available form fields are as follows:

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 sending_domains        Update the sending domains of the seed list. You can specify this multiple times.
 name                   Update the name of the seed list.
 seed_filter            Update the regular expression that will be applied to addresses in the mailing list.
 ====================== ========================================================

.. include:: samples/update-seed-list.rst

.. code-block:: javascript

  {
    "kid": "610abd2009b08f382ac86c45",
    "created_at": "2021-08-04T16:15:28.08Z",
    "updated_at": "2021-08-04T16:15:28.08Z",
    "last_result_at": "0001-01-01T00:00:00Z",
    "target_email": "ibp-seedlist-address@domain.net",
    "sending_domains": [
      "yourdomain.com"
    ],
    "has_results": false,
    "name": "My campaign inbox test",
    "seed_filter": ".*",
    "mailing_list": "ibp-seedlist-address@domain.net,another@email.com",
    "delivery_stats": {
      "all": {
        "delivered": 0,
        "missing": 0,
        "pending": 0,
        "spam": 0,
        "inbox": 0,
        "total": 0,
        "provider": "all"
      }
    },
    "results": []
  }

.. include:: samples/fields-ibp-seed-lists.rst

List Results
------------

Test results are generated when a message has been received at the ``target_email``. If a message is not received at the target
email no seed test will be run. Results will contain the status of the monitored mail boxes and will provide stats of the test.

.. code-block:: url

   GET /v4/inbox/results

List all results for your account.

.. container:: ptable

 ====================== ========================================================
 Field                  Description
 ====================== ========================================================
 rid                    Update the sending domains of the seed list. You can specify this multiple times.
 name                   Update the name of the seed list.
 seed_filter            Update the regular expression that will be applied to addresses in the mailing list.
 ====================== ========================================================

.. include:: samples/get-results.rst

.. code-block:: javascript

 {
  "items": [
    {
      "rid": "123456789012345678901234",
      "result_id": "12345678-1234-1234-1234-123456789012",
      "keybox_email": "ibp-00410325-1c95-492e-bc35-c19899802494@mailgun.net",
      "subject": "A subject of things",
      "sender": "person@domain.com",
      "name": "Such list",
      "created_at": "2021-08-03T14:20:40.301Z",
      "updated_at": "2021-08-03T14:36:53.841Z",
      "seed_results": [
        {
          "email": "mail@box.com",
          "provider": "box.com",
          "destination": "inbox",
          "state": "delivered",
          "originating_ip": "123.123.123.123",
          "tags": [
            "inbox"
          ]
        }
      ]
    }
  ]
  }

.. include:: samples/fields-ibp-results.rst

Seed Results
------------

The seed results sub-object will provide the details of the individual seed mail boxes.

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
email                    string       The email address of the mailbox.
provider                 string       The email provider of the mailbox (usually the domain).
destination              string       Either "inbox" or "spam"
state                    string       Whether or not the mailbox has received a message
originating_ip           string       The IP address from which the message came from (if available)
tags                     array        The folder, or labels of where the message ended up.
=====================    =========    ======================================================================================================================

Get Available Result Filters
----------------------------

.. code-block:: url

   GET /v4/inbox/results/_filters

.. include:: samples/get-results-filters.rst

Example response of getting the available results filters.

.. code-block:: javascript
 {
   "supported_filters": {
     "filters": [
       {
         "parameter": "senderaddr",
         "description": "Sender address"
       },
       {
         "parameter": "subject",
         "description": "Subject line"
       },
       {
         "parameter": "provider",
         "description": "E-mail provider"
       },
       {
         "parameter": "target_email",
         "description": "Seedlist target e-mail"
       },
       {
         "parameter": "time_before",
         "description": "Get results before date"
       },
       {
         "parameter": "time_after",
         "description": "Get results after date"
       }
     ]
   }
 }

Get all iterable attributes of results
--------------------------------------

.. code-block:: url

   GET /v4/inbox/results/a

.. include:: samples/get-result-attributes.rst

Example response of getting the result attributes.

.. code-block:: javascript
 {
   "items": {
     "attribute": "available attributes",
     "values": [
       "subject",
       "sender"
     ]
   }
 }

Get all values of a specific attribute of your results lists
------------------------------------------------------------

.. code-block:: url

   GET /v4/inbox/results/a/attribute

.. include:: samples/get-results-attribute.rst

You can use this endpoint to find all the values for a particular attribute. This can be used to produce autocomplete or suggestions from a frontend.

Example response of response attribute values.

.. code-block:: javascript

 {
   "items": {
     "attribute": "subject",
     "values": [
       "This is a subject",
       "We've been trying to contact you",
       "about your car's extended warranty"
     ]
   }
 }

Get a specific result
---------------------

.. code-block:: url

   GET /v4/inbox/results/UUID

.. include:: samples/get-result.rst

You can use this endpoint to get a single result.

.. include:: samples/fields-ibp-results.rst

.. code-block:: javascript

 {
  "result": {
    "rid": "123456789012345678901234",
    "result_id": "12345678-1234-1234-1234-123456789012",
    "keybox_email": "ibp-00410325-1c95-492e-bc35-c19899802494@mailgun.net",
    "subject": "A subject of things",
    "sender": "person@domain.com",
    "name": "Such list",
    "created_at": "2021-08-03T14:20:40.301Z",
    "updated_at": "2021-08-03T14:36:53.841Z",
    "seed_results": [
      {
        "email": "mail@box.com",
        "provider": "box.com",
        "destination": "inbox",
        "state": "delivered",
        "originating_ip": "123.123.123.123",
        "tags": [
          "inbox"
        ]
      }
    ]
  }
 }

Delete results
--------------

Use this endpoint to delete a result.

.. code-block:: url

   DELETE /v4/inbox/results/UUID

.. include:: samples/delete-results.rst

This does not return any value.

Inbox Placement v1 Deprecated
=============================

Start an inbox placement test
-----------------------------

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

.. include:: samples/create-inbox-placement-test.rst

Example response for creating an inbox placement test.

.. code-block:: javascript

    {
        "tid": "5e22167af8424f444ca6d8e2"
    }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
tid                      string       Unique identifier for an inbox placement test.
=====================    =========    ======================================================================================================================

Get all inbox placement tests
-----------------------------

This API endpoint is used for interfacing with the inbox placement service.
Pricing details for Mailgun's inbox placement service can be found on our `pricing page`_.
Mailgun's inbox placement service is intended to be used for seed testing for emails.
Refer to our `Acceptable Use Policy (AUP)`_ for more information about how to use the service appropriately.

.. _pricing page: https://www.mailgun.com/pricing
.. _Acceptable Use Policy (AUP): http://mailgun.com/aup

.. code-block:: url

     GET /v3/inbox/tests

Retrieve a list of all the inbox placement tests and their results ran on the account.

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
            "joesmith915@o365.mailgun.email",
            "joesmith916@o365.mailgun.email",
            "janedoe@o365.mailgun.email"
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
            "joesmith915@o365.mailgun.email",
            "joesmith916@o365.mailgun.email",
            "janedoe@o365.mailgun.email"
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

Retrieve individual test details
--------------------------------

.. code-block:: url

     GET /v3/inbox/tests/<test_id>

Retrieve a single inbox placement test.

.. container:: ptable

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    The unique identifier for the inbox placement test.
 ====================== ========================================================

.. include:: samples/get-inbox-placement-test.rst

Example response of getting an inbox placement test.

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
        "joesmith915@o365.mailgun.email",
        "joesmith916@o365.mailgun.email",
        "janedoe@o365.mailgun.email"
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
tid                      string       Unique identifier for an inbox placement test.
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

Delete an inbox placement test
------------------------------

.. code-block:: url

     DELETE /v3/inbox/tests/<test_id>

Delete a single inbox placement test.

.. container:: ptable

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    The unique identifier for the inbox placement test.
 ====================== ========================================================

.. include:: samples/delete-inbox-placement-test.rst

Example response for deleting an inbox placement test.

.. code-block:: javascript

    {
        "message": "deleted"
    }

Retrieve provider results (counters) for a test
-----------------------------------------------

.. code-block:: url

     GET /v3/inbox/tests/<test_id>/counters

Retrieve a provider breakdown of the inbox placement test's counters.

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    The unique identifier for the inbox placement test.
 ====================== ========================================================

.. include:: samples/get-inbox-placement-test-counters.rst

Example response for inbox placement counters.

.. code-block:: javascript

    {
      "counters": [
        {
          "inbox": 2,
          "junk": 1,
          "provider": "o365"
        },
      ]
    }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
tid                      string       Unique identifier for an inbox placement test.
=====================    =========    ======================================================================================================================

Get all inbox placement test checks
-----------------------------------

.. code-block:: url

     GET /v3/inbox/tests/<test_id>/checks

Retrieve a list of all the checks sent for an inbox placement test.

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    The unique identifier for the inbox placement test.
 ====================== ========================================================

.. include:: samples/get-inbox-placement-test-checks.rst

Example response of getting a list of all checks for an inbox placement test.

.. code-block:: javascript

    {
      "checks": [
        {
          "address": "aa_ext_test01mg@comcast.net",
          "provider": "comcast",
          "ip": "00.114.000.000",
          "folder": "inbox",
          "headers": "Return-Path: <bounce+b671ba.25af4b3-aa_ext_test01mg=comcast.net@test.domain.com>\r\nDelivered-To: aa_ext_test01mg@comcast.net\r\nReceived: from dovdir4-asa-04o.email.comcast.net ([96.114.154.247])\r\n\tby dovback4-asa-18o.email.comcast.net with LMTP\r\n\tid iD97DYUWIl58dAAAt8rViA\r\n\t(envelope-from <bounce+b671ba.25af4b3-aa_ext_test01mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test01mg@comcast.net>; Fri, 17 Jan 2020 20:18:13 +0000\r\nReceived: from dovpxy-asc-09o.email.comcast.net ([96.114.154.247])\r\n\tby dovdir4-asa-04o.email.comcast.net with LMTP\r\n\tid 2AU9DYUWIl79cAAAp4A1CQ\r\n\t(envelope-from <bounce+b671ba.25af4b3-aa_ext_test01mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test01mg@comcast.net>; Fri, 17 Jan 2020 20:18:13 +0000\r\nReceived: from resimta-po-40v.sys.comcast.net ([96.114.154.247])\r\n\t(using TLSv1.2 with cipher ECDHE-RSA-AES256-GCM-SHA384 (256/256 bits))\r\n\tby dovpxy-asc-09o.email.comcast.net with LMTP id IC0YMYMWIl5eOQAAquDo3w\r\n\t; Fri, 17 Jan 2020 20:18:13 +0000\r\nReceived: from so254-22.mailgun.net ([00.114.000.000])\r\n\tby resimta-po-40v.sys.comcast.net with ESMTP\r\n\tid sY4Iie8ttwt3TsY4KiR4U0; Fri, 17 Jan 2020 20:18:12 +0000\r\nX-CAA-SPAM: F00000\r\nX-Xfinity-VAAS: gggruggvucftvghtrhhoucdtuddrgedugedrtdekgdegudcutefuodetggdotefrodftvfcurfhrohhfihhlvgemucevohhmtggrshhtqdftvghsihenuceurghilhhouhhtmecufedttdenucenucfjughrpeffshfkvffhufgtggeshhhqredttddtvdenucfhrhhomhepuhhsvghrsehisghprdhvohigtghrvggrthhorhdrtghomhenucffohhmrghinhepmhgrihhlghhunhdrtghomhdpthifihhtthgvrhdrtghomhenucfkphepudelkedriedurddvheegrddvvdenucfrrghrrghmpehhvghlohepshhovdehgedqvddvrdhmrghilhhguhhnrdhnvghtpdhinhgvthepudelkedriedurddvheegrddvvddpmhgrihhlfhhrohhmpegsohhunhgtvgdosgeijedusggrrddvhegrfhegsgefqdgrrggpvgigthgpthgvshhttddumhhgpegtohhmtggrshhtrdhnvghtsehisghprdhvohigtghrvggrthhorhdrtghomhdprhgtphhtthhopegrrggpvgigthgpthgvshhttddumhhgsegtohhmtggrshhtrdhnvghtnecuvehluhhsthgvrhfuihiivgeptd\r\nX-Xfinity-VMeta: sc=0.00;st=legit\r\nX-Xfinity-Message-Heuristics: IPv6:N;TLS=1;SPF=1;DMARC=\r\nAuthentication-Results: resimta-po-40v.sys.comcast.net;\r\n\tdkim=pass header.d=test.domain.com header.b=NA9s3uW5\r\nDKIM-Signature: a=rsa-sha256; v=1; c=relaxed/relaxed; d=test.domain.com; q=dns/txt;\r\n s=k1; t=1579292292; h=Mime-Version: Content-Type: Subject: From: To:\r\n Message-Id: Sender: Date: Content-Transfer-Encoding;\r\n bh=bYuUQQIdEIrM6gyAxa1Xp4Nd0A2cWpdksHogCDsE+j8=; b=NA9s3uW5ejKsh0a/lDlEEfoKhyh8OevkRYfDau6tqRIYw/82eEWHxSRQrbTdKjxOWSH4ZHwl\r\n DpigSIhjF3Ub5BQdV64LtN8Bcd1ps/2exdIa21qiKewJDFQht9KoLURTCI5FY+03dywAIeM4\r\n yOp9o/cuQTKJH2qM4iiDgRE0Gsg=\r\nX-Mailgun-Sending-Ip: 00.114.000.000\r\nX-Mailgun-Sid: WyJjYTRiMyIsICJhYV9leHRfdGVzdDAxbWdAY29tY2FzdC5uZXQiLCAiMjVhZjRiMyJd\r\nContent-Transfer-Encoding: quoted-printable\r\nReceived: by luna.mailgun.net with HTTP; Fri, 17 Jan 2020 20:18:11 +0000\r\nDate: Fri, 17 Jan 2020 20:18:11 +0000\r\nSender: user@test.domain.com\r\nMessage-Id: <20200117201811.1.BDA3E43254369346@test.domain.com>\r\nX-Mailgun-Seed-Test-Id: 5e22167af8424f444ca6d8e2\r\nTo: aa_ext_test01mg@comcast.net\r\nFrom: user@test.domain.com\r\nSubject: testSubject\r\nContent-Type: text/html; charset=\"ascii\"\r\nMime-Version: 1.0",
          "message_id": "<20200117201811.1.BDA3E43254369346@test.domain.com>",
          "time": "2020-01-17T20:18:08.8Z"
        },
        {
          "address": "aa_ext_test02mg@comcast.net",
          "provider": "comcast",
          "ip": "00.114.000.000",
          "folder": "inbox",
          "headers": "Return-Path: <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>\r\nDelivered-To: aa_ext_test02mg@comcast.net\r\nReceived: from dovdir3-asa-01o.email.comcast.net ([96.114.154.247])\r\n\tby dovback3-asa-07o.email.comcast.net with LMTP\r\n\tid uCAWG4gWIl6IDgAAVWOgEw\r\n\t(envelope-from <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test02mg@comcast.net>; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from dovpxy-asc-01o.email.comcast.net ([96.114.154.247])\r\n\tby dovdir3-asa-01o.email.comcast.net with LMTP\r\n\tid 0CrqGogWIl7xTAAAwP0GGg\r\n\t(envelope-from <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test02mg@comcast.net>; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from resimta-po-40v.sys.comcast.net ([96.114.154.247])\r\n\t(using TLSv1.2 with cipher ECDHE-RSA-AES256-GCM-SHA384 (256/256 bits))\r\n\tby dovpxy-asc-01o.email.comcast.net with LMTP id OD4qI4UWIl5UQQAAyeh4YQ\r\n\t; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from so254-22.mailgun.net ([00.114.000.000])\r\n\tby resimta-po-40v.sys.comcast.net with ESMTP\r\n\tid sY4Iie8ttwt3TsY4MiR4WV; Fri, 17 Jan 2020 20:18:16 +0000\r\nX-CAA-SPAM: F00000\r\nX-Xfinity-VAAS: gggruggvucftvghtrhhoucdtuddrgedugedrtdekgdegudcutefuodetggdotefrodftvfcurfhrohhfihhlvgemucevohhmtggrshhtqdftvghsihenuceurghilhhouhhtmecufedttdenucenucfjughrpeffshfkvffhufgtggeshhhqredttddtvdenucfhrhhomhepuhhsvghrsehisghprdhvohigtghrvggrthhorhdrtghomhenucffohhmrghinhepmhgrihhlghhunhdrtghomhdpthifihhtthgvrhdrtghomhenucfkphepudelkedriedurddvheegrddvvdenucfrrghrrghmpehhvghlohepshhovdehgedqvddvrdhmrghilhhguhhnrdhnvghtpdhinhgvthepudelkedriedurddvheegrddvvddpmhgrihhlfhhrohhmpegsohhunhgtvgdoudgvlegrrgefrddvhegrfhegsgefqdgrrggpvgigthgpthgvshhttddvmhhgpegtohhmtggrshhtrdhnvghtsehisghprdhvohigtghrvggrthhorhdrtghomhdprhgtphhtthhopegrrggpvgigthgpthgvshhttddvmhhgsegtohhmtggrshhtrdhnvghtnecuvehluhhsthgvrhfuihiivgeptd\r\nX-Xfinity-VMeta: sc=0.00;st=legit\r\nX-Xfinity-Message-Heuristics: IPv6:N;TLS=1;SPF=1;DMARC=\r\nAuthentication-Results: resimta-po-40v.sys.comcast.net;\r\n\tdkim=pass header.d=test.domain.com header.b=J/in82+r\r\nDKIM-Signature: a=rsa-sha256; v=1; c=relaxed/relaxed; d=test.domain.com; q=dns/txt;\r\n s=k1; t=1579292296; h=Mime-Version: Content-Type: Subject: From: To:\r\n Message-Id: Sender: Date: Content-Transfer-Encoding;\r\n bh=bYuUQQIdEIrM6gyAxa1Xp4Nd0A2cWpdksHogCDsE+j8=; b=J/in82+rjjHVoVLeZIlYl+9y7WFgUOcXlrt+P8gaGduSdCEc6MEWMmY8JHyI0X00OTOLRIqn\r\n 1me6suiWiv8F2ADgtK2H9PYwRNg5LomNBKn7j1UbdQP4C7oJ3eYtvA6DCA5KRkgsHOTHY+Kq\r\n /S49D6ajqrN4ZyB+XTLnA5IN8ew=\r\nX-Mailgun-Sending-Ip: 00.114.000.000\r\nX-Mailgun-Sid: WyJlOThhZiIsICJhYV9leHRfdGVzdDAybWdAY29tY2FzdC5uZXQiLCAiMjVhZjRiMyJd\r\nContent-Transfer-Encoding: quoted-printable\r\nReceived: by luna.mailgun.net with HTTP; Fri, 17 Jan 2020 20:18:09 +0000\r\nDate: Fri, 17 Jan 2020 20:18:09 +0000\r\nSender: user@test.domain.com\r\nMessage-Id: <20200117201809.1.82C23D86DE20410C@test.domain.com>\r\nX-Mailgun-Seed-Test-Id: 5e22167af8424f444ca6d8e2\r\nTo: aa_ext_test02mg@comcast.net\r\nFrom: user@test.domain.com\r\nSubject: testSubject\r\nContent-Type: text/html; charset=\"ascii\"\r\nMime-Version: 1.0",
          "message_id": "<20200117201809.1.82C23D86DE20410C@test.domain.com>",
          "time": "2020-01-17T20:18:08.8Z"
        }
      ]
    }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
checks                   array        Collection of checks that represent the messages sent to the seed mailboxes.
=====================    =========    ======================================================================================================================

Get a single inbox placement test check
---------------------------------------

.. code-block:: url

     GET /v3/inbox/tests/<test_id>/checks/<address>

Retrieve a check sent for an inbox placement test.

 ====================== ========================================================
 Parameter              Description
 ====================== ========================================================
 test_id           	    The unique identifier for the inbox placement test.
 address           	    The seed address sent to in the inbox placement test.
 ====================== ========================================================

.. include:: samples/get-inbox-placement-test-check.rst

Example response of getting a single check for an inbox placement test.

.. code-block:: javascript

    {
      "address": "aa_ext_test02mg@comcast.net",
      "provider": "comcast",
      "ip": "96.114.154.247",
      "folder": "inbox",
      "headers": "Return-Path: <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>\r\nDelivered-To: aa_ext_test02mg@comcast.net\r\nReceived: from dovdir3-asa-01o.email.comcast.net ([96.114.154.247])\r\n\tby dovback3-asa-07o.email.comcast.net with LMTP\r\n\tid uCAWG4gWIl6IDgAAVWOgEw\r\n\t(envelope-from <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test02mg@comcast.net>; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from dovpxy-asc-01o.email.comcast.net ([96.114.154.247])\r\n\tby dovdir3-asa-01o.email.comcast.net with LMTP\r\n\tid 0CrqGogWIl7xTAAAwP0GGg\r\n\t(envelope-from <bounce+1e9aa3.25af4b3-aa_ext_test02mg=comcast.net@test.domain.com>)\r\n\tfor <aa_ext_test02mg@comcast.net>; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from resimta-po-40v.sys.comcast.net ([96.114.154.247])\r\n\t(using TLSv1.2 with cipher ECDHE-RSA-AES256-GCM-SHA384 (256/256 bits))\r\n\tby dovpxy-asc-01o.email.comcast.net with LMTP id OD4qI4UWIl5UQQAAyeh4YQ\r\n\t; Fri, 17 Jan 2020 20:18:16 +0000\r\nReceived: from so254-22.mailgun.net ([198.61.254.22])\r\n\tby resimta-po-40v.sys.comcast.net with ESMTP\r\n\tid sY4Iie8ttwt3TsY4MiR4WV; Fri, 17 Jan 2020 20:18:16 +0000\r\nX-CAA-SPAM: F00000\r\nX-Xfinity-VAAS: gggruggvucftvghtrhhoucdtuddrgedugedrtdekgdegudcutefuodetggdotefrodftvfcurfhrohhfihhlvgemucevohhmtggrshhtqdftvghsihenuceurghilhhouhhtmecufedttdenucenucfjughrpeffshfkvffhufgtggeshhhqredttddtvdenucfhrhhomhepuhhsvghrsehisghprdhvohigtghrvggrthhorhdrtghomhenucffohhmrghinhepmhgrihhlghhunhdrtghomhdpthifihhtthgvrhdrtghomhenucfkphepudelkedriedurddvheegrddvvdenucfrrghrrghmpehhvghlohepshhovdehgedqvddvrdhmrghilhhguhhnrdhnvghtpdhinhgvthepudelkedriedurddvheegrddvvddpmhgrihhlfhhrohhmpegsohhunhgtvgdoudgvlegrrgefrddvhegrfhegsgefqdgrrggpvgigthgpthgvshhttddvmhhgpegtohhmtggrshhtrdhnvghtsehisghprdhvohigtghrvggrthhorhdrtghomhdprhgtphhtthhopegrrggpvgigthgpthgvshhttddvmhhgsegtohhmtggrshhtrdhnvghtnecuvehluhhsthgvrhfuihiivgeptd\r\nX-Xfinity-VMeta: sc=0.00;st=legit\r\nX-Xfinity-Message-Heuristics: IPv6:N;TLS=1;SPF=1;DMARC=\r\nAuthentication-Results: resimta-po-40v.sys.comcast.net;\r\n\tdkim=pass header.d=test.domain.com header.b=J/in82+r\r\nDKIM-Signature: a=rsa-sha256; v=1; c=relaxed/relaxed; d=test.domain.com; q=dns/txt;\r\n s=k1; t=1579292296; h=Mime-Version: Content-Type: Subject: From: To:\r\n Message-Id: Sender: Date: Content-Transfer-Encoding;\r\n bh=bYuUQQIdEIrM6gyAxa1Xp4Nd0A2cWpdksHogCDsE+j8=; b=J/in82+rjjHVoVLeZIlYl+9y7WFgUOcXlrt+P8gaGduSdCEc6MEWMmY8JHyI0X00OTOLRIqn\r\n 1me6suiWiv8F2ADgtK2H9PYwRNg5LomNBKn7j1UbdQP4C7oJ3eYtvA6DCA5KRkgsHOTHY+Kq\r\n /S49D6ajqrN4ZyB+XTLnA5IN8ew=\r\nX-Mailgun-Sending-Ip: 198.61.254.22\r\nX-Mailgun-Sid: WyJlOThhZiIsICJhYV9leHRfdGVzdDAybWdAY29tY2FzdC5uZXQiLCAiMjVhZjRiMyJd\r\nContent-Transfer-Encoding: quoted-printable\r\nReceived: by luna.mailgun.net with HTTP; Fri, 17 Jan 2020 20:18:09 +0000\r\nDate: Fri, 17 Jan 2020 20:18:09 +0000\r\nSender: user@test.domain.com\r\nMessage-Id: <20200117201809.1.82C23D86DE20410C@test.domain.com>\r\nX-Mailgun-Seed-Test-Id: 5e22167af8424f444ca6d8e2\r\nTo: aa_ext_test02mg@comcast.net\r\nFrom: user@test.domain.com\r\nSubject: testSubject\r\nContent-Type: text/html; charset=\"ascii\"\r\nMime-Version: 1.0",
      "message_id": "<20200117201809.1.82C23D86DE20410C@test.domain.com>",
      "time": "2020-01-17T20:18:08.8Z"
    }

Field Explanation:

=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
address                  string       The address used to check for a test message.
provider                 string       The provider responsible for maintaining the address.
ip                       string       The ip the test message was sent from.
folder                   string       The folder the test message landed in.
headers                  string       The headers attached to the test message when retrieved from the address
message_id               string       The unique identifier attached to the test message when it is sent.
time                     string       The time in which the message arrived at the address.
=====================    =========    ======================================================================================================================

