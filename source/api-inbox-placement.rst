.. _api-inbox-placement:

Inbox Placement
===============

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
folder                   string       The folder the test meassage landed in.
headers                  string       The headers attached to the test message when retrieved from the address
message_id               string       The unique identifier attached to the test message when it is sent.
time                     string       The time in which the message arrived at the address.
=====================    =========    ======================================================================================================================

