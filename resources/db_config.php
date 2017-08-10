<?php
require_once('config.php');

$conn = new mysqli( $config['db']['host'],
                    $config['db']['username'],
                    $config['db']['password'],
                    $config['db']['name']
                  );
?>
