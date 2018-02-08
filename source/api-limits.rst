.. _api-limits:

Limits
======

Mailgun limits endpoint allows you to query your limits per category.
Currently the only available category is Tags.



.. code-block:: url

      GET /domains/<domain>/limits/tag

Returns the maximum available of tags that can be allocated,
as well as the total count of tags that have been used.

Currently there is only a 3 tag limit per message, and the limitation/counts,
that are displayed are per domain provided.

** Note: the per message limitation cannot be changed.

.. container:: ptable

 ================= ============================================================
 Parameter         Description
 ================= ============================================================
 id                ID number of the individual query
 limit             Number allowable tags to be created. Default: varies per plan.
 count             Count of tags that have been used.
 ================= ============================================================
