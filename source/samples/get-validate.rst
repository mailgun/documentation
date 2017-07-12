
.. code-block:: bash

    curl -G --user 'api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7' -G \
	https://api.mailgun.net/v3/address/validate \
	--data-urlencode address='foo@mailgun.net'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode validateEmail() throws UnirestException{

         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v3/address/validate")
				     .basicAuth("api", PUBLIC_API_KEY)
				     .queryString("address", "foo@mailgun.com")
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
  $validateAddress = 'foo@mailgun.net';

  # Issue the call to the client.
  $result = $mgClient->get("address/validate", array('address' => $validateAddress));
  # is_valid is 0 or 1
  $isValid = $result->http_response_body->is_valid;
.. code-block:: py

 def get_validate():
     return requests.get(
         "https://api.mailgun.net/v3/address/validate",
         auth=("api", "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"),
         params={"address": "foo@mailgun.net"})

.. code-block:: rb

 def get_validate
   url_params = {}
   url_params[:address] = "foo@mailgun.net"
   query_string = url_params.collect {|k, v| "#{k.to_s}=#{CGI::escape(v.to_s)}"}.
     join("&")
   RestClient.get "https://api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"\
   "@api.mailgun.net/v3/address/validate?#{query_string}"
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class GetValidateChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetValidate ().Content.ToString ());
     }

     public static IRestResponse GetValidate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7");
         RestRequest request = new RestRequest ();
         request.Resource = "/address/validate";
         request.AddParameter ("address", "foo@mailgun.net");
         return client.Execute (request);
     }

 }

.. code-block:: go

 func ValidateEmail(domain, publicApiKey string) (mailgun.EmailVerification, error) {
   mg := mailgun.NewMailgun(domain, "", publicApiKey)
   return mg.ValidateEmail("foo@mailgun.net")
 }

.. code-block:: node

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "PUBLIC_API_KEY", domain: DOMAIN });

 mailgun.validate('alice@example.com', function (error, body) {
   console.log(body);
 });
