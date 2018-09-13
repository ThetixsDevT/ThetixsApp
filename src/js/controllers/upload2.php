<?php
if ( !empty( $_FILES ) ) {
	$num = rand ( 999999,  9999999999 );
	$myValue1 = $_REQUEST['param1'];

	mkdir( 'uploads/partners/'.$_REQUEST['param1'], 0777,true);

    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
    $uploadPath = dirname( __FILE__ ) . DIRECTORY_SEPARATOR . 'uploads/partners/' . DIRECTORY_SEPARATOR .$_REQUEST['param1'] . DIRECTORY_SEPARATOR .$_FILES[ 'file' ][ 'name' ];

    move_uploaded_file( $tempPath, $uploadPath );

    $answer = array( 'answer' => 'File transfer completed' );
    $json = json_encode( $answer );

    echo $json;

} else {

    echo 'No files';

}
?>