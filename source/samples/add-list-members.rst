
.. code-block:: bash

 curl -s --user 'api:YOUR_API_KEY' \
    https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members.json \
    -F upsert=true \
    -F members='[{"address": "Alice <alice@example.com>", "vars": {"age": 26}},{"name": "Bob", "address": "bob@example.com", "vars": {"age": 34}}]'

.. code-block:: java


    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.AddMailingListMembersRequest;
    import com.mailgun.model.mailing.lists.MailingListMember;
    import com.mailgun.model.mailing.lists.MailingListResponse;

    import java.util.List;
    import java.util.Map;

    // ...

    public MailingListResponse addListMembers() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        Map<String, Object> aliceVars = Map.of("age", 26);

        MailingListMember alice = MailingListMember.builder()
            .address("Alice <alice@example.com>")
            .name("Alice")
            .vars(aliceVars)
            .subscribed(true)
            .build();

        Map<String, Object> bobVars = Map.of(
                "gender", "male",
                "age", 1,
                "name", "Bob"
        );

        MailingListMember bob = MailingListMember.builder()
            .address("bob@example.com")
            .name("Bob")
            .vars(bobVars)
            .subscribed(true)
            .build();

        AddMailingListMembersRequest request = AddMailingListMembersRequest.builder()
            .members(List.of(alice, bob))
            .upsert(true)
            .build();

        return mailgunMailingListApi.addMembersToMailingList(MAILING_LIST_ADDRESS, request);
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

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  const formData = require('form-data');
  const Mailgun = require('mailgun.js');

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const newMembersList = [
        {
        address: 'bob@example.com',
        name: 'Bob Barr',
        vars: JSON.stringify({ age: 27 }),
        subscribed: 'yes',
        upsert: 'yes'
        },
        {
        address: 'Alice <alice@example.com>',
        name: 'Alice Barr',
        vars: JSON.stringify({ age: 27 }),
        subscribed: 'yes',
        upsert: 'yes'
        },
      ];

      const newMembers = await client.lists.members.createMembers(
        DOMAIN,
        {
        members: newMembersList,
        upsert: 'yes'
        }
      );
      console.log('newMembers', newMembers);
    } catch (error) {
      console.error(error);
    }
  })();
