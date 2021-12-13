.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v1/ip_pools

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const ipPoolsList = await client.ip_pools.list();
      console.log('ipPoolsList', ipPoolsList);
    } catch (error) {
      console.error(error);
    }
  })();
