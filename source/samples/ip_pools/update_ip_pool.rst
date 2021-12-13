.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X PATCH \
    https://api.mailgun.net/v1/ip_pools/$your_pool_id \
    -F name='new ip pool name' \
    -F description='new pool description' \
    -F ips='127.0.0.2'

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const poolName = 'new_ip_pool_name';
      const updatedIpPool = await client.ip_pools.update('your_ip_pool_id', { name: poolName, description: 'updated pool for testing purposes', ips: '127.0.0.1' });
      console.log('updatedIpPool', updatedIpPool);
    } catch (error) {
      console.error(error);
    }
  })();
