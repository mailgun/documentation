
.. code-block:: bash

  curl -G --user 'api:PRIVATE_API_KEY' -G \
      https://api.mailgun.net/v4/address/validate \
      --data-urlencode address='foo@mailgun.net'

.. code-block:: java
 
 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;
 
 public class MGSample {
 
     // ...
 
     public static JsonNode validateEmail() throws UnirestException {
 
         HttpResponse <JsonNode> request = Unirest.get("https://api.mailgun.net/v4/address/validate")
             .basicAuth("api", PRIVATE_API_KEY)
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
  $mgClient = new Mailgun('PRIVATE_API_KEY');
  $validateAddress = 'foo@mailgun.net';

  # Issue the call to the client.
  $result = $mgClient->get("address/validate", array('address' => $validateAddress));
  # is_valid is 0 or 1
  $isValid = $result->http_response_body->is_valid;
.. code-block:: py

 def get_validate():
     return requests.get(
         "https://api.mailgun.net/v4/address/validate",
         auth=("api", "PRIVATE_API_KEY"),
         params={"address": "foo@mailgun.net"})

.. code-block:: rb

 def get_validate
   url_params = { address: "foo@mailgun.net" }
   public_key = "PRIVATE_API_KEY"
   validate_url = "https://api.mailgun.net/v4/address/validate"
   RestClient::Request.execute method: :get, url: validate_url,
                                       headers: { params: url_params },
                                       user: 'api', password: public_key
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
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "PRIVATE_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/address/validate";
         request.AddParameter ("address", "foo@mailgun.net");
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func ValidateEmail(apiKey string) (mailgun.EmailVerification, error) {
     mv := mailgun.NewEmailValidator(apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mv.ValidateEmail(ctx, "foo@mailgun.net", false)
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "PRIVATE_API_KEY", domain: DOMAIN });

 mailgun.validate('alice@example.com', function (error, body) {
   console.log(body);
 });
