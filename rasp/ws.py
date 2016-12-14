from socketIO_client import SocketIO, LoggingNamespace
import os.path

def on_inicia_calibracao():
	if os.path.isfile('/home/pi/ftp/files/curitibanos/inicia_calibracao.txt') == False:
		f = file("/home/pi/ftp/files/curitibanos/inicia_calibracao.txt", "w") 
		print "Arquivo de iniciar calibracao criado"

def on_calibra(data):
	if os.path.isfile('/home/pi/ftp/files/curitibanos/calibra.txt') == False:
		f = file("/home/pi/ftp/files/curitibanos/calibra.txt", "w")
		f.write(str(data))
		print "Arquivo de calibrar criado"
	

with SocketIO('192.168.1.115', 9000, LoggingNamespace) as socketIO:
    socketIO.on('inicia_calibracao', on_inicia_calibracao)
    socketIO.on('calibra', on_calibra)
    socketIO.wait()