// Import Tinytest from the tinytest Meteor package.
import { Tinytest } from "meteor/tinytest";

// Import and rename a variable exported by standards-products-module.js.
import { name as packageName } from "meteor/standards-products-module";

// Write your tests here!
// Here is an example.
Tinytest.add('standards-products-module - example', function (test) {
  test.equal(packageName, "standards-products-module");
});
