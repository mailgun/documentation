.. code-block:: bash

    curl -v -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/<domain>/tags/<tag>/stats/aggregates/countries

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
   (async () => {
      try {
        const countriesAggregation = await client.domains.domainTags.countries(
            DOMAIN,
            'YOUR_TAG_NAME'
        );
        console.log('countriesAggregation', countriesAggregation);
      } catch (error) {
        console.error(error);
      }
   })();
