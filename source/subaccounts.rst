.. _subaccounts:

Subaccounts
################

Subaccounts gives an account admin the ability to create a new account (Subaccount) that’s linked to the primary account, but separates users and assets from the primary account. Subaccounts are child accounts that share the same plan and usage allocations as the primary, but have their own assets (sending domains, unique users, API key, SMTP credentials, settings, statistics and site login). All you need is the name of the subaccount.


Get my subaccounts
--------------

.. code-block:: url

  GET /v5/accounts/subaccounts

.. container:: ptable
================= ========== ============================ ===================================
**Parameter**     **Type**   **Default**                   **Description**
================= ========== ============================ ===================================
limit             int        10                            Maximum number of records to return.
skip              int        0                             Number of records to skip
sort              array                                    "asc" or "desc"
enabled           boolean    Defaults to all if omitted    Returns all enabled/disabled subaccounts
================= ========== ============================ ===================================

Create a subaccount
--------------


.. code-block:: url

  POST /v5/accounts/subaccounts

.. container:: ptable
================= ========== ============= =================================
**Parameter**     **Type**   **Default**   **Description**
================= ========== ============= =================================
name              string                   Name of the subaccount being created
================= ========== ============= =================================

Disable a subaccount
--------------

.. code-block:: url

  POST /v5/accounts/s/{-id}/disable

Enable a subaccount
--------------

.. code-block:: url

  POST /v5/accounts/subaccounts/{subaccount-id}/enable


