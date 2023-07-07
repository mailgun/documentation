# Sub-Accounts

### Description
Sub-accounts gives an account admin the ability to create a new account (Sub-account) that’s linked to the master account, but separates users and assets from the master account. Sub-accounts are child accounts that share the same plan and usage allocations as the parent, but have their own assets (sending domains, unique users, API key, SMTP credentials, settings, statistics and site login).

### Parameters

| **Parameter** | **Type** | **Default** | **Description** | 
| --- | --- | --- | --- | 
| name| string |  | Name of the sub-account
| limit | int | 10 | Maximum number of records to return.|
| skip | int | 0 | Number of records to skip. |
|sort| array |  |"asc" or "desc"|
|enabled|boolean  |  | Defaults to all if omitted ||

### Get my subaccounts

.. code-block:: url
  GET /v5/accounts/subaccounts


### Create a subaccount

.. code-block:: url
  POST /v5/accounts/subaccounts

### Disable a subaccount

.. code-block:: url
  POST /v5/accounts/subaccounts/{subaccount-id}/disable

### Enable a subaccount

.. code-block:: url
  POST /v5/accounts/subaccounts/{subaccount-id}/enable


