n<?php
include(dirname(__FILE__) . "/clasesExtend.php");

class logueo extends clasesExtend {
    
    public function __construct() {
        $this->Conn(Host, Database, Usernam, Pwd);
    }
        
    public function logueo($user, $pass) {
      
        $sql = "select * from clientes where email='" . $user . "' and  CONVERT(varchar(200),DECRYPTBYPASSPHRASE('LlaveSimetrica', pass)) = '" . $pass . "' and (activo=1 or activo=99) ";
        $this->consulta($sql);
     
        }
        public function salir() {
            session_unset($_SESSION["user"]);
            return "ok";
        }
    
}