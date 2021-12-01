.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
     -X POST https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips \
     -F ip='127.0.0.1'

.. code-block:: java

  import com.mashape.unirest.http.HttpResponse;
  import com.mashape.unirest.http.JsonNode;
  import com.mashape.unirest.http.Unirest;
  import com.mashape.unirest.http.exceptions.UnirestException;

  public class MGSample {

      // ...

      public static JsonNode addDomainIP() throws UnirestException {

          HttpResponse<JsonNode> jsonResponse = Unirest.post("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/ips")
              .basicAuth("api", API_KEY)
              .field("ip", "127.0.0.1")
              .asJson();

          return jsonResponse.getBody();
      }
  }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $domain   = 'YOUR_DOMAIN_NAME';
  $ip       = '127.0.0.1';

  # Issue the call to the client.
  $result = $mgClient->ips()->assign($domain, $ip);

.. code-block:: py

  def add_domain_ip():
      return requests.post(
          "https://api.mailgun.net/v3/domains/YOUR_NEW_DOMAIN_NAME/ips",
          auth=("api", "YOUR_API_KEY"),
          data={"smtp_password": "127.0.0.1"})

.. code-block:: rb

  def add_domain_ip
    RestClient.post("https://api:YOUR_API_KEY"\
                    "@api.mailgun.net/v3/domains/YOUR_NEW_DOMAIN_NAME/ips",
                    :ip => '127.0.0.1')
  end

.. code-block:: csharp

  using System;
  using System.IO;
  using RestSharp;
  using RestSharp.Authenticators;

  public class AddDomainIPChunk
  {

      public static void Main (string[] args)
      {
          Console.WriteLine (AddDomainIP ().Content.ToString ());
      }

      public static IRestResponse AddDomainIP ()
      {
          RestClient client = new RestClient ();
          client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
          client.Authenticator =
              new HttpBasicAuthenticator ("api",
                                          "YOUR_API_KEY");
          RestRequest request = new RestRequest ();
          request.Resource = "{domain}/ips";
          request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
          request.AddParameter ("ip", "127.0.0.1");
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

  func AddDomainIPS(domain, apiKey string) error {
      mg := mailgun.NewMailgun(domain, apiKey)

      ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
      defer cancel()

      return mg.AddDomainIP(ctx, "127.0.0.1")
  }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
      try {
          const addedIp = await client.domains.assignIp(DOMAIN, '127.0.0.1');
          console.log('addedIp', addedIp);
      } catch (error) {
          console.error(error);
      }
  })();
