
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE \
      https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members/bar@example.com

.. code-block:: java

    import com.mailgun.api.v3.MailgunMailingListApi;
    import com.mailgun.model.mailing.lists.MailingListMemberResponse;

    // ...

    public MailingListMemberResponse removeMembers() {
        MailgunMailingListApi mailgunMailingListApi = MailgunClient.config(API_KEY)
            .createApi(MailgunMailingListApi.class);

        return mailgunMailingListApi.deleteMemberFromMailingList(MAILING_LIST_ADDRESS, "karen@example.com");
    }

.. code-block:: php

  # Include the Autoloader (see "Libraries" for install instructions)
  require 'vendor/autoload.php';
  use Mailgun\Mailgun;

  # Instantiate the client.
  $mgClient = Mailgun::create('PRIVATE_API_KEY', 'https://API_HOSTNAME');
  $mailing_list = 'LIST@YOUR_DOMAIN_NAME';
  $recipient    = 'bob@example.com';

  # Issue the call to the client.
  $result = $mgClient->mailingList()->member()->delete($mailing_list, $recipient);

.. code-block:: py

 def remove_member():
     return requests.delete(
         ("https://api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members"
          "/bar@example.com"),
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def remove_member
   RestClient.delete("https://api:YOUR_API_KEY" \
                     "@api.mailgun.net/v3/lists/LIST@YOUR_DOMAIN_NAME/members" \
                     "/bar@example.com")
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class RemoveListMemberChunk
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (RemoveListMember ().Content.ToString ());
     }

     public static IRestResponse RemoveListMember ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/v3");
         client.Authenticator =
             new HttpBasicAuthenticator ("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "lists/{list}/members/{member}";
         request.AddParameter ("list", "LIST@YOUR_DOMAIN_NAME",
                               ParameterType.UrlSegment);
         request.AddParameter ("member", "bar@example.com",
                               ParameterType.UrlSegment);
         request.Method = Method.DELETE;
         return client.Execute (request);
     }

 }

.. code-block:: go

 import (
     "context"
     "github.com/mailgun/mailgun-go/v3"
     "time"
 )

 func DeleteListMember(domain, apiKey string) error {
     mg := mailgun.NewMailgun(domain, apiKey)

     ctx, cancel := context.WithTimeout(context.Background(), time.Second*30)
     defer cancel()

     return mg.DeleteMember(ctx, "joe@example.com", "list@example.com")
 }

.. code-block:: js

  const DOMAIN = 'YOUR_DOMAIN_NAME';

  import formData from 'form-data';
  import Mailgun from 'mailgun.js';

  const mailgun = new Mailgun(formData);

  const client = mailgun.client({ username: 'api', key: 'YOUR_API_KEY' || '' });
  (async () => {
    try {
      const deletedMember = await client.lists.members.destroyMember(DOMAIN, 'bob@example.com');
      console.log('deletedMember', deletedMember);
    } catch (error) {
      console.error(error);
    }
  })();

