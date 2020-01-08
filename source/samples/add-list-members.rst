
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json \
    -F upsert=true \
    -F members='[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]'

.. code-block:: java

 import com.mashape.unirest.http.HttpResponse;
 import com.mashape.unirest.http.JsonNode;
 import com.mashape.unirest.http.Unirest;
 import com.mashape.unirest.http.exceptions.UnirestException;

 public class MGSample {

     // ...

     public static JsonNode addListMembers() throws UnirestException {

         HttpResponse <JsonNode> request = Unirest.post("https://api.mailgun.net/v3/lists/{list}@{domain}/members.json")
             .basicAuth("api", API_KEY)
             .field("upsert", true)
             .field("members", "[{\"address\": \"Alice <alice@example.com>\", \"vars\": {\"age\": 26}},{\"name\": \"Bob\", \"address\": \"bob@example.com\", \"vars\": {\"age\": 34}}]")
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
  $members = array(
      array(
          'address'   => 'bob@example.com',
          'name'      => 'Bob',
          'vars'      => array("id" => "123456")
      )
  );

  # Issue the call to the client.
  $result = $mgClient->mailingList()->member()->createMultiple($mailing_list, $members);

.. code-block:: py

 def add_list_member():
     return requests.post(
         "https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json",
         auth=('api', 'YOUR_API_KEY'),
         data={'upsert': True,
               'members': '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')

.. code-block:: rb

 def add_list_member
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json",
                   :upsert => true,
                   :members => '[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]')
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class AddListMembersChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (AddListMembers ().Content.ToString ());
     }

     public static IRestResponse AddListMembers ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members.json";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("members",
                               "[{\"address\":\"Alice<alice@example.com>\",\"vars\":{\"age\":26}},{\"name\":\"Bob\",\"address\":\"bob@example.com\",\"vars\":{\"age\":34}}]");
         request.AddParameter ("upsert", true);
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

 func AddListMembers(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.CreateMemberList(ctx, nil, "mailgunList@example.com", []interface{}{
         mailgun.Member{
             Address:    "alice@example.com",
             Name:       "Alice's debugging account",
             Subscribed: mailgun.Unsubscribed,
         },
         mailgun.Member{
             Address:    "Bob Cool <bob@example.com>",
             Name:       "Bob's Cool Account",
             Subscribed: mailgun.Subscribed,
         },
         mailgun.Member{
             Address: "joe.hamradio@example.com",
             // Charlette is a ham radio packet BBS user.
             // We attach her packet BBS e-mail address as an arbitrary var here.
             Vars: map[string]interface{}{
                 "packet-email": "KW9ABC @ BOGUS-4.#NCA.CA.USA.NOAM",
             },
         },
     })
 }

.. code-block:: js

 var DOMAIN = 'YOUR_DOMAIN_NAME';
 var mailgun = require('mailgun-js')({ apiKey: "YOUR_API_KEY", domain: DOMAIN });

 var members = [
   {
     address: 'Alice <alice@example.com>',
     vars: { age: 26 }
   },
   {
     name: 'Bob',
     address: 'bob@example.com',
     vars: { age: 34 }
   }
 ];

 mailgun.lists(`mylist@${DOMAIN}`).members().add({ members: members, subscribed: true }, function (error, body) {
   console.log(body);
 });
