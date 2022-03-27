exports = async function(request, response){
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
  var collection = context.services.get("mongodb-atlas").db("sample_airbnb").collection("listingsAndReviews");
  collection.findOne({ _id: "10009999" });
  return { ok: true };
};