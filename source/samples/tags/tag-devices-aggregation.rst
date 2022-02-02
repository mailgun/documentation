.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/devices

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const devicesAggregation = await client.domains.domainTags.devices(
        DOMAIN,
        'YOUR_TAG_NAME'
      );
      console.log('providersAggregation', devicesAggregation);
    } catch (error) {
      console.error(error);
    }
  })();
