import os 
import urllib

def rename_files():
	file_to_open = os.path.expanduser('~/Desktop/movie_quotes.txt')
	f = open(file_to_open)
	file = f.read();
	print(file)
	check_pro(file)

def check_pro(words):
	connection = urllib.urlopen("http://www.wdylike.appspot.com/?q="+words)
	result  = connection.read()
	if "true" in result :
		print ("Profanity Alert!")
	else:
		print("You are all set :)")






rename_files()