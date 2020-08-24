.. _api-ip-pools:

IP Pools
===

IP Pools allow you to group your dedicated IPs into customized "pools" to help manage your sending reputation for different mail sending streams.

.. note:: You can manage IP Pools from the Control Panel.
          Click on **IP Pools** in the Settings dropdown menu.

.. code-block:: url

     POST /v1/ip_pools

Creates a new IP Pool

.. note:: Only dedicated IPs that are not on a warmup can be added to an IP Pool.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 name              Name of the IP Pool being created
 description       (Optional) Description of the IP Pool being created
 ip                (Optional) Array of IPs to be added to the Pool being created
 ================= ========================================================
 
 
 .. code-block:: url

     GET /v1/ip_pools
     
 Retrieve all IP Pools on an account
