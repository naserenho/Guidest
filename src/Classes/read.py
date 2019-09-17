import os 
import urllib

def rename_files():
	file_to_open = os.path.expanduser('~/Desktop/movie_quotes.txt')
	f = open(file_to_open)
	file = f.read();
	print(file)
	print check_pro(file)
	f.close()

def check_pro(words):
	connection = urllib.urlopen("http://www.wdylike.appspot.com/?q="+words)
	result  = connection.read()
	if "true" in result :
		return  "Profanity Alert!"
	return "You are all set :)"







rename_files()
print sum([4,4,4,4,4,4,5,6,7,9,7,8])