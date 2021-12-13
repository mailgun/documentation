.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
    https://api.mailgun.net/v1/ip_pools/$your_pool_id

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedIpPool = await client.ip_pools.delete('61b70962dc62320ca808bd39');
      console.log('deletedIpPool', deletedIpPool);
    } catch (error) {
      console.error(error);
    }
  })();
