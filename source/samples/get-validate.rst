
.. code-block:: bash

    curl -G --user 'api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7' -G \
	https://api.mailgun.net/v3/address/validate \
	--data-urlencode address='foo@mailgun.net'

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

     public static ClientResponse ValidateAddress() {

         Client client = ClientBuilder.newClient();
         client.register(HttpAuthenticationFeature.basic(
             "api",
             "YOUR_API_KEY"
         ));

         WebTarget mgRoot = client.target("https://api.mailgun.net/v3");

         return mgRoot
             .path("/address/validate")
             .queryParam("address", "foo@mailgun.net")
             .request()
             .buildGet()
             .invoke(ClientResponse.class);
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
