
.. code-block:: bash

 curl -s --user `api:YOUR_API_KEY' -X PUT \
     https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/deactivate

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deactivateDomainKey() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.put("https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/deactivate")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }


.. code-block:: php

 function deactivate_domain_key() {
     $ch = curl_init();

     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
     curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/deactivate');
     $result = curl_exec($ch);
     curl_close($ch);

     return $result;
   }

.. code-block:: py

 def deactivate_domain_key():
     return requests.put(
         "https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/deactivate",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def deactivate_domain_key
    RestClient.put("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/deactivate")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTests
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (DeactivateDomainKey ().Content.ToString ());
     }

     public static IRestResponse DeactivateDomainKey ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "domains/AUTHORITY_DOMAIN_NAME/keys/deactivate";
         request.Method = Method.PUT;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
	"encoding/json"
    "fmt"
	"net/http"
 )

 type DeactivateDomainKeyResp struct {
	Msg       string `json:"message"`
	Authority string `json:"authority"`
	Selector  string `json:"selector"`
	Active    bool   `json:"active"`
 }

 func DeactivateDomainKey() (deactivateDomainKeyResp DeactivateDomainKeyResp, err error) {
    authority := "AUTHORITY_DOMAIN_NAME"
    selector := "SELECTOR"

	client := &http.Client{}
	req, _ := http.NewRequest("GET", fmt.Sprintf("https://api.mailgun.net/v4/domains/%s/keys/%s/deactivate", authority, selector), nil)
 	req.SetBasicAuth("api", apiKey)
	response, err := client.Do(req)
	if err != nil {
 		return
	}
	defer response.Body.Close()

	// Decode response.
	err = json.NewDecoder(response.Body).Decode(&activateDomainKeyResp)
	return
  }
