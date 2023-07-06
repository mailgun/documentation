
.. code-block:: bash

 curl -s --user `api:YOUR_API_KEY' -X DELETE \
     https://api.mailgun.net/v1/dkim/keys -d signing_domain=SIGNING_DOMAIN -d selector=SELECTOR

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode deleteDomainKey() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.delete("https://api.mailgun.net/v1/dkim/keys?signing_domai=SIGNING_DOMAIN&selector=SELECTOR")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }


.. code-block:: php

 function delete_domain_key() {
     $ch = curl_init();

     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
     curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v1/dkim/keys?signing_domain=SIGNING_DOMAIN&selector=SELECTOR');
     $result = curl_exec($ch);
     curl_close($ch);

     return $result;
   }

.. code-block:: py

 def delete_domain_key():
     return requests.delete(
         "https://api.mailgun.net/v1/dkim/keys?signing_domain=SIGNING_DOMAIN&selector=SELECTOR",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def delete_domain_key
    RestClient.put("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v1/dkim/keys?signing_domain=SIGNING_DOMAIN&selector=SELECTOR")
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
         Console.WriteLine (DeleteDomainKey ().Content.ToString ());
     }

     public static IRestResponse DeleteDomainKey ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v1");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "dkim/keys";
         request.AddParameter ("signing_domain", "SIGNING_DOMAIN");
         request.AddParameter ("selector", "SELECTOR");
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
	"encoding/json"
    "fmt"
	"net/http"
 )

 type DeleteDomainKeyResp struct {
	Msg       string `json:"message"`
 }

 func DeleteDomainKey() (deleteDomainKeyResp DeleteDomainKeyResp, err error) {
    signingDomain := "SIGNING_DOMAIN"
    selector := "SELECTOR"

	client := &http.Client{}
	req, _ := http.NewRequest("DELETE", fmt.Sprintf("https://api.mailgun.net/v1/dkim/keys?signing_domain=%s&selector=%s", signingDomain, selector), nil)
 	req.SetBasicAuth("api", apiKey)
	response, err := client.Do(req)
	if err != nil {
 		return
	}
	defer response.Body.Close()

	// Decode response.
	err = json.NewDecoder(response.Body).Decode(&deleteDomainKeyResp)
	return
  }
