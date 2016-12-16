<?php 

	//error_reporting(-1);
	//ini_set('display_errors', 'On');

	header('Content-type: application/json');

	$username = "root";
	$password = "LPAufsc(0401)mySQL";
	$hostname = "localhost"; 
	$db 	  = "bancoprocef";

	$json = array();
	$data = array();

	//connection to the database
	$dbhandle = mysql_connect($hostname, $username, $password) 
  		or die("Unable to connect to MySQL");

  	//select db
	$selected = mysql_select_db($db,$dbhandle) 
  		or die("Could not select database");

	$base_query = "select  leitura.Id_Leitura,
					modulo.Id_Modulo,
					modulo.Descricao_Modulo,
					leitura.Valor_Leitura,
					sensor.Id_Sensor,
					sensor.Descricao_Sensor,
					leitura.Data_Leitura
			from leitura
			left outer join sensor on leitura.Id_Sensor_Leitura = sensor.Id_Sensor
			left outer join modulo on leitura.Id_Modulo_Leitura = modulo.Id_Modulo
			WHERE 1=1";

	$idModulo = $_GET['idModulo'];
	$idSensor = $_GET['idSensor'];

	if($idSensor == 100)
	{
		$base_query = "select Tracer.Id_Modulo,
						Tracer.Valor_Corrente,
						Tracer.Valor_Tensao,
						Tracer.DataeTime
						from Tracer 
						where 1=1";

		$where_ids = " AND Tracer.Id_Modulo = " . $idModulo;
		$base_query = $base_query . $where_ids;

		$query = $base_query;

		if(isset($_GET['data'])) {
			$data = $_GET['data'];
			$where = " AND STR_TO_DATE(DataeTime, '%Y-%m-%d %H:%i:%s') > '". $data ."'";
			$query = $query . $where;
		}

		$result = mysql_query($query);

		if (!$result){
			echo 'Database error' . mysql_error();
		}

		while ($row = mysql_fetch_assoc($result)) {
			$r = array(
				'date' 					=> utf8_encode($row['DataeTime']),
				'idModulo' 				=> utf8_encode($row['Id_Modulo']),
				'valorCorrente' 				=> utf8_encode($row['Valor_Corrente']),
				'valorTensao' 				=> utf8_encode($row['Valor_Tensao']),
			);
			array_push($data, $r);
			//print_r($row);
		}
	}
	else
	{

		$where_ids = " AND modulo.Id_Modulo = " . $idModulo;
		$where_ids = $where_ids . " AND sensor.Id_Sensor = " . $idSensor;

		$base_query = $base_query . $where_ids;

		$query = $base_query;

		if(isset($_GET['data'])) {
			$data = $_GET['data'];
			$where = " AND STR_TO_DATE(Data_Leitura, '%Y-%m-%d %H:%i:%s') > '". $data ."'";
			$query = $query . $where;
		}

		//echo $query;

		$result = mysql_query($query);

		if (!$result){
			echo 'Database error' . mysql_error();
		}



		while ($row = mysql_fetch_assoc($result)) {
			$r = array(
				'date' 					=> utf8_encode($row['Data_Leitura']),
				'idModulo' 				=> utf8_encode($row['Id_Modulo']),
				'idSensor' 				=> utf8_encode($row['Id_Sensor']),
				'value' 				=> utf8_encode($row['Valor_Leitura'])
			);
			array_push($data, $r);
			//print_r($row);
		}
	}

	$json['data'] = $data;

	echo json_encode($json);
?>
