.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v1/ip_pools \
     -F name='ip_pool_name' \
     -F description='pool description' \
     -F ips='127.0.0.1'

.. code-block:: js

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const poolName = 'ip_pool_name';
      const createdIpPool = await client.ip_pools.create({ name: poolName, description: 'description for the ip pool', ips: ['127.0.0.1'] });
      console.log('createdIpPool', createdIpPool);
    } catch (error) {
      console.error(error);
    }
  })();
