=====================    =========    ======================================================================================================================
Name                     Type         Description
=====================    =========    ======================================================================================================================
rid                      string       Unique identifier for a results.
keybox_email             string       The target email of the seed list associated with this result.
subject                  string       The subject of the email received by the seed list mailbox (``target_email``)
sender                   string       The email address of the sender received by the seed list mailbox (``target_email``). All other results must come from the same sender.
name                     string       The name of the seed list.
created_at               datetime     Date and time that the results were created.
updated_at               datetime     Date and time that the results were updated. Will update whenever a mailbox within the test receives mail.
seed_results             object       A sub-object that contains the status of each individual seed mailbox.
status                   string       Will show "processing" or "complete".
delivery_stats           object       A sub-object that provides the stats of this result.
=====================    =========    ======================================================================================================================
