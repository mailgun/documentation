.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     https://api.mailgun.net/v3/domains/$YOUR_DOMAIN/ips \
     -F pool_id='$pool_id'

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const linkedIpPool = await client.domains.linkIpPool(DOMAIN, 'your_ip_pool_id');
      console.log('linkedIpPool', linkedIpPool);
    } catch (error) {
        console.error(error);
    }
  })();

