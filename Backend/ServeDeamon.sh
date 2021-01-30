#serverStart(){
#  echo "Server Starting ..."
#  cd /home/public
#  node server.js &
#}
#
#serverStop(){
#  PID = netstat -lpn |grep :'8080'
#  kill -9 PID
#  echo "Server stopped"
#}
#
#trap serverStart SIGUSR1
#trap serverStop SIGUSR2 SIGINT SIGKILL SIGHUP SIGTERM SIGQUIT

#serverStart

#sleep infinity
cd /home/public
node server.js