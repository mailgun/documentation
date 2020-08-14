
.. code-block:: bash

  curl --user 'api:PRIVATE_API_KEY' -X POST \
      https://api.mailgun.net/v4/address/validate \
      -F address='foo@mailgun.net'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode validateEmail() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v4/address/validate")
             .basicAuth("api", PRIVATE_API_KEY)
             .field("address", "foo@mailgun.com")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the v4 Validations endpoint.
  # Consider using the following php curl function.
  function get_bulk_validation() {
    $params = array(
        "address" => "bob@example.com"
    );
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/address/validate');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def post_validate():
     return requests.post(
         "https://api.mailgun.net/v4/address/validate",
         auth=("api", "PRIVATE_API_KEY"),
         data={"address": "foo@mailgun.net"})

.. code-block:: rb

 def post_validate
   RestClient.post "https://api:PRIVATE_API_KEY"\
   "@api.mailgun.net/v4/address/validate",
   {:address => "foo@mailgun.net", :multipart => true}
 end

.. code-block:: go

 import (
	"bytes"
	"encoding/json"
	"mime/multipart"
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
	 body := &bytes.Buffer{}
	 writer := multipart.NewWriter(body)
	 address, _ := writer.CreateFormField("address")
	 _, _ = address.Write([]byte(email))
	 writer.Close()

	 client := &http.Client{}
	 req, _ := http.NewRequest("POST", "https://api.mailgun.net/v4/address/validate", body)
	 req.Header.Set("Content-Type", writer.FormDataContentType())
	 req.SetBasicAuth("api", "api_key_here")
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
         Console.WriteLine (PostValidate ().Content.ToString ());
     }

     public static IRestResponse PostValidate ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "PRIVATE_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/address/validate";;
         request.AddParameter ("address", "foo@mailgun.net");
         request.Method = Method.POST
         return client.Execute (request);
     }
 }
