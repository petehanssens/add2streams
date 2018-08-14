# add2streams
adding data to a kinesis stream

##Problem:
I was recently told a tough problem to solve was adding data to a record in a stream.

My initial reaction to that was, yeah I guess that would be tough. But then I thought about it and thought about it some more and realised that it's actually a really simple problem to solve.

##Solution:
The trick is to read every record from the stream, add something to it, then add it back on to another stream.

This example is static in that it is adding some text to some text but I could quite easily make this dynamic with the introduction of a dynamodb table - do let me know if this is of interest.

Thanks,

Peter
