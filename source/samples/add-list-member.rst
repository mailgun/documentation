.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members \
      -F subscribed=True \
      -F address='bar@example.com' \
      -F name='Bob Bar' \
      -F description='Developer' \
      -F vars='{"age": 26}'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode addListMember() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/lists/{list}@{domain}/members")
             .basicAuth("api", API_KEY)
             .field("subscribed", true)
             .field("address", "bob@example.com")
             .field("name", "Bob Bar")
             .field("description", "developer")
             .field("vars", "{\"age\": 26}")
             .asJson();

         return request.getBody();
     }
 }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $mailing_list = 'LIST@YOUR_DOMAIN_NAME';
  $address ='bob@example.com';
  $name = 'Bob';
  $vars = array("id" => "123456");

  # Issue the call to the client.
  $result = $mgClient->mailingList()->member()->create(
                                                    $mailing_list,
                                                    $address,
                                                    $name,
                                                    $vars);

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members",
         auth=('api', 'YOUR_API_KEY'),
         data={'subscribed': True,
               'address': 'bar@example.com',
               'name': 'Bob Bar',
               'description': 'Developer',
               'vars': '{"age": 26}'})

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members",
                   :subscribed => true,
                   :address => 'bar@example.com',
                   :name => 'Bob Bar',
                   :description => 'Developer',
                   :vars => '{"age": 26}')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddListMemberChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddListMember ().Content.ToString ());
     }

     public static IRestResponse AddListMember ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("address", "bar@example.com");
         request.AddParameter ("subscribed", true);
         request.AddParameter ("name", "Bob Bar");
         request.AddParameter ("description", "Developer");
         request.AddParameter ("vars", "{\"age\": 26}");
         request.Method = Method.POST;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func AddListMember(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     memberJoe := mailgun.Member{
         Address:    "joe@example.com",
         Name:       "Joe Example",
         Subscribed: mailgun.Subscribed,
     }

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateMember(ctx, true, "mailingList@example.com", memberJoe)
 }


.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const newMember = await client.lists.members.createMember(DOMAIN,
        {
            address: 'bob@example.com',
            name: 'Bob Barr',
            vars: JSON.stringify({age: 27}),
            subscribed: 'yes',
            upsert: 'yes'
        }
      );
      console.log('newMember', newMember);
    } catch (error) {
        console.error(error);
    }
  })();
