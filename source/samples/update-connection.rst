
.. code-block:: bash

    curl -s --user 'api:YOUR_API_KEY' -X PUT \
	https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection
	-F require_tls='true' \
	-F skip_verification='false'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode updateConnections() throws UnirestException{

	       HttpResponse<JsonNode> jsonResponse = Unirest.put("https://api.mailgun.net/v3/domains/"+ YOUR_DOMAIN_NAME +"/connection")
			       .basicAuth("api", API_KEY)
			       .field("require_tls", true)
			       .field("skip_verification", false)
			       .asJson();

	       return jsonResponse.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('YOUR_API_KEY');

  # Issue the call to the client.
  $result = $mgClient->put("domains/$domain/connection", array(
      'require_tls'       => 'true',
      'skip_verification' => 'false'
  ));

.. code-block:: py

 def update_connection():
     return requests.put(
         ("https://api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection"),
         auth=('api', 'YOUR_API_KEY'),
         data={'require_tls': True,
               'skip_verification': False})

.. code-block:: rb

 def update_member
   RestClient.put("https://api:YOUR_API_KEY" \
                  "@api.mailgun.net/v3/domains/YOUR_DOMAIN_NAME/connection",
                  :require_tls => true,
                  :skip_verification => false)
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class UpdateConnectionChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (UpdateConnection ().Content.ToString ());
     }

     public static IRestResponse UpdateConnection ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/YOUR_DOMAIN_NAME/connection";
         request.AddParameter ("require_tls", true);
         request.AddParameter ("skip_verification", false);
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 // Coming soon

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 mailgun.put(`/domain/${DOMAIN}/connection`, {"require_tls": true, "skip_verification": false}, function (error, body) {
   console.log(body);
 });
