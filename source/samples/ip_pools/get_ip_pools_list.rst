.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -G \
      https://api.mailgun.net/v1/ip_pools

.. code-block:: js

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

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
