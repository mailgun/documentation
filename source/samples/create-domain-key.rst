
.. code-block:: bash

 curl -s --user `api:YOUR_API_KEY' -X POST \
     https://api.mailgun.net/v1/dkim/keys -F signing_domain=SIGNING_DOMAIN -F selector=SELECTOR

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode createDomainKey() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.POST("https://api.mailgun.net/v1/dkim/keys")
             .basicAuth("api", API_KEY)
             .field("signing_domain", "SIGNING_DOMAIN")
             .field("selector", "SELECTOR")
             .asJson();

         return request.getBody();
     }
 }


.. code-block:: php

 function create_domain_key() {
     $ch = curl_init();

     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
     curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys/SELECTOR/activate');
     curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'signing_domain'=> 'SIGNING_DOMAIN')
     );
    curl_setopt($ch, CURLOPT_POSTFIELDS, array(
        'selector'=> 'SELECTOR')
    );
 $result = curl_exec($ch);
     curl_close($ch);

     return $result;
   }

.. code-block:: py

 def create_domain_key():
     return requests.post(
         "https://api.mailgun.net/v1/dkim/keys",
         data={'signing_domain': 'SIGNING_DOMAIN', 'selector': 'SELECTOR'},
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_domain_key
    RestClient.POST("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v1/dkim/keys",
                   :signing_domain => 'bob@example.com',
                   :selector => 'SELECTOR')
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
         Console.WriteLine (CreateDomainKey ().Content.ToString ());
     }

     public static IRestResponse CreateDomainKey ()
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
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
	"encoding/json"
    "fmt"
	"net/http"
 )

 type CreateDomainKeyResponse struct {
	SigningDomain string          `json:"signing_domain"`
	Selector      string          `json:"selector"`
	Record        Record `json:"dns_record,omitempty"`
 }

 type Record struct {
	Active   bool     `json:"is_active"`
	Cached   []string `json:"cached"`
	Name     string   `json:"name"`
	Type     string   `json:"record_type"`
	Valid    string   `json:"valid"`
	Value    string   `json:"value"`
 }

 func CreateDomainKey() (createDomainKeyResponse CreateDomainKeyResponse, err error) {
    signingDomain := "SIGNING_DOMAIN"
    selector := "SELECTOR"

    params := url.Values{}
    params.Add("signing_domain", signingDomain)
    params.Add("selector", selector)

	client := &http.Client{}
	req, _ := http.NewRequest("POST", "https://api.mailgun.net/v1/dkim/keys", strings.NewReader(params.Encode()))
 	req.SetBasicAuth("api", apiKey)
    req.Header.Set("Content-Type", "application/x-www-form-urlencoded")
	response, err := client.Do(req)
	if err != nil {
 		return
	}
	defer response.Body.Close()

	// Decode response.
	err = json.NewDecoder(response.Body).Decode(&createDomainKeyResponse)
	return
  }
