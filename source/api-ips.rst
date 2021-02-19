.. _api-ips:

IPs
===

The IP API endpoint allows you to access information regarding the IPs allocated to your Mailgun account that are used for outbound sending. The IP endpoint is available at:

.. code-block:: url

     v3/ips

.. note:: You can manage your IPs from the Control Panel.
          Click on **IP Management** in the settings dropdown menu.

.. code-block:: url

     GET /ips

Returns a list of IPs assigned to your account. See examples below.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 dedicated         Return only dedicated IPs if set to `true`. (all are returned by default)
 ================= ========================================================

.. code-block:: url

     GET /ips/<ip>

Returns information about the specified IP. See examples below.

.. code-block:: url

     GET /domains/<domain>/ips

Returns a list of IPs currently assigned to the specified domain.

.. code-block:: url

     POST /domains/<domain>/ips

Assign a dedicated IP to the domain specified.

.. note:: Only dedicated IPs can be assigned to a domain.

.. container:: ptable

 ================= ========================================================
 Parameter         Description
 ================= ========================================================
 ip                IP address that should be assigned to the domain pool.
 ================= ========================================================

.. code-block:: url

     DELETE /domains/<domain>/ips/<ip>

Unassign an IP from the domain specified.

Example
~~~~~~~

Get a list of all IPs.

.. include:: samples/get-ips.rst

.. code-block:: javascript

    {
      "items": ["192.161.0.1", "192.168.0.2"],
      "total_count": 2
    }

Get a single IP.

.. include:: samples/get-ip.rst

.. code-block:: javascript

    {
      "ip": "192.161.0.1",
      "dedicated": true,
      "rdns": "luna.mailgun.net"
    }

Get a list of IPs from the domain pool.

.. include:: samples/get-domain-ips.rst

.. code-block:: javascript

    {
      "items": ["192.161.0.1", "192.168.0.2"],
      "total_count": 2
    }

Assign a dedicated IP to the domain pool.

.. include:: samples/add-domain-ip.rst

.. code-block:: javascript

    {
      "message": "success"
    }

Remove an IP from the domain pool.

.. include:: samples/remove-domain-ip.rst

.. code-block:: javascript

    {
      "message": "success"
    }
