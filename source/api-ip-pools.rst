.. _api-ip-pools:

IP Pools
========

IP Pools allow you to group your dedicated IPs into customized "pools" to help manage your sending reputation for different mail sending streams. The IP Pools endpoint is available at:

.. code-block:: url

     v1/ip_pools

.. note:: You can manage IP Pools from the Control Panel. Click on **IP Pools** in the Settings dropdown menu.

Create IP Pool
--------------

.. code-block:: url

     POST /v1/ip_pools

Creates a new IP Pool and returns a unique ID

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========= ===============================================
 Parameter                   Description
 ================= ========= ===============================================
 name              *string*  Name of the IP Pool being created
 description       *string*  (Optional) Description of the IP Pool being created
 ips               *string*  (Optional) A comma separated list of IP addresses to be assigned to this IP Pool
 ================= ========= ===============================================


Get IP Pools
------------

.. code-block:: url

     GET /v1/ip_pools

Returns a list of all IP Pools on an account


Update an IP Pool
-----------------

.. code-block:: url

     PATCH /v1/ip_pools/{pool_id}

Update the name, description, or dedicated IPs assigned to an IP Pool.

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========= ===============================================
 Parameter                   Description
 ================= ========= ===============================================
 name              *string*  Name of the IP Pool being created
 description       *string*  Description of the IP Pool being created
 add_ip            *string*  IP address that you want to add to the pool. Can be specified any number of times
 remove_ip         *string*  IP address that you want to remove from the pool. Can be specified any number of times
 ================= ========= ===============================================


Delete an IP Pool
-----------------

.. code-block:: url

     DELETE /v1/ip_pools/{pool_id}

Deletes an IP Pool. If an IP Pool is assigned to a domain, you must provide a replacement IP option (shared, dedicated or another IP Pool).

.. container:: ptable

 ================= ========= ===============================================
 Parameter                   Description
 ================= ========= ===============================================
 ip                *string*  Provide a replacement dedicated IP or `shared` to use a shared IP (automatically assigned) as a replacement
 pool_id           *string*  Replacement IP Pool
 ================= ========= ===============================================


Link an IP Pool
---------------

.. code-block:: url

     POST /v3/domains/{domain_name}/ips

Links an IP Pool to a sending domain. Linking an IP Pool to a domain will replace any IPs already assigned (shared or dedicated) with the IPs assigned to the pool. Only a pool with dedicated IPs can be linked to a sendign domain.

.. container:: ptable

 ================= ========= ===============================================
 Parameter                   Description
 ================= ========= ===============================================
 pool_id           *string*  id of the pool to assign
 ================= ========= ===============================================


Unlink an IP Pool
-----------------

.. code-block:: url

    DELETE /v3/domains/{domain_name}/ips/ip_pool

Removes an IP Pool from a domain. You will need to supply a replacement IP option (shared, dedicated or another IP Pool).

.. container:: ptable

 ================= ========= ===============================================
 Parameter                   Description
 ================= ========= ===============================================
 ip                *string*  Provide a replacement dedicated IP or `shared` to use a shared IP (automatically assigned) as a replacement
 pool_id           *string*  Replacement IP Pool
 ================= ========= ===============================================

Examples
--------

Creating IP Pool:

.. include:: samples/ip_pools/create_ip_pool.rst

Sample response:

.. code-block:: javascript

  { "message": "success", "pool_id": "some_pool_id" }

Getting IP Pools list:

.. include:: samples/ip_pools/get_ip_pools_list.rst

Sample response:

.. code-block:: javascript

  {
    "ip_pools": [
      {
        "description": "Test description 1",
        "ips": ["127.0.0.1"],
        "is_linked": false,
        "name": "test_pool1",
        "pool_id": "some_pool_id"
        },
        {
        "description": "Test description 2",
        "ips": ["127.0.0.1"],
        "is_linked": true,
        "name": "test_pool2",
        "pool_id": "some_pool_id_2"
      },
    ]
   "message": "success"
  }

Updating an IP Pool:

.. include:: samples/ip_pools/update_ip_pool.rst

Sample response:

.. code-block:: javascript

  { "message": "success" }

Deleting an IP Pool:

.. include:: samples/ip_pools/delete_ip_pool.rst

Sample response:

.. code-block:: javascript

  { "message": "started" }

Linking an IP Pool:

.. include:: samples/ip_pools/link_ip_pool.rst

Sample response:

.. code-block:: javascript

  { "body": { "message": "success" }, "status": 200 }

Unlink an IP Pool:

.. include:: samples/ip_pools/unlink_ip_pool.rst

Sample response:

.. code-block:: javascript

  { "body": { "message": "success" }, "status": 200 }
