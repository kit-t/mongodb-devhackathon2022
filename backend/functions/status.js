exports = function(request, response){
  /*
    Accessing application's values:
    var x = context.values.get("value_name");

    Accessing a mongodb service:
    var collection = context.services.get("mongodb-atlas").db("dbname").collection("coll_name");
    collection.findOne({ owner_id: context.user.id }).then((doc) => {
      // do something with doc
    });

    To call other named functions:
    var result = context.functions.execute("function_name", arg1, arg2);

    Try running in the console below.
  */
  var collection = context.services.get("mongodb-atlas").db("sample_restaurants").collection("restaurants");
  collection.findOne({}).then((doc) => {
    // do something with doc
    // 3. Configure the response
    // You can manually configure the response that's sent back to the caller...
    response.setStatusCode(200); // Set an HTTP Status code like "200 - OK"
    response.setBody(JSON.stringify({ doc })); // Return a custom response payload
    response.addHeader("Content-Type", "application/json"); // Modify the response headers
    // ...or just return a value and use the default response configuration.
    // If you manually configure the `response` object, then the return value does nothing.
    return { ok: true };
  });
};