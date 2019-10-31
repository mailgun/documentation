
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
