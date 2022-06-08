.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
    -X POST https://api.mailgun.net/v3/domains \
    -F name='YOUR_NEW_DOMAIN_NAME' \
    -F smtp_password='supersecretpassword'

.. code-block:: java

    import com.mailgun.api.v3.MailgunDomainsApi;
    import com.mailgun.enums.SpamAction;
    import com.mailgun.enums.WebScheme;
    import com.mailgun.model.domains.DomainRequest;
    import com.mailgun.model.domains.DomainResponse;

    import java.util.List;

    // ...

    public DomainResponse addDomain() {
        MailgunDomainsApi mailgunDomainsApi = MailgunClient.config(API_KEY)
            .createApi(MailgunDomainsApi.class);

        DomainRequest request = DomainRequest.builder()
            .name(YOUR_NEW_DOMAIN_NAME)
            .spamAction(SpamAction.BLOCK)
            .wildcard(true)
            .forceDkimAuthority(false)
            .dkimKeySize(1024)
            .ips(List.of(IP_1, IP_2))
            .webScheme(WebScheme.HTTPS)
            .build();

        return mailgunDomainsApi.createNewDomain(request);
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->domains()->create($domain);

.. code-block:: py

 def add_domain():
     return requests.post(
         "https://api.mailgun.net/v3/domains",
         auth=("api", "YOUR_API_KEY"),
         data={'name':'YOUR_NEW_DOMAIN_NAME', 'smtp_password':'supersecretpassword'})

.. code-block:: rb

 def add_domain
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains",
                   :name => 'YOUR_NEW_DOMAIN_NAME',
                   :smtp_password => 'supersecretpassword')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddDomainChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddDomain ().Content.ToString ());
     }

     public static IRestResponse AddDomain ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains";
         request.AddParameter ("name", "YOUR_NEW_DOMAIN_NAME");
         request.AddParameter ("smtp_password", "supersecretpassword");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

  import (
      "context"
      "github.com/mailgun/mailgun-go/v3"
      "time"
  )

  func AddDomain(domain, apiKey string) error {
      mg := mailgun.NewMailgun(domain, apiKey)

      ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
      defer cancel()

      return mg.CreateDomain(ctx, "example.com", &mailgun.CreateDomainOptions{
          Password: "super_secret",
          SpamAction: mailgun.SpamActionTag,
          Wildcard:   false,
      })
  }

.. code-block:: js

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });

  (async () => {
    try {
      const newDomain = await client.domains.create({
          name: "YOUR_NEW_DOMAIN_NAME",
          smtp_login: "smtpLogin",
          smtp_password: 'supersecret!'
      });
      console.log('newDomain', newDomain);
    } catch (error) {
        console.error(error);
    }
  })();

