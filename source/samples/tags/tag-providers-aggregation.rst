.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/providers

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const providersAggregation = await client.domains.domainTags.providers(
        DOMAIN,
        'YOUR_TAG_NAME'
      );
      console.log('providersAggregation', providersAggregation);
    } catch (error) {
      console.error(error);
    }
  })();
