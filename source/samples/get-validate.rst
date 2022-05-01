
.. code-block:: bash

  curl --user 'api:PRIVATE_API_KEY' -G \
      https://api.mailgun.net/v4/address/validate \
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

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function get_validate() {
    $params = array(
        "address" => "bob@example.com"
    );
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def get_validate():
     return requests.get(
         "https://api.mailgun.net/v4/address/validate",
         auth=("api", "PRIVATE_API_KEY"),
         params={"address": "foo@mailgun.net"})

.. code-block:: rb

 def get_validate
   RestClient.get "https://api:PRIVATE_API_KEY"\
   "@api.mailgun.net/v4/address/validate",
   {params: {address: "foo@mailgun.net"}}
 end

.. code-block:: go

 import (
    "encoding/json"
    "net/http"
 )

 type ValidationResponse struct {
    Address       string   `json:"address"`
    IsDisposable  bool     `json:"is_disposable_address"`
    IsRoleAddress bool     `json:"is_role_address"`
    Reason        []string `json:"reason"`
    Result        string   `json:"result"`
    Risk          string   `json:"risk"`
 }


 func validateAddress(email string) (vr ValidationResponse, err error) {

    // creating HTTP request and returning response

    client := &http.Client{}
    req, _ := http.NewRequest("GET", "https://api.mailgun.net/v4/address/validate", nil)
    req.SetBasicAuth("api", apiKey)
    param := req.URL.Query()
    param.Add("address", email)
    req.URL.RawQuery = param.Encode()
    response, err := client.Do(req)

    if err != nil {
        return
    }

    // decoding into validation response struct
    err = json.NewDecoder(response.Body).Decode(&vr)
    return
    }

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

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const validationRes = await client.validate.get('foo@mailgun.net');
      console.log('validationRes', validationRes);
    } catch (error) {
      console.error(error);
    }
  })();
