.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks \
	-F id='clicked' \
	-F url='https://your_domain.com/v1/clicked'
	-F url='https://your_domain.com/v2/clicked'
	-F url='https://your_partner_domain.com/v1/clicked'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode addWebhook() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/domains/" + 
                                                        YOUR_DOMAIN_NAME + 
                                                        "/webhooks")
 		      .basicAuth("api", API_KEY)
 		      .field("id","click")
 		      .field("url", "https://your_domain.com/v1/clicked")
 		      .field("url", "https://your_domain.com/v2/clicked")
 		      .field("url", "https://your_partner_domain.com/v1/clicked")
              }).asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');
  $domain = 'YOUR_DOMAIN_NAME';

  # Issue the call to the client.
  $result = $mgClient->post("domains/$domain/webhooks", array(
      'id'  => 'clicked',
      'url' => array(
          'https://your_domain.com/v1/clicked',
          'https://your_domain.com/v2/clicked',
          'https://your_partner_domain.com/v1/clicked'
      )
  ));

.. code-block:: py

 def add_webhook():
     return requests.post(
         "https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
         auth=("api", "YOUR_API_KEY"),
         data={
           'id':'clicked', 
           'url':[ 'https://your_domain.com/v1/clicked',
		   'https://your_domain.com/v2/clicked',
		   'https://your_partner_domain.com/v1/clicked'
           ]
         })

.. code-block:: rb

 def add_webhook
   RestClient.post("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/webhooks",
                   :id => 'clicked',
                   :url => ['https://your_domain.com/v1/clicked',
                            'https://your_domain.com/v2/clicked',
                            'https://your_partner_domain.com/v1/clicked'])
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddWebhookChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddWebhook ().Content.ToString ());
     }

     public static IRestResponse AddWebhook ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3/");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/YOUR_DOMAIN_NAME/webhooks";
         request.AddParameter ("id", "clicked");
         request.AddParameter ("url", "https://your_domain.com/v1/clicked")
         request.AddParameter ("url", "https://your_domain.com/v2/clicked")
         request.AddParameter ("url", "https://your_partner_domain.com/v1/clicked")
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 func CreateWebhook(domain, apiKey string) error {
   mg := mailgun.NewMailgun(domain, apiKey)
   return mg.CreateWebhook("clicked", "https://your_domain.com/v1/clicked")
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });
 var urls = ['https://your_domain.com/v1/clicked', 'https://your_domain.com/v2/clicked', 'https://your_parner_domain.com/v1/clicked']

 mailgun.post(`/domain/${DOMAIN}/webhooks`, {"id": 'clicked', "url": urls}, function (error, body) {
   console.log(body);
 });
