// app.js

var oracledb = require('oracledb');

oracledb.getConnection({
  user: "biapps",
  password: "biapps",
  connectString: "pelobidev2.projected.ltd.uk:1521/pelobdv2.projected.ltd.uk"
}, function(err, connection) {
  if (err) {
    console.error(err.message);
    return;
  }
  connection.execute( "SELECT 'PASSED' AS HOORAY FROM DUAL",
    [],
    function(err, result) {
      if (err) {
        console.error(err.message);
        doRelease(connection);
        return;
      }
      console.log(result.metaData);
      console.log(result.rows);
      doRelease(connection);
    });
});

function doRelease(connection) {
  connection.release(
    function(err) {
      if (err) {console.error(err.message);}
    }
  );
}
