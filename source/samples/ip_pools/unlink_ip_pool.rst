.. code-block:: bash

  #IP as a replacement
  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN/ips/ip_pool\?ip='REPLACEMENT_IP'

  #IP pool id as replacement
  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v3/domains/YOUR_DOMAIN/ips/ip_pool\?pool_id='REPLACEMENT_POOL_ID'

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const unlinkedIpPoll = await client.domains.unlinkIpPoll(DOMAIN, {pool_id: 'your_ip_pool_id'});
      console.log('unlinkedIpPoll', unlinkedIpPoll);
    } catch (error) {
      console.error(error);
    }
  })();

