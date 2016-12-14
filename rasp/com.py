import serial
from RestfulClient.api import ApiClient
import time
import string
import os.path
from datetime import datetime

ip_servidor 				= 'http://192.168.1.115:9000/api'
arquivo_backup	 			= '/home/pi/ftp/files/curitibanos/backup.txt'
arquivo_inicia_calibracao 	= '/home/pi/ftp/files/curitibanos/inicia_calibracao.txt'
arquivo_envia_calibracao 	= '/home/pi/ftp/files/curitibanos/calibra.txt'
tempo_enviar 			  	= 5

if os.path.isfile(arquivo_envia_calibracao) == True:
		os.remove(arquivo_envia_calibracao)

if os.path.isfile(arquivo_inicia_calibracao) == True:
		os.remove(arquivo_inicia_calibracao)


_serial = serial.Serial('/dev/ttyACM0', 9600)
api = ApiClient('xxx', 'xxx', ip_servidor)

sensores = ['TempSolo_vaso_1', 'UmSolo_vaso_1', 'TempAmb_vaso_1', 'UmiAmb_vaso_1', 'Peso_vaso_1']

def salvaLocal(_time, i, val):
	f = open(arquivo_backup,'a')
	f.write(_time + ';' + str(i) + ';' + str(val) + '\n')
	f.close()

def enviaBackuspParaServidor():
	enviou = True
	with open(arquivo_backup) as f:
		for line in f:
			lineSplit = line.split(';')
			try:
				req = api.get('/sensor_data/send?data=' + lineSplit[0] + '&' + sensores[string.atoi(lineSplit[1])] + '=' + lineSplit[2])

				if req.ok():
				    print 'Dado de backup enviado com sucesso, iluminati.'
				else:
					print 'Comunicacao com servidor falhou durante envio de dados local.'
					enviou = False

			except Exception, e:
				print 'Comunicacao com servidor falhou durante envio de dados local.'
				enviou = False
			else:
				pass
			finally:
				pass

	if(enviou == True):
		os.remove(arquivo_backup)

ultimo_envio = datetime.now()

while True:

	# Captura os dados que estao chegando via serial
	_str = _serial.readline()
	_valsSplit = _str.split(';')

	if((datetime.now() - ultimo_envio).seconds < tempo_enviar):
		continue

	print 'Iniciando o envio de dados para o servidor'

	if os.path.isfile(arquivo_backup) == True:
		enviaBackuspParaServidor()

	for i, val in enumerate(_valsSplit):

		if i == len(sensores):
			continue

		_time = time.strftime("%d/%m/%Y %H:%M:%S")

		try:
			req = api.get('/sensor_data/send?data=' + _time + '&' + sensores[i] + '=' + val)

			if req.ok():
			    print 'Dado enviado com sucesso, iluminati.'
			else:
				print 'Comunicacao com servidor falhou. Salvando dados local...'
				salvaLocal(_time, i, val)

		except Exception, e:
			print 'Comunicacao com servidor falhou. Salvando dados local...'
			salvaLocal(_time, i, val)
		else:
			pass
		finally:
			pass
	
	# Verifica se precisa avisar o arduino para iniciar a calibracao
	if os.path.isfile(arquivo_inicia_calibracao) == True:
		os.remove(arquivo_inicia_calibracao)
		_serial.write('C\n')
		print 'Comando para iniciar calibracao enviado para o arduino'

	# Verifica se precisa enviar o valor medido para o arduino
	if os.path.isfile(arquivo_envia_calibracao) == True:
		with open(arquivo_envia_calibracao) as f:
			_val = string.atoi(f.readline())
			_serial.write(str(_val) + '\n')
			print 'Tara enviada: ', _val

		os.remove(arquivo_envia_calibracao)

