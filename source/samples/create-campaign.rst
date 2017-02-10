
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' \
	https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns \
	-F name='Newsletter' \
	-F id='my_campaign_id'

.. code-block:: java

 import javax.ws.rs.client.Client;
 import javax.ws.rs.client.ClientBuilder;
 import javax.ws.rs.client.Entity;
 import javax.ws.rs.client.WebTarget;

 import javax.ws.rs.core.Form;
 import javax.ws.rs.core.MediaType;

 import org.glassfish.jersey.client.authentication.HttpAuthenticationFeature;

 public class MGSample {

     // ...

     public static ClientResponse CreateCampaign() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         Form reqData = new Form();
         reqData.param("name", "Newsletter");
         reqData.param("id", "my_campaign_id");

         return mgRoot
             .path("/{domain}/campaigns")
             .resolveTemplate("domain", "YOUR_DOMAIN_NAME")
             .request(MediaType.APPLICATION_FORM_URLENCODED)
             .buildPost(Entity.entity(reqData, MediaType.APPLICATION_FORM_URLENCODED))
             .invoke(ClientResponse.class);
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
  $result = $mgClient->post("$domain/campaigns", array(
      'name' => 'Newsletter',
      'id'   => 'my_campaign_id'
  ));
.. code-block:: py

 def create_campaign():
     return requests.post(
         "https://api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns",
         auth=('api', 'YOUR_API_KEY'),
         data={'name': 'Newsletter',
               'id': 'my_campaign_id'})

.. code-block:: rb

 def create_campaign
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/YOUR_DOMAIN_NAME/campaigns",
                   :name => 'Newsletter',
                   :id => 'my_campaign_id') {
     |response, request, result| response
   }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;
 
 public class CreateCampaignChunk
 {
 
     public static void Main (string[] args)
     {
         Console.WriteLine (CreateCampaign ().Content.ToString ());
     }
 
     public static IRestResponse CreateCampaign ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "{domain}/campaigns";
         request.AddParameter ("domain", "YOUR_DOMAIN_NAME", ParameterType.UrlSegment);
         request.AddParameter ("name", "Newsletter");
         request.AddParameter ("id", "my_campaign_id");
         request.Method = Method.POST;
         return client.Execute (request);
     }
 
 }

.. code-block:: go

 // not supported
