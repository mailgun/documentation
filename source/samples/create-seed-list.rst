.. code-block:: bash

  curl -X POST https://api.mailgun.net/v4/inbox/seedlists \
    -F 'name=list' \
    --user 'api:<YOUR_API_KEY>'

.. code-block:: java

    import com.mailgun.api.v4.MailgunSeedListApi;
    import com.mailgun.client.MailgunClient;
    import com.mailgun.model.seedlist.SeedListItem;
    import com.mailgun.model.seedlist.SeedListRequest;
    import java.util.List;

    // ...

    public SeedListItem createSeedList() {
        MailgunSeedListApi mailgunSeedListApi = MailgunClient.config(API_KEY)
                .createApi(MailgunSeedListApi.class);

        SeedListRequest request = SeedListRequest.builder()
                .seedFilter(SEED_FILTER)
                .name(SEED_LIST_NAME)
                .build();

        return mailgunSeedListApi.generateSeedList(request);
    }
 }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function create_seed_list() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'POST');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists');

    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def create_seed_list():
     data = {'name': 'list'}
     return requests.post(
         "https://api.mailgun.net/v4/inbox/seedlists", data=data
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def create_seed_list
   data = {'name'=> 'list' }
   RestClient.post("https://api:YOUR_API_KEY" \
                   "@api.mailgun.net/v4/inbox/seedlists",
                   fields_hash.merge(data))
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class CreateInboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (CreateSeedList ().Content.ToString ());
     }

     public static IRestResponse CreateSeedList ()
     {
         RestClient client = new RestClient ();
         client.BaseUrl = new Uri ("https://api.mailgun.net/seedlists");
         client.Authenticator =
             new HttpBasicAuthenticator ("api", "YOUR_API_KEY");
         RestRequest request = new RestRequest ();
         request.Resource = "inbox/seedlists";
         request.Method = Method.POST;
         return client.Execute (request);
     }
 }

