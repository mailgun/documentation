
.. code-block:: bash

 curl -s --user `api:YOUR_API_KEY' -G \
     https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode getResultsAttributes() throws UnirestException {

         HttpResponse<JsonNode> request = Unirest.get("https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys")
             .basicAuth("api", API_KEY)
             .asJson();

         return request.getBody();
     }
 }


.. code-block:: php

 function get_domain_keys() {
     $ch = curl_init();

     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
     curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
     curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

     curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
     curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys');
     $result = curl_exec($ch);
     curl_close($ch);

     return $result;
   }

.. code-block:: py

 def get_domain_keys():
     return requests.get(
         "https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def get_domain_keys
    RestClient.get("https://api:YOUR_API_KEY"\
                   "@api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys"\
                   {|response, request, result| response }
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
         Console.WriteLine (GetSeedLists ().Content.ToString ());
     }

     public static IRestResponse GetSeedLists ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "/do";
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
	"encoding/json"
	"net/http"
 )

 type ListDomainKeyResp struct {
	Items []DomainKey `json:"items"`
 }

 type DomainKey struct {
	SigningDomain string `json:"signing_domain"`
	Selector      string `json:"selector"`
	Record        Record `json:"dns_record"`
 }

 type Record struct {
	Active bool     `json:"is_active"`
	Cached []string `json:"cached"`
	Name   string   `json:"name"`
	Type   string   `json:"record_type"`
	Valid  string   `json:"valid"`
	Value  string   `json:"value"`
 }

 func ListDomainKeys(email string) (listDomainKeyResp LitDomainKeyResp, err error) {

	// creating HTTP request and returning response

	client := &http.Client{}
	req, _ := http.NewRequest("GET", "https://api.mailgun.net/v4/domains/AUTHORITY_DOMAIN_NAME/keys", nil)
 	req.SetBasicAuth("api", apiKey)
	response, err := client.Do(req)
	if err != nil {
 		return
	}
	defer response.Body.Close()

	// Decode response.
	err = json.NewDecoder(response.Body).Decode(&listDomainKeyResp)
	return
  }
