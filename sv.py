import http.server
import socketserver

print("Simple http server\n")
print("1 to start the server\n2 to close the aplication")

op = int(input())

if op == 1:
	PORT = 8000
	ADDRESS = ("", PORT)
	Handler = http.server.SimpleHTTPRequestHandler
	
	with socketserver.TCPServer(ADDRESS, Handler) as httpd:
		print("serving at port", PORT)
		httpd.serve_forever()
elif op == 2:
	print("Aplication Closed\n")