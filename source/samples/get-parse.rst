
.. code-block:: bash

    curl -G --user 'api:pubkey-501jygdalut926-6mb1ozo8ay9crlc28' \
	https://api.mailgun.net/v3/address/parse \
	--data-urlencode addresses='Alice <alice@example.com>,bob@example.com'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode parseAddresses() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/address/parse")
 			.basicAuth("api", API_KEY)
 		    .queryString("addresses", "bob@example.com, alice@example.com")
             .asJson();
 
         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = new Mailgun('pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7');
  $addressList = 'Alice <alice@example.com>,bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->get("address/parse", array('addresses' => $addressList));

.. code-block:: py

 def get_parse():
     return requests.get(
         "https://api.mailgun.net/v3/address/parse",
         auth=("api", "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"),
         params={"addresses": "Alice <alice@example.com>,bob@example.com"})

.. code-block:: rb

 def get_parse
   url_params = {}
   url_params[:addresses] = "Alice <alice@example.com>,bob@example.com"
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"\
   "@api.mailgun.net/v3/address/parse?#{query_string}"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetParseChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetParse ().Content.ToString ());
     }

     public static IRestResponse GetParse ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7");
         RestRequest request = new RestRequest ();
         request.Resource = "/address/parse";
         request.AddParameter ("addresses",
                               "Alice <alice@example.com>,bob@example.com");
         return client.Execute (request);
     }

 }

.. code-block:: go

 func ParseAddress(domain, publicApiKey string) ([]string, []string, error) {
   mg := mailgun.NewMailgun(domain, "", publicApiKey)
   return mg.ParseAddress(
     "Alice <alice@example.com>",
     "bob@example.com",
     // ...
   )
 }

.. code-block:: js

  var DOMAIN = 'YOUR_DOMAIN_NAME';
  var mailgun = require('mailgun-js')({ apiKey: "PUBLIC_API_KEY", domain: DOMAIN });
  
  mailgun.parse([ 'alice@example.com', 'bob@example.com', 'fake@email.com' ], function (error, body) {
    console.log(body);
  });
