.. _api-ip-pools:

IP Pools
===

IP Pools allow you to group your dedicated IPs into customized "pools" to help manage your sending reputation for different mail sending streams.

.. note:: You can manage IP Pools from the Control Panel.
          Click on **IP Pools** in the Settings dropdown menu.

.. code-block:: url

     POST /v1/ip_pools

Creates a new IP Pool and returns a unique ID

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 name              Name of the IP Pool being created
 description       (Optional) Description of the IP Pool being created
 ips               (Optional) A comma separated list of IP addresses to be assigned to this IP Pool
 ================= ========================================================
 
 
 .. code-block:: url

     GET /v1/ip_pools
     
 Retrieve all IP Pools on an account
 
 
 .. code-block:: url

     PATCH /v1/ip_pools/{pool_id}

Update the name, description, or dedicated IPs assigned to an IP Pool.

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 name              Name of the IP Pool being created
 description       (Optional) Description of the IP Pool being created
 ips               (Optional) A comma separated list of IP addresses to be assigned to this IP Pool
 ================= ========================================================
 
 
 .. code-block:: url

     DELETE /v1/ip_pools/{pool_id}

Deletes an IP Pool. If an IP Pool is assigned to a domain, you must provide a replacement IP option (shared, dedicated or another IP Pool)

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 ip                Name of the IP Pool being created
 pool_id           (Optional) Description of the IP Pool being created
 ================= ========================================================
 
 
  .. code-block:: url

     POST /v3/domains/{domain_name}/ips

Links an IP Pool to a domain. Linking an IP Pool to a domain will replace any IPs already assigned (shared or dedicated)

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 pool_id           id of the pool to assign
 ================= ========================================================


.. code-block:: url

     DELETE /v3/domains/{domain_name}/ips/ip_pool

Removes an IP Pool from a domain. You will need to supply 

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 pool_id           id of the pool to assign
 ================= ========================================================
