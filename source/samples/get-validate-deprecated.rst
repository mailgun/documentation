
.. code-block:: bash

  curl -G --user 'api:pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7' -G \
      https://api.mailgun.net/v3/address/validate \
      --data-urlencode address='foo@mailgun.net'

.. code-block:: java

    import com.mailgun.api.v4.MailgunEmailVerificationApi;
    import com.mailgun.model.verification.AddressValidationResponse

    // ...

    public AddressValidationResponse validateEmail() {
        MailgunEmailVerificationApi mailgunEmailVerificationApi = MailgunClient.config(API_KEY)
            .createApi(MailgunEmailVerificationApi.class);

        return mailgunEmailVerificationApi.validateAddress("foo@mailgun.com");
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
   url_params = { address: "foo@mailgun.net" }
   public_key = "pubkey-5ogiflzbnjrljiky49qxsiozqef5jxp7"
   validate_url = "https://api.mailgun.net/v3/address/validate"
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

 // This feature is deprecated
 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "PUBLIC_API_KEY", domain: DOMAIN });

 mailgun.validate('alice@example.com', function (error, body) {
   console.log(body);
 });
