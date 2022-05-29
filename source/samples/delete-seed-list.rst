
.. code-block:: bash

  curl -s --user 'api:YOUR_API_KEY' -X DELETE -G \
      https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL

.. code-block:: java

    import com.mailgun.api.v4.MailgunSeedListApi;
    import com.mailgun.client.MailgunClient;
    import feign.Response;

    // ...

    public Response deleteInboxPlacementTest() {
        MailgunSeedListApi mailgunSeedListApi = MailgunClient.config(API_KEY)
                .createApi(MailgunSeedListApi.class);

        return mailgunSeedListApi.deleteSeedListFeignResponse(TARGET_EMAIL);
    }

.. code-block:: php

  # Currently, the PHP SDK does not support the inbox placement endpoint.
  # Consider using the following php curl function.
  function delete_inbox_placement_test() {
    $ch = curl_init();

    curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);
    curl_setopt($ch, CURLOPT_USERPWD, 'api:PRIVATE_API_KEY');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
    curl_setopt($ch, CURLOPT_URL, 'https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL');
    $result = curl_exec($ch);
    curl_close($ch);

    return $result;
  }

.. code-block:: py

 def delete_inbox_placement_test():
     return requests.delete(
         "https://api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL",
         auth=('api', 'YOUR_API_KEY'))

.. code-block:: rb

 def delete_inbox_placement_test
   RestClient.delete("https://api:YOUR_API_KEY"\
                     "@api.mailgun.net/v4/inbox/seedlists/TARGET_EMAIL"\
                     {|response, request, result| response }
 end

.. code-block:: csharp

 using System;
 using System.IO;
 using RestSharp;
 using RestSharp.Authenticators;

 public class InboxPlacementTest
 {

     public static void Main (string[] args)
     {
         Console.WriteLine (GetInboxPlacementTest().Content.ToString());
     }

     public static IRestResponse DeleteInboxPlacementTest()
     {
         RestClient client = new RestClient();
         client.BaseUrl = new Uri("https://api.mailgun.net/v4");
         client.Authenticator =
             new HttpBasicAuthenticator("api",
                                         "YOUR_API_KEY");
         RestRequest request = new RestRequest(Method.DELETE);
         request.AddParameter ("target_email", "TARGET_EMAIL", ParameterType.UrlSegment);
         request.Resource = "/inbox/seedlists/{target_email}";
         return client.Execute(request);
     }

 }
